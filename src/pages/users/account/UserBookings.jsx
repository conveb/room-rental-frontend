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
    <div className="space-y-3 px-3 md:p-6  md:mx-auto md:container">
      {/* MAIN TABS */}
      <div className="flex bg-white rounded-3xl overflow-hidden w-full p-2 gap-2">
        {["bookings", "payments"].map((tab) => (
          <button
            key={tab}
            onClick={() => setMainTab(tab)}
            className={`flex-1 py-3 md:py-4 text-sm font-medium transition rounded-2xl shadow ${mainTab === tab ? "bg-black text-white" : "bg-white text-gray-500 hover:bg-gray-200"
              }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

        {mainTab === "bookings" && (
          <>
            {/* SUB-TABS */}
            <div className="flex mx-auto items-center gap-4 border-b text-sm px-2 max-w-4xl">
              {[
                { key: "upcoming", text: "Upcoming", icon: <IoTimerOutline /> },
                { key: "past", text: "Past", icon: <MdHistory /> },
                { key: "cancelled", text: "Cancelled", icon: <TiCancel /> },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setBookingTab(tab.key)}
                  className={`py-3 transition w-full ${bookingTab === tab.key ? "border-b-2 border-black font-medium text-black" : "text-gray-500"
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
                  <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${item.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'
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
            <div className="  p-12 text-center ">
              {/* Animated Icon Container */}
              <div className="mx-auto w-24 h-24 bg-black/10 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
                <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              {/* Text Content */}
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-2">
                No {bookingTab} adventures yet
              </h3>
              <p className="text-xs md:text-lg text-gray-500 mb-4 md:mb-8 max-w-xs mx-auto">
                It looks like you haven't booked any {bookingTab} stays. Time to find your next favorite spot!
              </p>

              {/* Styled Button */}
              <Link
                to="/auth/user/accommodation"
                className="inline-flex items-center text-sm md:text-lg px-4 md:px-8 py-2 md:py-3 bg-black text-white font-semibold rounded-full hover:bg-black/80 hover:scale-105 transition-transform duration-200 shadow-lg shadow-indigo-200"
              >
                Browse Properties
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </>
      )}

      {mainTab === "payments" && <UserPayments />}
    </div>
  );
}