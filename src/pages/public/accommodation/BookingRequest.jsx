import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaWhatsapp, FaChevronDown, FaBed, FaFileContract } from "react-icons/fa";
import { TbMapPin, TbHome, TbBath, TbUsers, TbRuler, TbCalendar, TbDoor, TbBuildingCommunity } from "react-icons/tb";
import { FaEnvira } from "react-icons/fa6";
import { RiGovernmentLine, RiHandCoinLine } from "react-icons/ri";
import ImgSkeleton from "../../../Assets/pngs/img_skeleton.png";
import { MdEuro, MdOutlineVerified } from "react-icons/md";
import { BsCalendarCheck } from "react-icons/bs";

const BookingRequest = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const property = state?.property;

  const [detailsOpen, setDetailsOpen] = useState(() => window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setDetailsOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!property) return (
    <p className="text-center mt-32 text-red-500">Property not found.</p>
  );

  const propertyAddress = [property.address, property.city, property.region, property.country]
    .filter(Boolean)
    .join(", ");

  const handleWhatsAppRequest = () => {
    const message = [
      `*🏠 Booking Request*`,
      ``,
      `*${property.title}*`,
      `📍 ${propertyAddress}`,
      `Type: ${property.property_type?.replace(/_/g, " ")}`,
      ``,
      `*💰 Rent & Financials*`,
      `Rent: €${property.rent_per_month} / month`,
      `Charges: ${property.charges ? `€${property.charges}` : "Not included"}`,
      `Deposit: €${property.security_deposit}`,
      `CAF Eligible: ${property.is_caf_eligible ? "Yes" : "No"}`,
      ``,
      `*📅 Availability*`,
      `Available From: ${property.available_from}`,
      `Minimum Stay: ${property.minimum_stay_months} month${property.minimum_stay_months !== 1 ? "s" : ""}`,
      `Domicile Allowed: ${property.is_domicile_allowed ? "Yes" : "No"}`,
      ``,
      `*🏗️ Property Details*`,
      `Rooms: ${property.rooms} (${property.bhk} BHK)`,
      `Bathrooms: ${property.bathrooms}`,
      `Max Occupancy: ${property.max_people} people`,
      `Size: ${property.size_m2} m²`,
      `Furnished: ${property.furnished ? "Yes" : "No"}`,
      `Contract Provided: ${property.contract ? "Yes" : "No"}`,

      ...(property.amenities_data?.length > 0 ? [
        ``,
        `*✨ Facilities*`,
        ...property.amenities_data.map((a) => `- ${a.amenity_name}`),
      ] : []),

      ``,
      `I am interested in booking this property. Please provide the next steps for a viewing or reservation.`,
    ].join("\n");

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/917994317698?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-stone-200 transition"
          >
            <FaArrowLeft size={15} />
          </button>
          <h1 className="text-xl font-semibold tracking-tight">Request Booking</h1>
        </div>

        {/* Property Card */}
        <div className="rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm">

          {/* Cover image */}
          <div className="relative h-52 bg-stone-200 overflow-hidden">
            <img
              src={property.cover_image || ImgSkeleton}
              alt={property.title}
              onError={(e) => { e.target.onerror = null; e.target.src = ImgSkeleton; }}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-white font-semibold text-lg leading-tight">{property.title}</p>
              <p className="text-white/80 text-xs flex items-center gap-1 mt-0.5">
                <TbMapPin size={12} /> {propertyAddress}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="px-4 py-3 border-b border-stone-100">
            <span className="text-2xl font-bold">€{property.rent_per_month}</span>
            <span className="text-sm text-stone-400"> / month</span>
          </div>

          {/* Toggle button */}
          <button
            onClick={() => setDetailsOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
          >
            <span>Show Property Details</span>
            <FaChevronDown
              size={13}
              className={`transition-transform duration-300 ${detailsOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>

          {/* Collapsible content */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${detailsOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2 px-4 pb-4">
              {[
                { icon: <MdEuro size={20} />, label: "Charges", value: property.charges ? `€ ${property.charges}` : "—" },
                { icon: <RiHandCoinLine size={20} />, label: "Deposit", value: property.security_deposit ? `€ ${property.security_deposit}` : "—" },
                { icon: <TbDoor size={20} />, label: "Rooms", value: property.rooms },
                { icon: <TbBath size={20} />, label: "Bathrooms", value: property.bathrooms },
                { icon: <FaBed size={20} />, label: "BHK", value: property.bhk },
                { icon: <TbUsers size={20} />, label: "Max People", value: property.max_people },
                { icon: <TbRuler size={20} />, label: "Size", value: `${property.size_m2} m²` },
                { icon: <TbHome size={20} />, label: "Furnished", value: property.furnished ? "Yes" : "No" },
                { icon: <TbBuildingCommunity size={20} />, label: "Type", value: property.property_type?.replace("_", " ") },
                { icon: <TbCalendar size={20} />, label: "Min Stay", value: `${property.minimum_stay_months} months` },
                { icon: <BsCalendarCheck size={20} />, label: "Available From", value: property.available_from },
                { icon: <MdOutlineVerified size={20} />, label: "CAF Eligible", value: property.is_caf_eligible ? "Yes" : "No" },
                { icon: <RiGovernmentLine size={20} />, label: "Domicile", value: property.is_domicile_allowed ? "Yes" : "No" },
                { icon: <FaFileContract size={20} />, label: "Contract", value: property.contract ? "Yes" : "No" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex gap-2 items-center bg-stone-50 p-2 rounded-xl text-xs">
                  <span className="text-stone-400">{icon}</span>
                  <div>
                    <p className="text-stone-400">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability info */}
            <div className="mx-4 mb-4 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 text-xs text-blue-800 space-y-1">
              <p>• Available from: <strong>{property.available_from}</strong></p>
              <p>• Minimum stay: <strong>{property.minimum_stay_months} month{property.minimum_stay_months !== 1 ? "s" : ""}</strong></p>
            </div>

            {/* Amenities */}
            {property.amenities_data?.length > 0 && (
              <div className="mx-4 mb-4 border-t border-stone-100 pt-4">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">Facilities</p>
                <div className="flex flex-wrap gap-2">
                  {property.amenities_data.map((a) => (
                    <span key={a.amenity_id} className="px-3 py-1 border border-stone-200 rounded-full text-xs text-stone-600">
                      {a.amenity_name}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pb-8">
          <button
            onClick={handleWhatsAppRequest}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={20} />
            Request via WhatsApp
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full border border-stone-300 text-stone-700 py-3 rounded-xl font-medium hover:bg-stone-100 transition-colors text-sm"
          >
            Back to Listing
          </button>
        </div>

      </main>
    </div>
  );
};

export default BookingRequest;