import { useState, useEffect } from "react";
import { getReportedLandownersApi } from "../services/allAPI";

export const useReportedLandowners = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const response = await getReportedLandownersApi();
            if (response.status === 200) {
                setEntries(response.data);
            } else {
                setError("Failed to fetch reports");
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return { entries, loading, error, refresh: fetchReports };
};