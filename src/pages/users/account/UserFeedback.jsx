import { useState } from "react";
import { useFeedback } from "../../../hooks/users/useFeedback";

const StarRating = ({ rating, setRating, hoveredStar, setHoveredStar }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hoveredStar || rating);
        return (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            className="transition-all duration-150 focus:outline-none"
            style={{ transform: filled ? "scale(1.2)" : "scale(1)" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill={filled ? "#000" : "none"}
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transition: "fill 0.15s, transform 0.15s",
                filter: filled ? "drop-shadow(0 2px 4px rgba(0,0,0,0.18))" : "none",
              }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];
const ratingColors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e", "#000"];

const FeedbackCard = ({ fb, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300"
      style={{
        animationDelay: `${index * 60}ms`,
        animation: "fadeSlideUp 0.4s ease both",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Stars */}
          <div className="flex gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={s <= fb.rating ? "#000" : "#e5e7eb"}
                stroke="none"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
            <span className="ml-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              {ratingLabels[fb.rating]}
            </span>
          </div>

          <p
            className={`text-sm text-gray-700 leading-relaxed ${!expanded && fb.comment?.length > 120 ? "line-clamp-2" : ""}`}
          >
            {fb.comment}
          </p>

          {fb.comment?.length > 120 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-semibold text-gray-400 hover:text-black mt-1 transition-colors"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Rating badge */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
          style={{
            background: `${ratingColors[fb.rating]}15`,
            color: ratingColors[fb.rating],
            border: `1.5px solid ${ratingColors[fb.rating]}30`,
          }}
        >
          {fb.rating}.0
        </div>
      </div>

      {fb.created_at && (
        <p className="text-[11px] text-gray-300 mt-3">
          {new Date(fb.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}
    </div>
  );
};

export default function UserFeedback() {
  const { feedbacks, loading, addFeedback } = useFeedback();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim() || rating === 0) return;
    setSubmitting(true);
    await addFeedback({ comment, rating });
    setComment("");
    setRating(0);
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  const avgRating =
    feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : null;

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .submit-success {
          animation: pop 0.4s ease both;
        }
        textarea:focus {
          outline: none;
          border-color: #000;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 p-3 md:p-10">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Feedback</h1>
              <p className="text-sm text-gray-400 mt-1">Share your experience with us</p>
            </div>
            {avgRating && (
              <div className="text-right">
                <div className="text-3xl font-black">{avgRating}</div>
                <div className="text-xs text-gray-400">{feedbacks.length} review{feedbacks.length !== 1 ? "s" : ""}</div>
              </div>
            )}
          </div>

          {/* Compose Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <p className="text-sm font-semibold text-gray-700">How was your experience?</p>

            {/* Star Rating */}
            <div className="flex items-center gap-4">
              <StarRating
                rating={rating}
                setRating={setRating}
                hoveredStar={hoveredStar}
                setHoveredStar={setHoveredStar}
              />
              {(hoveredStar || rating) > 0 && (
                <span
                  className="text-sm font-bold transition-all"
                  style={{ color: ratingColors[hoveredStar || rating] }}
                >
                  {ratingLabels[hoveredStar || rating]}
                </span>
              )}
            </div>

            {/* Text Input */}
            <textarea
              placeholder="Tell us what you think..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm resize-none transition-all duration-200 bg-gray-50 focus:bg-white"
            />

            {/* Character count + Submit */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300">{comment.length} / 500</span>

              {submitted ? (
                <div className="submit-success flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Submitted!
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!comment.trim() || rating === 0 || submitting}
                  className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 active:scale-95 transition-all duration-150"
                >
                  {submitting ? (
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  )}
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </div>

          {/* Feedback List */}
          <div className="space-y-3">
            {loading && (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
                    <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(s => <div key={s} className="w-3.5 h-3.5 rounded-sm bg-gray-100" />)}
                    </div>
                    <div className="h-3 bg-gray-100 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                ))}
              </div>
            )}

            {!loading && feedbacks.length === 0 && (
              <div className="text-center py-14 text-gray-300">
                <svg className="mx-auto mb-3 opacity-40" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <p className="text-sm font-medium">No feedback yet</p>
                <p className="text-xs mt-1">Be the first to share your experience</p>
              </div>
            )}

            {!loading && feedbacks.map((fb, i) => (
              <FeedbackCard key={fb.id} fb={fb} index={i} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}