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
        const booking = response.data[0] || null;

        // If the found booking is already cancelled, treat it as null 
        // so the "Request Booking" button shows up
        if (booking && booking.status === "CANCELLED") {
          setBookingDetails(null);
          return null;
        }

        setBookingDetails(booking);
        return booking;
      }
    } catch (err) {
      console.error("Error fetching property booking", err);
    } finally {
      setBookingLoading(false);
    }
  };

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
      
      // THIS IS THE KEY: Update the local state with the new booking object
      // This will trigger the UI to switch from "Request" to "Cancel" immediately
      setBookingDetails(response.data); 
      
      return { success: true, data: response.data };
    }

    const errorData = response.data;
    const firstError = errorData ? Object.values(errorData)[0] : "Booking failed";
    throw new Error(Array.isArray(firstError) ? firstError[0] : firstError);

  } catch (err) {
    toast.error(err.message || "An unexpected error occurred");
    return { success: false };
  } finally {
    setBookingLoading(false);
  }
};


  const cancelBooking = async (bookingId) => {
    setBookingLoading(true);
    try {
      // Note: Ensure CancelBookingApi is using 'patch' in your allAPI.js
      // Also using uppercase "CANCELLED" as per standard Django conventions
      const response = await CancelBookingApi(bookingId, { status: "CANCELLED" });

      if (response.status === 200 || response.status === 201 || response.status === 204) {
        toast.success("Booking request cancelled.");
        setBookingDetails(null); // This clears the state and resets the button in UI
        return { success: true };
      }

      // Extracting specific error message from DRF (Django Rest Framework)
      const errorMsg = response.data?.status?.[0] || response.data?.detail || "Could not cancel booking";
      throw new Error(errorMsg);
    } catch (err) {
      // If your commonAPI throws on 400, catch it here
      const message = err.response?.data?.status?.[0] || err.message;
      toast.error(message);
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