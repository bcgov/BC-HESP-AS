# spec/controllers/external_api/application_controller_spec.rb

require "rails_helper"

class MockExternalApiController < ExternalApi::ApplicationController
  def protected_action
    render json: { message: "mock protected action" }, status: 200
  end

  def protected_action_with_authorization_pass
    authorize :mock_external_api_key
    render json: { message: "mock protected action with authorisation" }, status: 200
  end

  def protected_action_with_authorization_fail
    authorize :mock_external_api_key
    render json: { message: "mock protected action with authorisation" }, status: 200
  end
end

class MockExternalApiKeyPolicy < ExternalApi::ApplicationPolicy
  def protected_action_with_authorization_pass?
    external_api_key.present?
  end

  def protected_action_with_authorization_fail?
    false
  end
end

RSpec.describe MockExternalApiController, type: :controller do
  before(:each) { @controller = MockExternalApiController.new }

  describe "authentication" do
    it "returns 401 unauthorized without token" do
      get :protected_action
      expect(response).to have_http_status(401)
    end

    it "returns 401 unauthorized with invalid token" do
      request.headers["Authorization"] = "Bearer invalid_token"
      get :protected_action
      expect(response).to have_http_status(401)
    end

    it "returns 200 OK with valid token" do
      external_api_key = create(:external_api_key)
      request.headers["Authorization"] = "Bearer #{external_api_key.token}"
      get :protected_action
      expect(response).to have_http_status(200)
    end
  end

  describe "authorization" do
    it "returns 403 forbidden for unauthorized action" do
      external_api_key = create(:external_api_key)
      request.headers["Authorization"] = "Bearer #{external_api_key.token}"
      get :protected_action_with_authorization_fail
      expect(response).to have_http_status(403)
    end

    it "returns 200 OK for authorized action" do
      authorized_external_api_key = create(:external_api_key)
      request.headers["Authorization"] = "Bearer #{authorized_external_api_key.token}"
      get :protected_action_with_authorization_pass
      expect(response).to have_http_status(200)
    end
  end
end
