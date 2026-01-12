import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  addLocationAPI,
  deleteLocationsApi,
  getBookingsAPI,
  approvePropertyAPI,
} from "../../services/allAPI";
import { PiStudent } from "react-icons/pi";
import { FaPersonShelter } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { MdImportantDevices } from "react-icons/md";
import SkeletonAdmin from "../skeleton/skeletonAdmin";
import { useAdminUsers } from "../../hooks/admin/useAdminUsers";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useProperties } from "../../hooks/property/useProperties";
import ImgSkeleton from '../../Assets/pngs/img_skeleton.png'
import { getAvatarColor } from "./getAvatarColor";
import { useBlockUser } from "../../hooks/users/useBlockUser";
import StudentDetailsModal from "./components/StudentDetailsModal";
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

  const { filteredProperties: listProperties, loading: propertiesLoading, } = useProperties();


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
      (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.location || "").toLowerCase().includes(search.toLowerCase())
  );


  // ---------------- Fetch ----------------
  useEffect(() => {
    if (activeTab === "properties") fetchProperties();
    if (activeTab === "overview") fetchBookings();
  }, [activeTab]);

  const fetchProperties = () => {
    try {
      setProperties(listProperties); // ✅ NO .data
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
  // const addLocation = async () => {
  //   if (!newLocation) return;
  //   try {
  //     await addLocationAPI({ location: newLocation });
  //     setNewLocation("");
  //     fetchProperties();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
  const { blockUser, blocking } = useBlockUser();

  const [showDetails, setShowDetails] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reason, setReason] = useState("");


  // ---------------- Render ----------------
  const renderOverview = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Students" value={studentsCount} icon={PiStudent} color={'bg-sky-200'} />
        <Card title="Landowners" value={landOwnersCount} icon={FaPersonShelter} color={'bg-emerald-200'} />
        <Card title="Total Users" value={totalUsers} icon={IoIosPeople} color={'bg-purple-200'} />
        <Card title="Total Bookings" value={bookings.length} icon={MdOutlineLibraryBooks} color={'bg-orange-200'}/>
      </div>
      <Link to={'/auth/admin/manage_constants'} >
        <div className="flex gap-3 md:gap-5 items-center bg-white rounded-2xl p-2 md:p-4 my-3">
          <div className="bg-teal-200 p-3 md:p-5 rounded-xl">
            <MdImportantDevices size={25} />
          </div>
          <div className="">
            <p>Manage Constants</p>
            <p className="text-xs text-stone-400">Add Country , Add Locations , Add Amenities , Groups and Permissions</p>
          </div>
        </div>
      </Link>


      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Recent Bookings</h3>
          <Link to={'/auth/admin/view_bookings'}>
            <p className="text-xs md:text-sm">View All Bookings</p>
          </Link>
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
          <div
            key={u.id}
            className="relative border p-2 rounded-2xl flex gap-3 items-center cursor-pointer"
            onClick={() => {
              setSelectedUser(u);
              setShowDetails(true);
            }}


          >

            {/* Avatar */}
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden text-lg font-semibold text-black ${u.avatar ? "bg-gray-200" : getAvatarColor(u.full_name)
                }`}
            >
              {u.avatar ? (
                <img src={u.avatar} alt={u.full_name} className="w-full h-full object-cover" />
              ) : (
                u.full_name?.charAt(0).toUpperCase()
              )}
            </div>

            {/* User Info */}
            <div>
              <p className="font-medium">{u.full_name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
              <p className="text-xs text-gray-400">{u.role}</p>
            </div>

            {/* Status */}
            <span
              className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-2xl ${u.is_active ? "bg-green-500" : "bg-red-200"
                }`}
            >
              {u.is_active ? "Active" : "Blocked"}
            </span>
          </div>
        ))
      )}
      {showDetails && selectedUser && (
        <StudentDetailsModal
          id={selectedUser.id}
          onClose={() => {
            setShowDetails(false);
            setSelectedUser(null);
          }}
          onBlock={() => {
            setShowBlockModal(true);
          }}
        />
      )}


      {/* BLOCK MODAL */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md space-y-4">

            <h3 className="text-lg font-semibold">Block User</h3>
            <p className="text-sm text-gray-500">
              {selectedUser?.full_name}
            </p>

            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Enter reason..."
              className="w-full border rounded-xl p-3 text-sm resize-none"
              rows={4}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowBlockModal(false);
                  setReason("");
                  setSelectedUser(null);
                }}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                disabled={blocking || !reason}
                onClick={async () => {
                  const success = await blockUser(selectedUser.id, {
                    is_active: false,
                    reason,
                  });

                  if (success) {
                    setShowBlockModal(false);
                    setReason("");
                    setSelectedUser(null);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-500 text-white disabled:opacity-50"
              >
                {blocking ? "Blocking..." : "Block"}
              </button>
            </div>

          </div>
        </div>
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

      {propertiesLoading ? (
        <p>Loading properties...</p>
      ) : listProperties.length === 0 ? (
        <p>No properties found</p>
      ) : (
        listProperties.map(p => (
          <div
            key={p.id}
            className="border p-2 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-3"
          >
            {/* Left */}
            <div className="flex gap-3 items-center">
              <img
                src={p.cover_image}
                alt={p.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ImgSkeleton;
                }}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div>
                <p className="font-medium">{p.title || "Unnamed property"}</p>
                <p className="text-sm text-gray-500">
                  {p.location || "No location"}
                </p>
                <p className="mt-2 font-medium">
                  €{p.rent_per_month} / month
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              {p.status === "Pending" && (
                <button
                  onClick={() => approveProperty(p.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg w-full md:w-auto"
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => deleteLocation(p.id)}
                className="bg-red-500 text-white px-4 py-1 md:py-2 rounded-lg w-full md:w-auto"
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

const Card = ({ title, value, icon: Icon, color }) => (
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

