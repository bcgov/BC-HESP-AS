module Constants
  # For use with render_error base controller method
  # Used for the purpose of logging / debugging (not user facing)
  module Error
    def self.e(code, message)
      { code: code, message: message }
    end

    USER_NOT_AUTHORIZED_ERROR = e("user_not_authorized", "User is not authorized to do this action.")
    USER_REGISTRATION_ERROR = e("user_registration_error", "Error registering user")
    USER_CREATE_INVITE_ERROR = e("user_create_invite_error", "Error creating invitation")
    USER_ACCEPT_INVITE_ERROR = e("user_accept_invite_error", "Error accepting invitation")
    USER_REMOVE_INVITE_ERROR = e("user_remove_invite_error", "Error canceling invitation")
    USER_RESEND_INVITE_ERROR = e("user_resend_invite_error", "Error re-sending invitation")
    USER_LOGIN_ERROR = e("invalid_login_error", "Invalid username or password")
    USER_UPDATE_ERROR = e("user_update_error", "Could not update user")
    USER_DESTROY_ERROR = e("user_destroy_error", "Could not discard user")
    USER_RESTORE_ERROR = e("user_restore_error", "Could not restore user")
    REQUIREMENT_BLOCK_CREATE_ERROR = e("requirement_block_create_error", "Error creating requirement block")
    JURISDICTION_CREATE_ERROR = e("jurisdiction_create_error", "Error creating jurisdiction")
    REQUIREMENT_BLOCK_UPDATE_ERROR = e("requirement_block_update_error", "Error updating requirement block")
    REQUIREMENT_BLOCK_DELETE_ERROR = e("requirement_block_delete_error", "Error deleting requirement block")
    REQUIREMENT_TEMPLATE_CREATE_ERROR = e("requirement_block_create_error", "Error creating requirement template")
    INVALID_TOKEN_ERROR = e("invalid_token_error", "The access token is invalid")
    NOT_FOUND_ERROR = e("not_found_error", "404 - The requested resource could not be found")
  end
end
