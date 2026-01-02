import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

export default function UserReportLandowner() {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Unresponsive landlord",
      date: "05 Jan 2026",
      status: "Pending",
    },
    {
      id: 2,
      title: "Property not as described",
      date: "20 Dec 2025",
      status: "Reviewed",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newReport, setNewReport] = useState({ title: "", description: "" });

  const handleAddReport = () => {
    if (!newReport.title || !newReport.description) return;
    const report = {
      id: Date.now(),
      title: newReport.title,
      description: newReport.description,
      date: new Date().toLocaleDateString(),
      status: "Pending",
    };
    setReports([report, ...reports]);
    setNewReport({ title: "", description: "" });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 space-y-6 mt-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Report Landowner</h1>
        <p className="text-xs md:text-sm">
          You can view your previous reports here or submit a new report using the "New Report" button.
        </p>
      </div>

      {/* New Report Button */}
      <div className="text-end">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-black text-xs md:text-sm text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          <FaPlusCircle /> New Report
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No reports submitted yet.</p>
        )}

        {reports.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3"
          >
            <div>
              <p className="font-medium text-gray-900">{r.title}</p>
              <p className="text-xs text-gray-500">{r.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  r.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {r.status}
              </span>
              <button className="text-black font-medium hover:underline text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Report Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-5">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-4 relative">
            <h2 className="text-xl font-semibold">New Report</h2>
            <input
              type="text"
              placeholder="Title"
              value={newReport.title}
              onChange={(e) =>
                setNewReport({ ...newReport, title: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-3 text-sm"
            />
            <textarea
              placeholder="Description"
              value={newReport.description}
              onChange={(e) =>
                setNewReport({ ...newReport, description: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-3 text-sm resize-none h-24"
            ></textarea>

            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl border hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReport}
                className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
