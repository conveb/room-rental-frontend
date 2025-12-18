import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePropertyDetails } from "../../../hooks/property/usePropertyDetails";

const AccommodationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { property, loading, error } = usePropertyDetails(id);

  const [activeImage, setActiveImage] = useState(null);
  const [openStack, setOpenStack] = useState(false);

  if (loading) {
    return <p className="text-center mt-32">Loading property...</p>;
  }

  if (error || !property) {
    return (
      <p className="text-center mt-32 text-red-500">
        Property not found
      </p>
    );
  }

  /* IMAGES */
  const images = [
    property.cover_image,
    ...(property.images_data?.map((img) => img.image) || []),
  ].filter(Boolean);

  const mainImage = activeImage || images[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-black">
        <div className="max-w-6xl mx-auto px-4 py-12" />
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* BREADCRUMB */}
        <div className="text-xs text-gray-500 mb-4">
          Home / {property.country} / {property.city} /{" "}
          <span className="text-gray-700 font-medium">
            {property.title}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* IMAGE SECTION */}
          <section className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
              <img
                src={mainImage}
                alt={property.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* MOBILE STACK */}
            <div className="absolute bottom-3 right-3 lg:hidden flex items-center">
              <div
                className={`flex gap-2 transition ${
                  openStack
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12 pointer-events-none"
                }`}
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveImage(img);
                      setOpenStack(false);
                    }}
                    className="h-14 w-14 rounded-lg overflow-hidden border bg-white"
                  >
                    <img src={img} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setOpenStack(!openStack)}
                className="ml-2 h-12 w-12 rounded-full bg-black text-white"
              >
                +{images.length}
              </button>
            </div>

            {/* DESKTOP THUMBNAILS */}
            <div className="hidden lg:flex gap-3 mt-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`h-28 w-28 rounded-xl overflow-hidden border-2 ${
                    mainImage === img
                      ? "border-black"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img src={img} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </section>

          {/* DETAILS */}
          <section className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold">
                {property.property_type.replace("_", " ")} in {property.city}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                {property.description}
              </p>
            </div>

            {/* PRICE CARD */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-3xl font-semibold">
                    €{property.rent_per_month}
                  </span>
                  <span className="text-sm text-gray-500"> / month</span>
                </div>
                <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                  Available from {property.available_from}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-gray-500">Rooms</p>
                  <p className="font-medium">{property.rooms}</p>
                </div>
                <div>
                  <p className="text-gray-500">Max people</p>
                  <p className="font-medium">{property.max_people}</p>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate("/payment", { state: { property } })
                }
                className="w-full bg-black text-white py-2.5 rounded-lg"
              >
                Request booking
              </button>

              <button className="w-full border py-2.5 rounded-lg">
                Chat with landlord
              </button>
            </div>

            {/* AMENITIES */}
            <div>
              <h2 className="text-sm font-semibold mb-2">Amenities</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {property.amenities_data?.map((a) => (
                  <span
                    key={a.id}
                    className="px-3 py-1 border rounded-full"
                  >
                    Amenity
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AccommodationDetails;
