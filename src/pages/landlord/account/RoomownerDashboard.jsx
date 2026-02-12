import React, { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import {
  MdOutlineHouse,
  MdOutlinePayments,
  MdBuild,
  MdAutoGraph,
  MdArrowForwardIos,
  MdCheckCircleOutline
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import useMyProperties from "../../../hooks/property/useMyProperties";

export default function LandownerDashboard() {
  const { properties } = useMyProperties();
  const [activeTab, setActiveTab] = useState("overview");

  // ---------------- DEMO DATA ----------------
  const stats = {
    totalProperties: properties.length,
    activeTenants: 45,
    pendingMaintenance: 3,
    monthlyRevenue: "€14,250",
    occupancyRate: "92%"
  };

  const recentTransactions = [
    { id: 1, tenant: "Alex Rivera", room: "Suite 402", amount: "€850", status: "Auto-Paid", date: "2024-03-01" },
    { id: 2, tenant: "Sarah Chen", room: "Studio 12", amount: "€1,200", status: "Auto-Paid", date: "2024-03-01" },
    { id: 3, tenant: "Marc Dubois", room: "Room 105", amount: "€600", status: "Pending", date: "2024-03-02" },
  ];

  const maintenanceTickets = [
    { id: 1, issue: "Leaking Faucet", room: "Room 201", priority: "Medium", status: "Vendor Assigned" },
    { id: 2, issue: "AC Not Cooling", room: "Suite 305", priority: "Urgent", status: "Reported" },
  ];

  // ---------------- HELPERS ----------------
  const getStatusStyle = (status) => {
    const styles = {
      "Auto-Paid": "bg-green-100 text-green-700",
      "Pending": "bg-yellow-100 text-yellow-700",
      "Vendor Assigned": "bg-blue-100 text-blue-700",
      "Reported": "bg-red-100 text-red-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  // ---------------- SECTIONS ----------------
  const renderOverview = () => (
    <div className="space-y-3">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <StatCard title="Total Rooms" value={stats.totalProperties} icon={MdOutlineHouse} color="bg-blue-100" />
        <StatCard title="Active Tenants" value={stats.activeTenants} icon={FiUsers} color="bg-purple-100" />
        <StatCard title="Occupancy" value={stats.occupancyRate} icon={MdAutoGraph} color="bg-emerald-100" />
        <StatCard title="Monthly Rent" value={stats.monthlyRevenue} icon={MdOutlinePayments} color="bg-orange-100" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Automated Payments Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Recent System Payouts</h3>
            <button className="text-blue-600 text-sm font-medium">View Ledger</button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold">{t.tenant}</p>
                  <p className="text-xs text-gray-500">{t.room} • {t.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{t.amount}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusStyle(t.status)}`}>
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Tracker */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Maintenance (Tickets)</h3>
            <button className="text-blue-600 text-sm font-medium">Manage All</button>
          </div>
          <div className="space-y-3">
            {maintenanceTickets.map(ticket => (
              <div key={ticket.id} className="flex items-center gap-4 p-3 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="bg-red-50 p-2 rounded-lg text-red-500">
                  <MdBuild size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{ticket.issue}</p>
                  <p className="text-xs text-gray-500">{ticket.room}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusStyle(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HelmetProvider>
        <title>Owner Dashboard | Rental Homes France</title>
      </HelmetProvider>
      <div className="min-h-screen  md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <header>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Owner Command Center</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your properties and track automated earnings.</p>
          </header>

          {/* Tab Navigation */}
          {/* <div className="flex bg-white rounded-2xl p-1.5 gap-1 shadow-sm border border-gray-100">
            {["overview", "properties", "payouts", "maintenance"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                  activeTab === tab ? "bg-black text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div> */}

          {activeTab === "overview" && renderOverview()}
          {activeTab !== "overview" && (
            <div className="h-64 flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400">Content for <span className="font-bold">{activeTab}</span> is under development.</p>
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
      <div className={`p-3 rounded-xl ${color}  text-gray-700`}>
        <Icon size={22} />
      </div>
    )}
    <div>
      <p className=" text-xs md:text-sm text-gray-500">{title}</p>
      <p className="text-lg md:text-2xl font-semibold">{value}</p>
    </div>

  </div>
);