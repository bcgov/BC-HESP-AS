class GeocoderPolicy < ApplicationPolicy
  def jurisdiction?
    true
  end

  def site_options?
    true
  end

  def pid?
    site_options?
  end
end
