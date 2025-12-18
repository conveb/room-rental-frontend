import { Link } from "react-router-dom";

export default function UserDashboard() {
  return (
    <div className="space-y-6 px-2 md:p-6">
      {/* Header */}
      <div className="flex flex-row justify-between gap-3">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <Link
          to="/accommodation"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
        >
          Browse Rooms
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs text-gray-500">Upcoming Bookings</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">1</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs text-gray-500">Total Bookings</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">6</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs text-gray-500">Saved Rooms</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">3</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs text-gray-500">Pending Refunds</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">€120</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Booking */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Stay</h2>

          <div className="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900">Modern Studio Apartment</p>
              <p className="text-sm text-gray-500">Paris · 12 Aug – 18 Aug</p>
            </div>
            <Link
              to="/bookings"
              className="text-sm font-medium text-indigo-600 hover:underline"
            >
              View Booking
            </Link>
          </div>

          <div className="text-sm text-gray-500">
            Check‑in details will be available 24 hours before arrival.
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between items-start">
              <span className="text-gray-700">Booking confirmed</span>
              <span className="text-xs text-gray-400">2d ago</span>
            </li>
            <li className="flex justify-between items-start">
              <span className="text-gray-700">Invoice ready to download</span>
              <span className="text-xs text-gray-400">4d ago</span>
            </li>
            <li className="flex justify-between items-start">
              <span className="text-gray-700">Price dropped on saved room</span>
              <span className="text-xs text-gray-400">1w ago</span>
            </li>
          </ul>

          <Link
            to="/profile"
            className="inline-block text-sm text-indigo-600 hover:underline"
          >
            Manage notifications
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/bookings"
            className="p-4 rounded-xl border hover:border-indigo-600 hover:bg-indigo-50 transition"
          >
            <p className="font-medium text-gray-900">View My Bookings</p>
            <p className="text-sm text-gray-500">Manage upcoming stays</p>
          </Link>
          <Link
            to="/saved"
            className="p-4 rounded-xl border hover:border-indigo-600 hover:bg-indigo-50 transition"
          >
            <p className="font-medium text-gray-900">Saved Rooms</p>
            <p className="text-sm text-gray-500">Your wishlist</p>
          </Link>
          <Link
            to="/payments"
            className="p-4 rounded-xl border hover:border-indigo-600 hover:bg-indigo-50 transition"
          >
            <p className="font-medium text-gray-900">Payments</p>
            <p className="text-sm text-gray-500">Invoices & refunds</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
