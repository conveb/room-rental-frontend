import { useState } from 'react';
import { createPaymentApi } from '../../services/allAPI';

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = async (bookingId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createPaymentApi({ booking: bookingId });
      // Assuming your API returns { payment_link: '...' } or similar
      return response.data; 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to initialize payment");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { initiatePayment, isLoading, error };
};