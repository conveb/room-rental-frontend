import { Link } from "react-router-dom";

export default function UserSaved() {
  return (
    <div className="space-y-6 px-2 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-semibold text-gray-900">Saved Rooms</h1>
        <Link
          to="/properties"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
        >
          Browse Rooms
        </Link>
      </div>

      {/* Saved Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Room Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden group">
          <div className="h-44 bg-gray-200" />
          <div className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900">Modern Studio Apartment</h3>
              <button className="text-red-500 hover:text-red-600 text-sm">Remove</button>
            </div>
            <p className="text-sm text-gray-500">Paris · Entire place</p>
            <div className="flex justify-between items-center pt-2">
              <p className="text-sm font-medium text-gray-900">€120 / night</p>
              <Link
                to="/properties/1"
                className="text-sm text-indigo-600 hover:underline"
              >
                View
              </Link>
            </div>
          </div>
        </div>

        {/* Room Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden group">
          <div className="h-44 bg-gray-200" />
          <div className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900">Cozy City Room</h3>
              <button className="text-red-500 hover:text-red-600 text-sm">Remove</button>
            </div>
            <p className="text-sm text-gray-500">Berlin · Private room</p>
            <div className="flex justify-between items-center pt-2">
              <p className="text-sm font-medium text-gray-900">€80 / night</p>
              <Link
                to="/properties/2"
                className="text-sm text-indigo-600 hover:underline"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {/*
      <div className="bg-white rounded-2xl shadow-sm p-12 text-center space-y-4">
        <p className="text-gray-900 font-medium">No saved rooms yet</p>
        <p className="text-sm text-gray-500">Save rooms you like to find them easily later.</p>
        <Link
          to="/properties"
          className="inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
        >
          Browse Rooms
        </Link>
      </div>
      */}
    </div>
  );
}