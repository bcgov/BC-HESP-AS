# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_02_15_233532) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "allowlisted_jwts",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.string "jti", null: false
    t.string "aud"
    t.datetime "exp", null: false
    t.uuid "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_allowlisted_jwts_on_jti", unique: true
    t.index ["user_id"], name: "index_allowlisted_jwts_on_user_id"
  end

  create_table "assets",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contacts",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.string "name"
    t.string "title"
    t.string "email"
    t.string "phone_number"
    t.string "extension"
    t.uuid "jurisdiction_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "department"
    t.index ["jurisdiction_id"], name: "index_contacts_on_jurisdiction_id"
  end

  create_table "jurisdiction_template_version_customizations",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.jsonb "customizationsa", default: {}
    t.uuid "jurisdiction_id", null: false
    t.uuid "template_version_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jurisdiction_id"], name: "idx_on_jurisdiction_id_57cd0a7ea7"
    t.index ["template_version_id"],
            name: "idx_on_template_version_id_8359a99333"
  end

  create_table "jurisdictions",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.string "name"
    t.text "description_html"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "incorporation_date"
    t.string "postal_address"
    t.string "type"
    t.string "locality_type"
    t.uuid "regional_district_id"
    t.text "checklist_html"
    t.text "look_out_html"
    t.text "contact_summary_html"
    t.jsonb "map_position"
    t.string "prefix", null: false
    t.string "submission_email"
    t.index ["prefix"], name: "index_jurisdictions_on_prefix", unique: true
    t.index ["regional_district_id"],
            name: "index_jurisdictions_on_regional_district_id"
  end

  create_table "permit_applications",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.integer "status", default: 0
    t.uuid "submitter_id", null: false
    t.uuid "jurisdiction_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "permit_type_id", null: false
    t.uuid "activity_id", null: false
    t.string "full_address"
    t.string "pid"
    t.string "pin"
    t.jsonb "submission_data"
    t.string "number"
    t.datetime "submitted_at"
    t.datetime "signed_off_at"
    t.index ["activity_id"], name: "index_permit_applications_on_activity_id"
    t.index ["jurisdiction_id"],
            name: "index_permit_applications_on_jurisdiction_id"
    t.index ["number"],
            name: "index_permit_applications_on_number",
            unique: true
    t.index ["permit_type_id"],
            name: "index_permit_applications_on_permit_type_id"
    t.index ["submitter_id"], name: "index_permit_applications_on_submitter_id"
  end

  create_table "permit_classifications",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.string "name", null: false
    t.string "code", null: false
    t.string "type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.boolean "enabled"
    t.index ["code"], name: "index_permit_classifications_on_code", unique: true
  end

  create_table "requirement_blocks",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.string "name", null: false
    t.integer "sign_off_role", default: 0, null: false
    t.integer "reviewer_role", default: 0, null: false
    t.jsonb "custom_validations", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.string "sku"
    t.string "display_name", null: false
    t.string "display_description"
    t.index ["name"], name: "index_requirement_blocks_on_name", unique: true
    t.index ["sku"], name: "index_requirement_blocks_on_sku", unique: true
  end

  create_table "requirement_template_sections",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.string "name"
    t.uuid "requirement_template_id", null: false
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["requirement_template_id"],
            name:
              "index_requirement_template_sections_on_requirement_template_id"
  end

  create_table "requirement_templates",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.uuid "activity_id", null: false
    t.uuid "permit_type_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", default: 0
    t.string "description"
    t.string "version"
    t.date "scheduled_for"
    t.datetime "discarded_at"
    t.index ["activity_id"], name: "index_requirement_templates_on_activity_id"
    t.index ["discarded_at"],
            name: "index_requirement_templates_on_discarded_at"
    t.index ["permit_type_id"],
            name: "index_requirement_templates_on_permit_type_id"
  end

  create_table "requirements",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.string "requirement_code", null: false
    t.string "label"
    t.integer "input_type", null: false
    t.jsonb "input_options", default: {}, null: false
    t.string "hint"
    t.boolean "required", default: true, null: false
    t.string "related_content"
    t.boolean "required_for_in_person_hint", default: false, null: false
    t.boolean "required_for_multiple_owners", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "requirement_block_id", null: false
    t.integer "position"
    t.index ["requirement_block_id"],
            name: "index_requirements_on_requirement_block_id"
  end

  create_table "supporting_documents",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.uuid "permit_application_id", null: false
    t.string "file_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "compliance_data"
    t.index ["permit_application_id"],
            name: "index_supporting_documents_on_permit_application_id"
  end

  create_table "taggings",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.uuid "tag_id"
    t.string "taggable_type"
    t.uuid "taggable_id"
    t.string "tagger_type"
    t.uuid "tagger_id"
    t.string "context", limit: 128
    t.datetime "created_at", precision: nil
    t.string "tenant", limit: 128
    t.index ["context"], name: "index_taggings_on_context"
    t.index %w[tag_id taggable_id taggable_type context tagger_id tagger_type],
            name: "taggings_idx",
            unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index %w[taggable_id taggable_type context],
            name: "taggings_taggable_context_idx"
    t.index %w[taggable_id taggable_type tagger_id context],
            name: "taggings_idy"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
    t.index %w[taggable_type taggable_id],
            name: "index_taggings_on_taggable_type_and_taggable_id"
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type"
    t.index %w[tagger_id tagger_type],
            name: "index_taggings_on_tagger_id_and_tagger_type"
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id"
    t.index %w[tagger_type tagger_id],
            name: "index_taggings_on_tagger_type_and_tagger_id"
    t.index ["tenant"], name: "index_taggings_on_tenant"
  end

  create_table "tags",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "template_section_blocks",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.uuid "requirement_template_section_id", null: false
    t.uuid "requirement_block_id", null: false
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["requirement_block_id"],
            name: "index_template_section_blocks_on_requirement_block_id"
    t.index ["requirement_template_section_id"],
            name: "idx_on_requirement_template_section_id_5469986497"
  end

  create_table "template_versions",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.jsonb "denormalized_template_json", default: {}
    t.jsonb "form_json", default: {}
    t.jsonb "requirement_blocks_json", default: {}
    t.json "version_diff", default: {}
    t.date "version_date", null: false
    t.integer "status", default: 0
    t.uuid "requirement_template_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["requirement_template_id"],
            name: "index_template_versions_on_requirement_template_id"
  end

  create_table "users",
               id: :uuid,
               default: -> { "gen_random_uuid()" },
               force: :cascade do |t|
    t.string "email", null: false
    t.string "username"
    t.string "organization"
    t.boolean "certified", default: false, null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "role", default: 0
    t.string "first_name"
    t.string "last_name"
    t.uuid "jurisdiction_id"
    t.string "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer "invitation_limit"
    t.string "invited_by_type"
    t.uuid "invited_by_id"
    t.integer "invitations_count", default: 0
    t.string "provider"
    t.string "uid"
    t.datetime "discarded_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.index ["confirmation_token"],
            name: "index_users_on_confirmation_token",
            unique: true
    t.index ["discarded_at"], name: "index_users_on_discarded_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["invitation_token"],
            name: "index_users_on_invitation_token",
            unique: true
    t.index ["invited_by_id"], name: "index_users_on_invited_by_id"
    t.index %w[invited_by_type invited_by_id], name: "index_users_on_invited_by"
    t.index ["jurisdiction_id"], name: "index_users_on_jurisdiction_id"
    t.index %w[provider uid],
            name: "index_users_on_provider_and_uid",
            unique: true
    t.index ["reset_password_token"],
            name: "index_users_on_reset_password_token",
            unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "allowlisted_jwts", "users", on_delete: :cascade
  add_foreign_key "contacts", "jurisdictions"
  add_foreign_key "jurisdiction_template_version_customizations",
                  "jurisdictions"
  add_foreign_key "jurisdiction_template_version_customizations",
                  "template_versions"
  add_foreign_key "jurisdictions",
                  "jurisdictions",
                  column: "regional_district_id"
  add_foreign_key "permit_applications", "jurisdictions"
  add_foreign_key "permit_applications",
                  "permit_classifications",
                  column: "activity_id"
  add_foreign_key "permit_applications",
                  "permit_classifications",
                  column: "permit_type_id"
  add_foreign_key "permit_applications", "users", column: "submitter_id"
  add_foreign_key "requirement_template_sections", "requirement_templates"
  add_foreign_key "requirement_templates",
                  "permit_classifications",
                  column: "activity_id"
  add_foreign_key "requirement_templates",
                  "permit_classifications",
                  column: "permit_type_id"
  add_foreign_key "requirements", "requirement_blocks"
  add_foreign_key "supporting_documents", "permit_applications"
  add_foreign_key "taggings", "tags"
  add_foreign_key "template_section_blocks", "requirement_blocks"
  add_foreign_key "template_section_blocks", "requirement_template_sections"
  add_foreign_key "template_versions", "requirement_templates"
  add_foreign_key "users", "jurisdictions"
end
