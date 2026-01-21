import { useState, useEffect } from "react";
import { getAllComplaintsApi } from "../../services/allAPI";

export const useAdminComplaints = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchComplaints = async () => {
        try {
            setLoading(true);
            const response = await getAllComplaintsApi();
            if (response.status >= 200 && response.status < 300) {
                // Map the backend data to match your UI's expected property names
                const formattedData = response.data.map(item => ({
                    id: item.id,
                    type: "COMPLAINT", 
                    reportedUser: item.user_details?.full_name || "Unknown User",
                    role: "User", 
                    reason: item.subject,
                    description: item.message,
                    status: item.status?.toUpperCase() || "PENDING",
                    created_at: item.created_at,
                    admin_reply: item.admin_reply,
                    reporter: item.user_details?.email // Using email as reporter info
                }));
                setEntries(formattedData);
            } else {
                throw new Error("Failed to fetch complaints");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    return { entries, loading, error, refresh: fetchComplaints };
};