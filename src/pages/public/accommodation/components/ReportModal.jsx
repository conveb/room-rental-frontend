import React from "react";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const ReportModal = ({
  reportType,
  property,
  propertyId,
  mainImage,
  newReport,
  setNewReport,
  serverError,
  reportLoading,
  onSubmit,
  onClose,
}) => {
  if (!reportType) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-5 text-left">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
        <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900">
          <MdOutlineReportGmailerrorred size={25} />
          Report this {reportType === "property" ? "Property" : "Landowner"}
        </h2>

        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <span className="font-bold">!</span> {serverError}
          </div>
        )}

        <div className="flex items-center gap-4 bg-stone-50 p-2 rounded-2xl border border-stone-300">
          <img src={mainImage} alt="cover-image" className="w-16 h-16 rounded-xl object-cover" />
          <div>
            <p className="text-xs md:text-md text-gray-700">{property.title}</p>
            <p className="text-xs md:text-sm text-gray-700">
              {property.property_type.replace("_", " ")} in {property.city}
            </p>
            <p className="font-mono text-xs md:text-sm text-stone-400">{propertyId}</p>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 ml-1">Reason</label>
          <textarea
            disabled={reportLoading || !!serverError}
            value={newReport.description}
            onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm h-36 outline-none transition-all disabled:opacity-50"
            placeholder="Describe your issue..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-gray-200"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={reportLoading || !newReport.description.trim() || !!serverError}
            onClick={() => onSubmit(reportType)}
            className="px-6 py-2.5 rounded-xl bg-black text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {reportLoading ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;