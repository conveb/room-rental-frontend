import React from 'react';
import { LuCalendarClock, LuHash, LuHouse, LuCircleCheck, LuCircleX } from "react-icons/lu";
import { useOwnerBookings } from '../../hooks/bookings/useOwnerBookings';

export default function OwnerBookings() {
  const { bookings, loading, error, updateStatus, isUpdating } = useOwnerBookings();

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl relative">
      {/* Loading Overlay for when an action is processing */}
      {isUpdating && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl border flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
            <span className="text-sm font-bold text-neutral-600">Updating Booking...</span>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold flex items-center gap-2 mb-8">
        <LuCalendarClock className="text-emerald-500" /> Property Bookings
      </h1>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

              {/* Left Side: Booking Info */}
              <div className="flex-1">
                <div className="text-xs font-mono text-neutral-400 mb-1 flex items-center gap-1">
                  <LuHash size={12} /> {booking.reference_no}
                </div>
                <h3 className="font-bold text-lg text-neutral-800 flex items-center gap-2">
                  <LuHouse className="text-emerald-500" size={18} /> {booking.property_title}
                </h3>
                <p className="text-sm text-neutral-500">
                  Stay: {booking.start_date} to {booking.end_date}
                </p>
              </div>

              {/* Middle: Amount & Current Status Badge */}
              <div className="flex flex-col items-start md:items-center gap-2">
                <span className="text-lg font-bold text-emerald-600">
                  ₹{Number(booking.total_rent_amount).toLocaleString()}
                </span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${booking.status === 'PENDING' ? 'bg-orange-100 text-orange-600' :
                    booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                  {booking.status}
                </span>
              </div>

              {/* Right Side: ACTION BUTTONS (Confirm/Reject) */}
              <div className="w-full md:w-auto">
                {booking.status === 'PENDING' ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateStatus(booking.id, "APPROVED")} // Changed from "CONFIRMED"
                      disabled={isUpdating}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
                    >
                      <LuCircleCheck size={16} /> Approve
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, "REJECTED")}
                      disabled={isUpdating}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 border-2 border-red-100 hover:bg-red-50 text-red-600 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
                    >
                      <LuCircleX size={16} /> Reject
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-neutral-400 italic">Action already taken</p>
                    {/* Badge logic update for APPROVED */}
                    <span className={`mt-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${booking.status === 'APPROVED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                      {booking.status}
                    </span>
                  </div>
                )}
            </div>

          </div>
          </div>
        ))}
    </div>
    </div >
  );
}