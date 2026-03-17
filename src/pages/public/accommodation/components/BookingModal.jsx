import React from "react";

const addMonths = (dateStr, months) => {
  const date = new Date(dateStr);
  date.setMonth(date.getMonth() + parseInt(months || 1));
  return date.toISOString().split("T")[0];
};

const BookingModal = ({
  property,
  bookingData,
  setBookingData,
  bookingLoading,
  getEarliestStartDate,
  onConfirm,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-left">
        <h2 className="text-xl font-bold text-gray-900">Booking Request</h2>

        <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-800">
          <p>
            • Available from: <strong>{property.available_from}</strong>
          </p>
          <p>
            • Minimum stay: <strong>{property.minimum_stay_months} months</strong>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700">Start Date</label>
            <input
              type="date"
              min={getEarliestStartDate()}
              value={bookingData.start_date}
              className="w-full border border-gray-200 rounded-xl p-2.5 text-sm"
              onChange={(e) => {
                const newStart = e.target.value;
                setBookingData({
                  ...bookingData,
                  start_date: newStart,
                  end_date: addMonths(newStart, property.minimum_stay_months),
                });
              }}
            />
          </div>
          <div>
            <label className="text-xs font-semibold">End Date</label>
            <input
              type="date"
              min={addMonths(bookingData.start_date, 1)}
              value={bookingData.end_date}
              className="w-full border rounded-xl p-2 text-sm"
              onChange={(e) =>
                setBookingData({ ...bookingData, end_date: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700">
            Message to Room Owner (Optional)
          </label>
          <textarea
            placeholder="Tell the landlord about yourself..."
            className="w-full border border-gray-200 rounded-xl p-3 text-sm h-24 focus:ring-2 focus:ring-black outline-none"
            value={bookingData.tenant_message}
            onChange={(e) =>
              setBookingData({ ...bookingData, tenant_message: e.target.value })
            }
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={bookingLoading}
            className="flex-1 py-3 bg-black text-white rounded-xl font-medium disabled:bg-gray-400 transition"
          >
            {bookingLoading ? "Sending..." : "Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;