import React, { useState } from "react";

const mockProperties = [
  { id: 1, name: "Sunshine Apartments", location: "Bandra, Mumbai", rent: "₹25,000", status: "Pending" },
  { id: 2, name: "Green Valley PG", location: "Koramangala", rent: "₹18,000", status: "Active" },
  { id: 3, name: "City Heights", location: "South Delhi", rent: "₹22,000", status: "Rejected" },
  { id: 4, name: "Skyline Residency", location: "Andheri, Mumbai", rent: "₹30,000", status: "Active" },
  { id: 5, name: "Lotus Homes", location: "Whitefield, Bangalore", rent: "₹20,000", status: "Pending" },
];

export default function PropertiesList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Filter + Search
  const filteredProperties = mockProperties.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Your Properties</h1>
          <p className="text-gray-600 text-sm mt-1">Manage your posted properties</p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 text-xs md:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 text-xs md:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* PROPERTY GRID */}
        <div className=" grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((p) => (
              <div
                key={p.id}
                className="relative bg-white shadow-sm rounded-xl overflow-hidden flex flex-col"
              >
                <div className="h-40 w-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  Property Image
                </div>

                <div className="p-2 md:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                    <p className="text-xs md:text-sm text-gray-600 text-sm mt-1">{p.location}</p>
                    <p className="text-xs md:text-sm text-gray-800 font-medium mt-2">{p.rent}</p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                        p.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : p.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {p.status}
                    </span>

                    
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No properties found.</p>
          )}
        </div>

      </div>
    </div>
  );
}
