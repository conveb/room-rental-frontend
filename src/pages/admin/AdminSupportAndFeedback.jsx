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
    deleteFeedback, // Destructured from hook
  } = useSupportAndFeedback();

  const [activeTab, setActiveTab] = useState("support");
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

  if (loading) return <div className="p-12 text-center text-gray-500 animate-pulse">Loading data...</div>;
  if (error) return <div className="p-12 text-center text-red-500 font-bold">Failed to load console data.</div>;

  return (
    <>
      <Helmet><title>Admin Console | Support & Feedback</title></Helmet>

      <div className="p-0 md:p-6 space-y-6 bg-gray-50/50 min-h-screen">
        {/* TAB SWITCHER */}
        <div className="flex bg-white rounded-3xl p-1.5 gap-2 shadow-sm border max-w-md mx-auto md:mx-0">
          {["support", "feedback"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs md:text-sm font-bold transition rounded-2xl capitalize ${
                activeTab === tab ? "bg-black text-white shadow-md" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= SUPPORT TAB ================= */}
        {activeTab === "support" && (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h1 className="text-xl font-bold">Support Tickets</h1>
              <Dropdown
                value={statusFilter}
                options={STATUS_OPTIONS}
                onChange={(e) => setStatusFilter(e.value)}
                className="w-full md:w-56 rounded-xl"
              />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-4 text-left">User</th>
                    <th className="p-4 text-left">Issue</th>
                    <th className="p-4 text-left">Message</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSupports.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-gray-800">{s.user_details?.full_name || "Unknown"}</p>
                        <p className="text-[10px] text-gray-400">{s.user_details?.email}</p>
                      </td>
                      <td className="p-4 capitalize font-medium">{s.issue_type}</td>
                      <td className="p-4 text-gray-600 italic truncate max-w-[200px]">{s.message}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          s.status === "open" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <Button 
                          icon="pi pi-eye" 
                          className="p-button-rounded p-button-text p-button-sm"
                          onClick={() => {
                            setSelectedTicket(s);
                            setAdminResponse(s.admin_response || "");
                          }} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= FEEDBACK TAB ================= */}
        {activeTab === "feedback" && (
          <div className="animate-in fade-in duration-300">
            <h1 className="text-xl font-bold mb-6">User Feedbacks</h1>
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-4 text-left">User</th>
                    <th className="p-4 text-left">Comment</th>
                    <th className="p-4 text-left">Rating</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {feedbacks.map((f) => (
                    <tr key={f.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="p-4 font-bold text-gray-800">{f?.full_name || "Anonymous"}</td>
                      <td className="p-4 text-gray-600">{f.comment}</td>
                      <td className="p-4 text-amber-500 font-bold">★ {f.rating}</td>
                      <td className="p-4 text-gray-400 text-xs">{f.created_at?.split("T")[0]}</td>
                      <td className="p-4 text-center">
                        {/* DELETE BUTTON IMPLEMENTATION */}
                        <Button 
                          icon="pi pi-trash" 
                          className="p-button-rounded p-button-danger p-button-text p-button-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => deleteFeedback(f.id)}
                          loading={updating}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUPPORT RESPONSE MODAL */}
        <Dialog
          header="Ticket Management"
          visible={!!selectedTicket}
          onHide={() => setSelectedTicket(null)}
          className="w-[95vw] sm:w-[34rem]"
          draggable={false}
          breakpoints={{'960px': '75vw', '641px': '100vw'}}
        >
          {selectedTicket && (
            <div className="space-y-6 pt-4">
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">User Message</p>
                <p className="text-gray-700 leading-relaxed">{selectedTicket.message}</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Admin Resolution Note</label>
                <InputTextarea
                  rows={5}
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  className="w-full rounded-2xl border-gray-200 focus:border-black transition-all p-4 text-sm"
                  placeholder="Type the resolution or response here..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {selectedTicket.status === "open" ? (
                  <Button
                    label="Resolve Ticket"
                    className="flex-1 bg-black border-none py-3 rounded-xl font-bold"
                    loading={updating}
                    onClick={handleResolve}
                  />
                ) : (
                  <div className="flex-1 bg-green-50 text-green-700 text-center py-3 rounded-xl font-bold border border-green-100">
                    RESOLVED
                  </div>
                )}
                <Button
                  label="Close"
                  className="p-button-secondary p-button-text font-bold"
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