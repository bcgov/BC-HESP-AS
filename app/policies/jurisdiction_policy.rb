class JurisdictionPolicy < ApplicationPolicy
  def show?
    true
  end

  def locality_type_options?
    true
  end

  def index?
    show?
  end

  def create?
    user.super_admin?
  end

  def search_users?
    user.super_admin? || (user.review_manager? && user.jurisdiction == record)
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
