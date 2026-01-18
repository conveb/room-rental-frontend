    import { useState, useEffect } from "react";
import { getMyBookingsApi } from "../../services/allAPI";

export const useMyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const result = await getMyBookingsApi();
      if (result.status === 200) {
        setBookings(result.data);
      } else {
        setError("Failed to fetch bookings");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, loading, error, refresh: fetchBookings };
};