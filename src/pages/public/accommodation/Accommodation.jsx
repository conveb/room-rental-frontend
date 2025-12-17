import React from "react";
import { Link } from "react-router-dom";
import { useProperties } from "../../../hooks/property/useProperties";

const Accommodation = () => {
  const {
    loading,
    error,
    filteredProperties,
    handleFilterChange,
    applyFilters,
  } = useProperties();

  return (
    <div className="min-h-screen bg-gray-50 pb-14">
      {/* HEADER */}
      <div className="bg-black px-4 md:px-20 pb-1">
        <h1 className="text-3xl md:text-4xl font-semibold text-white text-center mb-6 pt-28">
          Find Rooms
        </h1>

        {/* FILTERS */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 bg-white p-3 rounded-2xl shadow-xl mb-6">
          <input
            name="city"
            placeholder="City"
            onChange={handleFilterChange}
            className="text-sm bg-gray-50 px-4 py-3 rounded-xl"
          />

          <input
            name="date"
            type="date"
            onChange={handleFilterChange}
            className="text-sm bg-gray-50 px-4 py-3 rounded-xl"
          />

          <select
            name="type"
            onChange={handleFilterChange}
            className="text-sm bg-gray-50 px-4 py-3 rounded-xl"
          >
            <option value="">Type</option>
            <option value="PRIVATE_ROOM">Private Room</option>
            <option value="SHARED_ROOM">Shared Room</option>
            <option value="STUDIO">Studio</option>
          </select>

          <input
            name="budget"
            type="number"
            placeholder="Max €"
            onChange={handleFilterChange}
            className="text-sm bg-gray-50 px-4 py-3 rounded-xl"
          />

          <select
            name="rooms"
            onChange={handleFilterChange}
            className="text-sm bg-gray-50 px-4 py-3 rounded-xl"
          >
            <option value="">Rooms</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <button
            onClick={applyFilters}
            className="bg-black text-white rounded-xl px-4 py-3"
          >
            Search
          </button>
        </div>
      </div>

      {/* STATES */}
      {loading && <p className="text-center mt-10">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-10">{error}</p>}

      {/* PROPERTY LIST */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-20">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            {/* COVER IMAGE */}
            <img
              src={
                property.cover_image ||
                "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={property.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold">
                {property.title}
              </h2>

              <p className="text-gray-500 text-sm">
                {property.city}, {property.country}
              </p>

              <p className="mt-2 font-medium">
                €{property.rent_per_month} / month
              </p>

              <p className="text-sm text-gray-500">
                Rooms: {property.rooms} · Max {property.max_people} people
              </p>

              <Link
                to={`/accommodation/${property.id}`}
                className="block mt-4 bg-black text-white py-2 rounded-lg text-center"
              >
                View details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* NO RESULTS */}
      {!loading && filteredProperties.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No properties match your filters.
        </p>
      )}
    </div>
  );
};

export default Accommodation;
