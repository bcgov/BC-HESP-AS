class SupportingDocument < ApplicationRecord
  belongs_to :permit_application
  include FileUploader.Attachment(:file)

  validate :unique_data_key

  scope :file_ids_with_regex, ->(regex_pattern) { where("file_data ->> 'id' ~ ?", regex_pattern) }
  scope :without_compliance, -> { where("compliance_data = '{}' OR compliance_data IS NULL") }

  APPLICATION_PDF_DATA_KEY = :permit_application_pdf
  CHECKLIST_PDF_DATA_KEY = :step_code_checklist_pdf

  def last_signer
    if compliance_data["result"] &&
         signer = compliance_data["result"].sort_by { |signer| signer.dig("signatureTimestamp", "date") }&.last
      parse_signature(signer)
    else
      { name: nil, date: nil }
    end
  end

  def compliance_message_view
    if compliance_data["result"]
      signers =
        compliance_data["result"]
          .map { |signer| parse_signature(signer) }
          .group_by { |signer| signer[:subjectName] }
          .map { |subjectName, signaturesArray| signaturesArray.sort_by { |signer| signer[:date] }&.last }
          .sort_by { |signer| signer[:date] }
          .reverse
          .map { |signer| summarizeString(signer) }

      { "id" => file_id, "data_key" => data_key, "message" => "Signers validated: #{signers.join(",")}" }
    else
      { "id" => file_id, "data_key" => data_key, "message" => compliance_data["error"], "error" => true }
    end
  end

  def parse_signature(signer)
    {
      name: signer.dig("signerStatus", "certificateInfo", "commonName") || signer["signatureFieldName"],
      subjectName: signer.dig("signerStatus", "certificateInfo", "subjectName"),
      subject:
        signer
          .dig("signerStatus", "certificateInfo", "subjectName")
          &.split(",")
          &.filter { |i| i.starts_with?("OU=") }
          &.map { |i| i[3..-1] }
          &.join(","),
      date:
        Time
          .parse(signer.dig("signatureTimestamp", "date"))
          .in_time_zone(Rails.application.config.time_zone)
          .strftime("%Y-%m-%d %H:%M:%S %Z"),
    }
  end

  def standardized_filename
    "#{permit_application.number}_#{data_key.split("|").last.gsub("_file", "")}.#{file_data["id"].split(".").last}"
  end

  def summarizeString(parsed_signature)
    "#{parsed_signature[:name]} (#{parsed_signature[:subject]}) signed at #{parsed_signature[:date]}"
  end

  def file_id
    file_data.dig("id")
  end

  def file_size
    file_data.dig("metadata", "size")
  end

  def file_name
    file_data.dig("metadata", "filename")
  end

  def file_type
    file_data.dig("metadata", "mime_type")
  end

  def file_url
    file&.url(
      public: false,
      expires_in: 3600,
      response_content_disposition: "attachment; filename=\"#{file.original_filename}\"",
    )
  end

  UNIQUE_DATA_KEYS = %i[permit_application_pdf step_code_checklist_pdf]

  def unique_data_key
    return unless UNIQUE_DATA_KEYS.include?(data_key)
    return if !permit_application.supporting_documents.not(self).find_by(data_key: data_key)
    self.errors.add(:data_key, i18n.t("errors.models.supporting_documents.attributes.data_key.duplicate"))
  end
end
