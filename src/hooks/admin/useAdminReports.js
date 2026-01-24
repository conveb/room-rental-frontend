import { useState, useEffect, useCallback } from "react";
import { getReportedPropertiesApi, getReportedRoomownersApi } from "../../services/allAPI";

export const useAdminReports = () => {
    const [reportedOwners, setReportedOwners] = useState([]);
    const [reportedProperties, setReportedProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReports = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [ownersRes, propsRes] = await Promise.all([
                getReportedRoomownersApi(),
                getReportedPropertiesApi()
            ]);

            // Adjust based on your commonAPI response structure (e.g., .data)
            setReportedOwners(ownersRes.data || []);
            setReportedProperties(propsRes.data || []);
        } catch (err) {
            setError(err.message || "Failed to fetch reports");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    return { reportedOwners, reportedProperties, loading, error, refresh: fetchReports };
};