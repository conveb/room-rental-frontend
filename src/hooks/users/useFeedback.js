import { useEffect, useState } from "react";
import { getAllFeedbackApi, sendFeedbackApi } from "../../services/allAPI";

export const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await getAllFeedbackApi();
      setFeedbacks(res?.data || []);
    } catch {
      setError("Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  };

const addFeedback = async ({ comment, rating }) => {
  try {
    const res = await sendFeedbackApi({
      comment,
      rating,
    });

    console.log("Feedback response:", res);

    await fetchFeedbacks();
  } catch (err) {
    console.error("Submit feedback error:", err?.response || err);
    throw err;
  }
};


  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return {
    feedbacks,
    loading,
    error,
    addFeedback,
  };
};
