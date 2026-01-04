import { useEffect, useState } from "react";
import { getLogsAuditApi, getPropertiesAuditApi, getUsersAuditApi } from "../../services/allAPI";


export function useAuditLogs(activeTab) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!activeTab) return;

    const fetchAuditLogs = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;

        if (activeTab === "users") {
          response = await getUsersAuditApi();
        } else if (activeTab === "properties") {
          response = await getPropertiesAuditApi();
        } else if (activeTab === "all") {
          response = await getLogsAuditApi();
        }

        setLogs(response?.data || []);
      } catch (err) {
        setError("Failed to fetch audit logs");
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, [activeTab]);

  return { logs, loading, error };
}
