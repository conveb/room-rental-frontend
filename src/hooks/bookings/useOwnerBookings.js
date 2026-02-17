import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getOwnerBookingsApi, ConfirmOrRejectBookingApi } from "../../services/allAPI";

export const useOwnerBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await getOwnerBookingsApi();
            setBookings(response.data || []);
        } catch (err) {
            setError("Failed to fetch bookings.");
            toast.error("Could not load bookings.");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, statusValue) => {
        setIsUpdating(true);

        // 1. Send as a simple JSON object, not FormData
        // 2. Ensure statusValue is "APPROVED" or "REJECTED"
        const requestBody = {
            status: statusValue
        };

        try {
            // Make sure your allAPI.js handles JSON bodies correctly
            const result = await ConfirmOrRejectBookingApi(id, requestBody);

            if (result.status >= 200 && result.status < 300) {
                toast.success(`Booking ${statusValue === "APPROVED" ? "Approved" : "Rejected"} successfully!`);
                await fetchBookings(); // Refresh the list
            } else {
                toast.error("Server rejected the request.");
            }
        } catch (err) {
            // Detailed error logging to catch any other backend complaints
            console.error("400 Error Details:", err.response?.data);
            const errorMessage = err.response?.data?.message || "Failed to update status.";
            toast.error(errorMessage);
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return { bookings, loading, error, updateStatus, isUpdating };
};