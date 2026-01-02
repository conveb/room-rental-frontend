import { useState } from "react";

export default function UserFeedback() {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, text: "Great experience, very clean rooms!" },
    { id: 2, text: "Easy booking process, loved it!" },
  ]);
  const [newFeedback, setNewFeedback] = useState("");

  const handleAddFeedback = () => {
    if (newFeedback.trim() === "") return;

    const newEntry = {
      id: Date.now(),
      text: newFeedback.trim(),
    };
    setFeedbacks([newEntry, ...feedbacks]);
    setNewFeedback("");
  };

  const handleDelete = (id) => {
    setFeedbacks(feedbacks.filter((f) => f.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-10 space-y-6 ">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Feedback</h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          Share your experience or view previous feedback.
        </p>
      </div>

      {/* Add Feedback */}
      <div className="bg-white rounded-2xl shadow p-4 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Write your feedback..."
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleAddFeedback}
          className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedbacks.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            No feedback yet.
          </p>
        )}

        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-white rounded-2xl shadow p-4 flex justify-between items-start gap-4"
          >
            <p className="text-gray-900">{fb.text}</p>
            <button
              onClick={() => handleDelete(fb.id)}
              className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
