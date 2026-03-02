import { useState, useEffect } from "react";
import { getLandOwnerDashboardOverviewApi } from "../../services/allAPI";

export default function useLandownerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await getLandOwnerDashboardOverviewApi();
        setDashboardData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { dashboardData, loading, error };
}