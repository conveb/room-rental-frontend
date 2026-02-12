import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useSupportAndFeedback } from "../../hooks/admin/useSupportAndFeedback";
import Title from "../../components/Title";

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
    deleteFeedback,
  } = useSupportAndFeedback();

  const [activeTab, setActiveTab] = useState("support");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
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

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "AN";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to get random pastel color based on name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-red-100 text-red-700',
      'bg-blue-100 text-blue-700',
      'bg-green-100 text-green-700',
      'bg-yellow-100 text-yellow-700',
      'bg-purple-100 text-purple-700',
      'bg-pink-100 text-pink-700',
      'bg-indigo-100 text-indigo-700',
      'bg-orange-100 text-orange-700',
      'bg-teal-100 text-teal-700',
      'bg-cyan-100 text-cyan-700'
    ];
    const index = name ? name.length % colors.length : 0;
    return colors[index];
  };

  if (loading) return <div className="p-12 text-center text-gray-500 animate-pulse">Loading data...</div>;
  if (error) return <div className="p-12 text-center text-red-500 font-bold">Failed to load console data.</div>;

  return (
    <>
      <Title><title>Admin Console | Support & Feedback</title></Title>

      <div className="p-0 md:p-2 space-y-6 bg-gray-50/50 min-h-screen">
        {/* TAB SWITCHER */}
        <div className="flex bg-white rounded-3xl p-2 gap-2">
          {["support", "feedback"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-2xl text-sm md:text-md ${
                activeTab === tab ? "bg-black text-white" : "bg-gray-100"
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
            
            {/* Feedback Grid - Card View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {feedbacks.map((f) => (
                <div
                  key={f.id}
                  onClick={() => setSelectedFeedback(f)}
                  className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-all cursor-pointer group"
                >
                  {/* Card Header - User Info */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Avatar with Initials */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${getAvatarColor(f?.full_name)}`}>
                      {getInitials(f?.full_name)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">
                        {f?.full_name || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {f?.email || "No email provided"}
                      </p>
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                      <span className="text-amber-500 text-sm">★</span>
                      <span className="font-bold text-sm text-amber-700">{f.rating}</span>
                    </div>
                  </div>

                  {/* Feedback Preview */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {f.comment || "No comment provided"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {f.created_at?.split("T")[0]}
                    </p>
                  </div>

                  {/* Hover Indicator */}
                  <div className="mt-3 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <span>Click to view details</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {feedbacks.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center text-gray-400">
                No feedbacks found
              </div>
            )}
          </div>
        )}

        {/* FEEDBACK DETAILS MODAL */}
        <Dialog
          header="Feedback Details"
          visible={!!selectedFeedback}
          onHide={() => setSelectedFeedback(null)}
          className="w-[95vw] sm:w-[40rem]"
          draggable={false}
          breakpoints={{'960px': '75vw', '641px': '100vw'}}
        >
          {selectedFeedback && (
            <div className="space-y-6 pt-4">
              {/* User Information Card */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                <div className="flex items-start gap-4">
                  {/* Large Avatar */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl ${getAvatarColor(selectedFeedback?.full_name)}`}>
                    {getInitials(selectedFeedback?.full_name)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">
                      {selectedFeedback?.full_name || "Anonymous"}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedFeedback?.email || "No email provided"}
                    </p>
                    
                    {/* Rating Display */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-xl ${
                              star <= selectedFeedback.rating 
                                ? 'text-amber-400' 
                                : 'text-gray-200'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-gray-700">
                        ({selectedFeedback.rating}/5)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Message */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                  Feedback Message
                </label>
                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedFeedback.comment || "No comment provided"}
                  </p>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Submitted On</p>
                  <p className="font-medium text-gray-800">
                    {new Date(selectedFeedback.created_at).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(selectedFeedback.created_at).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Feedback ID</p>
                  <p className="font-mono text-sm text-gray-800 break-all">
                    {selectedFeedback.id}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                  label="Delete Feedback"
                  icon="pi pi-trash"
                  className="p-button-danger p-button-text font-bold"
                  onClick={() => {
                    deleteFeedback(selectedFeedback.id);
                    setSelectedFeedback(null);
                  }}
                  loading={updating}
                />
                <Button
                  label="Close"
                  className="p-button-secondary p-button-text font-bold"
                  onClick={() => setSelectedFeedback(null)}
                />
              </div>
            </div>
          )}
        </Dialog>

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