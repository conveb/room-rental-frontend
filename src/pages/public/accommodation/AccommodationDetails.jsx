import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { demoRooms } from "./roomsData";

const AccommodationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentRoom =
    demoRooms.find((r) => String(r.id) === String(id)) || demoRooms[0];

  const images = [
    currentRoom.img,
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  ];

  const [activeImage, setActiveImage] = useState(images[0]);
  const [openStack, setOpenStack] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="border-b bg-black">
        <div className="max-w-6xl mx-auto px-4 py-12">

        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* BREADCRUMB */}
        <div className="text-xs text-gray-500 mb-4">
          Home / France / {currentRoom.city} /{" "}
          <span className="text-gray-700 font-medium">
            {currentRoom.type}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* IMAGE SECTION */}
          <section className="relative">
            {/* MAIN IMAGE */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-200">
              <img
                src={activeImage}
                alt="Room"
                className="h-full w-full object-cover"
              />
            </div>

            {/* ---------------- MOBILE STACK ---------------- */}
            <div className="absolute bottom-3 right-3 flex items-center lg:hidden">
              <div
                className={`flex items-center gap-2 transition-all duration-300 ${openStack
                    ? "translate-x-0 opacity-100"
                    : "translate-x-12 opacity-0 pointer-events-none"
                  }`}
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveImage(img);
                      setOpenStack(false);
                    }}
                    className={`h-14 w-14 overflow-hidden rounded-lg border-2 ${activeImage === img
                        ? "border-black"
                        : "border-white"
                      } bg-white shadow`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setOpenStack(!openStack)}
                className="ml-2 h-12 w-12 rounded-full bg-black text-white text-sm shadow-lg flex items-center justify-center"
              >
                +{images.length}
              </button>
            </div>

            <div className="hidden lg:flex gap-3 mt-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`h-28 w-28 overflow-hidden rounded-xl border-2 transition ${activeImage === img
                      ? "border-black"
                      : "border-transparent hover:border-gray-300"
                    }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* DETAILS */}
          <section className="space-y-6">
            <div>
              <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
                {currentRoom.type} in {currentRoom.city}, France
              </h1>
              <p className="mt-2 text-xs md:text-sm text-gray-600">
                Comfortable student-friendly accommodation close to local
                universities and public transport.
              </p>
            </div>

            {/* PRICE CARD */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-semibold text-gray-900">
                    €{currentRoom.price}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">
                    / month
                  </span>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Available from {currentRoom.availableFrom}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-gray-500">Rooms</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {currentRoom.rooms}{" "}
                    {currentRoom.rooms > 1 ? "rooms" : "room"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">City</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {currentRoom.city}, France
                  </p>
                </div>
              </div>

              <button
                className="w-full mt-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
                onClick={() => navigate("/payment", { state: { room: currentRoom } })}
              >
                Request booking
              </button>

              <button className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-800 hover:border-gray-900 hover:bg-gray-50 transition">
                Chat with landlord
              </button>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-2">
                Room description
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                This {currentRoom.type.toLowerCase()} offers a bright
                living space with a comfortable bed, study desk,
                storage, and access to shared facilities. Ideal for
                students staying in {currentRoom.city}.
              </p>
            </div>

            {/* AMENITIES */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-2">
                Amenities
              </h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  "High-speed Wi-Fi",
                  "Study desk & chair",
                  "Heating included",
                  "Shared kitchen",
                  "Laundry nearby",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700"
                  >
                    {item}
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
