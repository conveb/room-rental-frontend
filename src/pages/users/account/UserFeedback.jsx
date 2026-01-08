import { useState } from "react";
import { useFeedback } from "../../../hooks/users/useFeedback";

export default function UserFeedback() {
  const { feedbacks, loading, addFeedback } = useFeedback();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    await addFeedback({
      comment,
      rating,
    });

    setComment("");
    setRating(5);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-10 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold">Feedback</h1>

      {/* Add Feedback */}
      <div className="bg-white rounded-2xl shadow p-4 space-y-3">
        <input
          type="text"
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border"
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 && "s"}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-5 py-3 rounded-xl"
        >
          Submit
        </button>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {loading && <p>Loading...</p>}

        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-white rounded-2xl shadow p-4"
          >
            <p className="font-medium">{fb.comment}</p>
            <p className="text-sm text-gray-500">
              Rating: {fb.rating} ⭐
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
