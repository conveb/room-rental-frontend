import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getPropertiesAPI,
  addLocationAPI,
  deleteLocationsApi,
  getBookingsAPI,
  approvePropertyAPI,
} from "../../services/allAPI";
import { PiStudentFill } from "react-icons/pi";
import { FaHouseFlag } from "react-icons/fa6";
import SkeletonAdmin from "../skeleton/skeletonAdmin";
import { useAdminUsers } from "../../hooks/admin/useAdminUsers";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // ---------------- Users Hook ----------------
  const {
    users,
    loading,
    totalUsers,
    studentsCount,
    landOwnersCount,
  } = useAdminUsers(activeTab);

  // ---------------- State ----------------
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  // ---------------- Filters ----------------
  const filteredUsers = users
    .filter(
      u =>
        u.full_name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter(u => roleFilter === "ALL" || u.role === roleFilter);

  const filteredProperties = properties.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  // ---------------- Fetch ----------------
  useEffect(() => {
    if (activeTab === "properties") fetchProperties();
    if (activeTab === "overview") fetchBookings();
  }, [activeTab]);

  const fetchProperties = async () => {
    try {
      const res = await getPropertiesAPI();
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await getBookingsAPI();
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Actions ----------------
  const addLocation = async () => {
    if (!newLocation) return;
    try {
      await addLocationAPI({ location: newLocation });
      setNewLocation("");
      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLocation = async (id) => {
    try {
      await deleteLocationsApi(id);
      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  const approveProperty = async (id) => {
    try {
      await approvePropertyAPI(id);
      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Render ----------------
  const renderOverview = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Overview</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card title="Students" value={studentsCount} />
        <Card title="Landowners" value={landOwnersCount} />
        <Card title="Total Users" value={totalUsers} />
        <Card title="Total Bookings" value={bookings.length} />
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Users</h2>

      <div className="flex gap-2">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="border p-2 rounded-md flex-1"
        />
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="ALL">All</option>
          <option value="STUDENT">Student</option>
          <option value="LAND_OWNER">Landowner</option>
        </select>
      </div>

      {loading ? (
        <SkeletonAdmin />
      ) : filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        filteredUsers.map(u => (
          <div key={u.id} className="border p-3 rounded-xl flex justify-between">
            <div>
              <p className="font-medium">{u.full_name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
              <p className="text-xs text-gray-400">{u.role}</p>
            </div>
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                u.is_active ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {u.is_active ? "Active" : "Blocked"}
            </span>
          </div>
        ))
      )}
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Properties</h2>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
        className="border p-2 rounded-md w-full"
      />

      {filteredProperties.map(p => (
        <div key={p.id} className="border p-3 rounded-xl flex justify-between">
          <div>
            <p className="font-medium">{p.name}</p>
            <p className="text-sm text-gray-500">{p.location}</p>
          </div>
          <div className="flex gap-2">
            {p.status === "Pending" && (
              <button
                onClick={() => approveProperty(p.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Approve
              </button>
            )}
            <button
              onClick={() => deleteLocation(p.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Admin Control Center</h1>

        <div className="flex bg-white rounded-3xl p-2 gap-2">
          {["overview", "users", "properties"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-2xl ${
                activeTab === tab ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && renderOverview()}
        {activeTab === "users" && renderUsers()}
        {activeTab === "properties" && renderProperties()}
      </div>
    </div>
  );
}

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);
