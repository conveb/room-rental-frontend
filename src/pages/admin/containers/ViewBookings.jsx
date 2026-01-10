import React, { useState, useMemo } from "react";
import { useBookings } from "../../../hooks/bookings/useBookings";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

export default function ViewBookings() {
    const { bookings, loading, error } = useBookings();

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const navigate = useNavigate();
    const filteredBookings = useMemo(() => {
        return bookings.filter((booking) => {
            const createdDate = new Date(booking.created_at);
            const from = fromDate ? new Date(fromDate) : null;
            const to = toDate ? new Date(toDate) : null;

            if (from && createdDate < from) return false;
            if (to && createdDate > to) return false;

            return true;
        });
    }, [bookings, fromDate, toDate]);

    if (loading) {
        return <div className="p-6 text-gray-500">Loading bookings...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">{error}</div>;
    }

    return (
        <div className="p-2 md:p-6">
            <div className="flex items-center gap-3 mb-3 md:mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="h-9 w-9 rounded-full flex items-center justify-center
                         hover:bg-neutral-200 transition text-2xl"
                >
                    <FaArrowLeft />
                </button>
                <h1 className="text-xl md:text-2xl font-semibold ">All Bookings</h1>
            </div>

            {/* ---------- DATE FILTER ---------- */}
            <div className="flex flex-row gap-3 mb-4 w-full">
                <div>
                    <label className="text-xs text-gray-500 w-full">From</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="block w-full border rounded-md px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="text-xs text-gray-500 w-full">To</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="block w-full border rounded-md px-3 py-2 text-sm"
                    />
                </div>

                {(fromDate || toDate) && (
                    <button
                        onClick={() => {
                            setFromDate("");
                            setToDate("");
                        }}
                        className="self-end md:self-auto px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* ---------- DESKTOP TABLE ---------- */}
            <div className="hidden md:block bg-white rounded-xl shadow">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
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
                                <td colSpan="8" className="text-center py-6 text-gray-400">
                                    No bookings found
                                </td>
                            </tr>
                        ) : (
                            filteredBookings.map((booking) => (
                                <tr key={booking.id} className="border-t">
                                    <td className="px-4 py-3 font-medium">
                                        {booking.reference_no}
                                    </td>
                                    <td className="px-4 py-3">
                                        {booking.property_title}
                                    </td>
                                    <td className="px-4 py-3">
                                        {booking.start_date}
                                    </td>
                                    <td className="px-4 py-3">
                                        {booking.end_date}
                                    </td>
                                    <td className="px-4 py-3">
                                        ₹{booking.total_rent_amount}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                            {booking.payment_status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {new Date(booking.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ---------- MOBILE CARDS ---------- */}
            <div className="space-y-4 md:hidden">
                {filteredBookings.length === 0 ? (
                    <p className="text-center text-gray-400">
                        No bookings found
                    </p>
                ) : (
                    filteredBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="relative bg-white rounded-xl shadow p-3 space-y-2"
                        >
                            <p className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                {booking.status}
                            </p>

                            <p className="text-sm text-gray-700">
                                {booking.property_title}
                            </p>

                            <div className="grid grid-cols-2 text-xs text-gray-600 gap-y-1">
                                <p><strong>Start:</strong> {booking.start_date}</p>
                                <p><strong>End:</strong> {booking.end_date}</p>
                                <p><strong>Amount:</strong> ₹{booking.total_rent_amount}</p>
                                <p>
                                    <strong>Payment:</strong>{" "}
                                    <span className="text-red-600 font-medium">
                                        {booking.payment_status}
                                    </span>
                                </p>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <div className="flex items-center gap-2 text-xs text-stone-400">
                                    <span>ref id :</span>
                                    <span className="font-semibold">
                                        {booking.reference_no}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500">
                                    {new Date(booking.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
