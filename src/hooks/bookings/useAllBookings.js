import { useEffect, useState } from "react";
import { getAllBookings } from "../../services/allAPI";

export const useAllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getAllBookings();
      setBookings(response.data || []);
    } catch (err) {
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, loading, error };
};
