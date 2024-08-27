class Api::ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  include BaseControllerMethods
  include Pundit::Authorization

  protect_from_forgery with: :exception

  before_action :log_csrf_token
  before_action :authenticate_user!
  before_action :check_for_archived_user
  before_action :store_currents
  before_action :require_confirmation

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  after_action :verify_authorized, except: %i[index], unless: :skip_pundit?
  after_action :verify_policy_scoped, only: %i[index], unless: :skip_pundit?
  after_action :set_csrf_cookie

  def index
    # This parent application controller throws errors from above after_actions
    # if the subclass does not implement this method. This is provided as a fallback.
    raise NotImplementedError, "The index method is not implemented."
  end

  private

  def set_csrf_cookie
    cookies["CSRF-TOKEN"] = {
      value: form_authenticity_token,
      secure: Rails.env.production?,
      httponly: false, # Allow frontend to read the cookie
      same_site: :lax,
    }
  end

  def log_csrf_token
    Rails.logger.debug "Session CSRF Token: #{session[:_csrf_token]}"
    Rails.logger.debug "Request CSRF Token: #{request.headers["X-CSRF-Token"]}"
  end

  protected

  def check_for_archived_user
    render_error("misc.user_not_authorized_error", {}, nil) and return if current_user&.discarded?
  end

  def apply_search_authorization(results, policy_action = action_name)
    results.select { |result| policy(result).send("#{policy_action}?".to_sym) }
  end

  def skip_pundit?
    devise_controller?
  end

  def user_not_authorized(exception)
    render_error(
      "misc.user_not_authorized_error",
      { message_opts: { error_message: exception.message }, status: 403 },
      exception,
    ) and return
  end

  def require_confirmation
    redirect_to root_path if current_user && !current_user.confirmed?
  end
end
