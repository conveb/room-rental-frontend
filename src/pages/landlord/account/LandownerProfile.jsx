import React, { useState } from "react";
import colors from "../../../theme/colors";
import { Link } from "react-router-dom";

/* MOCK DATA (UNCHANGED) */
const mockData = {
  stats: {
    totalUsers: 12456,
    totalStudents: 8567,
    totalLandlords: 3899,
    totalListings: 2345,
    activeListings: 1890,
    bookingsToday: 45,
    bookingsMonth: 1567,
    totalRevenue: 2456789,
    commissionEarned: 489357,
    pendingApprovals: 23,
    disputes: 12,
  },
  bookingsMonthly: [320, 450, 380, 620, 780, 950, 1120],
  topCities: [
    { name: "Mumbai", demand: 45 },
    { name: "Delhi", demand: 38 },
    { name: "Bangalore", demand: 32 },
    { name: "Pune", demand: 28 },
    { name: "Hyderabad", demand: 25 },
  ],
};
const mockDataUsers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", bookings: 5, status: "Active" },
  { id: 2, name: "Priya Singh", email: "priya@example.com", bookings: 12, status: "Active" },
  { id: 3, name: "Amit Patel", email: "amit@example.com", bookings: 3, status: "Blocked" },
];

const mockDataProperties = [
  { name: "Sunshine Apartments", location: "Bandra, Mumbai", rent: "₹25,000", status: "Pending" },
  { name: "Green Valley PG", location: "Koramangala", rent: "₹18,000", status: "Active" },
  { name: "City Heights", location: "South Delhi", rent: "₹22,000", status: "Rejected" },
];


export default function LandOwnerProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  /* ---------- OVERVIEW ---------- */
  const renderOverview = () => (
    <div className="space-y-8 md:space-y-10">
      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Users", value: mockData.stats.totalUsers },
          { label: "Students", value: mockData.stats.totalStudents },
          { label: "Landlords", value: mockData.stats.totalLandlords },
          { label: "Listings", value: mockData.stats.totalListings },
          { label: "Active Listings", value: mockData.stats.activeListings },
          { label: "Bookings Today", value: mockData.stats.bookingsToday },
          {
            label: "Total Revenue",
            value: `₹${mockData.stats.totalRevenue.toLocaleString()}`,
          },
          {
            label: "Commission Earned",
            value: `₹${mockData.stats.commissionEarned.toLocaleString()}`,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-lg p-4 sm:p-6"
          >
            <p className="text-xs sm:text-sm text-gray-500">{item.label}</p>
            <p className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">
            Monthly Bookings Overview
          </h3>
          <div className="h-48 sm:h-56 md:h-64 rounded-xl bg-gradient-to-br from-indigo-50 to-slate-100 flex items-center justify-center text-gray-500 text-sm">
            {mockData.bookingsMonthly.join(" • ")}
          </div>
        </div>

        <div className="rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">
            Top Cities by Demand
          </h3>
          <div className="space-y-3">
            {mockData.topCities.map((city, i) => (
              <div
                key={i}
                className="flex justify-between items-center rounded-xl border border-gray-100 px-4 py-3"
              >
                <span className="font-medium text-sm sm:text-base">
                  {city.name}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-indigo-600">
                  {city.demand}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ---------- USERS ---------- */
  const renderUsers = () => (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
      <div className="px-4 sm:px-6 py-3 md:py-4 border-b">
        <h2 className="text-lg sm:text-xl font-semibold">Student Accounts</h2>
      </div>

      <div className="block sm:hidden space-y-3 p-2 md:p-4">
        {/* MOBILE: stacked cards */}
        {mockDataUsers.map((u, i) => (
          <div className="relative bg-white/80 rounded-xl shadow p-2 md:p-4 space-y-2 mb-2" key={i}>
          <Link to={`/admin/student/${u.id}`} key={i} >
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-gray-600 text-xs md:text-sm">{u.email}</p>
              </div>
              <p className="text-xs md:text-sm">Bookings: {u.bookings}</p>
              <p className="absolute top-1 right-2 text-sm ">

                <span
                  className={`px-2 py-1 rounded-xl text-xs font-medium ${u.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                    }`}
                >
                  {u.status}
                </span>
              </p>
          </Link>
              <div className="flex gap-2 text-xs font-medium w-full">
                <button className="border w-full py-2 rounded-md text-gray-600 hover:underline">Bookings</button>
                <button className="border w-full py-2 rounded-md text-rose-600 hover:underline">Block</button>
              </div>
            </div>
        ))}
      </div>

      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-50 text-xs sm:text-sm uppercase text-gray-500">
            <tr>
              <th className="px-2 sm:px-4 py-2 text-left">Name</th>
              <th className="px-2 sm:px-4 py-2 text-left">Email</th>
              <th className="px-2 sm:px-4 py-2 text-left">Bookings</th>
              <th className="px-2 sm:px-4 py-2 text-left">Status</th>
              <th className="px-2 sm:px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-xs sm:text-sm">
            {mockDataUsers.map((u, i) => (
              <tr key={i} className="hover:bg-gray-50 ">
                <td className="px-2 sm:px-4 py-1 sm:py-2 font-medium">{u.name}</td>
                <td className="px-2 sm:px-4 py-1 sm:py-2 text-gray-600">{u.email}</td>
                <td className="px-2 sm:px-4 py-1 sm:py-2">{u.bookings}</td>
                <td className=" px-2 sm:px-4 py-1 sm:py-2">
                  <span
                    className={` px-2 py-1 rounded-full text-xs font-medium ${u.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                      }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-1 sm:py-2 space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium">
                  <button className="text-indigo-600 hover:underline">View</button>
                  <button className="text-gray-600 hover:underline">Bookings</button>
                  <button className="text-rose-600 hover:underline">Block</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ---------- PROPERTIES ---------- */
  const renderProperties = () => (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b">
        <h2 className="text-lg sm:text-xl font-semibold">Property Listings</h2>
      </div>

      <div className="block sm:hidden space-y-3 p-2 md:p-4">
        {/* MOBILE: stacked cards */}
        {mockDataProperties.map((p, i) => (
          <div key={i} className="relative bg-white/80 rounded-xl shadow p-2 md:p-4 space-y-2">
            <div>
            <p className=" font-semibold">{p.name}</p>
            <p className="text-gray-600 text-xs md:text-sm">{p.location}</p>
            </div>
            <p className="text-sm font-semibold">{p.rent}</p>
            <p className="absolute top-1 right-1 text-sm">
              
              <span
                className={`px-2 py-1 rounded-xl text-xs font-medium ${p.status === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : p.status === "Pending"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
              >
                {p.status}
              </span>
            </p>
            <div className="flex gap-2 text-xs font-medium w-full">
              <button className="w-full border  py-2 rounded-md text-emerald-600 hover:underline">Approve</button>
              <button className="w-full border  py-2 rounded-md text-indigo-600 hover:underline">Edit</button>
              <button className="w-full border  py-2 rounded-md text-rose-600 hover:underline">Reject</button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-50 text-xs sm:text-sm uppercase text-gray-500">
            <tr>
              <th className="px-4 sm:px-6 py-2 text-left">Property</th>
              <th className="px-4 sm:px-6 py-2 text-left">Location</th>
              <th className="px-4 sm:px-6 py-2 text-left">Rent</th>
              <th className="px-4 sm:px-6 py-2 text-left">Status</th>
              <th className="px-4 sm:px-6 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-xs sm:text-sm">
            {mockDataProperties.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-2 font-medium">{p.name}</td>
                <td className="px-4 sm:px-6 py-2 text-gray-600">{p.location}</td>
                <td className="px-4 sm:px-6 py-2 font-semibold">{p.rent}</td>
                <td className="px-4 sm:px-6 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : p.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-2 space-x-2 sm:space-x-4 text-xs sm:text-sm font-medium">
                  <button className="text-emerald-600 hover:underline">Approve</button>
                  <button className="text-indigo-600 hover:underline">Edit</button>
                  <button className="text-rose-600 hover:underline">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 p-2 sm:px-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
            Admin Control Center
          </h1>
          <p className="text-gray-600 mt-1 text-xs sm:text-base">
            Student Housing Management System
          </p>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 bg-white/60 backdrop-blur-xl p-2 rounded-2xl shadow-lg">
          {[
            { id: "overview", label: "Overview" },
            { id: "users", label: "Users" },
            { id: "properties", label: "Properties" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition `}
              style={
                activeTab === tab.id
                  ? {
                    backgroundColor: colors.primaryColor,
                    color: 'white',
                    fontWeight: 600,
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)', // shadow-lg equivalent
                  }
                  : {
                    color: 'gray',
                  }
              }

            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {activeTab === "overview" && renderOverview()}
        {activeTab === "users" && renderUsers()}
        {activeTab === "properties" && renderProperties()}
      </div>
    </div>
  );
}
