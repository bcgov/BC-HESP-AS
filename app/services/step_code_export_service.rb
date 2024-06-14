class StepCodeExportService
  def summary_csv
    CSV.generate(headers: true) do |csv|
      csv << I18n.t("export.step_code_summary_csv_headers").split(",")
      jurisdictions = Jurisdiction.all
      permit_types = PermitType.all
      activities = Activity.all

      jurisdictions.each do |j|
        permit_types.each do |pt|
          activities.each do |a|
            jurisdiction_name = j.qualified_name
            permit_type = pt.name
            work_type = a.name
            permit_type_required_steps = j.permit_type_required_steps_by_classification(a, pt)
            permit_type_required_steps.each do |jtsc|
              energy_step_required = jtsc.energy_step_required
              zero_carbon_step_required = jtsc.zero_carbon_step_required
              enabled = energy_step_required.positive? || zero_carbon_step_required.positive?
              csv << [
                jurisdiction_name,
                permit_type,
                work_type,
                enabled,
                energy_step_required,
                zero_carbon_step_required,
              ]
            end
          end
        end
      end
    end
  end
end
