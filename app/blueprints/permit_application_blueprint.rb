class PermitApplicationBlueprint < Blueprinter::Base
  identifier :id
  fields :nickname,
         :status,
         :number,
         :created_at,
         :updated_at,
         :viewed_at,
         :form_json,
         :full_address,
         :pid,
         :pin,
         :submission_data,
         :submitted_at,
         :formatted_compliance_data,
         :front_end_form_update,
         :zipfile_size,
         :zipfile_name,
         :zipfile_url,
         :form_customizations
  association :permit_type, blueprint: PermitClassificationBlueprint
  association :activity, blueprint: PermitClassificationBlueprint
  association :jurisdiction, blueprint: JurisdictionBlueprint
  association :submitter, blueprint: UserBlueprint
  association :step_code, blueprint: StepCodeBlueprint
  association :supporting_documents, blueprint: SupportingDocumentBlueprint
end
