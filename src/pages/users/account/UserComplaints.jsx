import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
export default function UserComplaints() {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Noisy neighbors",
      date: "01 Jan 2026",
      status: "Pending",
    },
    {
      id: 2,
      title: "Leaky faucet",
      date: "10 Dec 2025",
      status: "Resolved",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newComplaint, setNewComplaint] = useState({ title: "", description: "" });

  const handleAddComplaint = () => {
    if (!newComplaint.title || !newComplaint.description) return;
    const complaint = {
      id: Date.now(),
      title: newComplaint.title,
      description: newComplaint.description,
      date: new Date().toLocaleDateString(),
      status: "Pending",
    };
    setComplaints([complaint, ...complaints]);
    setNewComplaint({ title: "", description: "" });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 space-y-6 mt-20">
        <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Complaints</h1>
        <p className="text-xs md:text-sm">You can view your registered complaints here also can register new complaints using the provided "New Complaint" button.</p>
        </div>

        <div className="text-end">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-black text-xs md:text-sm text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
          >
              <FaPlusCircle/>
          New Complaint
        </button>
            </div>

      {/* Complaint List */}
      <div className="space-y-4">
        {complaints.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No complaints submitted yet.</p>
        )}

        {complaints.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3"
          >
            <div>
              <p className="font-medium text-gray-900">{c.title}</p>
              <p className="text-xs text-gray-500">{c.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  c.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {c.status}
              </span>
              <button className="text-black font-medium hover:underline text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Complaint Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-5">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-4 relative">
            <h2 className="text-xl font-semibold">Create Complaint</h2>
            <input
              type="text"
              placeholder="Title"
              value={newComplaint.title}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, title: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-3 text-sm"
            />
            <textarea
              placeholder="Description"
              value={newComplaint.description}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, description: e.target.value })
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
                onClick={handleAddComplaint}
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
