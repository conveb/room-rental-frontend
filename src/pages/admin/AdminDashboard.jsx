// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  deleteLocationsApi,
  approvePropertyAPI,
} from "../../services/allAPI";
import { useAdminUsers } from "../../hooks/admin/useAdminUsers";
import { useProperties } from "../../hooks/property/useProperties";
import { useBlockUser } from "../../hooks/users/useBlockUser";
import { useAllBookings } from "../../hooks/bookings/useAllBookings";
import { toast } from "sonner";
import Title from "../../components/Title";

// Import components
import Overview from "./components/OverView";
import Users from "./components/Users";
import Properties from "./components/Properties";
import { getStatusStyle } from "../../utils/bookingUtils";

// Import utils

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // ---------------- Hooks ----------------
  const {
    users,
    loading: usersLoading,
    totalUsers,
    studentsCount,
    landOwnersCount,
  } = useAdminUsers(activeTab);

  const { filteredProperties: listProperties, loading: propertiesLoading } = useProperties();
  const { bookings, loading: bookingsLoading } = useAllBookings();
  const { blockUser, blocking } = useBlockUser();

  // ---------------- State ----------------
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  // ---------------- Effects ----------------
  useEffect(() => {
    setProperties(listProperties);
  }, [listProperties]);

  // ---------------- Filters ----------------
  const filteredUsers = users
    .filter(
      u =>
        u.full_name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter(u => roleFilter === "ALL" || u.role === roleFilter);

  // ---------------- Handlers ----------------
  const deleteLocation = async (id) => {
    try {
      await deleteLocationsApi(id);
      // Refresh properties
      const updated = properties.filter(p => p.id !== id);
      setProperties(updated);
      toast.success("Property deleted successfully");
    } catch (err) {
      toast.error(err.message || "Failed to delete property");
    }
  };

  const approveProperty = async (id) => {
    try {
      await approvePropertyAPI(id);
      toast.success("Property approved successfully");
    } catch (err) {
      toast.error(err.message || "Failed to approve property");
    }
  };

  // ---------------- Derived Data ----------------
  const recentData = bookings
    ? [...bookings]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 6)
    : [];

  return (
    <>
      <Title>
        <title>Admin Console | Dashboard</title>
        <meta name="description" content="This is the home page" />
        <meta name="keywords" content="react, seo, helmet" />
      </Title>
      
      <div className="min-h-screen md:p-6">
        <div className="max-w-7xl mx-auto space-y-0 md:space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Control Center</h1>
          <p className="text-[10px] md:text-sm text-stone-500 pb-2">
            This dashboard gives a quick overview of total students, landowners, users, 
            and bookings, along with recent booking activity for easy monitoring.
          </p>

          {/* Tab Navigation */}
          <div className="flex bg-white rounded-3xl p-2 gap-2">
            {["overview", "users", "properties"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 rounded-2xl text-sm md:text-md capitalize ${
                  activeTab === tab ? "bg-black text-white" : "bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <Overview
              studentsCount={studentsCount}
              landOwnersCount={landOwnersCount}
              totalUsers={totalUsers}
              bookings={bookings}
              bookingsLoading={bookingsLoading}
              recentData={recentData}
              getStatusStyle={getStatusStyle}
            />
          )}

          {activeTab === "users" && (
            <Users
              users={users}
              loading={usersLoading}
              filteredUsers={filteredUsers}
              search={search}
              setSearch={setSearch}
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              blockUser={blockUser}
              blocking={blocking}
            />
          )}

          {activeTab === "properties" && (
            <Properties
              properties={properties}
              loading={propertiesLoading}
              search={search}
              setSearch={setSearch}
              onDelete={deleteLocation}
              listProperties={listProperties}
            />
          )}
        </div>
      </div>
    </>
  );
}