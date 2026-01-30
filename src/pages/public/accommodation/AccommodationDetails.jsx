import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePropertyDetails } from "../../../hooks/property/usePropertyDetails";
import ImgSkeleton from '../../../Assets/pngs/img_skeleton.png'
import AccommodationDetailsSkeleton from "../../skeleton/AccommodationDetailsSkeleton";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { useReport } from "../../../hooks/users/useReport";
import { toast } from "sonner";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { useFavorites } from "../../../hooks/users/useFavorites";
import { useBooking } from "../../../hooks/bookings/useBookings";
import { CancelBookingApi } from "../../../services/allAPI";

const addMonths = (dateStr, months) => {
  const date = new Date(dateStr);
  date.setMonth(date.getMonth() + parseInt(months || 1));
  return date.toISOString().split('T')[0];
};


const AccommodationDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { property, loading, error } = usePropertyDetails(id);

  const [activeImage, setActiveImage] = useState(null);
  const [openStack, setOpenStack] = useState(false);
  const [reportType, setReportType] = useState(null);
  const [newReport, setNewReport] = useState({ title: "", property: "", description: "" });
  const [serverError, setServerError] = useState(null);
  const { submitReport, reportLoading } = useReport();

  const { isSaved, addToFavorites, removeFromFavorites, favorites } = useFavorites();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    start_date: "",
    end_date: "",
    tenant_message: ""
  });
  const {
    requestBooking,
    bookingLoading,
    cancelBooking,
    fetchPropertyBooking,
    bookingDetails
  } = useBooking();
  // 1. Fetch booking status on mount
  useEffect(() => {
    if (user && id) {
      fetchPropertyBooking(id);
    }
  }, [id, user]);
  const getEarliestStartDate = () => {
    const today = new Date().toISOString().split('T')[0]; // 2026-01-28
    const availableFrom = property.available_from;

    // If available_from is in the past, return today. 
    // If available_from is in the future, return available_from.
    return availableFrom > today ? availableFrom : today;
  };
  const openBookingModal = () => {
    if (!user) {
      navigate("/signin");
      return;
    }

    const validStart = getEarliestStartDate();

    setBookingData({
      start_date: validStart,
      // Ensure the end date is also moved forward to maintain the 1-month minimum
      end_date: addMonths(validStart, property.minimum_stay_months),
      tenant_message: ""
    });
    setIsBookingModalOpen(true);
  };
  const handleConfirmBooking = async () => {
    if (!bookingData.start_date || !bookingData.end_date) {
      toast.error("Please select both dates.");
      return;
    }
    const data = new FormData();
    data.append("start_date", bookingData.start_date);
    data.append("end_date", bookingData.end_date);
    if (bookingData.tenant_message) {
      data.append("tenant_message", bookingData.tenant_message);
    }

    const result = await requestBooking(id, data);
    if (result.success) {
      setIsBookingModalOpen(false);
      // bookingDetails is automatically updated by the hook now
    }
  };

  const handleCancel = async () => {
    if (!bookingDetails?.id) return;
    const result = await cancelBooking(bookingDetails.id);
    // hook handles clearing bookingDetails on success
  };

  const handlePay = () => {
    navigate("/auth/user/payment", {
      state: { property, bookingId: bookingDetails.id }
    });
  };

  const handleFavoriteClick = (e, property) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/signin");
      return;
    }

    if (isSaved(property.id)) {
      removeFromFavorites(property.id); // Logic now handles finding the ID
      toast.success("Removed from saved!");
    } else {
      addToFavorites(property.id);
      toast.success("Added to saved!");
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
      // Set the error message to display inside the modal
      setServerError(result.error);
    }
  };

  const closeModal = () => {
    setReportType(null);
    setNewReport({ description: "" });
    setServerError(null);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Check this out!",
      text: "I found something interesting to share with you.",
      url: window.location.href, // Or a specific link
    };

    try {
      // Check if the browser supports the Web Share API
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } else {
        // Fallback: Copy to clipboard or show a custom modal
        alert("Sharing is not supported on this browser. Link copied to clipboard!");
        navigator.clipboard.writeText(window.location.href);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  if (loading) return <AccommodationDetailsSkeleton />;
  if (error || !property) return <p className="text-center mt-32 text-red-500">Property not found</p>;

  // Images
  const images = [property.cover_image, ...(property.images_data?.map(img => img.image) || [])].filter(Boolean);
  const mainImage = activeImage || images[0];

  return (
    <div className="">


      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 ">
        <div className="flex items-center gap-2 md:gap-5 my-2 md:my-5">

          <button
            onClick={() => navigate(-1)}
            className="h-9 w-9 rounded-full flex items-center justify-center
          hover:bg-neutral-200 transition text-2xl "
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-sm md:text-3xl font-semibold">{property.property_type.replace("_", " ")} in {property.city}</h2>
          <p>{property.id}</p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <section className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
              <img
                src={mainImage}
                alt={property.title}
                onError={(e) => { e.target.onerror = null; e.target.src = ImgSkeleton; }}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 md:top-4 right-0 left-0 flex justify-between items-center px-4">
                <span className="flex  text-xs gap-1 text-white bg-black/50 px-3 py-1 rounded-full">
                  <p> Available from : </p> <p> {property.available_from}</p>
                </span>
                <div>

                  <button
                    onClick={(e) => handleFavoriteClick(e, property)}
                    className=" p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all z-10"
                  >
                    {isSaved(property.id) ? (
                      <FaHeart className="text-red-500 animate-pulse" size={18} />
                    ) : (
                      <FiHeart className="text-gray-600 hover:text-red-500" size={18} />
                    )}
                  </button>
                  <button className=" bg-white/80 text-gray-600 rounded-full p-2 shadow-md ml-3" onClick={handleShare}>
                    <IoIosShareAlt size={18} />

                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Image Stack */}
            <div className="absolute bottom-3 right-3 lg:hidden flex items-center">
              <div className={`flex gap-2 transition ${openStack ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none"}`}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveImage(img); setOpenStack(false); }}
                    className="h-14 w-14 rounded-lg overflow-hidden border bg-white"
                  >
                    <img src={img} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
              <button onClick={() => setOpenStack(!openStack)} className="ml-2 w-10 h-10 md:h-12 md:w-12 rounded-full bg-black text-white">
                +{images.length}
              </button>
            </div>

            {/* Desktop Thumbnails */}
            <div className="hidden lg:grid grid-cols-4 gap-3 mt-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`h-28 w-28 rounded-xl overflow-hidden border-2 ${mainImage === img ? "border-black" : "border-transparent hover:border-gray-300"}`}
                >
                  <img
                    src={img}
                    onError={(e) => { e.target.onerror = null; e.target.src = ImgSkeleton; }}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Details */}
          <section className="space-y-3 md:space-y-6">
            {/* Title & Description */}
            <div>
              <div className="flex justify-between">


                <h1 className="text-2xl md:text-3xl font-semibold">{property.title}</h1>
                <button onClick={() => setReportType('property')}>
                  <MdOutlineReportGmailerrorred size={25} />
                </button>
                {reportType && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-5 text-left">
                    <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
                      <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900">
                        <MdOutlineReportGmailerrorred size={25} /> Report this {reportType === 'property' ? 'Property' : 'Landowner'}
                      </h2>

                      {/* ERROR MESSAGE ALERT BOX */}
                      {serverError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                          <span className="font-bold">!</span> {serverError}
                        </div>
                      )}

                      <div className="flex items-center gap-4 bg-stone-50 p-2 rounded-2xl border border-stone-300 ">
                        <img src={mainImage} alt="cover-image" className="w-16 h-16 rounded-xl" />
                        <div>
                          <p className=" text-xs md:text-md text-gray-700">{property.title}</p>
                          <p className=" text-xs md:text-sm text-gray-700">{property.property_type.replace("_", " ")} in {property.city}</p>
                          <p className="font-mono text-xs md:text-sm text-stone-400">{id}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Reason</label>
                        <textarea
                          disabled={reportLoading || serverError} // Disable if already reported
                          value={newReport.description}
                          onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm h-36 outline-none transition-all disabled:opacity-50"
                          placeholder="Describe your issue..."
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button onClick={closeModal} className="px-6 py-2.5 rounded-xl border border-gray-200">
                          Cancel
                        </button>
                        <button
                          type="button"
                          // DISABLE button if loading, if text is empty, OR if serverError exists
                          disabled={reportLoading || !newReport.description.trim() || !!serverError}
                          onClick={() => handleAddReport(reportType)}
                          className="px-6 py-2.5 rounded-xl bg-black text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          {reportLoading ? "Submitting..." : "Submit Report"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600">{property.description}</p>
            </div>



            {/* Price & Booking */}
            <div className="rounded-2xl border bg-white p-3 md:p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xl md:text-3xl font-semibold">€{property.rent_per_month}</span>
                  <span className="text-sm text-gray-500"> / month</span>
                </div>

              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><p className="text-gray-500">Rooms</p><p className="font-medium">{property.rooms}</p></div>
                <div><p className="text-gray-500">Bathrooms</p><p className="font-medium">{property.bathrooms}</p></div>
                <div><p className="text-gray-500">Max people</p><p className="font-medium">{property.max_people}</p></div>
                <div><p className="text-gray-500">Size</p><p className="font-medium">{property.size_m2} m²</p></div>
                <div><p className="text-gray-500">Furnished</p><p className="font-medium">{property.furnished ? "Yes" : "No"}</p></div>
                <div><p className="text-gray-500">Min Stay</p><p className="font-medium">{property.minimum_stay_months} months</p></div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mt-2">
                <div><p className="text-gray-500">DPE Class</p><p className="font-medium">{property.dpe_class}</p></div>
                <div><p className="text-gray-500">GES Class</p><p className="font-medium">{property.ges_class}</p></div>
              </div>

              {/* Action Buttons */}
              <div className="sticky bottom-2 p-3 border rounded-xl bg-white">
                {bookingDetails ? (
                  <>
                    {/* SHOW PAY BUTTON ONLY IF CONFIRMED AND UNPAID */}
                    {bookingDetails.status === "CONFIRMED" && bookingDetails.payment_status === "UNPAID" && (
                      <button
                        onClick={handlePay}
                        className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Pay Now (€{bookingDetails.total_rent_amount})
                      </button>
                    )}

                    {/* CANCEL BUTTON (Visible for PENDING or CONFIRMED) */}
                    <button
                      onClick={handleCancel}
                      disabled={bookingLoading}
                      className="w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      {bookingLoading ? "Processing..." : "Cancel Booking Request"}
                    </button>

                    <p className="text-[10px] text-center text-gray-400 italic">
                      Current Status: {bookingDetails.status}
                    </p>
                  </>
                ) : (
                  /* DEFAULT REQUEST BUTTON */
                  <button
                    onClick={openBookingModal}
                    className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
                  >
                    Request booking
                  </button>
                )}

                {isBookingModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-left">
                      <h2 className="text-xl font-bold text-gray-900">Booking Request</h2>

                      <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-800">
                        <p>• Available from: <strong>{property.available_from}</strong></p>
                        <p>• Minimum stay: <strong>{property.minimum_stay_months} months</strong></p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-700">Start Date</label>
                          <input
                            type="date"
                            // Disables all dates before the valid start date
                            min={getEarliestStartDate()}
                            value={bookingData.start_date}
                            className="w-full border border-gray-200 rounded-xl p-2.5 text-sm"
                            onChange={(e) => {
                              const newStart = e.target.value;
                              setBookingData({
                                ...bookingData,
                                start_date: newStart,
                                // Optional: Auto-update end date when start date changes
                                end_date: addMonths(newStart, property.minimum_stay_months)
                              });
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold">End Date</label>
                          <input
                            type="date"
                            min={addMonths(bookingData.start_date, 1)} // Must be at least 1 month from start
                            value={bookingData.end_date}
                            className="w-full border rounded-xl p-2 text-sm"
                            onChange={(e) => setBookingData({ ...bookingData, end_date: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-700">Message to Room Owner (Optional)</label>
                        <textarea
                          placeholder="Tell the landlord about yourself..."
                          className="w-full border border-gray-200 rounded-xl p-3 text-sm h-24 focus:ring-2 focus:ring-black outline-none"
                          value={bookingData.tenant_message}
                          onChange={(e) => setBookingData({ ...bookingData, tenant_message: e.target.value })}
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => setIsBookingModalOpen(false)}
                          className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleConfirmBooking}
                          disabled={bookingLoading}
                          className="flex-1 py-3 bg-black text-white rounded-xl font-medium disabled:bg-gray-400 transition"
                        >
                          {bookingLoading ? "Sending..." : "Confirm & Pay"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* <button className="w-full border py-2.5 rounded-lg">
                Chat with landlord
              </button> */}
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-sm font-semibold mb-2">Amenities</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {property.amenities_data?.map(a => (
                  <span key={a.amenity_id} className="px-3 py-1 border rounded-full">{a.amenity_name}</span>
                ))}
              </div>
            </div>

            {/* Address & Location */}
            <div>
              <h2 className="text-sm font-semibold mb-2">Address</h2>
              <p className="text-xs text-gray-700">{property.address}, {property.city}, {property.region}, {property.country}</p>
              {/* Map placeholder */}
              <div className="mt-4">
                <h2 className="text-sm font-semibold mb-2">Map</h2>


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
                  ></iframe>
                </div>
              </div>

            </div>

            {/* Listing Info */}
            <div className="text-xs text-gray-500">
              <p>Listed on: {new Date(property.created_at).toLocaleDateString()}</p>
            </div>

          </section>
        </div>
      </main >
    </div >
  );
};

export default AccommodationDetails;
