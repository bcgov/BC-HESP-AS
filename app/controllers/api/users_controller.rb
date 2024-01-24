class Api::UsersController < Api::ApplicationController
  before_action :find_user, only: %i[destroy restore]

  def index
    perform_search

    render_success @search.results,
                   nil,
                   {
                     meta: {
                       total_pages: @search.total_pages,
                       total_count: @search.total_count,
                       current_page: @search.current_page,
                     },
                     blueprint: UserBlueprint,
                   }
  end

  def update
    # Currently a user can only update themself
    @user = current_user
    authorize @user

    ActiveRecord::Base.transaction do
      if password_params[:password].present?
        raise ActiveRecord::RecordInvalid unless @user.update_with_password(password_params)
      end

      raise ActiveRecord::RecordInvalid unless @user.update(user_params)
    end

    render_success(@user, "user.update_success")
  rescue ActiveRecord::RecordInvalid
    # Handle any ActiveRecord exceptions here
    if password_params[:password].present? && !@user.valid_password?(password_params[:current_password])
      render_error Constants::Error::USER_UPDATE_ERROR, "user.update_password_error", {} and return
    end
    render_error Constants::Error::USER_UPDATE_ERROR, "user.update_error", {}
  end

  def destroy
    authorize @user
    if @user.discard
      render_success(@user, "user.destroy_success")
    else
      render_error Constants::Error::USER_DESTROY_ERROR, "user.destroy_error", {}
    end
  end

  def restore
    authorize @user
    if @user.update(discarded_at: nil)
      render_success(@user, "user.restore_success")
    else
      render_error Constants::Error::USER_RESTORE_ERROR, "user.restore_error", {}
    end
  end

  private

  def password_params
    params.require(:user).permit(:current_password, :password)
  end

  def find_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :organization, :certified)
  end
end
