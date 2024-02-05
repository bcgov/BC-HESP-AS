class Api::JurisdictionsController < Api::ApplicationController
  include Api::Concerns::Search::Jurisdictions
  include Api::Concerns::Search::JurisdictionUsers

  before_action :set_jurisdiction, only: %i[show update search_users]
  skip_after_action :verify_policy_scoped, only: %i[index search_users]

  def index
    perform_search
    authorized_results = apply_search_authorization(@search.results)
    render_success authorized_results,
                   nil,
                   {
                     meta: {
                       total_pages: @search.total_pages,
                       total_count: @search.total_count,
                       current_page: @search.current_page,
                     },
                     blueprint: JurisdictionBlueprint,
                   }
  end

  def update
    authorize @jurisdiction

    # Get current contact ids from the params
    payload_contact_ids = jurisdiction_params[:contacts_attributes].map { |c| c[:id] }
    # Mark contacts not included in the current payload for destruction
    @jurisdiction.contacts.each do |contact|
      contact.mark_for_destruction unless payload_contact_ids.include?(contact.id.to_s)
    end
    if @jurisdiction.update(jurisdiction_params)
      render_success @jurisdiction, "jurisdiction.update_success", { blueprint: JurisdictionBlueprint }
    else
      render_error "jurisdiction.update_error",
                   message_opts: {
                     error_message: @jurisdiction.errors.full_messages.join(", "),
                   }
    end
  end

  # GET /api/jurisdictions/:id
  def show
    authorize @jurisdiction
    render_success(@jurisdiction)
  end

  # POST /api/jurisdiction
  def create
    @jurisdiction = Jurisdiction.build(jurisdiction_params)
    authorize @jurisdiction

    if @jurisdiction.save
      render_success @jurisdiction, "jurisdiction.create_success", { blueprint: JurisdictionBlueprint }
    else
      render_error "jurisdiction.create_error",
                   message_opts: {
                     error_message: @jurisdiction.errors.full_messages.join(", "),
                   }
    end
  end

  def locality_type_options
    authorize :jurisdiction, :locality_type_options?
    options =
      Jurisdiction.locality_types.sort.map { |lt| { label: Jurisdiction.custom_titleize_locality_type(lt), value: lt } }
    render_success options, nil, { blueprint: OptionBlueprint }
  end

  # POST /api/jurisdictions/:id/users
  def search_users
    authorize @jurisdiction
    perform_user_search
    authorized_results = apply_search_authorization(@user_search.results, "index")
    render_success authorized_results,
                   nil,
                   {
                     meta: {
                       total_pages: @user_search.total_pages,
                       total_count: @user_search.total_count,
                       current_page: @user_search.current_page,
                     },
                     blueprint: UserBlueprint,
                   }
  end

  private

  def jurisdiction_params
    params.require(:jurisdiction).permit(
      :name,
      :locality_type,
      :description_html,
      :checklist_html,
      :look_out_html,
      :contact_summary_html,
      map_position: [],
      users_attributes: %i[first_name last_name role email],
      contacts_attributes: %i[id name department title phone_number email],
    )
  end

  def set_jurisdiction
    @jurisdiction = Jurisdiction.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render_error("misc.not_found_error", status: :not_found)
  end
end
