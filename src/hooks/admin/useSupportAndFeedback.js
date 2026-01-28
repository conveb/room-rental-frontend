import { useEffect, useState, useCallback } from "react";
import { DeleteFeedbackApi, getAllFeedbackApi, getAllSupportApi, updateStatusApi } from "../../services/allAPI";
import { toast } from "sonner";


export function useSupportAndFeedback() {
  const [supports, setSupports] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  /* ---------------- SUPPORT ---------------- */
  const fetchSupports = useCallback(async () => {
    try {
      const res = await getAllSupportApi();
      setSupports(res.data || []);
    } catch (err) {
      setError(err);
    }
  }, []);

  const updateSupportStatus = async (id, admin_response) => {
    try {
      setUpdating(true);
      await updateStatusApi(id, { admin_response });
      await fetchSupports();
    } finally {
      setUpdating(false);
    }
  };

  const deleteFeedback = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      setUpdating(true);
      await DeleteFeedbackApi(id);
      toast.success("Feedback deleted successfully");
      await fetchFeedbacks(); // Refresh list
    } catch (err) {
      toast.error("Failed to delete feedback");
    } finally {
      setUpdating(false);
    }
  };

  /* ---------------- FEEDBACK ---------------- */
  const fetchFeedbacks = useCallback(async () => {
    try {
      const res = await getAllFeedbackApi();
      setFeedbacks(res.data || []);
    } catch (err) {
      setError(err);
    }
  }, []);

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchSupports(), fetchFeedbacks()]);
      setLoading(false);
    };
    init();
  }, [fetchSupports, fetchFeedbacks]);

  return {
    supports,
    updateSupportStatus,
    updating,
    feedbacks,
    deleteFeedback,
    loading,
    error,
    refetchSupports: fetchSupports,
    refetchFeedbacks: fetchFeedbacks,
  };
}
