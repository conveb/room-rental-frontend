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
        const formData = new FormData();
        formData.append("status", statusValue);

        try {
            const result = await ConfirmOrRejectBookingApi(id, formData);
            if (result.status >= 200 && result.status < 300) {
                toast.success(`Booking ${statusValue === "CONFIRMED" ? "Confirmed" : "Rejected"} successfully!`);
                await fetchBookings(); // Refresh list immediately
            } else {
                toast.error("Failed to update status.");
            }
        } catch (err) {
            toast.error("An error occurred.");
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return { bookings, loading, error, updateStatus, isUpdating };
};