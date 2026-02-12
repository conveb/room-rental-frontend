import { useState, useEffect } from "react";
import { getMyComplaints, createComplaint, getComplaintDetailsApi } from "../../services/allAPI"; // Adjust path as needed

export const useComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch complaints on mount
  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await getMyComplaints();
      // Assuming commonAPI returns the data directly or in response.data
      if (response.status >= 200 && response.status < 300) {
        setComplaints(response.data);
      } else {
        setError("Failed to fetch complaints");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Function to fetch specific details
  const fetchComplaintDetails = async (id) => {
    try {
      const response = await getComplaintDetailsApi(id);
      return response.data; // Returns the full object including admin_reply
    } catch (err) {
      console.error("Detail fetch error:", err);
      return null;
    }
  };

  // Add a new complaint
  const addComplaint = async (payload) => {
    try {
      const response = await createComplaint(payload);
      if (response.status === 201 || response.status === 200) {
        // Update local state so the UI reflects the new complaint immediately
        setComplaints((prev) => [response.data, ...prev]);
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.data };
      }
    } catch (err) {
      return { success: false, error: err };
    }
  };

  return { complaints,fetchComplaintDetails, loading, error, addComplaint, refresh: fetchComplaints};
};