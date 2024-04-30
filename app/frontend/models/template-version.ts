import { flow } from "mobx"
import { Instance, toGenerator, types } from "mobx-state-tree"
import { IJurisdictionTemplateVersionCustomizationForm } from "../components/domains/requirement-template/screens/jurisdiction-edit-digital-permit-screen"
import { withEnvironment } from "../lib/with-environment"
import { EExportFormat, ETemplateVersionStatus } from "../types/enums"
import { IDenormalizedTemplate } from "../types/types"
import { JurisdictionTemplateVersionCustomizationModel } from "./jurisdiction-template-version-customization"

export const TemplateVersionModel = types
  .model("TemplateVersionModel")
  .props({
    id: types.identifier,
    status: types.enumeration(Object.values(ETemplateVersionStatus)),
    versionDate: types.Date,
    label: types.string,
    updatedAt: types.Date,
    denormalizedTemplateJson: types.maybeNull(types.frozen<IDenormalizedTemplate>()),
    templateVersionCustomizationsByJurisdiction: types.map(JurisdictionTemplateVersionCustomizationModel),
    isFullyLoaded: types.optional(types.boolean, false),
  })
  .extend(withEnvironment())
  .views((self) => ({
    get isPublished() {
      return self.status === ETemplateVersionStatus.published
    },

    get isScheduled() {
      return self.status === ETemplateVersionStatus.scheduled
    },

    get isDeprecated() {
      return self.status === ETemplateVersionStatus.deprecated
    },
    getJurisdictionTemplateVersionCustomization(jurisdictionId: string) {
      return self.templateVersionCustomizationsByJurisdiction.get(jurisdictionId)
    },
  }))
  .actions((self) => ({
    setJurisdictionTemplateVersionCustomization(
      jurisdictionId: string,
      customization: IJurisdictionTemplateVersionCustomizationForm
    ) {
      self.templateVersionCustomizationsByJurisdiction.set(jurisdictionId, customization)
    },
  }))
  .actions((self) => ({
    fetchJurisdictionTemplateVersionCustomization: flow(function* (jurisdictionId: string) {
      const response = yield* toGenerator(
        self.environment.api.fetchJurisdictionTemplateVersionCustomization(self.id, jurisdictionId)
      )
      if (!response.ok) {
        return response
      }

      const customization = response.data.data

      if (customization) {
        const customizationModel = JurisdictionTemplateVersionCustomizationModel.create(customization)
        self.setJurisdictionTemplateVersionCustomization(jurisdictionId, customizationModel)
      }

      return response
    }),
    createOrUpdateJurisdictionTemplateVersionCustomization: flow(function* (
      jurisdictionId: string,
      params: IJurisdictionTemplateVersionCustomizationForm
    ) {
      const response = yield* toGenerator(
        self.environment.api.createOrUpdateJurisdictionTemplateVersionCustomization(self.id, jurisdictionId, params)
      )
      if (!response.ok) {
        return response.ok
      }

      const customization = response.data.data

      if (customization) {
        self.setJurisdictionTemplateVersionCustomization(jurisdictionId, customization)
      }

      return self.getJurisdictionTemplateVersionCustomization(jurisdictionId)
    }),
    downloadTemplateVersionExport: flow(function* (jurisdictionId: string, format: EExportFormat) {
      const mimeTypes = {
        [EExportFormat.csv]: "text/csv",
        [EExportFormat.json]: "text/plain",
      }

      const apiMethodNames = {
        [EExportFormat.csv]: "downloadTemplateVersionCsv",
        [EExportFormat.json]: "downloadTemplateVersionJson",
      }

      try {
        const response = yield* toGenerator(self.environment.api[apiMethodNames[format]](self.id, jurisdictionId))
        if (!response.ok) {
          return response.ok
        }

        const blobData = format === EExportFormat.json ? JSON.stringify(response.data, null, 2) : response.data
        const blob = new Blob([blobData], { type: mimeTypes[format] })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${self.label}.${format}`
        document.body.appendChild(a)
        a.click()
        a.remove()

        return response
      } catch (error) {
        console.error(`Failed to download template version ${format}:`, error)
        throw error
      }
    }),
  }))

export interface ITemplateVersion extends Instance<typeof TemplateVersionModel> {}
