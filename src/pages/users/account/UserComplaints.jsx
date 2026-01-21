import { useState } from "react";
import { FaArrowLeft, FaPlusCircle, FaSpinner, FaTimes, FaRegCommentDots, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useComplaints } from "../../../hooks/users/useComplaints";

export default function UserComplaints() {
  const navigate = useNavigate();
  const { complaints, loading, addComplaint, fetchComplaintDetails } = useComplaints();

  // State Management
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [detailLoadingId, setDetailLoadingId] = useState(null); // Track which item is loading
  const [submitting, setSubmitting] = useState(false);
  const [newComplaint, setNewComplaint] = useState({ title: "", description: "" });

  // Handle viewing details using the specific ID
  const handleViewDetails = async (id) => {
    setDetailLoadingId(id);
    const data = await fetchComplaintDetails(id);
    if (data) {
      setSelectedComplaint(data);
    }
    setDetailLoadingId(null);
  };

  const handleAddComplaint = async () => {
    if (!newComplaint.title.trim() || !newComplaint.description.trim()) return;
    setSubmitting(true);
    
    // Exact request structure from your requirements
    const result = await addComplaint({
      subject: newComplaint.title,
      message: newComplaint.description,
      is_active: true,
    });

    if (result.success) {
      setNewComplaint({ title: "", description: "" });
      setShowCreateModal(false);
    }
    setSubmitting(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  return (
    <div className="min-w-6xl mx-auto min-h-screen bg-gray-50 py-10 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-neutral-200 transition bg-white shadow-sm border border-gray-100">
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Complaints</h1>
            <p className="text-xs md:text-sm text-gray-500">Track the status of your reported issues.</p>
          </div>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition shadow-lg w-full md:w-auto">
          <FaPlusCircle /> New Complaint
        </button>
      </div>

      <hr className="border-gray-200" />

      {/* Complaint List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 text-gray-400">
            <FaSpinner className="animate-spin text-3xl mb-2" />
            <p>Fetching complaints...</p>
          </div>
        ) : complaints.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-dashed border-gray-300 text-gray-500">
            No complaints found.
          </div>
        ) : (
          complaints.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 hover:shadow-md transition">
              <div className="space-y-1">
                <p className="font-semibold text-gray-900 text-lg">{c.subject}</p>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Submitted: {formatDate(c.created_at)}
                </p>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-6">
                <span className={`px-4 py-1.5 text-xs font-bold rounded-full capitalize ${c.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {c.status}
                </span>
                <button 
                  onClick={() => handleViewDetails(c.id)}
                  className="text-black font-bold hover:underline text-sm flex items-center gap-2"
                >
                  {detailLoadingId === c.id ? <FaSpinner className="animate-spin" /> : "View Details"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- MODAL: CREATE COMPLAINT --- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-5">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 space-y-6 shadow-2xl">
            <h2 className="text-2xl font-bold">New Complaint</h2>
            <div className="space-y-4">
              <input 
                type="text" placeholder="Subject" 
                className="w-full border-gray-200 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                value={newComplaint.title} 
                onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value})}
              />
              <textarea 
                placeholder="Message" 
                className="w-full border-gray-200 border rounded-xl px-4 py-3 h-32 outline-none focus:ring-2 focus:ring-black"
                value={newComplaint.description}
                onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowCreateModal(false)} className="px-6 py-2 text-gray-500 font-semibold">Cancel</button>
              <button onClick={handleAddComplaint} disabled={submitting} className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-2">
                {submitting ? <FaSpinner className="animate-spin" /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: VIEW DETAILS (Uses Live Response Structure) --- */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-5">
          <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl">
            <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-b">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {selectedComplaint.id.slice(0,8)}</span>
                <h2 className="text-xl font-bold text-gray-900 mt-1">{selectedComplaint.subject}</h2>
              </div>
              <button onClick={() => setSelectedComplaint(null)} className="text-gray-400 hover:text-black transition">
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Live Data: message and created_at */}
              <div>
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-2 uppercase">
                  <FaCalendarAlt /> Submitted {formatDate(selectedComplaint.created_at)}
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 text-gray-700 border border-gray-100">
                  {selectedComplaint.message}
                </div>
              </div>

              {/* Live Data: admin_reply */}
              <div className="pt-4 border-t border-dashed">
                <div className="flex items-center gap-2 text-gray-900 font-bold mb-2">
                  <FaRegCommentDots className="text-black" />
                  Admin Reply
                </div>
                {selectedComplaint.admin_reply ? (
                  <div className="bg-green-50 rounded-2xl p-4 text-green-900 border border-green-100">
                    {selectedComplaint.admin_reply}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 italic p-2">
                    No response from admin
                  </div>
                )}
              </div>
            </div>

            <div className="px-8 py-4 bg-gray-50 flex justify-between items-center">
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${selectedComplaint.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                Status: {selectedComplaint.status}
              </span>
              <button onClick={() => setSelectedComplaint(null)} className="bg-black text-white px-6 py-2 rounded-xl text-sm font-bold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}