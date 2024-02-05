// Reference: https://auth0.com/blog/role-based-access-control-rbac-and-react-apps/#Role-Based-Access-Control-Example-in-React-Apps

import { IJurisdiction } from "../models/jurisdiction"
import { IUser } from "../models/user"
import { EUserRoles } from "../types/enums"

const sharedStaticRules = ["jurisdiction:view"]

const sharedDynamicRules = {
  "user.manage": (currentUser: IUser, data: { user: IUser }) => userRule(currentUser, data),
}

export const rules = {
  [EUserRoles.superAdmin]: {
    static: [
      ...sharedStaticRules,
      "jurisdiction:create",
      "jurisdiction:manage",
      "user:invite",
      "user:manage",
      "requirementTemplate:manage",
    ],
    dynamic: { ...sharedDynamicRules },
  },
  [EUserRoles.reviewManager]: {
    static: [...sharedStaticRules, "user:invite"],
    dynamic: {
      ...sharedDynamicRules,
      "jurisdiction:manage": (currentUser: IUser, data: { jurisdiction: IJurisdiction }) =>
        jurisdictionRule(currentUser, data),
    },
  },
  [EUserRoles.reviewer]: {
    static: [...sharedStaticRules, "user:view"],
    dynamic: { ...sharedDynamicRules },
  },
  [EUserRoles.submitter]: {
    static: [...sharedStaticRules],
    dynamic: { ...sharedDynamicRules },
  },
  ["anonymous"]: {
    static: [],
    dynamic: {},
  },
}

const userRule = (currentUser: IUser, data: { user: IUser }) => {
  const { user } = data
  return currentUser ? currentUser.id === user.id : false
}

const jurisdictionRule = (currentUser: IUser, data: { jurisdiction: IJurisdiction }) => {
  const { jurisdiction } = data
  return currentUser ? currentUser.jurisdiction.id === jurisdiction.id : false
}
