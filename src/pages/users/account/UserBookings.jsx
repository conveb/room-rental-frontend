import { Link } from "react-router-dom";

export default function UserBookings() {
  return (
    <div className="space-y-6 px-2 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
        <Link
          to="/properties"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
        >
          Browse Rooms
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b text-sm">
        <button className="pb-2 border-b-2 border-indigo-600 font-medium text-indigo-600">Upcoming</button>
        <button className="pb-2 text-gray-500 hover:text-gray-700">Past</button>
        <button className="pb-2 text-gray-500 hover:text-gray-700">Cancelled</button>
      </div>

      {/* Booking Cards */}
      <div className="space-y-4">
        {/* Booking Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <p className="font-medium text-gray-900">Modern Studio Apartment</p>
            <p className="text-sm text-gray-500">Paris · 12 Aug – 18 Aug</p>
            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-600">
              Confirmed
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/bookings/1"
              className="px-4 py-2 text-sm rounded-lg border hover:border-indigo-600 hover:bg-indigo-50 transition"
            >
              View Details
            </Link>
            <button className="px-4 py-2 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition">
              Cancel Booking
            </button>
          </div>
        </div>

        {/* Past Booking */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 opacity-80">
          <div className="space-y-1">
            <p className="font-medium text-gray-900">Cozy City Room</p>
            <p className="text-sm text-gray-500">Berlin · 02 Jun – 06 Jun</p>
            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
              Completed
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/bookings/2"
              className="px-4 py-2 text-sm rounded-lg border hover:border-indigo-600 hover:bg-indigo-50 transition"
            >
              View Details
            </Link>
            <button className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50 transition">
              Download Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Empty State (optional) */}
      {/*
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center space-y-3">
        <p className="text-gray-700 font-medium">No bookings found</p>
        <p className="text-sm text-gray-500">Start exploring rooms to make your first booking.</p>
        <Link to="/properties" className="inline-block mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg">
          Browse Rooms
        </Link>
      </div>
      */}
    </div>
  );
}