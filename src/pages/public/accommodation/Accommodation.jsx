import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import { useProperties } from "../../../hooks/property/useProperties";
import { FaSearch } from "react-icons/fa";
import ImgSkeleton from '../../../Assets/pngs/img_skeleton.png'
const Accommodation = () => {
  const {
    loading,
    error,
    filteredProperties,
    handleFilterChange,
    applyFilters,
  } = useProperties();

  const [showFilters, setShowFilters] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      applyFilters();
      setShowFilters(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-14">
      {/* HEADER */}
      <div className="bg-black px-4 md:px-20 pb-6">
        <h1 className="text-2xl md:text-4xl font-semibold text-white text-center mb-6 pt-24 md:pt-28">
          Find Rooms
        </h1>

        {/* SEARCH BAR */}
        <div className="bg-white p-2 rounded-2xl shadow-xl   relative">
          <div className="grid grid-cols-12 md:grid-cols-12 gap-2">
            {/* CITY */}
            <input
              name="city"
              placeholder="City"
              onChange={handleFilterChange}
              onKeyDown={handleKeyDown}
              className="col-span-4 md:col-span-5 w-full text-sm bg-gray-50 px-4 py-3 rounded-xl"
            />

            {/* PRICE */}
            <input
              name="budget"
              type="number"
              placeholder="Max €"
              onChange={handleFilterChange}
              onKeyDown={handleKeyDown}
              className="col-span-4 md:col-span-5 w-full text-sm bg-gray-50 px-4 py-3 rounded-xl"
            />

            {/* FILTER */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="col-span-2 md:col-span-1 w-full bg-gray-100 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <FiFilter size={16} />
            </button>

            {/* SEARCH */}
            <button
              onClick={applyFilters}
              className="col-span-2 md:col-span-1 w-full flex items-center justify-center  bg-black text-white rounded-xl font-medium "
            >
              <FaSearch size={16} />
            </button>
          </div>

          {/* FILTER POPUP */}
          {/* FILTER MODAL */}
          {showFilters && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* BACKDROP */}
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              />

              {/* MODAL */}
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 z-50">
                <h3 className="text-lg font-semibold mb-4">
                  Filters
                </h3>

                <input
                  name="date"
                  type="date"
                  onChange={handleFilterChange}
                  className="w-full text-sm bg-gray-50 px-4 py-3 rounded-xl mb-4"
                />

                <select
                  name="type"
                  onChange={handleFilterChange}
                  className="w-full text-sm bg-gray-50 px-4 py-3 rounded-xl mb-4"
                >
                  <option value="">Type</option>
                  <option value="ENTIRE_HOME">Entire Home</option>
                  <option value="PRIVATE_ROOM">Private Room</option>
                  <option value="SHARED_ROOM">Shared Room</option>
                  <option value="STUDIO">Studio</option>
                </select>

                <select
                  name="rooms"
                  onChange={handleFilterChange}
                  className="w-full text-sm bg-gray-50 px-4 py-3 rounded-xl mb-6"
                >
                  <option value="">Rooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 bg-gray-100 py-3 rounded-xl"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      applyFilters();
                      setShowFilters(false);
                    }}
                    className="flex-1 bg-black text-white py-3 rounded-xl"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* STATES */}
      {loading && (
        <p className="text-center mt-10">Loading properties...</p>
      )}

      {error && (
        <p className="text-center text-red-500 mt-10">{error}</p>
      )}

      {/* PROPERTY LIST */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-20 mt-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={property.cover_image}
              alt={property.title}
              onError={(e) => { e.target.onerror = null; e.target.src = ImgSkeleton; }}
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

      {!loading && filteredProperties.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No properties match your filters.
        </p>
      )}
    </div>
  );
};

export default Accommodation;
