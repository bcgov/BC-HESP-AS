import { t } from "i18next"
import { Instance, applySnapshot, flow, toGenerator, types } from "mobx-state-tree"
import { withEnvironment } from "../lib/with-environment"
import { EUserSortFields } from "../types/enums"
import { IContact, TLatLngTuple } from "../types/types"
import { toCamelCase } from "../utils/utility-funcitons"
import { UserModel } from "./user"

export const JurisdictionModel = types
  .model("JurisdictionModel", {
    id: types.identifier,
    name: types.string,
    qualifiedName: types.string,
    reverseQualifiedName: types.string,
    localityType: types.string,
    qualifier: types.string,
    reviewManagersSize: types.number,
    reviewersSize: types.number,
    permitApplicationsSize: types.number,
    descriptionHtml: types.maybeNull(types.string),
    checklistHtml: types.maybeNull(types.string),
    lookOutHtml: types.maybeNull(types.string),
    contactSummaryHtml: types.maybeNull(types.string),
    contacts: types.array(types.frozen<IContact>()),
    createdAt: types.Date,
    updatedAt: types.Date,
    tableUsers: types.array(types.reference(UserModel)),
    boundryPoints: types.optional(types.array(types.frozen<TLatLngTuple>()), []),
    mapPosition: types.frozen<TLatLngTuple>(),
  })
  .extend(withEnvironment())
  .views((self) => ({
    getUserSortColumnHeader(field: EUserSortFields) {
      //@ts-ignore
      return t(`user.fields.${toCamelCase(field)}`)
    },
  }))
  .actions((self) => ({
    setTableUsers: (users) => {
      self.tableUsers = users.map((user) => user.id)
    },
    update: flow(function* (params) {
      const { ok, data: response } = yield* toGenerator(self.environment.api.updateJurisdiction(self.id, params))
      if (ok) {
        applySnapshot(self, response.data)
      }
      return ok
    }),
  }))

export interface IJurisdiction extends Instance<typeof JurisdictionModel> {}
