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


const navItems = [
  { to: "/landowner", label: "Dashboard", icon: <HiMiniHome /> },
  { to: "/landowner/properties", label: "Properties", icon: <FaDoorOpen /> },
  { to: "/landowner/stats", label: "Stats", icon: <FaMoneyCheckDollar /> },
  { to: "/landowner/account", label: "Account", icon: <FaUserGear /> },
];

const Layout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-100 to-indigo-100">
      {/* SIDEBAR (DESKTOP ONLY) */}
      <aside className="hidden md:flex w-64 bg-black text-gray-200 flex-col shadow-2xl flex-shrink-0" >
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
              end={item.to === "/landowner"}
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
        <div className="text-center text-xs md:text-sm text-gray-400 flex items-center justify-center gap-2 px-6 py-4  cursor-pointer">
          <span><MdOutlineReport /></span> <p>Report Bug </p><span><IoBug /></span>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-white/10 text-xs text-gray-400 text-center">
          Logged in as <span className="text-gray-300">Landowner</span>

        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="py-3 md:py-4 bg-white/70 backdrop-blur-xl border-b border-white/30 flex items-center justify-between px-6 shadow-sm">
          <div>
            <h1 className="text-md md:text-lg font-semibold text-gray-900">
              Hi, Walkingtoy <span className="text-xs md:text-sm text-white px-2 py-1 rounded-full" style={{ backgroundColor: `${colors.landLordColor}` }}>Landowner</span>
            </h1>
            <span className="text-xs md:text-sm text-gray-500">admin@campusrooms.com</span>
          </div>
          <div className="relative gap-3 md:gap-5 flex items-center text-sm">
            <a href='/notifications' className="relative text-2xl">
              <p className="absolute -top-2 -right-1 text-xs bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                6
              </p>
              <IoIosNotifications />
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="rounded-full text-3xl text-gray-700 hover:bg-gray-50 transition p-1"
            >
              <HiMenu />
            </button>

            {open && (
              <div className="absolute right-0 top-12 w-32 bg-white border rounded-lg shadow-md">
                <Link
                  to="/"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  onClick={() => {
                    setOpen(false);
                    // logout logic here
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* OUTLET */}
        <main className="flex-1 p-3 md:p-0 pb-20 md:pb-6 overflow-auto min-w-0">
          {/* min-w-0 ensures flex child can shrink */}
          <Outlet />
        </main>
      </div>

      {/* BOTTOM NAV (MOBILE ONLY) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 m-3 rounded-[1.4rem] bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl z-50">
        <div className="flex justify-around items-center gap-1 h-16 px-1">
          {navItems.map(item => {
            const isActive =
              location.pathname === item.to ||
              (item.to === "/landowner" && location.pathname === "/landowner");

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex-1 flex flex-col items-center justify-center text-[9px] p-2 rounded-[1.1rem] transition `}
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
  );
};

export default Layout;
