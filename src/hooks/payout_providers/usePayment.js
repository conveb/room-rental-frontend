// hooks/bookings/useBookingDetails.js
import { useState } from 'react';
import { getBookingDetailsApi } from '../../services/allAPI';
import { toast } from 'sonner';

export const usePayment = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookingDetails = async (bookingId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getBookingDetailsApi(bookingId);
      
      if (response.status === 200) {
        setBooking(response.data);
        return { success: true, data: response.data };
      } else {
        throw new Error(response.data?.message || 'Failed to fetch booking');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error fetching booking details';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    booking,
    loading,
    error,
    fetchBookingDetails
  };
};