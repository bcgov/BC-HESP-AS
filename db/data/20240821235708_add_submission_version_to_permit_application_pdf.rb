# frozen_string_literal: true

class AddSubmissionVersionToPermitApplicationPdf < ActiveRecord::Migration[7.1]
  def up
    pdf_documents =
      SupportingDocument.where(data_key: SupportingDocument::APPLICATION_PDF_DATA_KEY, submission_version_id: nil)

    pdf_documents.each do |pdf_document|
      latest_submission_version = pdf_document.permit_application&.latest_submission_version
      pdf_document.update(submission_version_id: latest_submission_version.id) if latest_submission_version.present?
    end
  end

  def down
    pdf_documents =
      SupportingDocument
        .where(data_key: SupportingDocument::APPLICATION_PDF_DATA_KEY)
        .where.not(submission_version_id: nil)

    pdf_documents.update_all(submission_version_id: nil)
  end
end
