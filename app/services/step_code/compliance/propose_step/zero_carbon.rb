class StepCode::Compliance::ProposeStep::ZeroCarbon < StepCode::Compliance::ProposeStep::Base
  def min_required_step
    @min_required_step ||= checklist.step_code.energy_step_required || min_step
  end

  def max_step
    @max_step ||= ENV["MAX_ZERO_CARBON_STEP"].to_i
  end

  def min_step
    @min_step ||= ENV["MIN_ZERO_CARBON_STEP"].to_i
  end

  def checkers
    %i[ghg_checker co2_checker prescriptive_checker]
  end

  def ghg_checker
    StepCode::Compliance::CheckRequirements::ZeroCarbon::GHG.new(step:, checklist:)
  end

  def co2_checker
    StepCode::Compliance::CheckRequirements::ZeroCarbon::CO2.new(step:, checklist:)
  end

  def prescriptive_checker
    StepCode::Compliance::CheckRequirements::ZeroCarbon::Prescriptive.new(step:, checklist:)
  end
end
