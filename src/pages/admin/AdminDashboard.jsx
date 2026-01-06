import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getPropertiesAPI,
  addLocationAPI,
  deleteLocationsApi,
  getBookingsAPI,
  approvePropertyAPI,
} from "../../services/allAPI";
import { PiStudent } from "react-icons/pi";
import { FaPersonShelter } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineLibraryBooks } from "react-icons/md";

import SkeletonAdmin from "../skeleton/skeletonAdmin";
import { useAdminUsers } from "../../hooks/admin/useAdminUsers";
import { Helmet } from "react-helmet";

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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Students" value={studentsCount} icon={PiStudent} color={'bg-sky-100'}/>
        <Card title="Landowners" value={landOwnersCount} icon={FaPersonShelter} color={'bg-emerald-100'}/>
        <Card title="Total Users" value={totalUsers} icon={IoIosPeople} color={'bg-purple-100'}/>
        <Card
          title="Total Bookings"
          value={bookings.length}
          icon={MdOutlineLibraryBooks}
          color={'bg-orange-100'}
        />
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Recent Bookings</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-3">User</th>
                <th className="text-left p-3">Property</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.slice(0, 5).map((booking) => (
                <tr key={booking.id} className="border-t">
                  <td className="p-3">{booking.user_name}</td>
                  <td className="p-3">{booking.property_title}</td>
                  <td className="p-3">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}

              {bookings.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No recent bookings
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );


  const renderUsers = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Users</h2>

      <div className="flex items-center gap-2 w-full text-sm">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="border p-2 rounded-md flex-1 min-w-0"
        />

        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="border p-2 rounded-md w-[100px] sm:w-auto"
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
          <div key={u.id} className="relative border p-3 rounded-xl flex justify-between">
            <div>
              <p className="font-medium">{u.full_name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
              <p className="text-xs text-gray-400">{u.role}</p>
            </div>
            <span
              className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-2xl ${u.is_active ? "bg-green-500" : "bg-red-200"
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
    <>
      <Helmet>
        <title>Admin Console | Dashboard</title>
        <meta name="description" content="This is the home page" />
        <meta name="keywords" content="react, seo, helmet" />
      </Helmet>
      <div className="min-h-screen  md:p-6">
        <div className="max-w-7xl mx-auto space-y-2 md:space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Control Center</h1>
          <p className="text-xs md:text-sm text-stone-500 ">This dashboard gives a quick overview of total students, landowners, users, and bookings, along with recent booking activity for easy monitoring.
          </p>

          <div className="flex bg-white rounded-3xl p-2 gap-2">
            {["overview", "users", "properties"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 rounded-2xl text-sm md:text-md ${activeTab === tab ? "bg-black text-white" : "bg-gray-100"
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
    </>
  );
}

const Card = ({ title, value, icon: Icon , color }) => (
  <div className="bg-white p-2 md:p-3 rounded-xl shadow flex items-center gap-5">
    {Icon && (
      <div className={`p-3 rounded-xl ${color}  text-gray-700`}>
        <Icon size={22} />
      </div>
    )}
    <div>
      <p className=" text-xs md:text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>

  </div>
);

