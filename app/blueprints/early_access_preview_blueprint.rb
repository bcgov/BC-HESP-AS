class EarlyAccessPreviewBlueprint < Blueprinter::Base
  identifier :id
  fields :created_at, :expires_at

  association :previewer, blueprint: UserBlueprint, view: :minimal
end
