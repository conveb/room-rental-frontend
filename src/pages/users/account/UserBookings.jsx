import { Link } from "react-router-dom";
import { useState } from "react";
import UserPayments from "./UserPayments";
import { MdHistory } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { IoTimerOutline } from "react-icons/io5";
import { useMyBookings } from "../../../hooks/bookings/useMyBookings";

export default function UserBookings() {
  const [mainTab, setMainTab] = useState("bookings");
  const [bookingTab, setBookingTab] = useState("upcoming");
  
  const { bookings, loading, error } = useMyBookings();

  // Filter logic: This assumes your API returns a 'status' field 
  // (e.g., 'confirmed', 'completed', 'cancelled')
  const filteredBookings = bookings.filter((b) => {
    if (bookingTab === "upcoming") return b.status === "confirmed";
    if (bookingTab === "past") return b.status === "completed";
    if (bookingTab === "cancelled") return b.status === "cancelled";
    return true;
  });

  return (
    <div className="space-y-3 px-3 md:p-6 mt-20 md:mt-0 md:mx-auto md:container">
      {/* MAIN TABS */}
      <div className="flex bg-white rounded-3xl overflow-hidden w-full p-2 gap-2">
        {["bookings", "payments"].map((tab) => (
          <button
            key={tab}
            onClick={() => setMainTab(tab)}
            className={`flex-1 py-3 md:py-4 text-sm font-medium transition rounded-2xl shadow ${
              mainTab === tab ? "bg-black text-white" : "bg-white text-gray-500 hover:bg-gray-200"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {mainTab === "bookings" && (
        <>
          {/* SUB-TABS */}
          <div className="flex gap-4 border-b text-sm px-2 w-full">
            {[
              { key: "upcoming", text: "Upcoming", icon: <IoTimerOutline /> },
              { key: "past", text: "Past", icon: <MdHistory /> },
              { key: "cancelled", text: "Cancelled", icon: <TiCancel /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setBookingTab(tab.key)}
                className={`py-3 transition w-full ${
                  bookingTab === tab.key ? "border-b-2 border-black font-medium text-black" : "text-gray-500"
                }`}
              >
                <div className="flex justify-center items-center gap-2">
                  {tab.icon} <span>{tab.text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* DYNAMIC LIST */}
          <div className="space-y-4 px-2 mt-4">
            {loading ? (
              <p className="text-center py-10">Loading bookings...</p>
            ) : error ? (
              <p className="text-center py-10 text-red-500">{error}</p>
            ) : filteredBookings.length > 0 ? (
              filteredBookings.map((item) => (
                <div key={item._id} className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{item.propertyName || "Property Name"}</p>
                    <p className="text-sm text-gray-500">
                      {item.location} · {new Date(item.startDate).toLocaleDateString()} – {new Date(item.endDate).toLocaleDateString()}
                    </p>
                    <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                      item.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/bookings/${item._id}`}
                      className="px-4 py-2 text-sm text-center rounded-lg border hover:border-black hover:bg-gray-50 transition"
                    >
                      View Details
                    </Link>
                    {bookingTab === "upcoming" && (
                      <button className="px-4 py-2 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition">
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-500">
                No {bookingTab} bookings found.
              </div>
            )}
          </div>
        </>
      )}

      {mainTab === "payments" && <UserPayments />}
    </div>
  );
}