import React, { useState } from "react";
import colors from "../../../theme/colors";
import { Link } from "react-router-dom";
import { FaCheckDouble } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { MdIncompleteCircle } from "react-icons/md";
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


export default function Dashboard() {

 /* ---------- OVERVIEW ---------- */
const renderOverview = () => (
  <div className="space-y-8 md:space-y-10">

    {/* 1. SUMMARY CARDS */}
    <div className="grid grid-cols-6 gap-5">

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 col-span-6 md:col-span-4 w-full">
      {[
        { label: "Total Properties", value: 12 },
        { label: "Live", value: 8 },
        { label: "Pending", value: 4 },
        { label: "Earnings", value: "₹1,24,500" },
        { label: "Payouts", value: "₹32,000" },
      ].map((item, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-lg p-4 sm:p-6 w-full"
        >
          <p className="text-xs sm:text-sm text-gray-500">{item.label}</p>
          <p className="mt-2 text-xl sm:text-2xl font-semibold text-gray-900">
            {item.value}
          </p>
        </div>
      ))}
    </div>

    {/* 2. PROPERTY STATUS OVERVIEW */}
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl p-4 sm:p-6 col-span-6 md:col-span-2">
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        Property Status
      </h3>

      <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 rounded-xl text-sm font-medium bg-emerald-100 text-emerald-700">
          Approved · 8
        </span>
        <span className="px-4 py-2 rounded-xl text-sm font-medium bg-amber-100 text-amber-700">
          Pending · 4
        </span>
        <span className="px-4 py-2 rounded-xl text-sm font-medium bg-rose-100 text-rose-700">
          Rejected · 1
        </span>
      </div>
    </div>

    </div>
    {/* 3. RECENT ACTIVITY */}
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        Recent Activity
      </h3>

      <ul className="space-y-3 text-sm">
        <li className="flex justify-between">
          <span className="flex gap-3 items-center text-green-600"><FaCheckDouble/>Property approved</span>
          <span className="text-gray-500">2 hrs ago</span>
        </li>
        <li className="flex justify-between">
          <span className="flex gap-3 items-center text-blue-600"><FaCheck/>Booking completed</span>
          <span className="text-gray-500">Yesterday</span>
        </li>
        <li className="flex justify-between">
          <span className="flex gap-3 items-center text-gray-500"><MdIncompleteCircle/>Payout processed</span>
          <span className="text-gray-500">2 days ago</span>
        </li>
      </ul>
    </div>

    {/* 4. EARNINGS SNAPSHOT */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl p-4 sm:p-6">
        <p className="text-sm text-gray-500">This Month</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          ₹45,200
        </p>
      </div>

      <div className="rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl p-4 sm:p-6">
        <p className="text-sm text-gray-500">Last Month</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          ₹38,900
        </p>
      </div>
    </div>

    {/* 5. IMPORTANT ALERTS */}
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        Alerts
      </h3>

      <div className="space-y-3 text-sm">
        <div className="p-3 rounded-xl bg-rose-50 text-rose-700">
          Action required: Property rejected (documents missing)
        </div>
        <div className="p-3 rounded-xl bg-indigo-50 text-indigo-700">
          Admin notice: Updated payout policy available
        </div>
      </div>
    </div>

  </div>
);


  



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 p-2 sm:px-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
            Landowner Control Center
          </h1>
          <p className="text-gray-600 mt-1 text-xs sm:text-base">
            Student Housing Management System
          </p>
        </div>

        

        {/* CONTENT */}
        { renderOverview()}
        
      </div>
    </div>
  );
}
