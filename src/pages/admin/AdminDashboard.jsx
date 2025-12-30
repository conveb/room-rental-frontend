import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getUsersAPI,
  getPropertiesAPI,
  approveLandownerAPI,
  addLocationAPI,
  deleteLocationAPI,
  getBookingsAPI,
  toggleBlockUserAPI,
  approvePropertyAPI,
} from "../../services/allAPI";
import { PiStudentFill } from "react-icons/pi";
import { FaHouseFlag } from "react-icons/fa6";
export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // ---------------- Demo Data ----------------
  const bookingsList = [
    { id: 1, user_name: "Alice Johnson", property_name: "Seaside Villa", status: "Confirmed", amount: 12500 },
    { id: 2, user_name: "Bob Smith", property_name: "Mountain Cabin", status: "Pending", amount: 8900 },
    { id: 3, user_name: "Carol Lee", property_name: "City Apartment", status: "Cancelled", amount: 5400 },
    { id: 4, user_name: "David Kim", property_name: "Beach House", status: "Confirmed", amount: 15750 },
    { id: 5, user_name: "Eva Green", property_name: "Country Cottage", status: "Confirmed", amount: 9800 },
    { id: 6, user_name: "Frank Wright", property_name: "Lakefront Cabin", status: "Pending", amount: 11200 },
  ];

  const usersList = [
    { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", role: "LANDOWNER", approved: false, blocked: false },
    { id: 2, name: "Bob Smith", email: "bob.smith@example.com", role: "TENANT", approved: true, blocked: true },
    { id: 3, name: "Carol Lee", email: "carol.lee@example.com", role: "LANDOWNER", approved: true, blocked: false },
    { id: 4, name: "David Kim", email: "david.kim@example.com", role: "TENANT", approved: true, blocked: false },
    { id: 5, name: "Eva Green", email: "eva.green@example.com", role: "LANDOWNER", approved: false, blocked: true },
  ];

  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Paris City Apartment",
      location: "Paris, France",
      status: "Pending",
    },
    {
      id: 2,
      name: "Nice Beach House",
      location: "Nice, France",
      status: "Approved",
    },
    {
      id: 3,
      name: "Lyon Studio",
      location: "Lyon, France",
      status: "Pending",
    },
  ]);
  
  
  // --------------------------------------------

  // ---------------- State ----------------
  const [users, setUsers] = useState([]);
  // const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  // ---------------- Filter ----------------
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL"); // ALL, TENANT, LANDOWNER

  const filteredUsers = usersList
    .filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter(u => roleFilter === "ALL" || u.role === roleFilter);

  // ---------------- Fetch Data ----------------
  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    if (activeTab === "properties") fetchProperties();
    if (activeTab === "overview") fetchBookings();
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsersAPI();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await getPropertiesAPI();
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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

  // ---------------- Admin Actions ----------------
  const approveLandowner = async (userId) => {
    try {
      await approveLandownerAPI(userId);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleBlockUser = async (userId) => {
    try {
      await toggleBlockUserAPI(userId);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

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

  const deleteLocation = async (locationId) => {
    try {
      await deleteLocationAPI(locationId);
      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  const approveProperty = async (propertyId) => {
    try {
      await approvePropertyAPI(propertyId);
      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };
    const filteredProperties = properties.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  // ---------------- Render Tabs ----------------
  const renderOverview = () => (
    <div className="space-y-3 md:space-y-6">
      <h2 className="text-xl font-semibold">Overview</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
          <p className="text-xs md:text-sm text-gray-500">Students</p>
          <p className="text-2xl font-semibold">
            {users.filter(u => u.role === "LANDOWNER" && !u.approved).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
          <p className="text-xs md:text-sm text-gray-500">Total Bookings</p>
          <p className="text-2xl font-semibold">{bookings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
          <p className="text-xs md:text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-semibold">
            ₹{bookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
          <p className="text-xs md:text-sm text-gray-500">Landowners</p>
          <p className="text-2xl font-semibold">
            {users.filter(u => u.role === "LANDOWNER" && !u.approved).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
          <p className="text-xs md:text-sm text-gray-500">Total Properties</p>
          <p className="text-2xl font-semibold">{bookings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
          <p className="text-xs md:text-sm text-gray-500">Total Commission</p>
          <p className="text-2xl font-semibold">
            ₹{bookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-2">Recent Bookings</h3>
        <div className="space-y-2">
          {bookingsList.slice(0, 5).map(b => (
            <div key={b.id} className="grid grid-cols-4 gap-5 p-1 md:p-2 border-b last:border-b-0 text-xs md:text-sm">
              <span>{b.user_name}</span>
              <span>{b.property_name}</span>
              <span>{b.status}</span>
              <span>₹{b.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Users</h2>

      {/* Search + Filter */}
      <div className="flex flex-row  gap-2 w-full items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow border p-2 rounded-md min-w-0"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="ALL">All</option>
          <option value="TENANT"><PiStudentFill/>Tenant</option>
          <option value="LANDOWNER"><FaHouseFlag/>Landowner</option>
        </select>
      </div>



      {loading ? (
        <p>Loading...</p>
      ) : filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        filteredUsers.map(u => (
          <div key={u.id} className="flex justify-between items-center border p-2 rounded-xl">
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-gray-500 text-sm">{u.email}</p>
              <p className="text-xs text-gray-400">{u.role}</p>
            </div>
            <div className="flex flex-col gap-2 text-xs md:text-sm">
              {u.role === "LANDOWNER" && !u.approved && (
                <button
                  onClick={() => approveLandowner(u.id)}
                  className="bg-green-500 text-white px-4 py-3 rounded-lg"
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => toggleBlockUser(u.id)}
                className={`px-4 py-3 rounded-lg ${u.blocked ? "bg-red-500 text-white" : "bg-gray-200"}`}
              >
                {u.blocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderProperties = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Locations / Properties</h2>

    {/* Search */}
    <div className="flex flex-row gap-2 w-full items-center">
      <input
        type="text"
        placeholder="Search by property name or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow border p-2 rounded-md min-w-0"
      />
    </div>

    {loading ? (
      <p>Loading...</p>
    ) : filteredProperties.length === 0 ? (
      <p>No properties found</p>
    ) : (
      filteredProperties.map(p => (
        <div
          key={p.id}
          className="flex justify-between items-center border p-2 rounded-xl"
        >
          <div>
            <p className="font-medium">{p.name}</p>
            <p className="text-gray-500 text-sm">{p.location}</p>
            <p className="text-xs text-gray-400">{p.status}</p>
          </div>

          <div className="flex flex-col gap-2 text-xs md:text-sm">
            {p.status === "Pending" && (
              <button
                onClick={() => approveProperty(p.id)}
                className="bg-green-500 text-white px-4 py-3 rounded-lg"
              >
                Approve
              </button>
            )}
            <button
              onClick={() => deleteLocation(p.id)}
              className="bg-red-500 text-white px-4 py-3 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);


  return (
    <div className="min-h-screen p-1 sm:p-4">
      <div className="max-w-7xl mx-auto space-y-3 md:space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Admin Control Center</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Student Housing Management System</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-3xl overflow-hidden w-full p-2 gap-2">
          {["overview", "users", "properties"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 md:py-4 text-sm font-medium transition rounded-2xl shadow ${activeTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-gray-500 hover:bg-gray-200"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "overview" && renderOverview()}
        {activeTab === "users" && renderUsers()}
        {activeTab === "properties" && renderProperties()}
      </div>
    </div>
  );
}
