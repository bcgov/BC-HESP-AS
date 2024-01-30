import { IStateTreeNode, types } from "mobx-state-tree"
import { withEnvironment } from "../lib/with-environment"
import { GeocoderStoreModel, IGeocoderStore } from "./geocoder-store"
import { IJurisdictionStore, JurisdictionStoreModel } from "./jurisdiction-store"
import { IPermitApplicationStore, PermitApplicationStoreModel } from "./permit-application-store"
import { IPermitClassificationStore, PermitClassificationStoreModel } from "./permit-classification-store"
import { IRequirementBlockStoreModel, RequirementBlockStoreModel } from "./requirement-block-store"
import { IRequirementTemplateStoreModel, RequirementTemplateStoreModel } from "./requirement-template-store"
import { ISessionStore, SessionStoreModel } from "./session-store"
import { IUIStore, UIStoreModel } from "./ui-store"
import { IUserStore, UserStoreModel } from "./user-store"

export const RootStoreModel = types
  .model("RootStoreModel")
  .props({
    uiStore: types.optional(UIStoreModel, {}),
    sessionStore: types.optional(SessionStoreModel, {}),
    userStore: types.optional(UserStoreModel, {}),
    permitApplicationStore: types.optional(PermitApplicationStoreModel, {}),
    permitClassificationStore: types.optional(PermitClassificationStoreModel, {}),
    jurisdictionStore: types.optional(JurisdictionStoreModel, {}),
    RequirementBlockStoreModel: types.optional(RequirementBlockStoreModel, {}),
    RequirementTemplateStoreModel: types.optional(RequirementTemplateStoreModel, {}),
    geocoderStore: types.optional(GeocoderStoreModel, {}),
  })
  .extend(withEnvironment())
  .views((self) => ({}))
  .actions((self) => ({}))

export interface IRootStore extends IStateTreeNode {
  uiStore: IUIStore
  sessionStore: ISessionStore
  permitApplicationStore: IPermitApplicationStore
  permitClassificationStore: IPermitClassificationStore
  jurisdictionStore: IJurisdictionStore
  userStore: IUserStore
  RequirementBlockStoreModel: IRequirementBlockStoreModel
  RequirementTemplateStoreModel: IRequirementTemplateStoreModel
  geocoderStore: IGeocoderStore
}
