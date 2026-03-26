import React, { useState } from "react";
import { toast } from "sonner";
import PropertyStats from "./PropertyStats";
import BookingModal from "./BookingModal";

const addMonths = (dateStr, months) => {
  const date = new Date(dateStr);
  date.setMonth(date.getMonth() + parseInt(months || 1));
  return date.toISOString().split("T")[0];
};

const BookingPanel = ({
  property,
  user,
  navigate,
  bookingDetails,
  bookingLoading,
  requestBooking,
  cancelBooking,
  handlePay,
  propertyId,
}) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    start_date: "",
    end_date: "",
    tenant_message: "",
  });



  const getEarliestStartDate = () => {
    const today = new Date().toISOString().split("T")[0];
    const availableFrom = property.available_from;
    return availableFrom > today ? availableFrom : today;
  };

  const handleRequestBooking = () => {
    if (!user) {
      toast.error("Please sign in to request a booking.");
      setTimeout(() => navigate("/signin"), 1500); // let toast show first
      return;
    }
    navigate(`/auth/user/request-booking/${propertyId}`, {
      state: { property, propertyId }
    });
  };

  const openBookingModal = () => {
    if (!user) {
      navigate("/signin");
      return;
    }
    const validStart = getEarliestStartDate();
    setBookingData({
      start_date: validStart,
      end_date: addMonths(validStart, property.minimum_stay_months),
      tenant_message: "",
    });
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!bookingData.start_date || !bookingData.end_date) {
      toast.error("Please select both dates.");
      return;
    }
    const data = new FormData();
    data.append("start_date", bookingData.start_date);
    data.append("end_date", bookingData.end_date);
    if (bookingData.tenant_message) {
      data.append("tenant_message", bookingData.tenant_message);
    }
    const result = await requestBooking(propertyId, data);
    if (result.success) {
      setIsBookingModalOpen(false);
    }
  };

  const handleCancel = async () => {
    if (!bookingDetails?.id) {
      toast.error("No active booking found to cancel.");
      return;
    }
    await cancelBooking(bookingDetails.id);
  };

  return (
    <div className="rounded-2xl border bg-white p-3 md:p-5 shadow-sm space-y-4">
      {/* Price */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xl md:text-3xl font-semibold">€{property.rent_per_month}</span>
          <span className="text-sm text-gray-500"> / month</span>
        </div>
      </div>

      {/* Property Stats */}
      <PropertyStats property={property} />

      <div>
        <button
          onClick={handleRequestBooking}
          className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
        >
          Request booking
        </button>
      </div>

      {/* Action Buttons */}
      {/* <div className="sticky bottom-2 p-3 border rounded-xl bg-white">
        {bookingDetails && bookingDetails.status !== "CANCELLED" ? (
          <div className="flex flex-col gap-2">
            {bookingDetails.status === "APPROVED" &&
              bookingDetails.payment_status === "UNPAID" && (
                <button
                  onClick={handlePay}
                  className="w-full bg-black text-white py-2.5 rounded-lg font-bold hover:bg-black/80 transition-all shadow-md"
                >
                  Pay Now (€{bookingDetails.total_rent_amount})
                </button>
              )}

            {bookingDetails.status !== "APPROVED" && (
              <button
                onClick={handleCancel}
                disabled={bookingLoading}
                className="w-full bg-red-300 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                {bookingLoading ? "Processing..." : "Cancel Booking Request"}
              </button>
            )}
          </div>
            ) : (
          <button
            onClick={openBookingModal}
            className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
          >
            Request booking
          </button>
        )}

        {isBookingModalOpen && (
          <BookingModal
            property={property}
            bookingData={bookingData}
            setBookingData={setBookingData}
            bookingLoading={bookingLoading}
            getEarliestStartDate={getEarliestStartDate}
            onConfirm={handleConfirmBooking}
            onClose={() => setIsBookingModalOpen(false)}
          />
        )}
      </div> */}
    </div>
  );
};

export default BookingPanel;