// src/pages/public/accommodation/Accommodation.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { demoRooms } from "./roomsData";

const Accommodation = () => {
  // FILTER STATES
  const [filters, setFilters] = useState({
    city: "",
    date: "",
    type: "",
    budget: "",
    rooms: "",
  });

  const [filteredRooms, setFilteredRooms] = useState(demoRooms);

  // HANDLE FILTERS
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    let data = demoRooms;

    if (filters.city) {
      data = data.filter((r) =>
        r.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.date) {
      data = data.filter((r) => r.availableFrom >= filters.date);
    }

    if (filters.type) {
      data = data.filter((r) => r.type === filters.type);
    }

    if (filters.budget) {
      data = data.filter((r) => r.price <= Number(filters.budget));
    }

    if (filters.rooms) {
      data = data.filter((r) => r.rooms === Number(filters.rooms));
    }

    setFilteredRooms(data);
  };
  const [openFilters, setOpenFilters] = useState(false);


  return (
    <div className="min-h-screen bg-gray-50 pb-14">
      <div className="bg-black px-4 md:px-20 pb-1">
        <h1 className="text-3xl md:text-4xl font-semibold text-white text-center mb-2 md:mb-6 pt-28">
          Find Rooms in France
        </h1>

        {/* FILTER SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 bg-white p-3 rounded-2xl shadow-xl mb-3 md:mb-6">
          {/* CITY */}
          <input
            name="city"
            type="text"
            placeholder="City (Paris, Lyon...)"
            onChange={handleChange}
            className="text-xs md:text-sm border bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
          />

          {/* DATE */}
          <input
            name="date"
            type="date"
            onChange={handleChange}
            className="text-xs md:text-sm w-full text-gray-400 bg-gray-50 px-3 md:px-6 py-3 md:py-4 rounded-full text-center text-black cursor-pointer outline-none appearance-none"
            defaultValue="2024-06-01"
          />

          {/* TYPE */}
          <select
            name="type"
            onChange={handleChange}
            className="text-xs md:text-sm border bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="">Accommodation Type</option>
            <option value="Private Room">Private Room</option>
            <option value="Shared Room">Shared Room</option>
            <option value="Studio">Studio</option>
          </select>

          {/* BUDGET */}
          <input
            name="budget"
            type="number"
            placeholder="Max Budget (€)"
            onChange={handleChange}
            className="text-xs md:text-sm border bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
          />

          {/* ROOMS */}
          <select
            name="rooms"
            onChange={handleChange}
            className="text-xs md:text-sm border bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="">Rooms</option>
            <option value="1">1 Room</option>
            <option value="2">2 Rooms</option>
          </select>

          {/* SEARCH BTN */}
          <button
            onClick={handleSearch}
            className="bg-black text-white rounded-xl px-4 py-3 text-sm hover:bg-gray-900 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* ROOMS LIST */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 px-4 md:px-20 pt-3 md:pt-4">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            <img
              src={room.img}
              className="w-full h-52 object-cover"
              alt="room"
            />

            <div className="p-3 md:p-6">
              <h2 className="text-md md:text-xl font-semibold text-gray-900">
                {room.type}
              </h2>
              <p className="text-gray-600 mt-1 text-xs md:text-sm">
                {room.city}, France
              </p>

              <p className="mt-3 text-lg font-medium text-gray-900">
                €{room.price} / month
              </p>

              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Rooms: {room.rooms}
              </p>

              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Available: {room.availableFrom}
              </p>

              <Link
                to={`/accommodation/${room.id}`}
                className="block w-full bg-black text-white py-2 rounded-lg text-sm text-center hover:bg-gray-900 transition mt-4"
              >
                View details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* NO RESULTS */}
      {filteredRooms.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No rooms match your filters.
        </p>
      )}
    </div>
  );
};

export default Accommodation;
