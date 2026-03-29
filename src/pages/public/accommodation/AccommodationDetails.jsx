import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePropertyDetails } from "../../../hooks/property/usePropertyDetails";
import AccommodationDetailsSkeleton from "../../skeleton/AccommodationDetailsSkeleton";
import { MdMap, MdOutlineReportGmailerrorred } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "sonner";
import { useReport } from "../../../hooks/users/useReport";
import { useAuth } from "../../../context/AuthContext";
import { useFavorites } from "../../../hooks/users/useFavorites";
import { useBooking } from "../../../hooks/bookings/useBookings";
import { usePayment } from "../../../hooks/payout_providers/usePayment";

// Split components
import ImageGallery from "./components/ImageGallery";
import BookingPanel from "./components/BookingPanel";
import ReportModal from "./components/ReportModal";

const AccommodationDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  console.log("Property ID from URL:", id);
  const navigate = useNavigate();
  const { property, loading, error } = usePropertyDetails(id);
  const { initiatePayment } = usePayment();

  const [reportType, setReportType] = useState(null);
  const [newReport, setNewReport] = useState({ description: "" });
  const [serverError, setServerError] = useState(null);
  const { submitReport, reportLoading } = useReport();

  const { isSaved, addToFavorites, removeFromFavorites } = useFavorites();
  const {
    requestBooking,
    bookingLoading,
    cancelBooking,
    fetchPropertyBooking,
    bookingDetails,
  } = useBooking();

  useEffect(() => {
    if (user && id) {
      fetchPropertyBooking(id);
    }
  }, [id, user]);

  const handleFavoriteClick = (e, property) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/signin");
      return;
    }
    if (isSaved(property.id)) {
      removeFromFavorites(property.id);
      toast.success("Removed from saved!");
    } else {
      addToFavorites(property.id);
      toast.success("Added to saved!");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Check this out!",
      text: "I found something interesting to share with you.",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert("Sharing is not supported on this browser. Link copied to clipboard!");
        navigator.clipboard.writeText(window.location.href);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const handleAddReport = async (type) => {
    const result = await submitReport(type, id, newReport.description);
    if (result.success) {
      setReportType(null);
      setNewReport({ description: "" });
      setServerError(null);
      toast.success(`Thank you! Your ${type} report has been submitted.`);
    } else {
      setServerError(result.error);
    }
  };

  const closeReportModal = () => {
    setReportType(null);
    setNewReport({ description: "" });
    setServerError(null);
  };

  const handlePay = async () => {
    try {
      const response = await initiatePayment(bookingDetails.id);
      const paymentUrl = response.payment_url;
      if (paymentUrl) {
        navigate(`/auth/user/payment/${bookingDetails.id}`, {
          state: { url: paymentUrl, bookingId: bookingDetails.id },
        });
      }
    } catch (err) {
      console.error("Payment Error:", err);
    }
  };

  if (loading) return <AccommodationDetailsSkeleton />;
  if (error || !property)
    return <p className="text-center mt-32 text-red-500">Property not found</p>;

  const images = [
    property.cover_image,
    ...(property.images_data?.map((img) => img.image) || []),
  ].filter(Boolean);

  const mainImage = images[0];

  return (
    <div>
      <main className="max-w-6xl mx-auto px-4 mt-24">
        {/* Header */}
        <div className="flex items-center gap-2 md:gap-5 my-2 md:my-5">
          <button
            onClick={() => navigate(-1)}
            className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-neutral-200 transition text-2xl"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-sm md:text-3xl font-semibold">
            {property.property_type.replace("_", " ")} in {property.city}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-10">
          {/* Image Gallery */}
          <ImageGallery
            images={images}
            property={property}
            isSaved={isSaved}
            onFavoriteClick={handleFavoriteClick}
            onShare={handleShare}
          />

          {/* Details */}
          <section className="space-y-3 md:space-y-6">
            {/* Title, Description & Report */}
            <div>
              <div className="flex justify-between">
                <h1 className="text-xl md:text-3xl font-semibold">{property.title}</h1>
                {/* <button onClick={() => setReportType("property")}>
                  <MdOutlineReportGmailerrorred size={25} />
                </button> */}
              </div>
              <p className="mt-2 text-xs text-gray-600">{property.description}</p>
            </div>

            {/* Booking Panel (price + stats + booking actions) */}
            <BookingPanel
              property={property}
              user={user}
              navigate={navigate}
              bookingDetails={bookingDetails}
              bookingLoading={bookingLoading}
              requestBooking={requestBooking}
              cancelBooking={cancelBooking}
              handlePay={handlePay}
              propertyId={id}
            />

            {/* Amenities */}
            <div>
              <h2 className="text-sm font-semibold mb-2">Facilities</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {property.amenities_data?.map((a) => (
                  <span key={a.amenity_id} className="px-3 py-1 border rounded-full">
                    {a.amenity_name}
                  </span>
                ))}
              </div>
            </div>

            {/* Address & Map */}
            {/* Address & Map */}
            <div>
              <h2 className="text-sm font-semibold mb-2">Address</h2>
              <p className="text-xs text-gray-700">
                {property.address}, {property.city}, {property.region}, {property.country}
              </p>
              <div className="mt-4">
                <h2 className="text-sm font-semibold mb-2">Map</h2>
                {property.latitude && property.longitude ? (
                  <div className="mt-2 h-48 w-full rounded-lg overflow-hidden border">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.longitude - 0.01}%2C${property.latitude - 0.01}%2C${property.longitude + 0.01}%2C${property.latitude + 0.01}&layer=mapnik&marker=${property.latitude}%2C${property.longitude}`}
                      title="Property Location"
                    />
                  </div>
                ) : (
                  <div className="mt-2 h-48 w-full rounded-lg border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 text-gray-400">
                    <MdMap size={28} />
                    <p className="text-xs">Map not provided</p>
                  </div>
                )}
              </div>
            </div>

            {/* Listed date */}
            <div className="text-xs text-gray-500">
              <p>Listed on: {new Date(property.created_at).toLocaleDateString()}</p>
            </div>
          </section>
        </div>
      </main>

      {/* Report Modal */}
      <ReportModal
        reportType={reportType}
        property={property}
        propertyId={id}
        mainImage={mainImage}
        newReport={newReport}
        setNewReport={setNewReport}
        serverError={serverError}
        reportLoading={reportLoading}
        onSubmit={handleAddReport}
        onClose={closeReportModal}
      />
    </div>
  );
};

export default AccommodationDetails;