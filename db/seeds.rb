# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

PermitClassificationSeeder.seed

# Creating Jurisdictions
JurisdictionSeeder.seed
jurisdictions = Jurisdiction.all

5.times do |n|
  suffix = n == 0 ? "" : n
  User.find_or_create_by(username: "super_admin#{suffix}") do |user|
    user.role = :super_admin
    user.first_name = "SuperAdmin#{suffix}"
    user.last_name = "McUser"
    user.email = "super_admin#{suffix}@example.com"
    user.password = "P@ssword1"
    user.confirmed_at = Time.now
  end

  User.find_or_create_by(username: "review_manager#{suffix}") do |user|
    user.role = :review_manager
    user.first_name = "ReviewManager#{suffix}"
    user.last_name = "McUser"
    user.email = "review_manager#{suffix}@example.com"
    user.password = "P@ssword1"
    user.jurisdiction = jurisdictions.first
    user.confirmed_at = Time.now
  end

  User.find_or_create_by(username: "reviewer#{suffix}") do |user|
    user.role = :reviewer
    user.first_name = "Reviewer#{suffix}"
    user.last_name = "McUser"
    user.email = "reviewer#{suffix}@example.com"
    user.password = "P@ssword1"
    user.jurisdiction = jurisdictions.first
    user.confirmed_at = Time.now
  end

  User.find_or_create_by(username: "submitter#{suffix}") do |user|
    user.role = :submitter
    user.first_name = "Submitter#{suffix}"
    user.last_name = "McUser"
    user.email = "submitter#{suffix}@example.com"
    user.password = "P@ssword1"
    user.confirmed_at = Time.now
  end
end

PermitClassificationSeeder.seed
activity1 = Activity.find_by_code("new_construction")
activity2 = Activity.find_by_code("demolition")

# Create PermitType records
permit_type1 = PermitType.find_by_code("low_residential")
permit_type2 = PermitType.find_by_code("medium_residential")

if PermitApplication.first.blank?
  jurisdictions
    .first(10)
    .each do |jurisdiction|
      if jurisdiction.contacts.blank?
        rand(3..5).times do |n|
          Contact.create(
            name: "Contact #{n}",
            title: "Title #{n}",
            first_nation: "Nation #{n}",
            email: "contact_#{n}_#{jurisdiction.id}@example.com",
            phone_number: "604-456-7802",
            jurisdiction_id: jurisdiction.id,
          )
        end
      end
    end
  # Creating Permit Applications
  submitters = User.where(role: "submitter")
  20.times do
    PermitApplication.create(
      submitter_id: submitters.sample.id,
      jurisdiction_id: jurisdictions.sample.id,
      activity_id: activity1.id,
      permit_type_id: permit_type1.id,
    )
  end
  # Seed a North Vancouver Example
  4.times do
    j = Jurisdiction.where(name: "North Vancouver").sample
    pid = (j.locality_type == "corporation of the city") ? "013228544" : "008535981"
    full_address =
      (
        if (j.locality_type == "corporation of the city")
          "323 18TH ST E, NORTH VANCOUVER, BC, V7L 2X8"
        else
          "5419 ESPERANZA DR, NORTH VANCOUVER, BC, V7R 3W3"
        end
      )
    PermitApplication.create(
      submitter: submitters.sample,
      jurisdiction: j,
      activity: activity1,
      permit_type: permit_type1,
      full_address: full_address,
      pid: pid,
    )
  end
end

# Create RequirementTemplate records
RequirementTemplate.find_or_create_by!(activity: activity1, permit_type: permit_type1)
RequirementTemplate.find_or_create_by!(activity: activity1, permit_type: permit_type2)
RequirementTemplate.find_or_create_by!(activity: activity2, permit_type: permit_type1)
RequirementTemplate.find_or_create_by!(activity: activity2, permit_type: permit_type2)
RequirementTemplate.reindex

# Requrements from seeder are idempotent
# Requirments block will get created from requiremetms templates
RequirementsFromXlsxSeeder.seed

User.reindex
