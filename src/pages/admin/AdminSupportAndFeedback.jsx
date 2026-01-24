import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Helmet } from "react-helmet";
import { useSupportAndFeedback } from "../../hooks/admin/useSupportAndFeedback";

const STATUS_OPTIONS = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "open" },
  { label: "Resolved", value: "resolved" },
];

export default function AdminSupportAndFeedback() {
  const {
    supports,
    feedbacks,
    loading,
    error,
    updating,
    updateSupportStatus,
  } = useSupportAndFeedback();

  const [activeTab, setActiveTab] = useState("support");

  /* -------- SUPPORT STATES -------- */
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");

  const filteredSupports = supports.filter(
    (s) => statusFilter === "ALL" || s.status === statusFilter
  );

  const handleResolve = async () => {
    if (!selectedTicket) return;

    await updateSupportStatus(selectedTicket.id, adminResponse);
    setSelectedTicket(null);
    setAdminResponse("");
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load data
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Console | Support & Feedback</title>
      </Helmet>

      <div className="p-0 md:p-6 space-y-6">
        {/* TABS */}
        <div className="flex bg-white rounded-3xl overflow-hidden w-full p-2 gap-2 shadow">
          <button
            onClick={() => setActiveTab("support")}
            className={`flex-1 py-3 md:py-4 text-xs md:text-sm font-medium transition rounded-2xl shadow ${
              activeTab === "support"
                ? "bg-black text-white"
                : "bg-white text-gray-500 hover:bg-gray-200"
            }`}
          >
            Support
          </button>

          <button
            onClick={() => setActiveTab("feedback")}
            className={`flex-1 py-3 md:py-4 text-xs md:text-sm font-medium transition rounded-2xl shadow ${
              activeTab === "feedback"
                ? "bg-black text-white"
                : "bg-white text-gray-500 hover:bg-gray-200"
            }`}
          >
            Feedback
          </button>
        </div>

        {/* ================= SUPPORT TAB ================= */}
        {activeTab === "support" && (
          <>
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-xl font-semibold">
                Support Tickets
              </h1>

              <Dropdown
                value={statusFilter}
                options={STATUS_OPTIONS}
                onChange={(e) => setStatusFilter(e.value)}
                className="w-full md:w-56"
              />
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Issue</th>
                    <th className="p-3 text-left">Message</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSupports.map((s) => (
                    <tr key={s.id} className="border-t">
                      <td className="p-3">
                        <p className="font-medium">
                          {s.user_details?.full_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {s.user_details?.email}
                        </p>
                      </td>

                      <td className="p-3 capitalize">
                        {s.issue_type}
                      </td>

                      <td className="p-3 truncate max-w-xs">
                        {s.message}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            s.status === "open"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => {
                            setSelectedTicket(s);
                            setAdminResponse(s.admin_response || "");
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ================= FEEDBACK TAB ================= */}
        {activeTab === "feedback" && (
          <>
            <h1 className="text-xl font-semibold">
              Feedbacks
            </h1>

            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Message</th>
                    <th className="p-3 text-left">Ratings</th>
                    <th className="p-3 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {feedbacks.map((f) => (
                    <tr key={f.id} className="border-t">
                      <td className="p-3">
                        <p className="font-medium">
                          {f?.full_name}
                        </p>
                        
                      </td>

                      <td className="p-3">
                        {f.comment}
                      </td>

                      <td className="p-3 truncate max-w-xs">
                        {f.rating}
                      </td>

                      <td className="p-3">
                       {f.created_at.split("T")[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ================= SUPPORT MODAL ================= */}
        <Dialog
          header="Support Details"
          visible={!!selectedTicket}
          onHide={() => setSelectedTicket(null)}
          className="w-[95vw] sm:w-[34rem]"
        >
          {selectedTicket && (
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">User</p>
                <p className="font-medium">
                  {selectedTicket.user_details?.full_name}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Message</p>
                <p>{selectedTicket.message}</p>
              </div>

              <div>
                <p className="text-gray-500">Admin Response</p>
                <InputTextarea
                  rows={4}
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="flex gap-3 pt-3">
                {selectedTicket.status === "open" && (
                  <Button
                    label="Resolve"
                    severity="success"
                    loading={updating}
                    onClick={handleResolve}
                  />
                )}
                <Button
                  label="Close"
                  severity="secondary"
                  onClick={() => setSelectedTicket(null)}
                />
              </div>
            </div>
          )}
        </Dialog>
      </div>
    </>
  );
}
