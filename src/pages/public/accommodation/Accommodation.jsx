import React from "react";
import { Link } from "react-router-dom";
import { useProperties } from "../../../hooks/property/useProperties";

const Accommodation = () => {
  const {
    filters,
    loading,
    error,
    filteredProperties,
    handleFilterChange,
    applyFilters,
  } = useProperties();

  return (
    <div className="min-h-screen bg-gray-50 pb-14">
      <div className="bg-black px-4 md:px-20 pb-1">
        <h1 className="text-3xl md:text-4xl font-semibold text-white text-center mb-6 pt-28">
          Find Rooms in France
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
            <option value="Private Room">Private Room</option>
            <option value="Shared Room">Shared Room</option>
            <option value="Studio">Studio</option>
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

      {/* LIST */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-20">
        {filteredProperties.map((room) => (
          <div key={room.id} className="bg-white rounded-2xl shadow-lg">
            <img
              src={room.img}
              className="w-full h-52 object-cover"
              alt=""
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold">{room.type}</h2>
              <p className="text-gray-500">{room.city}, France</p>

              <p className="mt-2 font-medium">€{room.price}/month</p>
              <p className="text-sm text-gray-500">
                Rooms: {room.rooms}
              </p>

              <Link
                to={`/accommodation/${room.id}`}
                className="block mt-4 bg-black text-white py-2 rounded-lg text-center"
              >
                View details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProperties.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-10">
          No rooms match your filters.
        </p>
      )}
    </div>
  );
};

export default Accommodation;
