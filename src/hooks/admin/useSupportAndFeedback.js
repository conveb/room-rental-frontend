import { useEffect, useState, useCallback } from "react";
import { getAllFeedbackApi, getAllSupportApi, updateStatusApi } from "../../services/allAPI";


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
    /* support */
    supports,
    updateSupportStatus,
    updating,

    /* feedback */
    feedbacks,

    /* common */
    loading,
    error,
    refetchSupports: fetchSupports,
    refetchFeedbacks: fetchFeedbacks,
  };
}
