import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  HiMiniHome,
  HiMiniBars3,
} from "react-icons/hi2";
import { IoBug, IoBookmark } from "react-icons/io5";
import { MdOutlineReport, MdOutlineSupportAgent } from "react-icons/md";
import { FaUserGear, FaDoorOpen } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import colors from "../../../theme/colors";
import Logo from "../../../Assets/pngs/logo.png";
import { useAuth } from "../../../context/AuthContext";
import { useUserProfile } from "../../../hooks/users/useUserProfile";

const navItems = [
  { to: "/auth/user/accommodation", label: "Home", icon: <HiMiniHome /> },
  { to: "/auth/user/bookings", label: "Bookings", icon: <FaDoorOpen /> },
  { to: "/auth/user/account", label: "Profile", icon: <FaUserGear /> },
  { to: "/auth/user/support", label: "Support", icon: <MdOutlineSupportAgent /> },
];

const UserLayout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const {user:userData} = useUserProfile();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-indigo-100 ">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 py-3 md:px-20 px-5 bg-white border-b border-white/30 flex items-center justify-between  shadow-sm z-40">
        <div>
          <h1 className="text-md md:text-lg font-semibold text-gray-900 flex gap-2">
            Hi, <p className="first-letter:uppercase">{userData?.full_name}</p>
            <span
              className="text-xs md:text-sm text-white px-2 py-1 rounded-full"
              style={{ backgroundColor: colors.studentColor }}
            >
              User
            </span>
          </h1>
          <span className="text-xs md:text-sm text-gray-500">
            {user?.email}
          </span>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">
          <Link to="/auth/user/notifications" className="relative text-2xl">
            <span className="absolute -top-2 -right-1 text-xs bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
              6
            </span>
            <IoIosNotifications />
          </Link>

          <Link to="/auth/user/saved" className="text-xl">
            <IoBookmark />
          </Link>

          {/* MENU ICON */}
          <button
            onClick={() => setOpen(true)}
            className="text-2xl text-gray-700 hidden md:block"
          >
            <HiMiniBars3 />
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* DRAWER */}
      <aside
        className={`flex flex-col justify-between fixed top-0 left-0 h-full w-64 bg-black text-gray-200 z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div>

          {/* LOGO */}
          <div className="flex flex-col items-center justify-center px-6 my-10 gap-2">
            <img src={Logo} alt="logo" className="w-20 h-20" />
            <div className="text-center">
              <p className="text-sm font-semibold special-font">Alive Paris</p>
              <p className="text-xs text-gray-400">User Console</p>
            </div>
          </div>

          {/* NAV */}
          <nav className="px-3 py-5 space-y-1 text-sm">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
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

        </div>
        {/* REPORT */}
        <div>
          <div className="text-center text-xs text-gray-400 flex items-center justify-center gap-2 px-6 py-4 cursor-pointer">
            <MdOutlineReport />
            <span>Report Bug</span>
            <IoBug />
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-white/10 text-xs text-gray-400 text-center">
            Logged in as <span className="text-gray-300">User</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-20 pb-20 md:pb-6 overflow-auto bg-white ">
        <Outlet />
      </main>

      {/* BOTTOM NAV (MOBILE ONLY) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 m-3 rounded-[1.4rem] bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl z-30">
        <div className="flex justify-around items-center gap-1 h-16 px-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.to;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex-1 flex flex-col items-center justify-center text-[9px] p-2 rounded-[1.1rem]"
                style={
                  isActive
                    ? {
                      backgroundColor: colors.primaryColor,
                      color: "white",
                      fontWeight: "600",
                    }
                    : { color: colors.primaryColor }
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="mt-1">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default UserLayout;
