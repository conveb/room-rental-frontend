import { useState, useEffect } from "react";
import { getAllComplaintsApi, getComplaintDetailAdminApi, updateComplaintStatusApi } from "../../services/allAPI";

export const useAdminComplaints = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [error, setError] = useState(null);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await getAllComplaintsApi();
      if (response.status >= 200 && response.status < 300) {
        setEntries(response.data);
      }
    } catch (err) {
      setError("Failed to load complaints.");
    } finally {
      setLoading(false);
    }
  };

  const fetchComplaintDetail = async (id) => {
    try {
      setDetailLoading(true);
      const response = await getComplaintDetailAdminApi(id);
      if (response.status >= 200 && response.status < 300) {
        setSelectedDetail(response.data);
      }
    } finally {
      setDetailLoading(false);
    }
  };

  const updateComplaint = async (id, data) => {
    try {
      setDetailLoading(true);
      const response = await updateComplaintStatusApi(id, data);
      if (response.status >= 200 && response.status < 300) {
        // Refresh the list and detail view
        await fetchComplaints();
        await fetchComplaintDetail(id);
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return { 
    entries, loading, detailLoading, 
    selectedDetail, setSelectedDetail, 
    fetchComplaintDetail, updateComplaint,
    error, refresh: fetchComplaints 
  };
};