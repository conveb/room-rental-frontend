import { Link } from "react-router-dom";
import { usePropertyDetails } from "../../../hooks/property/usePropertyDetails";
import { useBooking } from "../../../hooks/bookings/useBookings";
import { toast } from "sonner";

function BookingCard({ item }) {
  const { property, loading } = usePropertyDetails(item.property);
  const {
    cancelBooking,
  } = useBooking();

  const status = item.status?.toUpperCase();
  const canCancel = status === "PENDING" || status === "CONFIRMED";
  if (loading || !property) return null;

  const handleCancel = async () => {
    if (!item?.id) {
      toast.error("Booking reference not found.");
      return;
    }
    await cancelBooking(item.id);
  };


  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-2 md:p-4 flex flex-col md:flex-row gap-4 items-center">
      {/* Property Image */}
      <div className="w-full md:w-32 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
        {loading ? (
          <div className="w-full h-full animate-pulse bg-gray-200" />
        ) : (
          <img
            src={property?.cover_image || "/placeholder.jpg"}
            alt="property"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 w-full">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-gray-900">
              {loading ? "Loading..." : property?.title || item.property_title}
            </h4>
            <p className="text-gray-500 text-xs">
              {property?.city}, {property?.country}
            </p>
          </div>

          <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase border ${status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
            status === 'CANCELLED' ? 'bg-red-50 text-red-600 border-red-100' :
              'bg-amber-50 text-amber-600 border-amber-100'
            }`}>
            {item.status}
          </span>
        </div>

        <div className="mt-2 text-xs text-gray-400 space-y-1">
          <p className="font-mono">Ref: {item.reference_no}</p>
          <p>Stay: {new Date(item.start_date).toLocaleDateString()} - {new Date(item.end_date).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Actions - Fixed heights */}
      <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
        <Link
          to={`/auth/user/accommodation-details/${property.id}`}
          className="flex-1 md:w-32 py-2 text-xs font-bold bg-black text-white rounded-lg text-center"
        >
          Details
        </Link>

        {canCancel && (
          <button
            onClick={handleCancel}
            className="flex-1 md:w-32 py-2 text-xs font-bold bg-red-600 text-white rounded-lg text-center"
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingCard;