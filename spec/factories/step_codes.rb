FactoryBot.define do
  factory :step_code do
    name { "Step Code" }
    association :pre_construction_checklist, factory: :step_code_checklist
  end
end
