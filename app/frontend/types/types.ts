import { IPermitApplication } from "../models/permit-application"
import { IActivity, IPermitType } from "../models/permit-classification"
import { IRequirement } from "../models/requirement"
import {
  EDoorsPerformanceType,
  EEnabledElectiveFieldReason,
  EEnergyStep,
  EFossilFuelsPresence,
  EHotWaterPerformanceType,
  ENotificationActionType,
  ENumberUnit,
  ERequirementType,
  ESZeroCarbonStep,
  ESocketDomainTypes,
  ESocketEventTypes,
  ESortDirection,
  ESpaceHeatingCoolingPerformanceType,
  EStepCodeAirtightnessValue,
  EStepCodeBuildingType,
  EStepCodeCompliancePath,
  EStepCodeEPCTestingTargetType,
  EWindowsGlazedDoorsPerformanceType,
} from "./enums"

export type TLatLngTuple = [number, number]

export interface IContact {
  id: string
  firstName: string
  lastName: string
  title?: string
  department?: string
  email?: string
  phone?: string
  cell?: string
  address?: string
  organization?: string
  businessName?: string
  businessLicense?: string
  professionalAssociation?: string
  professionalNumber?: string
  createdAt?: number | string // has to allow string to stop errors with useFieldArray
  updatedAt?: number | string // has to allow string to stop errors with useFieldArray
}

export interface IPermitTypeSubmissionContact {
  id: string
  email: string
  permitTypeId: string
  confirmedAt: string
}

export interface ISort<TField = string> {
  field: TField
  direction: ESortDirection
}

export interface IOption<TValue = string> {
  value: TValue
  label?: string
}

export type TDebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void

export type TSearchParams<IModelSortFields> = {
  sort?: ISort<IModelSortFields>
  query?: string
  page?: number
  perPage?: number
  showArchived?: boolean
  statusFilter?: string
}

export interface IRequirementOptions {
  valueOptions?: IOption[]
  numberUnit?: ENumberUnit
  canAddMultipleContacts?: boolean
  conditional?: TConditional
  dataValidation?: Object
}

export interface IFormJson {
  id: string
  key: string
  input: false
  tableView: false
  components: IFormIOSection[]
}

export interface IFormIOSection {
  id: string
  key: string
  type: "panel"
  title: string
  collapsible: true
  initiallyCollapsed: false
  components: IFormIOBlock[]
}

export interface IFormIOBlock {
  id: string
  legend: string
  key: string
  title: string
  input: false
  tableView: false
  components: IFormIORequirement[]
}

export interface IFormIORequirement {
  id: string
  key: string
  type: string
  input: true
  validation: { required: boolean }
  label: string
  widget?: any
  customClass?: string
}

export interface ISubmissionData {
  data: any[]
}

export interface IDenormalizedRequirement {
  id: string
  label: string
  inputType: ERequirementType
  inputOptions: IRequirementOptions
  formJson?: IFormIORequirement
  hint?: string | null
  elective?: boolean
  required?: boolean
}

export interface IDenormalizedRequirementBlock {
  id: string
  name: string
  formJson?: IFormIOBlock
  description?: string
  displayName: string
  displayDescription?: string
  requirements: IDenormalizedRequirement[]
}

export interface IDenormalizedTemplateSectionBlock {
  id: string
  requirementBlock: IDenormalizedRequirementBlock
}

export interface IDenormalizedRequirementTemplateSection {
  id: string
  name: string
  templateSectionBlocks: IDenormalizedTemplateSectionBlock[]
}

export interface IDenormalizedTemplate {
  id: string
  description?: string
  permitType: IPermitType
  activity: IActivity
  requirementTemplateSections: IDenormalizedRequirementTemplateSection[]
}

export interface ICompareRequirementsBoxData {
  id?: string
  class?: string
  label: string
  diffSectionLabel: string
}

export interface ICompareRequirementsBoxDiff {
  added: ICompareRequirementsBoxData[]
  removed: ICompareRequirementsBoxData[]
  changed: ICompareRequirementsBoxData[]
}

export interface IErrorsBoxData {
  id: string
  label: string
  class: string
}

interface IStepCodeBuildingCharacteristicSummarySelectOptions {
  performanceTypes: {
    windowsGlazedDoors: EWindowsGlazedDoorsPerformanceType[]
    doors: EDoorsPerformanceType[]
    spaceHeatingCooling: ESpaceHeatingCoolingPerformanceType[]
    hotWater: EHotWaterPerformanceType[]
  }
  fossilFuelsPresence: EFossilFuelsPresence[]
}

export interface IStepCodeSelectOptions {
  compliancePaths: EStepCodeCompliancePath[]
  airtightnessValues: EStepCodeAirtightnessValue[]
  epcTestingTargetTypes: EStepCodeEPCTestingTargetType[]
  permitApplications: Partial<IPermitApplication>[]
  buildingTypes: EStepCodeBuildingType[]
  buildingCharacteristicsSummary: IStepCodeBuildingCharacteristicSummarySelectOptions
  energySteps: EEnergyStep[]
  zeroCarbonSteps: ESZeroCarbonStep[]
}

export interface IRequirementBlockCustomization {
  tip?: string
  enabledElectiveFieldIds?: Array<string>
  enabledElectiveFieldReasons?: Record<string, EEnabledElectiveFieldReason>
}

export interface ITemplateCustomization {
  requirementBlockChanges?: Record<string, IRequirementBlockCustomization>
}

export interface IDownloadableFile {
  fileUrl: string
  fileName: string
  fileSize: number
}

export interface IEULA {
  content: string
}

export interface IPermitApplicationUpdate {
  id
  frontEndFormUpdate: Object
  formattedComplianceData: Object
}

export interface INotificationObjectData {
  templateVersionId?: string
  // Add future notification data here
}

export interface INotification {
  id: string
  actionType: ENotificationActionType
  actionText: string
  objectData?: INotificationObjectData
}

export type TSocketEventData = IPermitApplication | INotification

export interface IUserPushPayload {
  data: TSocketEventData
  domain: ESocketDomainTypes
  eventType: ESocketEventTypes
  meta: {
    lastReadAt: number
    totalPages: number
    unreadCount: number
  }
}

export interface ISiteConfiguration {
  displaySitewideMessage: boolean
}

export interface IContact {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  cell?: string
  address?: string
  organization?: string
  businessName?: string
  businessLicense?: string
  professionalAssociation?: string
  professionalNumber?: string
}

export type TConditional = {
  show: boolean
  when: string
  eq: string
}

export interface ITemplateVersionDiff {
  added: IRequirement[]
  removed: IRequirement[]
  changed: IRequirement[]
}
