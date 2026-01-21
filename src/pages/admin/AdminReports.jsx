import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Helmet } from "react-helmet";
import { useAdminComplaints } from "../../hooks/admin/useAdminComplaints"; // Updated Hook

const STATUS_OPTIONS = [
    { label: "All Status", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "Resolved", value: "RESOLVED" },
];

const TYPE_OPTIONS = [
    { label: "All Types", value: "ALL" },
    { label: "Reports", value: "REPORT" },
    { label: "Complaints", value: "COMPLAINT" },
];

export default function AdminReportsAndComplaints() {
    // Using the new admin complaints hook
    const { entries, loading, error, refresh } = useAdminComplaints();
    
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
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                            Reports & Complaints
                        </h1>
                        <p className="text-sm text-gray-500">Manage user issues and property disputes</p>
                    </div>

                    <div className="flex gap-2 text-sm">
                        <Dropdown
                            value={typeFilter}
                            options={TYPE_OPTIONS}
                            onChange={(e) => setTypeFilter(e.value)}
                            className="w-full md:w-40 shadow-sm"
                            placeholder="Select Type"
                        />
                        <Dropdown
                            value={statusFilter}
                            options={STATUS_OPTIONS}
                            onChange={(e) => setStatusFilter(e.value)}
                            className="w-full md:w-40 shadow-sm"
                            placeholder="Select Status"
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 flex justify-between items-center">
                        <span>{error}</span>
                        <button onClick={refresh} className="text-xs underline font-bold">Retry</button>
                    </div>
                )}

                {/* DESKTOP TABLE */}
                <div className="hidden md:block bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="p-4 text-left">ID</th>
                                <th className="p-4 text-left">Type</th>
                                <th className="p-4 text-left">User</th>
                                <th className="p-4 text-left">Subject</th>
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
                                            <td key={j} className="p-4"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                filteredEntries.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-400 font-mono text-[10px]">#{entry.id.slice(0, 8)}</td>
                                        <td className="p-4">
                                            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded font-bold">{entry.type}</span>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-medium text-gray-700">{entry.reportedUser}</p>
                                            <p className="text-[10px] text-gray-400">{entry.reporter}</p>
                                        </td>
                                        <td className="p-4 text-gray-600 truncate max-w-[200px]">{entry.reason}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                                entry.status === "OPEN" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                                            }`}>
                                                {entry.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            {new Date(entry.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <button 
                                                onClick={() => setSelectedEntry(entry)} 
                                                className="text-black font-bold hover:underline text-xs"
                                            >
                                                VIEW
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
                        <div className="p-8 text-center text-gray-400 animate-pulse">Loading complaints...</div>
                    ) : filteredEntries.map((entry) => (
                        <div key={entry.id} className="bg-white rounded-xl shadow p-4 space-y-3 border border-gray-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-gray-800">{entry.reportedUser}</p>
                                    <p className="text-[10px] text-gray-400 font-mono">ID: {entry.id.slice(0,8)}</p>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    entry.status === "OPEN" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                                }`}>
                                    {entry.status}
                                </span>
                            </div>
                            <div className="bg-gray-50 p-2 rounded text-sm">
                                <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Subject</p>
                                <p className="text-gray-700 font-medium">{entry.reason}</p>
                            </div>
                            <button onClick={() => setSelectedEntry(entry)} className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>

                {/* EMPTY STATE */}
                {!loading && filteredEntries.length === 0 && (
                    <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-400">No entries found.</p>
                    </div>
                )}

                {/* DETAILS MODAL */}
                <Dialog 
                    header="Complaint Details" 
                    visible={!!selectedEntry} 
                    onHide={() => setSelectedEntry(null)} 
                    className="w-[95vw] sm:w-[35rem]"
                    draggable={false}
                >
                    {selectedEntry && (
                        <div className="space-y-5 text-sm pt-2">
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <div><p className="text-gray-400 text-[10px] uppercase font-bold">Category</p><p className="font-medium">{selectedEntry.type}</p></div>
                                <div><p className="text-gray-400 text-[10px] uppercase font-bold">Status</p><p className="font-bold text-blue-600">{selectedEntry.status}</p></div>
                            </div>

                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">From User</p>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs">
                                        {selectedEntry.reportedUser[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold">{selectedEntry.reportedUser}</p>
                                        <p className="text-[11px] text-gray-500">{selectedEntry.reporter}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Subject</p>
                                <p className="font-semibold text-gray-800">{selectedEntry.reason}</p>
                            </div>

                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                <p className="text-blue-400 text-[10px] uppercase font-bold mb-2">Message</p>
                                <p className="text-gray-700 leading-relaxed italic">"{selectedEntry.description}"</p>
                            </div>

                            {selectedEntry.admin_reply && (
                                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                    <p className="text-green-600 text-[10px] uppercase font-bold mb-1">Admin Response</p>
                                    <p className="text-green-800">{selectedEntry.admin_reply}</p>
                                </div>
                            )}

                            <div className="flex flex-col gap-2 pt-4 border-t">
                                {selectedEntry.status === "OPEN" && (
                                    <Button label="Mark as Resolved" severity="success" className="w-full p-button-sm font-bold" />
                                )}
                                <Button label="Close View" severity="secondary" outlined className="w-full p-button-sm" onClick={() => setSelectedEntry(null)} />
                            </div>
                        </div>
                    )}
                </Dialog>
            </div>
        </>
    );
}