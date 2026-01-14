import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Helmet } from "react-helmet";
import { useReportedLandowners } from "../../hooks/useReportedLandowners";

const STATUS_OPTIONS = [
    { label: "All Status", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "Resolved", value: "RESOLVED" },
];

const TYPE_OPTIONS = [
    { label: "All Types", value: "ALL" },
    { label: "Reports", value: "REPORT" },
    { label: "Complaints", value: "COMPLAINT" },
];

export default function AdminReportsAndComplaints() {
    const { entries, loading, error } = useReportedLandowners();
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [selectedEntry, setSelectedEntry] = useState(null);

    // Filter Logic
    const filteredEntries = entries.filter((e) => {
        const matchesStatus = statusFilter === "ALL" || e.status === statusFilter;
        const matchesType = typeFilter === "ALL" || e.type === typeFilter;
        return matchesStatus && matchesType;
    });

    return (
        <>
            <Helmet>
                <title>Admin Console | Reports & Complaints</title>
            </Helmet>

            <div className="p-0 md:p-6 space-y-6">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                        Reports & Complaints
                    </h1>

                    <div className="flex gap-2 text-sm">
                        <Dropdown
                            value={typeFilter}
                            options={TYPE_OPTIONS}
                            onChange={(e) => setTypeFilter(e.value)}
                            className="w-full md:w-40 shadow-sm"
                        />
                        <Dropdown
                            value={statusFilter}
                            options={STATUS_OPTIONS}
                            onChange={(e) => setStatusFilter(e.value)}
                            className="w-full md:w-40 shadow-sm"
                        />
                    </div>
                </div>

                {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">{error}</div>}

                {/* DESKTOP TABLE */}
                <div className="hidden md:block bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600 font-medium">
                            <tr>
                                <th className="p-4 text-left">ID</th>
                                <th className="p-4 text-left">Type</th>
                                <th className="p-4 text-left">Reported User</th>
                                <th className="p-4 text-left">Reason</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        {[...Array(7)].map((_, j) => (
                                            <td key={j} className="p-4"><div className="h-4 bg-gray-200 rounded w-full"></div></td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                filteredEntries.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-500 font-mono text-xs">#{entry.id}</td>
                                        <td className="p-4 font-medium">{entry.type}</td>
                                        <td className="p-4">
                                            <p className="font-medium text-gray-700">{entry.reportedUser}</p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{entry.role}</p>
                                        </td>
                                        <td className="p-4 text-gray-600">{entry.reason}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                                entry.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                                            }`}>
                                                {entry.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-500">{new Date(entry.createdAt || entry.created_at).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <button onClick={() => setSelectedEntry(entry)} className="text-blue-600 font-semibold hover:text-blue-800">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* MOBILE CARDS */}
                <div className="md:hidden space-y-4">
                    {loading ? (
                        <div className="p-8 text-center text-gray-400 animate-pulse">Loading reports...</div>
                    ) : filteredEntries.map((entry) => (
                        <div key={entry.id} className="bg-white rounded-xl shadow p-4 space-y-3 border border-gray-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-gray-800">{entry.reportedUser}</p>
                                    <p className="text-xs text-gray-500">
                                        {entry.role} • {new Date(entry.createdAt || entry.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    entry.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                                }`}>
                                    {entry.status}
                                </span>
                            </div>
                            <div className="bg-gray-50 p-2 rounded text-sm">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Reason</p>
                                <p className="text-gray-700">{entry.reason}</p>
                            </div>
                            <button onClick={() => setSelectedEntry(entry)} className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium active:scale-95 transition-transform">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>

                {/* EMPTY STATE */}
                {!loading && filteredEntries.length === 0 && (
                    <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-400">No reports or complaints found matching your filters.</p>
                    </div>
                )}

                {/* DETAILS MODAL */}
                <Dialog 
                    header="Report Details" 
                    visible={!!selectedEntry} 
                    onHide={() => setSelectedEntry(null)} 
                    className="w-[95vw] sm:w-[32rem]"
                    breakpoints={{ '960px': '75vw', '641px': '95vw' }}
                >
                    {selectedEntry && (
                        <div className="space-y-4 text-sm pt-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div><p className="text-gray-400 text-xs">Type</p><p className="font-medium">{selectedEntry.type}</p></div>
                                <div><p className="text-gray-400 text-xs">Status</p><p className="font-medium text-blue-600">{selectedEntry.status}</p></div>
                            </div>
                            <hr className="border-gray-100" />
                            <div><p className="text-gray-400 text-xs">Reported User</p><p className="font-medium">{selectedEntry.reportedUser} ({selectedEntry.role})</p></div>
                            <div><p className="text-gray-400 text-xs">Reported By</p><p className="font-medium">{selectedEntry.reporter || "Anonymous"}</p></div>
                            <div><p className="text-gray-400 text-xs">Reason</p><p className="font-medium">{selectedEntry.reason}</p></div>
                            <div className="bg-gray-50 p-3 rounded-lg"><p className="text-gray-400 text-xs mb-1">Description</p><p className="text-gray-700 leading-relaxed">{selectedEntry.description}</p></div>

                            <div className="flex flex-col gap-2 pt-4">
                                <div className="flex gap-2">
                                    <Button label="Block" severity="warning" className="flex-1 p-button-sm" />
                                    <Button label="Delete" severity="danger" className="flex-1 p-button-sm" />
                                </div>
                                <Button label="Mark as Resolved" severity="success" className="w-full p-button-sm" />
                            </div>
                        </div>
                    )}
                </Dialog>
            </div>
        </>
    );
}