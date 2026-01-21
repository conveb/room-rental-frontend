import { useState } from "react";
import { createSupportApi } from "../../services/allAPI";

export const useSupport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitSupportRequest = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createSupportApi(formData);
      // Backend returns 201 Created for successful POST
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        const errorMsg = response.data?.issue_type?.[0] || "Submission failed";
        throw new Error(errorMsg);
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { submitSupportRequest, loading, error };
};