// src/pages/admin/Layout.jsx
import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoBug } from "react-icons/io5";
import { MdOutlineReport } from "react-icons/md";
import { FaUserGear } from "react-icons/fa6";
import colors from "../../../theme/colors";
import { HiMenu } from "react-icons/hi";
import Logo from '../../../Assets/pngs/logo.png';
import { FaDoorOpen } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { useAuth } from "../../../context/AuthContext";
import { useUserProfile } from "../../../hooks/users/useUserProfile";
import { AiOutlineLogout } from "react-icons/ai";
import Title from "../../../components/Title";

const titleMap = {
  "/auth/landowner": "Dashboard",
  "/auth/landowner/audits": "Audits",
  "/auth/landowner/property/add_property": "Add Property",
  "/auth/landowner/reports": "Reports",
};
const navItems = [
  { to: "/auth/landowner", label: "Dashboard", icon: <HiMiniHome /> },
  { to: "/auth/landowner/account", label: "Account", icon: <FaUserGear /> },
  { to: "/auth/landowner/bookings", label: "Bookings", icon: <FaUserGear /> },
  { to: "/auth/landowner/create_property", label: "Properties", icon: <FaDoorOpen /> },
  { to: "/auth/landowner/stats", label: "Payments", icon: <FaMoneyCheckDollar /> },
];

const Layout = () => {
  const location = useLocation();
  const title = titleMap[location.pathname] ?? "Landowner";
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const handleConfirmLogout = async () => {
    await logout();
    setShowModal(false);
  };

  return (
    <>
          <Title>
            <title>{title} | Alive Paris</title>
          </Title>
    
          <div className=" min-h-screen flex flex-col md:flex-row bg-stone-100">
            {/* SIDEBAR (DESKTOP ONLY) */}
            <aside className="hidden md:flex w-64 bg-gradient-to-b from-zinc-950 to-zinc-900 text-gray-200 flex-col shadow-2xl flex-shrink-0">
              {/* LOGO */}
              <div className="flex flex-col items-center justify-center px-6 my-10 gap-2">
                <img src={Logo} alt="alive_paris_logo" className="w-20 h-20" />
                <div className="text-center leading-tight">
                  <p className="text-sm font-semibold tracking-wide special-font">Alive Paris</p>
                  <p className="text-xs text-gray-400">Admin Console</p>
                </div>
              </div>
    
              {/* NAV */}
              <nav className="flex-1 px-3 py-5 space-y-1 text-sm">
                {navItems.map(item => (
                  <NavLink
                    key={item.to}
                    end={item.to === "/auth/landowner"}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2.5 rounded-xl transition-all ${isActive
                        ? "bg-white/90 text-black shadow-md"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              {/* FOOTER */}
              <div className="fixed bottom-5 left-5 w-52 p-2  text-sm text-red-500">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-3 w-full text-left p-4 rounded-xl  hover:bg-black/30 bg-black"
                >
                  <AiOutlineLogout size={20} /> Logout
                </button>
                {showModal && (
                  <div className="fixed inset-0  flex items-center justify-center bg-black/50 px-4 h-dvh ">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Confirm Logout
                      </h2>
    
                      <p className="text-sm text-gray-600">
                        Are you sure you want to logout from all devices?
                        This will end all active sessions.
                      </p>
    
                      <div className="flex justify-end gap-3 pt-3">
                        <button
                          onClick={() => setShowModal(false)}
                          className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-100 transition"
                        >
                          Cancel
                        </button>
    
                        <button
                          onClick={handleConfirmLogout}
                          className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700 transition"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* Logged in as <span className="text-gray-300">Super Admin</span> */}
              </div>
            </aside>
    
            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* HEADER */}
              <header className="py-3 md:py-4 bg-white/70 backdrop-blur-xl border-b border-white/30 flex items-center justify-between px-6 shadow-sm">
                <div>
                  <h1 className="text-md md:text-lg font-semibold text-gray-900">
                    <span className="bg-black text-xs md:text-sm text-white px-2 py-1 rounded-full ">Admin</span>
                  </h1>
                  <span className="text-xs md:text-sm text-gray-500">{user?.email}</span>
                </div>
                <div className="relative gap-3 md:gap-5 flex items-center text-sm">
                  <Link to='/auth/admin/notifications?role=admin' className="relative text-2xl">
                    <p className="absolute -top-2 -right-1 text-xs bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                      6
                    </p>
                    <IoIosNotifications />
                  </Link>
                  <button
                    onClick={() => setOpen(!open)}
                    className="block md:hidden rounded-full text-3xl text-gray-700 hover:bg-gray-50 transition p-1"
                  >
                    <HiMenu />
                  </button>
    
                  {open && (
                    <div className="absolute right-0 top-12 w-32 bg-white border rounded-lg shadow-md">
    
                      <button
                        onClick={() => setShowModal(true)}
                        className="w-full text-left p-4 rounded-xl  hover:bg-neutral-50"
                      >
                        Logout
                      </button>
                      {showModal && (
                        <div className="fixed inset-0  flex items-center justify-center bg-black/50 px-4 h-dvh ">
                          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                              Confirm Logout
                            </h2>
    
                            <p className="text-sm text-gray-600">
                              Are you sure you want to logout from all devices?
                              This will end all active sessions.
                            </p>
    
                            <div className="flex justify-end gap-3 pt-3">
                              <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-100 transition"
                              >
                                Cancel
                              </button>
    
                              <button
                                onClick={handleConfirmLogout}
                                className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700 transition"
                              >
                                Logout
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </header>
    
              {/* OUTLET */}
              <main className="flex-1 p-5  pb-20 md:pb-6 overflow-auto min-w-0">
                {/* min-w-0 ensures flex child can shrink */}
                <Outlet />
              </main>
            </div>
    
            {/* BOTTOM NAV (MOBILE ONLY) */}
            <nav className="md:hidden fixed bottom-0 inset-x-0 m-2 rounded-[1.4rem] bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl z-50">
              <div className="flex justify-around items-center gap-1 h-16 px-1">
                {navItems.map(item => {
                  const isActive =
                    location.pathname === item.to ||
                    (item.to === "/landowner" && location.pathname === "/landowner");
    
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={`flex-1 flex flex-col items-center justify-center text-[9px] p-2 rounded-[1.1rem] transition`}
                      style={isActive
                        ? { backgroundColor: colors.primaryColor, fontWeight: '600', color: 'white' }
                        : { color: colors.primaryColor }
                      }
                    >
                      <span className="text-xl leading-none">{item.icon}</span>
                      <span className="mt-1">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </nav>
          </div>
        </>
  );
};

export default Layout;
