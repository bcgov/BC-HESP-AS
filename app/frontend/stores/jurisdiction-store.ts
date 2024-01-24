import { t } from "i18next"
import { Instance, cast, flow, toGenerator, types } from "mobx-state-tree"
import * as R from "ramda"
import { TCreateJurisdictionFormData } from "../components/domains/jurisdictions/new-jurisdiction-screen"
import { createSearchModel } from "../lib/create-search-model"
import { withEnvironment } from "../lib/with-environment"
import { withMerge } from "../lib/with-merge"
import { withRootStore } from "../lib/with-root-store"
import { IJurisdiction, JurisdictionModel } from "../models/jurisdiction"
import { EJurisdictionSortFields } from "../types/enums"
import { ISort } from "../types/types"
import { toCamelCase } from "../utils/utility-funcitons"

export const JurisdictionStoreModel = types
  .compose(
    types.model("JurisdictionStore").props({
      jurisdictionMap: types.map(JurisdictionModel),
      tableJurisdictions: types.array(types.safeReference(JurisdictionModel)),
      currentJurisdiction: types.maybe(types.reference(types.late(() => JurisdictionModel))),
      sort: types.maybeNull(types.frozen<ISort<EJurisdictionSortFields>>()),
    }),
    createSearchModel<EJurisdictionSortFields>("fetchJurisdictions")
  )
  .extend(withEnvironment())
  .extend(withRootStore())
  .extend(withMerge())
  .views((self) => ({
    getSortColumnHeader(field: EJurisdictionSortFields) {
      //@ts-ignore
      return t(`jurisdiction.fields.${toCamelCase(field)}`)
    },
    // View to get a Jurisdiction by id
    getJurisdictionById(id: string) {
      return self.jurisdictionMap.get(id)
    },
    // View to get all jurisdictions as an array
    get jurisdictions() {
      return Array.from(self.jurisdictionMap.values())
    },
  }))
  .actions((self) => ({
    // Action to add a new Jurisdiction
    addJurisdiction(jurisdiction: IJurisdiction) {
      self.jurisdictionMap.put(jurisdiction)
    },
    // Action to remove a Jurisdiction
    removeJurisdiction(id: string) {
      self.jurisdictionMap.delete(id)
    },
    createJurisdiction: flow(function* (formData: TCreateJurisdictionFormData) {
      const { ok, data: response } = yield* toGenerator(self.environment.api.createJurisdiction(formData))

      if (ok) {
        self.jurisdictionMap.put(response.data)
        return response.data
      }
    }),
    fetchJurisdictions: flow(function* (opts?: { reset?: boolean; page?: number; countPerPage?: number }) {
      if (opts?.reset) {
        self.resetPages()
      }

      const response = yield* toGenerator(
        self.environment.api.fetchJurisdictions({
          query: self.query,
          sort: self.sort,
          page: opts?.page ?? self.currentPage,
          perPage: opts?.countPerPage ?? self.countPerPage,
        })
      )

      if (response.ok) {
        R.map((jurisdiction) => self.jurisdictionMap.put(jurisdiction), response.data.data)
        self.tableJurisdictions = cast(response.data.data.map((jurisdiction) => jurisdiction.id))
        self.currentPage = opts?.page ?? self.currentPage
        self.countPerPage = opts?.countPerPage ?? self.countPerPage
        self.totalPages = response.data.meta.totalPages
        self.totalCount = response.data.meta.totalCount
      }
      return response.ok
    }),
    fetchJurisdiction: flow(function* (id: string) {
      let jurisdiction = self.getJurisdictionById(id)
      if (!jurisdiction) {
        // Jurisdiction not found in the map, fetch from API
        const { ok, data: response } = yield self.environment.api.fetchJurisdiction(id)
        if (ok && response.data) {
          jurisdiction = JurisdictionModel.create(response.data)
          self.jurisdictionMap.put(jurisdiction)
        }
      }
      return jurisdiction
    }),
    fetchLocalityTypeOptions: flow(function* () {
      // Jurisdiction not found in the map, fetch from API
      const { ok, data: response } = yield self.environment.api.fetchLocalityTypeOptions()
      return response.data
    }),
    setCurrentJurisdiction(jurisdictionId) {
      self.currentJurisdiction = jurisdictionId
    },
  }))

export interface IJurisdictionStore extends Instance<typeof JurisdictionStoreModel> {}
