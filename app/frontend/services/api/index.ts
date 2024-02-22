import { ApiResponse, ApisauceInstance, create, Monitor } from "apisauce"
import { TCreatePermitApplicationFormData } from "../../components/domains/permit-application/new-permit-application-screen"
import { TCreateRequirementTemplateFormData } from "../../components/domains/requirement-template/new-requirement-tempate-screen"
import { IJurisdiction } from "../../models/jurisdiction"
import { IPermitApplication } from "../../models/permit-application"
import { IPermitType } from "../../models/permit-classification"
import { IRequirementTemplate } from "../../models/requirement-template"
import { IUser } from "../../models/user"
import { IRequirementBlockParams, IRequirementTemplateUpdateParams, ITagSearchParams } from "../../types/api-request"
import {
  IAcceptInvitationResponse,
  IApiResponse,
  IJurisdictionPermitApplicationResponse,
  IJurisdictionResponse,
  IJurisdictionUserResponse,
  IOptionResponse,
  IRequirementBlockResponse,
  IRequirementTemplateResponse,
  IResetPasswordResponse,
  IUserResponse,
} from "../../types/api-responses"
import {
  EJurisdictionSortFields,
  EPermitApplicationSortFields,
  ERequirementLibrarySortFields,
  ERequirementTemplateSortFields,
  EUserSortFields,
} from "../../types/enums"
import { TSearchParams } from "../../types/types"
import { camelizeResponse, decamelizeRequest } from "../../utils"

export class Api {
  client: ApisauceInstance

  constructor() {
    this.client = create({
      baseURL: "/api",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      timeout: 30000,
      withCredentials: true,
    })

    this.client.addResponseTransform((response) => {
      response.data = camelizeResponse(response.data)
    })

    this.client.addRequestTransform((request) => {
      request.params = decamelizeRequest(request.params)
      request.data = decamelizeRequest(request.data)
    })
  }

  addMonitor(monitor: Monitor) {
    this.client.addMonitor(monitor)
  }

  async login(username, password) {
    return this.client.post<IUserResponse>("/login", { user: { username, password } })
  }

  async signUp(formData) {
    return this.client.post<IUserResponse>("/signup", { user: formData })
  }

  async logout() {
    return this.client.delete("/logout")
  }

  async changePassword(params) {
    return this.client.patch<IUserResponse>(`/users/change_password`, params)
  }

  async requestPasswordReset(params) {
    return this.client.post("/password", { user: params })
  }

  async resetPassword(params) {
    return this.client.put<IResetPasswordResponse>("/password", { user: params })
  }

  async validateToken() {
    return this.client.get("/validate_token")
  }

  async invite(params) {
    return this.client.post("/invitation", params)
  }

  async acceptInvitation(params) {
    return this.client.put<IAcceptInvitationResponse>("/invitation", { user: params })
  }

  async searchJurisdictions(params?: TSearchParams<EJurisdictionSortFields>) {
    return this.client.post<IJurisdictionResponse>("/jurisdictions/search", params)
  }

  async fetchJurisdiction(id) {
    return this.client.get<ApiResponse<IJurisdiction>>(`/jurisdictions/${id}`)
  }

  async fetchPermitApplication(id) {
    return this.client.get<ApiResponse<IPermitApplication>>(`/permit_applications/${id}`)
  }

  async fetchLocalityTypeOptions() {
    return this.client.get<IOptionResponse>(`/jurisdictions/locality_type_options`)
  }

  async fetchPermitClassifications() {
    return this.client.get<IOptionResponse>(`/permit_classifications`)
  }

  async fetchPermitClassificationOptions(
    type,
    published = false,
    permit_type_id: string = null,
    activity_id: string = null,
    pid: string = null
  ) {
    return this.client.post<IOptionResponse<IPermitType>>(`/permit_classifications/permit_classification_options`, {
      type,
      published,
      permit_type_id,
      activity_id,
      pid,
    })
  }

  async createJurisdiction(params) {
    return this.client.post<ApiResponse<IJurisdiction>>("/jurisdictions", { jurisdiction: params })
  }

  async updateJurisdiction(id, params) {
    return this.client.patch<ApiResponse<IJurisdiction>>(`/jurisdictions/${id}`, { jurisdiction: params })
  }

  async fetchRequirementBlocks(params?: TSearchParams<ERequirementLibrarySortFields>) {
    return this.client.post<IRequirementBlockResponse>("/requirement_blocks/search", params)
  }

  async fetchJurisdictionUsers(jurisdictionId, params?: TSearchParams<EUserSortFields>) {
    return this.client.post<IJurisdictionUserResponse>(`/jurisdictions/${jurisdictionId}/users/search`, params)
  }

  async fetchJurisdictionPermitApplications(jurisdictionId, params?: TSearchParams<EPermitApplicationSortFields>) {
    return this.client.post<IJurisdictionPermitApplicationResponse>(
      `/jurisdictions/${jurisdictionId}/permit_applications/search`,
      params
    )
  }

  async createPermitApplication(params: TCreatePermitApplicationFormData) {
    return this.client.post<ApiResponse<IPermitApplication>>("/permit_applications", { permitApplication: params })
  }

  async createRequirementBlock(params: IRequirementBlockParams) {
    return this.client.post<IRequirementBlockResponse>(`/requirement_blocks`, { requirementBlock: params })
  }

  async updateRequirementBlock(id: string, params: Partial<IRequirementBlockParams>) {
    return this.client.put<IRequirementBlockResponse>(`/requirement_blocks/${id}`, { requirementBlock: params })
  }

  async updateProfile(params) {
    return this.client.patch<ApiResponse<IUser>>("/profile", { user: params })
  }

  async destroyUser(id) {
    return this.client.delete<ApiResponse<IUser>>(`/users/${id}`)
  }

  async restoreUser(id) {
    return this.client.patch<ApiResponse<IUser>>(`/users/${id}/restore`)
  }

  async searchTags(params: Partial<ITagSearchParams>) {
    return this.client.post<string[]>(`/tags/search`, { search: params })
  }

  async fetchPermitApplications() {
    return this.client.get<ApiResponse<IPermitApplication>>(`/permit_applications`)
  }

  async updatePermitApplication(id, params) {
    return this.client.patch<ApiResponse<IPermitApplication>>(`/permit_applications/${id}`, params)
  }

  async submitPermitApplication(id, params) {
    return this.client.post<ApiResponse<IPermitApplication>>(`/permit_applications/${id}/submit`, params)
  }

  async fetchRequirementTemplates(params?: TSearchParams<ERequirementTemplateSortFields>) {
    return this.client.post<IRequirementTemplateResponse>(`/requirement_templates/search`, params)
  }

  async fetchRequirementTemplate(id: string) {
    return this.client.get<IApiResponse<IRequirementTemplate, {}>>(`/requirement_templates/${id}`)
  }

  async createRequirementTemplate(params: TCreateRequirementTemplateFormData) {
    return this.client.post<ApiResponse<IRequirementTemplate>>(`/requirement_templates`, {
      requirementTemplate: params,
    })
  }

  async updateRequirementTemplate(templateId: string, params: IRequirementTemplateUpdateParams) {
    return this.client.put<ApiResponse<IRequirementTemplate>>(`/requirement_templates/${templateId}`, {
      requirementTemplate: params,
    })
  }

  async scheduleRequirementTemplate(
    templateId: string,
    {
      requirementTemplate,
      versionDate,
    }: {
      requirementTemplate?: IRequirementTemplateUpdateParams
      versionDate: Date
    }
  ) {
    return this.client.post<ApiResponse<IRequirementTemplate>>(`/requirement_templates/${templateId}/schedule`, {
      requirementTemplate,
      versionDate,
    })
  }

  async fetchSiteOptions(address: string) {
    return this.client.get<IOptionResponse>(`/geocoder/site_options`, { address })
  }

  async fetchPid(siteId: string) {
    return this.client.get<ApiResponse<string>>(`/geocoder/pid`, { siteId })
  }

  async destroyRequirementTemplate(id) {
    return this.client.delete<ApiResponse<IRequirementTemplate>>(`/requirement_templates/${id}`)
  }

  async restoreRequirementTemplate(id) {
    return this.client.patch<ApiResponse<IRequirementTemplate>>(`/requirement_templates/${id}/restore`)
  }
}
