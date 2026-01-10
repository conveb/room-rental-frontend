import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePropertyDetails } from "../../../hooks/property/usePropertyDetails";
import ImgSkeleton from '../../../Assets/pngs/img_skeleton.png'

const AccommodationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { property, loading, error } = usePropertyDetails(id);

  const [activeImage, setActiveImage] = useState(null);
  const [openStack, setOpenStack] = useState(false);

  if (loading) return <p className="text-center mt-32">Loading property...</p>;
  if (error || !property) return <p className="text-center mt-32 text-red-500">Property not found</p>;

  // Images
  const images = [property.cover_image, ...(property.images_data?.map(img => img.image) || [])].filter(Boolean);
  const mainImage = activeImage || images[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-black">
        <div className="max-w-6xl mx-auto px-4 py-12" />
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {/* <div className="text-xs text-gray-500 mb-4">
          Home / {property.country} / {property.city} /{" "}
          <span className="text-gray-700 font-medium">{property.title}</span>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <section className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
              <img
                src={mainImage}
                alt={property.title}
                onError={(e) => { e.target.onerror = null; e.target.src = ImgSkeleton; }}
                className="h-full w-full object-contain"
              />
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
          <section className="space-y-6">
            {/* Title & Description */}
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">{property.property_type.replace("_", " ")} in {property.city}</h1>
              <p className="mt-2 text-sm text-gray-600">{property.description}</p>
            </div>

            {/* Price & Booking */}
            <div className="rounded-2xl border bg-white p-3 md:p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xl md:text-3xl font-semibold">€{property.rent_per_month}</span>
                  <span className="text-sm text-gray-500"> / month</span>
                </div>
                <span className="flex flex-col text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                 <p> Available from :</p> <p>{property.available_from}</p>
                </span>
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
              <div className="sticky bottom-0 p-3 border rounded-xl bg-white">
              <button onClick={() => navigate("/payment", { state: { property } })} className=" w-full bg-black text-white py-2.5 rounded-lg">
                Request booking
              </button>
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
      </main>
    </div>
  );
};

export default AccommodationDetails;
