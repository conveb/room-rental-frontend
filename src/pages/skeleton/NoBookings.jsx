import { FiCalendar } from "react-icons/fi";

export default function NoBookings() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-14 px-4 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
      {/* Icon Container */}
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <FiCalendar className="text-gray-400 text-3xl" />
      </div>

      {/* Text Content */}
      <h3 className="text-lg font-semibold text-gray-800">
        No bookings available
      </h3>
      <p className="text-sm text-gray-500 max-w-xs mt-2">
        It looks like you don't have any scheduled bookings at the moment. 
        Check back later or explore new listings.
      </p>

      {/* Action Button */}
      <button 
        onClick={() => window.location.reload()} 
        className="mt-6 px-6 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  );
};