class Api::TemplateVersionsController < Api::ApplicationController
  before_action :set_template_version, except: :index

  before_action :set_jurisdiction_template_version_customization,
                only: %i[show_jurisdiction_template_version_cutomization]

  def index
    @template_versions =
      if params[:activity_id].present?
        policy_scope(TemplateVersion).where(activity: { id: params[:activity_id] }).order(updated_at: :desc)
      else
        policy_scope(TemplateVersion).order(updated_at: :desc)
      end

    render_success @template_versions, nil, { blueprint: TemplateVersionBlueprint, blueprint_opts: { view: :extended } }
  end

  def show
    authorize @template_version

    render_success @template_version, nil, { blueprint: TemplateVersionBlueprint, blueprint_opts: { view: :extended } }
  end

  def show_jurisdiction_template_version_cutomization
    authorize @template_version, :show?

    return head :not_found if @jurisdiction_template_version_customization.blank?

    authorize @jurisdiction_template_version_customization, policy_class: TemplateVersionPolicy

    render_success @jurisdiction_template_version_customization
  end

  def create_or_update_jurisdiction_template_version_cutomization
    authorize @template_version, :show?

    @jurisdiction_template_version_customization =
      @template_version.jurisdiction_template_version_customizations.find_or_initialize_by(
        jurisdiction_id: params[:jurisdiction_id],
      )

    authorize @jurisdiction_template_version_customization, policy_class: TemplateVersionPolicy

    # add a db lock in case multiple reviewers are updating this db row
    @jurisdiction_template_version_customization.with_lock do
      if @jurisdiction_template_version_customization.update(jurisdiction_template_version_customization_params)
        render_success @jurisdiction_template_version_customization,
                       "jurisdiction_template_version_customization.update_success",
                       { blueprint: JurisdictionTemplateVersionCustomizationBlueprint }
      else
        render_error "jurisdiction_template_version_customization.update_error",
                     message_opts: {
                       error_message: @jurisdiction_template_version_customization.errors.full_messages.join(", "),
                     }
      end
    end
  end

  def compare_requirements
    authorize @template_version
    before_json =
      TemplateVersion.find(
        compare_requirements_params[:previous_version_id],
      ).requirement_blocks_json if compare_requirements_params[:previous_version_id].present?

    render_success @template_version.compare_requirements(before_json), nil, { blueprint: CompareRequirementsBlueprint }
  end

  private

  def compare_requirements_params
    params.permit(:previous_version_id)
  end

  def set_template_version
    @template_version = TemplateVersion.find(params[:id])
  end

  def set_jurisdiction_template_version_customization
    @jurisdiction_template_version_customization =
      @template_version.jurisdiction_template_version_customizations.find_by(jurisdiction_id: params[:jurisdiction_id])
  end

  def jurisdiction_template_version_customization_params
    params.require(:jurisdiction_template_version_customization).permit(
      customizations: {
        requirement_block_changes: {
        },
      },
    )
  end
end
