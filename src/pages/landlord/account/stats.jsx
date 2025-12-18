import React, { useState } from "react";

/* MOCK DATA */
const mockBookings = [
  { id: 1, property: "Sunshine Apartments", tenant: "Rahul Sharma", date: "2025-12-15", amount: "₹25,000", status: "Completed" },
  { id: 2, property: "Green Valley PG", tenant: "Priya Singh", date: "2025-12-12", amount: "₹18,000", status: "Pending" },
  { id: 3, property: "City Heights", tenant: "Amit Patel", date: "2025-12-10", amount: "₹22,000", status: "Cancelled" },
  { id: 4, property: "Skyline Residency", tenant: "Rohan Mehta", date: "2025-12-08", amount: "₹30,000", status: "Completed" },
  { id: 5, property: "Lotus Homes", tenant: "Ananya Roy", date: "2025-12-05", amount: "₹20,000", status: "Pending" },
];

const earningsSummary = {
  thisMonth: 95000,
  lastMonth: 87000,
  total: 350000,
};

export default function Stats() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Filter + Search
  const filteredBookings = mockBookings.filter((b) => {
    const matchesSearch =
      b.property.toLowerCase().includes(search.toLowerCase()) ||
      b.tenant.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || b.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Bookings & Earnings</h1>
          <p className="text-gray-600 text-sm mt-1">View all bookings and your earnings summary</p>
        </div>

        {/* EARNINGS SUMMARY */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white/80 rounded-xl shadow-sm p-4 text-center">
            <p className="text-sm text-gray-500">This Month</p>
            <p className=" text-xl font-semibold text-gray-900">
              ₹{earningsSummary.thisMonth.toLocaleString()}
            </p>
          </div>

          <div className="bg-white/80 rounded-xl shadow-sm p-4 text-center">
            <p className="text-sm text-gray-500">Last Month</p>
            <p className="text-xl font-semibold text-gray-900">
              ₹{earningsSummary.lastMonth.toLocaleString()}
            </p>
          </div>

          {/* Full width only on small screens */}
          <div className="bg-white/80 rounded-xl shadow-sm p-4 text-center col-span-2 sm:col-span-1">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-xl font-semibold text-gray-900">
              ₹{earningsSummary.total.toLocaleString()}
            </p>
          </div>
        </div>


        {/* SEARCH & FILTER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <input
            type="text"
            placeholder="Search by property or tenant..."
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
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* BOOKINGS TABLE */}
       <div className="space-y-4">
  {/* Desktop Table */}
  <div className="hidden sm:block bg-white/80 shadow-sm rounded-xl overflow-hidden">
    <table className="min-w-full table-auto border-collapse">
      <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
        <tr>
          <th className="px-4 py-2 text-left">Property</th>
          <th className="px-4 py-2 text-left">Tenant</th>
          <th className="px-4 py-2 text-left">Date</th>
          <th className="px-4 py-2 text-left">Amount</th>
          <th className="px-4 py-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y text-sm text-gray-700">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => (
            <tr key={b.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 font-medium">{b.property}</td>
              <td className="px-4 py-2">{b.tenant}</td>
              <td className="px-4 py-2">{b.date}</td>
              <td className="px-4 py-2 font-semibold">{b.amount}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    b.status === "Completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : b.status === "Pending"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {b.status}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
              No bookings found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Mobile Cards */}
  <div className="block sm:hidden space-y-3">
    {filteredBookings.length > 0 ? (
      filteredBookings.map((b) => (
        <div key={b.id} className="bg-white/80 rounded-xl shadow p-4 space-y-2">
          <div className="flex justify-between">
            <p className="font-semibold">{b.property}</p>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                b.status === "Completed"
                  ? "bg-emerald-100 text-emerald-700"
                  : b.status === "Pending"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {b.status}
            </span>
          </div>
          <p className="text-gray-600 text-sm">Tenant: {b.tenant}</p>
          <p className="text-gray-600 text-sm">Date: {b.date}</p>
          <p className="font-semibold">Amount: {b.amount}</p>
        </div>
      ))
    ) : (
      <div className="text-center text-gray-500 py-4">No bookings found.</div>
    )}
  </div>
</div>


      </div>
    </div>
  );
}
