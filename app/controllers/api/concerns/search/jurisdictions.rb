module Api::Concerns::Search::Jurisdictions
  extend ActiveSupport::Concern

  def perform_search
    search_params = {
      order: jurisdiction_order,
      match: :word_start,
      page: jurisdiction_search_params[:page],
      per_page:
        (
          if jurisdiction_search_params[:page]
            (jurisdiction_search_params[:per_page] || Kaminari.config.default_per_page)
          else
            nil
          end
        ),
    }

    # Conditionally add the `where` clause
    unless jurisdiction_search_params[:submission_inbox_set_up].nil?
      search_params[:where] = { submission_inbox_set_up: jurisdiction_search_params[:submission_inbox_set_up] }
    end
    @search = Jurisdiction.search(jurisdiction_query, **search_params, includes: Jurisdiction::BASE_INCLUDES)
  end

  private

  def jurisdiction_search_params
    params.permit(:query, :page, :per_page, :submission_inbox_set_up, sort: %i[field direction])
  end

  def jurisdiction_query
    jurisdiction_search_params[:query].present? ? jurisdiction_search_params[:query] : "*"
  end

  def jurisdiction_order
    if (sort = jurisdiction_search_params[:sort])
      { sort[:field] => { order: sort[:direction], unmapped_type: "long" } }
    else
      { name: { order: :asc, unmapped_type: "long" } }
    end
  end
end
