require "vcr"

VCR.configure do |config|
  config.cassette_library_dir = "spec/vcr_cassettes"
  config.hook_into :faraday
  config.configure_rspec_metadata!

  config.ignore_request { |request| request.uri.starts_with?(ENV["ELASTICSEARCH_URL"] || "http://localhost:9200") }
  config.filter_sensitive_data("<ENV_CONSIGNO_URL>") { ENV["CONSIGNO_URL"] }
end
