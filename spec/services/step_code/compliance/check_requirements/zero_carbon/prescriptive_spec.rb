RSpec.describe StepCode::Compliance::CheckRequirements::ZeroCarbon::Prescriptive do
  let(:step) { 3 }
  let!(:step_code) { create(:step_code, data_entries_attributes:) }
  subject(:compliance_checker) do
    StepCode::Compliance::CheckRequirements::ZeroCarbon::Prescriptive.new(
      checklist: step_code.pre_construction_checklist,
      step: step,
    )
  end

  let(:heating_requirement) { :zero_carbon }
  let(:hot_water_requirement) { :zero_carbon }
  let(:other_requirement) { :zero_carbon }

  before :each do
    allow(subject).to receive(:heating_requirement) { heating_requirement }
    allow(subject).to receive(:hot_water_requirement) { hot_water_requirement }
    allow(subject).to receive(:other_requirement) { other_requirement }
  end

  context "when heating requirement is not met" do
    let(:data_entries_attributes) do
      [
        { stage: :proposed, heating_furnace: 0.9, heating_boiler: 0.2, heating_combo: 1.1 },
        { stage: :proposed, heating_furnace: 0.9, heating_boiler: 0, heating_combo: 0.9 },
      ]
    end

    it_behaves_like "a failed step code requirement"
  end

  context "when hot water requirement is not met" do
    let(:data_entries_attributes) do
      [
        { stage: :proposed, heating_furnace: 0.9, heating_boiler: 0, heating_combo: 0.9, hot_water: 0.8 },
        { stage: :proposed, heating_furnace: 0.9, heating_boiler: 0, heating_combo: 0.9, hot_water: 0.5 },
      ]
    end

    it_behaves_like "a failed step code requirement"
  end

  context "when other requirement is not met" do
    let(:data_entries_attributes) do
      [
        {
          stage: :proposed,
          heating_furnace: 0.9,
          heating_boiler: 0,
          heating_combo: 0.9,
          hot_water: 0.8,
          cooking: 0.2,
          laundry: 0.6,
        },
        {
          stage: :proposed,
          heating_furnace: 0.9,
          heating_boiler: 0,
          heating_combo: 0.9,
          hot_water: 0.5,
          cooking: 0.4,
          laundry: 0.7,
        },
      ]
    end

    it_behaves_like "a failed step code requirement"
  end

  context "when heating, hot water, and other all meet the requirement" do
    let(:data_entries_attributes) do
      [
        {
          stage: :proposed,
          heating_furnace: 0.9,
          heating_boiler: 0,
          heating_combo: 0.9,
          hot_water: 0.4,
          cooking: 0.2,
          laundry: 0.4,
        },
        {
          stage: :proposed,
          heating_furnace: 0.9,
          heating_boiler: 0,
          heating_combo: 0.9,
          hot_water: 0.5,
          cooking: 0.2,
          laundry: 0.4,
        },
      ]
    end

    it_behaves_like "a passing step code requirement"
  end
end
