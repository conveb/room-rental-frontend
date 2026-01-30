// hooks/bookings/useBooking.js
import { useState } from "react";
import { toast } from "sonner";
import { CancelBookingApi, createBookingApi, getBookingDetailsApi, getPropertyBasedBookingApi } from "../../services/allAPI";

export const useBooking = () => {
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);


  const fetchPropertyBooking = async (propId) => {
    setBookingLoading(true);
    try {
      const response = await getPropertyBasedBookingApi(propId);
      if (response.status === 200) {
        // Since it returns an array, get the first one if it exists
        const booking = response.data[0] || null;
        setBookingDetails(booking);
        return booking;
      }
    } catch (err) {
      console.error("Error fetching property booking", err);
    } finally {
      setBookingLoading(false);
    }
  };

  // Fetch specific booking details
  const fetchBookingDetails = async (id) => {
    setBookingLoading(true);
    try {
      const response = await getBookingDetailsApi(id);
      console.log(response)
      if (response.status === 200) {
        setBookingDetails(response.data);
        return response.data;
      }
    } catch (err) {
      toast.error("Failed to load booking details.");
    } finally {
      setBookingLoading(false);
    }
  };

  const requestBooking = async (propertyId, bookingData) => {
    setBookingLoading(true);
    try {
      const response = await createBookingApi(propertyId, bookingData);

      if (response.status === 200 || response.status === 201) {
        toast.success("Booking request sent!");
        return { success: true, data: response.data };
      }

      // Django REST usually returns errors in response.data (e.g., { "start_date": ["error..."] })
      // This helper extracts the first error it finds
      const errorData = response.data;
      const firstError = errorData ? Object.values(errorData)[0] : "Booking failed";
      throw new Error(Array.isArray(firstError) ? firstError[0] : firstError);

    } catch (err) {
      // If it's a 400 error, 'err.message' will now show the specific field error
      toast.error(err.message || "An unexpected error occurred");
      return { success: false };
    } finally {
      setBookingLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    setBookingLoading(true);
    try {
      // Try 'cancelled' (lowercase) which is the standard choice key
      const response = await CancelBookingApi(bookingId, { status: "cancelled" });

      if (response.status === 200 || response.status === 204) {
        toast.success("Booking request cancelled.");
        return { success: true };
      }

      // Extract the specific error array if it fails again
      const errorMsg = response.data?.status?.[0] || "Could not cancel booking";
      throw new Error(errorMsg);
    } catch (err) {
      toast.error(err.message);
      return { success: false };
    } finally {
      setBookingLoading(false);
    }
  };

  return {
    requestBooking,
    cancelBooking,
    fetchBookingDetails,
    fetchPropertyBooking,
    bookingDetails,
    bookingLoading
  };
};