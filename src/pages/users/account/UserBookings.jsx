import { Link } from "react-router-dom";
import { useState } from "react";
import UserPayments from "./UserPayments";
import { MdHistory } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { IoTimerOutline } from "react-icons/io5";
export default function UserBookings() {
  const [mainTab, setMainTab] = useState("bookings");
  const [bookingTab, setBookingTab] = useState("upcoming");

  return (
    <div className="space-y-3 px-3 md:p-6 mt-20 md:mt-0 md:mx-auto md:container">
      {/* MAIN TABS */}
      <div className="flex bg-white rounded-3xl overflow-hidden w-full p-2 gap-2">
        {["bookings", "payments"].map((tab) => (
          <button
            key={tab}
            onClick={() => setMainTab(tab)}
            className={`flex-1 py-3 md:py-4 text-sm font-medium transition rounded-2xl shadow ${mainTab === tab
              ? "bg-black font-medium text-white"
              : "bg-white text-gray-500 hover:bg-gray-200"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* BOOKINGS SECTION */}
      {mainTab === "bookings" && (
        <>
          {/* BOOKING SUB-TABS */}
          {/* BOOKING SUB-TABS */}
          <div className="flex gap-4 border-b text-sm px-2 w-full">
            {[
              {
                key: "upcoming",
                text: "Upcoming",
                icon: <IoTimerOutline />,
              },
              {
                key: "past",
                text: "Past",
                icon: <MdHistory />,
              },
              {
                key: "cancelled",
                text: "Cancelled",
                icon: <TiCancel />,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setBookingTab(tab.key)}
                className={`py-3 transition w-full ${bookingTab === tab.key
                    ? "border-b-2 border-black font-medium text-black"
                    : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                <div className="flex justify-center items-center gap-2">
                  {tab.icon}
                  <span>{tab.text}</span>
                </div>
              </button>
            ))}
          </div>


          {/* BOOKING CARDS */}
          <div className="space-y-4 px-2">
            {bookingTab === "upcoming" && (
              <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">
                    Modern Studio Apartment
                  </p>
                  <p className="text-sm text-gray-500">
                    Paris · 12 Aug – 18 Aug
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-600">
                    Confirmed
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/bookings/1"
                    className="px-4 py-2 text-sm rounded-lg border hover:border-black hover:bg-gray-50 transition"
                  >
                    View Details
                  </Link>
                  <button className="px-4 py-2 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition">
                    Cancel Booking
                  </button>
                </div>
              </div>
            )}

            {bookingTab === "past" && (
              <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 opacity-80">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">
                    Cozy City Room
                  </p>
                  <p className="text-sm text-gray-500">
                    Berlin · 02 Jun – 06 Jun
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                    Completed
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/bookings/2"
                    className="px-4 py-2 text-sm rounded-lg border hover:border-black hover:bg-gray-50 transition"
                  >
                    View Details
                  </Link>
                  <button className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50 transition">
                    Download Invoice
                  </button>
                </div>
              </div>
            )}

            {bookingTab === "cancelled" && (
              <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-500">
                No cancelled bookings
              </div>
            )}
          </div>
        </>
      )}

      {/* PAYMENTS SECTION */}
      {mainTab === "payments" && <UserPayments />}
    </div>
  );
}
