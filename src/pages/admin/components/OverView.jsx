// src/pages/admin/components/Overview.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { PiStudent } from "react-icons/pi";
import { FaPersonShelter } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineLibraryBooks, MdImportantDevices, MdOutlineGroups3 } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import NoBookings from '../../skeleton/NoBookings';
import { getStatusStyle } from '../../../utils/bookingUtils';

const Overview = ({
  studentsCount,
  landOwnersCount,
  totalUsers,
  bookings,
  bookingsLoading,
  recentData
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <Card title="Students" value={studentsCount} icon={PiStudent} color={'bg-sky-200'} />
        <Card title="Landowners" value={landOwnersCount} icon={FaPersonShelter} color={'bg-emerald-200'} />
        <Card title="Total Users" value={totalUsers} icon={IoIosPeople} color={'bg-purple-200'} />
        <Card title="Bookings" value={bookings?.length || 0} icon={MdOutlineLibraryBooks} color={'bg-orange-200'} />
      </div>

      {/* Quick Links */}
      <Link to={'/auth/admin/manage_constants'} >
        <div className="flex gap-3 md:gap-5 items-center bg-white rounded-2xl p-2 md:p-3 my-3 shadow">
          <div className="bg-teal-300 p-3 md:p-5 rounded-xl">
            <MdImportantDevices size={25} />
          </div>
          <div className="">
            <p>Manage Constants</p>
            <p className="text-xs text-stone-400">Add Country, Add Locations, Add Amenities</p>
          </div>
        </div>
      </Link>
      
      <Link to={'/auth/admin/groups&permissions'} >
        <div className="flex gap-3 md:gap-5 items-center bg-white rounded-2xl p-2 md:p-3 my-3 shadow">
          <div className="bg-red-300 p-3 md:p-5 rounded-xl">
            <MdOutlineGroups3 size={25} />
          </div>
          <div className="">
            <p>Groups & Permissions</p>
            <p className="text-xs text-stone-400">Handle Groups and Permissions here.</p>
          </div>
        </div>
      </Link>
      
      <Link to={'/auth/admin/payment-providers'} >
        <div className="flex gap-3 md:gap-5 items-center bg-white rounded-2xl p-2 md:p-3 my-3 shadow">
          <div className="bg-lime-300 p-3 md:p-5 rounded-xl">
            <RiSecurePaymentFill size={25} />
          </div>
          <div className="">
            <p>Payout Providers</p>
            <p className="text-xs text-stone-400">Easily change payout providers here.</p>
          </div>
        </div>
      </Link>

      {/* Recent Bookings */}
      <RecentBookingsTable 
        recentData={recentData} 
        bookingsLoading={bookingsLoading} 
        getStatusStyle={getStatusStyle}
      />
    </div>
  );
};

// Sub-component for stats card
const Card = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-2 md:p-3 rounded-xl shadow flex items-center gap-5">
    {Icon && (
      <div className={`p-3 rounded-xl ${color} text-gray-700`}>
        <Icon size={22} />
      </div>
    )}
    <div>
      <p className="text-xs md:text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  </div>
);

// Sub-component for recent bookings table
const RecentBookingsTable = ({ recentData, bookingsLoading, getStatusStyle }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    {/* HEADER */}
    <div className="p-4 border-b flex justify-between items-center bg-white">
      <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>
      {recentData && recentData.length > 0 && (
        <Link
          to="/auth/admin/view_bookings"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          View All
        </Link>
      )}
    </div>

    {/* DESKTOP VIEW */}
    <div className="hidden md:block overflow-x-auto">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left border-collapse">
          {recentData && recentData.length > 0 && (
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Ref No</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Property</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Amount</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
          )}
          <tbody>
            {recentData && recentData.length > 0 ? (
              recentData.slice(0, 6).map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors border-b last:border-0">
                  <td className="p-4 font-medium text-gray-700">
                    <div className="flex flex-col">
                      <span className="text-sm">{booking.reference_no}</span>
                      <span className="text-[10px] text-gray-400 font-normal uppercase">ID: {booking.id.slice(0, 8)}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 truncate max-w-[180px]">
                    {booking.property_title}
                  </td>
                  <td className="p-4 text-gray-800 font-semibold">
                    €{parseFloat(booking.total_rent_amount).toLocaleString()}
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(booking.created_at).toLocaleDateString(undefined, {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col items-start gap-1">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                      <span className={`text-[9px] font-bold ml-1 ${booking.payment_status === 'UNPAID' ? 'text-red-500' : 'text-green-500'}`}>
                        {booking.payment_status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-5 w-full">
                  <div className="flex flex-col items-center justify-center text-center">
                    <NoBookings />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* MOBILE VIEW */}
    <div className="md:hidden divide-y divide-gray-100">
      {bookingsLoading ? (
        "Loading Data..."
      ) : (
        <>
          {recentData.length > 0 ? (
            recentData.map((booking) => (
              <div key={booking.id} className="p-4 active:bg-gray-50 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p className="font-semibold text-gray-800">{booking.reference_no}</p>
                    <p className="text-xs text-blue-600 font-medium">{booking.property_title}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(booking.status)}`}>
                      {booking.status}
                    </span>
                    <span className={`text-[9px] font-bold ${booking.payment_status === 'UNPAID' ? 'text-red-500' : 'text-green-500'}`}>
                      {booking.payment_status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-3">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Stay Period</p>
                    <p className="text-xs text-gray-600 font-medium">
                      {new Date(booking.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(booking.end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      €{parseFloat(booking.total_rent_amount).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Booked: {new Date(booking.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400 text-sm">No recent bookings found</div>
          )}
        </>
      )}
    </div>
  </div>
);

export default Overview;