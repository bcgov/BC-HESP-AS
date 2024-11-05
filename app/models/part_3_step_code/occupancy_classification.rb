class Part3StepCode::OccupancyClassification < ApplicationRecord
  self.table_name = "occupancy_classifications"

  belongs_to :checklist

  OCCUPANCIES_LOOKUP = Constants::Part3StepCode::OCCUPANCIES_LOOKUP

  enum key: OCCUPANCIES_LOOKUP.keys, _prefix: :occupancy
  enum performance_requirement: %i[
         step_2_necb
         ashrae
         %_better_ashrae
         necb
         %_better_necb
       ]
  enum energy_step_required: %i[step_2 step_3 step_4]
  enum zero_carbon_step_required: %i[n_a el_1 el_2 el_3 el_4]
  enum occupancy_type: %i[reference_building step_code]

  validates :performance_requirement, presence: true, if: :reference_building?
  validates :energy_step_required, presence: true, if: :step_code?
  validates :zero_carbon_step_required, presence: true, if: :step_code?
end
