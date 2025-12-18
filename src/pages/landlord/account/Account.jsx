import React from "react";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";

export default function Account() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-slate-200 p-2 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">

        {/* PAGE HEADER */}
        <header className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Landowner Account
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Manage profile, properties, bookings & earnings
            </p>
          </div>

      
        </header>

        {/* PROFILE + STATUS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

          {/* PROFILE */}
          <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Profile
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <h2 className="flex items-center justify-center sm:justify-start gap-2 text-lg sm:text-xl font-semibold text-gray-900">
                  Rahul Sharma <span className="text-blue-700"><MdVerified /></span>
                </h2>
                <p className="text-sm text-gray-600">rahul@example.com</p>
                <p className="text-xs text-gray-600">Joined : 18/12/2025</p>

                {/* Status badges - optional */}
                {/* <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-amber-100 text-amber-700">
                    Verification Pending
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                    Active Account
                  </span>
                </div> */}
              </div>

              <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm bg-gray-900 text-white hover:bg-black transition-colors">
                  Edit Profile
                </button>
                {/* <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                  Delete Account
                </button> */}
              </div>
            </div>
          </div>

          {/* VERIFICATION */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 space-y-3">
            <h3 className="font-semibold text-gray-900">
              Verification
            </h3>

            <p className="text-xs sm:text-sm text-gray-600">
              Submit identity and property ownership documents to unlock bookings.
            </p>

            <button className="w-full px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition-colors">
              Upload Documents
            </button>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <ActionCard title="My Properties" to="/landowner/properties" />
            <ActionCard title="Add Property" to="/landowner/property/create" />
            <ActionCard title="Amenities" to="/landowner/amenities" />
            <ActionCard title="Bookings" to="/landowner/bookings" />
          </div>
        </section>

        {/* PROPERTY & BOOKING MANAGEMENT */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* PROPERTY MANAGEMENT */}
  <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 space-y-5">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-gray-900 text-lg">Property Management</h3>
      <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">Manage</span>
    </div>

    <ul className="space-y-4">
      <li className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition">
        <div>
          <p className="font-medium text-sm">Create Property</p>
          <p className="text-xs text-gray-500">Add a new listing</p>
        </div>
        <Link to="/landowner/property/create" className="px-4 py-1.5 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
          Create
        </Link>
      </li>

      <li className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition">
        <div>
          <p className="font-medium text-sm">Update Property</p>
          <p className="text-xs text-gray-500">Edit existing listings</p>
        </div>
        <span className="text-xs text-gray-400">From list</span>
      </li>

      <li className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition">
        <div>
          <p className="font-medium text-sm">Delete Property</p>
          <p className="text-xs text-gray-500">Remove inactive listings</p>
        </div>
        <span className="text-xs text-gray-400">From list</span>
      </li>

      <li className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition">
        <div>
          <p className="font-medium text-sm">Amenities</p>
          <p className="text-xs text-gray-500">Add or remove features</p>
        </div>
        <Link to="/landowner/amenities" className="text-sm text-indigo-600 hover:underline">
          Manage
        </Link>
      </li>
    </ul>
  </div>

  {/* BOOKINGS */}
  <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 space-y-5">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-gray-900 text-lg">Booking Control</h3>
      <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">Bookings</span>
    </div>

    <ul className="space-y-4">
      <li className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition">
        <div>
          <p className="font-medium text-sm">Confirm / Reject</p>
          <p className="text-xs text-gray-500">Owner decision</p>
        </div>
        <span className="text-xs text-gray-400">Pending</span>
      </li>

      <li className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition">
        <div>
          <p className="font-medium text-sm">Complete Booking</p>
          <p className="text-xs text-gray-500">After guest checkout</p>
        </div>
        <span className="text-xs text-gray-400">Post stay</span>
      </li>

      <li className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition">
        <div>
          <p className="font-medium text-sm">Booking History</p>
          <p className="text-xs text-gray-500">View all records</p>
        </div>
        <Link to="/landowner/bookings" className="text-sm text-indigo-600 hover:underline">
          View
        </Link>
      </li>
    </ul>
  </div>
</section>


        {/* DANGER ZONE */}
        <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 border border-rose-200">
          <h3 className="font-semibold text-rose-600 mb-2">
            Danger Zone
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-4">
            This action is irreversible.
          </p>

          <button className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-rose-600 text-white text-sm hover:bg-rose-700 transition-colors">
            Permanently Delete Account
          </button>
          
        </section>

      </div>
    </div>
  );
}

/* ---------- REUSABLE ACTION CARD ---------- */
function ActionCard({ title, to }) {
  return (
    <Link
      to={to}
      className="group rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 p-3 sm:p-4 transition-all duration-200 hover:shadow-sm"
    >
      <p className="font-medium text-gray-900 group-hover:text-black text-sm sm:text-base">
        {title}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Manage {title.toLowerCase()}
      </p>
    </Link>
  );
}