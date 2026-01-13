import React, { useState, useMemo } from "react";
import { useBookings } from "../../../hooks/bookings/useBookings";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

// --- PrimeReact Imports ---
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-cyan/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css";

export default function ViewBookings() {
    const { bookings, loading, error } = useBookings();
    const navigate = useNavigate();

    // PrimeReact Calendar works best with Date objects or null
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const filteredBookings = useMemo(() => {
        return bookings.filter((booking) => {
            const createdDate = new Date(booking.created_at);

            // Set hours to 0 to compare dates accurately without time interference
            if (fromDate) {
                const from = new Date(fromDate);
                from.setHours(0, 0, 0, 0);
                if (createdDate < from) return false;
            }

            if (toDate) {
                const to = new Date(toDate);
                to.setHours(23, 59, 59, 999);
                if (createdDate > to) return false;
            }

            return true;
        });
    }, [bookings, fromDate, toDate]);


    if (loading) return <div className="p-6 text-gray-500">Loading bookings...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-2 md:p-6">
            <div className="flex items-center gap-3 mb-3 md:mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-neutral-200 transition text-2xl"
                >
                    <FaArrowLeft />
                </button>
                <h1 className="text-xl md:text-2xl font-semibold ">All Bookings</h1>
            </div>

            {/* ---------- PRIMEREACT DATE FILTER ---------- */}

            <div className="flex  items-end gap-2 md:gap-4 mb-3 md:mb-6 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">From Date</label>
                    <Calendar
                        value={fromDate}
                        onChange={(e) => setFromDate(e.value)}

                        placeholder="Select Start"
                        dateFormat="dd/mm/yy"
                        className="text-sm"
                        inputClassName="py-2 px-3 border rounded-md"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">To Date</label>
                    <Calendar
                        value={toDate}
                        onChange={(e) => setToDate(e.value)}

                        placeholder="Select End"
                        dateFormat="dd/mm/yy"
                        minDate={fromDate} // Prevents selecting "To" date earlier than "From"
                        className="text-sm"
                        inputClassName="py-2 px-3 border rounded-md"
                    />
                </div>

                {(fromDate || toDate) && (
                    <button
                        onClick={() => { setFromDate(null); setToDate(null); }}
                        className="bg-red-200 p-2 text-xs md:text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* ---------- DESKTOP TABLE ---------- */}
            <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 text-left">Reference</th>
                            <th className="px-4 py-3 text-left">Property</th>
                            <th className="px-4 py-3">Start</th>
                            <th className="px-4 py-3">End</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Payment</th>
                            <th className="px-4 py-3">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-10 text-gray-400">
                                    No bookings found in this range.
                                </td>
                            </tr>
                        ) : (
                            filteredBookings.map((booking) => {
                                const getStatusColor = (status) => {
                                    switch (status?.toLowerCase()) {
                                        case 'pending': return 'bg-yellow-100 text-yellow-700';
                                        case 'paid': return 'bg-green-100 text-green-700';
                                        case 'confirmed': return 'bg-blue-100 text-blue-700';
                                        case 'failed': return 'bg-red-100 text-red-700';
                                        default: return 'bg-gray-100 text-gray-700';
                                    }
                                };

                                return (
                                    <tr key={booking.id} className="border-t hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 font-medium">{booking.reference_no}</td>
                                        <td className="px-4 py-3">{booking.property_title}</td>
                                        <td className="px-4 py-3">{booking.start_date}</td>
                                        <td className="px-4 py-3">{booking.end_date}</td>
                                        <td className="px-4 py-3">₹{booking.total_rent_amount}</td>

                                        <td className="px-4 py-3 text-center">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(booking.payment_status)}`}>
                                                {booking.payment_status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-gray-500">
                                            {new Date(booking.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* ---------- MOBILE CARDS ---------- */}
            <div className="space-y-4 md:hidden">
                {filteredBookings.map((booking) => {
                    // Determine status colors
                    const getStatusColor = (status) => {
                        switch (status?.toLowerCase()) {
                            case 'pending': return 'bg-yellow-100 text-yellow-700';
                            case 'paid': return 'bg-green-100 text-green-700';
                            case 'confirmed': return 'bg-blue-100 text-blue-700';
                            default: return 'bg-gray-100 text-gray-700';
                        }
                    };

                    return (
                        <div key={booking.id} className="bg-white rounded-xl shadow p-2 border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-stone-400 uppercase">#{booking.reference_no}</span>
                                <p className="text-xs mt-1 text-stone-400">{new Date(booking.created_at).toLocaleDateString()}</p>
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{booking.property_title}</h3>
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                <p><strong>Start:</strong> {booking.start_date}</p>
                                <p><strong>End:</strong> {booking.end_date}</p>
                                <p><strong>Total:</strong> ₹{booking.total_rent_amount}</p>
                                <p><strong>Payment:</strong> <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(booking.payment_status)}`}>
                                    {booking.payment_status}
                                </span></p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}