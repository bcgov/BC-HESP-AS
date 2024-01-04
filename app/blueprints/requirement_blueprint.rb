# frozen_string_literal: true

class RequirementBlueprint < Blueprinter::Base
  identifier :id
  fields :requirement_code,
         :label,
         :input_type,
         :input_options,
         :hint,
         :reusable,
         :required,
         :related_content,
         :required_for_in_person_hint,
         :required_for_multiple_owners,
         :updated_at

  field :form_json do |requirement|
    requirement.to_form_json
  end
end
