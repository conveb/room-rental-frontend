import { useState } from 'react';
import { toast } from 'sonner'; // or your preferred notification library
import { ReportPropertyApi, ReportRoomOwnerApi } from '../../services/allAPI';

// useReport.js
export const useReport = () => {
  const [reportLoading, setReportLoading] = useState(false);

  const submitReport = async (type, id, description) => {
    setReportLoading(true);
    try {
      const response = type === 'property' 
        ? await ReportPropertyApi(id, { reason: description })
        : await ReportRoomOwnerApi(id, { reason: description });

      return { success: true };
    } catch (error) {
      // Extract the "You have already reported..." message
      const serverError = error.response?.data?.non_field_errors?.[0] || "Failed to submit report";
      return { success: false, error: serverError };
    } finally {
      setReportLoading(false);
    }
  };

  return { submitReport, reportLoading };
};