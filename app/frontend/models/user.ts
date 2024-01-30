import { Instance, flow, types } from "mobx-state-tree"
import { withEnvironment } from "../lib/with-environment"
import { withRootStore } from "../lib/with-root-store"
import { EUserRoles } from "../types/enums"
import { JurisdictionModel } from "./jurisdiction"

export const UserModel = types
  .model("UserModel")
  .props({
    id: types.identifier,
    email: types.string,
    role: types.enumeration(Object.values(EUserRoles)),
    firstName: types.string,
    lastName: types.string,
    username: types.string,
    certified: types.boolean,
    organization: types.maybeNull(types.string),
    jurisdiction: types.maybeNull(types.reference(types.late(() => JurisdictionModel))),
    createdAt: types.Date,
    discardedAt: types.maybeNull(types.Date),
    lastSignInAt: types.maybeNull(types.Date),
  })
  .extend(withRootStore())
  .extend(withEnvironment())
  .views((self) => ({
    get isSuperAdmin() {
      return self.role == EUserRoles.superAdmin
    },
    get isAdmin() {
      return self.role == EUserRoles.superAdmin || self.role == EUserRoles.reviewManager
    },
    get isReviewManager() {
      return self.role == EUserRoles.reviewManager
    },
    get isReviewer() {
      return self.role == EUserRoles.reviewer
    },
    get isSubmitter() {
      return self.role == EUserRoles.submitter
    },
    get isDiscarded() {
      return self.discardedAt !== null
    },
    get name() {
      return `${self.firstName} ${self.lastName}`
    },
  }))
  .actions((self) => ({
    destroy: flow(function* () {
      const response = yield self.environment.api.destroyUser(self.id)
      return response.ok
    }),
    restore: flow(function* () {
      const response = yield self.environment.api.restoreUser(self.id)
      return response.ok
    }),
  }))

export interface IUser extends Instance<typeof UserModel> {}
