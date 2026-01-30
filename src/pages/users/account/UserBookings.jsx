import { Link } from "react-router-dom";
import { useState } from "react";
import UserPayments from "./UserPayments";
import { TiCancel } from "react-icons/ti";
import { IoTimerOutline } from "react-icons/io5";
import { useMyBookings } from "../../../hooks/bookings/useMyBookings";
import BookingCard from "../components/BookingCard";

export default function UserBookings() {
  const [mainTab, setMainTab] = useState("bookings");
  const [bookingTab, setBookingTab] = useState("requested_bookings"); // Sync with tab key

  const { bookings, loading, error } = useMyBookings();

  const filteredBookings = bookings?.filter((b) => {
    const status = b.status?.toUpperCase();

    // Matching the key used in the tab state
    if (bookingTab === "requested_bookings") {
      return status === "PENDING" || status === "CONFIRMED";
    }

    if (bookingTab === "cancelled") {
      return status === "CANCELLED";
    }

    return true;
  }) || [];

  return (
    <div className="space-y-3 px-3 md:p-6 md:mx-auto md:container">
      {/* MAIN TABS */}
      <div className="flex bg-white rounded-3xl overflow-hidden w-full p-2 gap-2 shadow-sm border">
        {["bookings", "payments"].map((tab) => (
          <button
            key={tab}
            onClick={() => setMainTab(tab)}
            className={`flex-1 py-3 md:py-4 text-sm font-bold transition rounded-2xl ${
              mainTab === tab ? "bg-black text-white" : "bg-white text-gray-500 hover:bg-gray-100"
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
              { key: "requested_bookings", text: "Requested Bookings", icon: <IoTimerOutline /> },
              { key: "cancelled", text: "Cancelled", icon: <TiCancel /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setBookingTab(tab.key)}
                className={`py-3 transition w-full ${
                  bookingTab === tab.key ? "border-b-2 border-black font-semibold text-black" : "text-gray-400"
                }`}
              >
                <div className="flex justify-center items-center gap-2">
                  {tab.icon} <span>{tab.text}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-4 px-2 mt-4">
            {loading ? (
              <p className="text-center py-10 text-gray-500 animate-pulse">Loading bookings...</p>
            ) : error ? (
              <p className="text-center py-10 text-red-500 font-medium">{error}</p>
            ) : filteredBookings.length > 0 ? (
              filteredBookings.map((item) => (
                <BookingCard key={item.id} item={item} />
              ))
            ) : (
              <div className="p-12 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                   <IoTimerOutline className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">No records found</h3>
                <p className="text-sm text-gray-500 mb-6">There are no {bookingTab.replace('_', ' ')} found.</p>
                <Link to="/auth/user/accommodation" className="inline-flex px-6 py-3 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition shadow-md">
                  Browse Properties
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