import React, { useState } from "react";
import {
  MdOutlineHouse,
  MdOutlinePayments,
  MdBuild,
  MdAutoGraph,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import useMyProperties from "../../../hooks/property/useMyProperties";
import useLandownerDashboard from "../../../hooks/landowner/useLandownerDashboard";
import Title from "../../../components/Title";

export default function LandownerDashboard() {
  const { properties } = useMyProperties();
  const { dashboardData, loading, error } = useLandownerDashboard();
  const [activeTab, setActiveTab] = useState("overview");

  const totalRooms = dashboardData?.total_properties ?? 0;
  const activeBookings = dashboardData?.total_bookings ?? 0;
  const totalPayment = dashboardData?.total_payment_amount ?? 0;
  const occupancyRate = totalRooms > 0
    ? `${Math.round((activeBookings / totalRooms) * 100)}%`
    : "0%";

  const getStatusStyle = (status) => {
    const styles = {
      "Auto-Paid": "bg-green-100 text-green-700",
      "Pending": "bg-yellow-100 text-yellow-700",
      "Vendor Assigned": "bg-blue-100 text-blue-700",
      "Reported": "bg-red-100 text-red-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const renderOverview = () => {
    if (loading) return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );

    if (error) return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Failed to load dashboard data.
      </div>
    );

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          <StatCard
            title="Total Rooms"
            value={totalRooms}
            icon={MdOutlineHouse}
            color="bg-blue-100"
          />
          <StatCard
            title="Active Bookings"
            value={activeBookings}
            icon={FiUsers}
            color="bg-purple-100"
          />
          <StatCard
            title="Occupancy"
            value={occupancyRate}
            icon={MdAutoGraph}
            color="bg-emerald-100"
          />
          <StatCard
            title="Total Payments"
            value={`€${totalPayment.toLocaleString()}`}
            icon={MdOutlinePayments}
            color="bg-orange-100"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Title>
        <title>Owner Dashboard | Rental Homes France</title>
      </Title>
      <div className="min-h-screen md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <header>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Owner Command Center</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your properties and track automated earnings.</p>
          </header>

          {activeTab === "overview" && renderOverview()}
          {activeTab !== "overview" && (
            <div className="h-64 flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400">
                Content for <span className="font-bold">{activeTab}</span> is under development.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-2 md:p-3 rounded-xl shadow flex items-center gap-2 md:gap-5">
    {Icon && (
      <div className={`p-3 rounded-xl ${color} text-gray-700`}>
        <Icon size={22} />
      </div>
    )}
    <div>
      <p className="text-xs md:text-sm text-gray-500">{title}</p>
      <p className="text-lg md:text-2xl font-semibold">{value}</p>
    </div>
  </div>
);