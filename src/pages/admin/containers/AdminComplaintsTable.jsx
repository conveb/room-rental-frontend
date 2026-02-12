// AdminComplaintsTable.js
import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useAdminComplaints } from "../../../hooks/admin/useAdminComplaints";
import Title from "../../../components/Title";

const STATUS_OPTIONS = [
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in_progress" },
    { label: "Resolved", value: "resolved" },
];

export default function AdminComplaintsTable() {
    const { entries, loading, detailLoading, selectedDetail, setSelectedDetail, fetchComplaintDetail, updateComplaint } = useAdminComplaints();
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [activeIndex, setActiveIndex] = useState(0);
    // Local state for the update form
    const [replyData, setReplyData] = useState({ status: "", admin_reply: "" });
    // Sync local state when a detail is loaded
    useEffect(() => {
        if (selectedDetail) {
            setReplyData({
                status: selectedDetail.status,
                admin_reply: selectedDetail.admin_reply || ""
            });
        }
    }, [selectedDetail]);

    const handleUpdate = async () => {
        const result = await updateComplaint(selectedDetail.id, replyData);
        if (result.success) {
            alert("Complaint updated successfully!");
        } else {
            alert("Failed to update: " + result.error);
        }
    };

    return (
       <>
        <Title><title>Admin | Manage Complaints</title></Title>

            <div className=" space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
                    <h1 className="text-xl font-bold">Complaints</h1>
                    <Dropdown
                        value={statusFilter}
                        options={[{ label: "All Status", value: "ALL" }, ...STATUS_OPTIONS]}
                        onChange={(e) => setStatusFilter(e.value)}
                        className="w-48 text-sm"
                    />
                </div>

                {/* Table View */}
                <div className="bg-white rounded-xl shadow border overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 border-b text-gray-500 uppercase text-[11px] font-bold">
                            <tr>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {entries.filter(e => statusFilter === "ALL" || e.status === statusFilter).map((entry) => (
                                <tr key={entry.id} className="hover:bg-gray-50">
                                    {/* <td className="p-4 font-medium">{entry?.full_name}</td> */}
                                    <td className="p-4 text-gray-600">{entry?.subject}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${entry.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                                            }`}>{entry?.status}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <Button label="Manage" className="p-button-text p-button-sm font-bold" onClick={() => fetchComplaintDetail(entry.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Update Workspace Dialog */}
                <Dialog
                    header="Complaint Resolution Workspace"
                    visible={!!selectedDetail}
                    onHide={() => setSelectedDetail(null)}
                    className="w-[95vw] md:w-[40rem]"
                    draggable={false}
                >
                    {selectedDetail && (
                        <div className="space-y-6">
                            {/* Complainant Info Card */}
                            <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-2xl">
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold">User Information</p>
                                    <p className="text-lg font-bold">{selectedDetail.user.full_name}</p>
                                    <p className="text-xs text-gray-300">{selectedDetail.user.email} • {selectedDetail.user.phone || 'No Phone'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">ID</p>
                                    <p className="text-[10px] font-mono">{selectedDetail.id.slice(0, 8)}</p>
                                </div>
                            </div>

                            {/* User Content */}
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <p className="text-blue-700 font-bold text-sm mb-1">{selectedDetail.subject}</p>
                                <p className="text-gray-700 text-sm italic">"{selectedDetail.message}"</p>
                            </div>

                            <hr />

                            {/* Admin Action Form */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                                    Admin Action
                                </h3>

                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Set Status</label>
                                        <Dropdown
                                            value={replyData.status}
                                            options={STATUS_OPTIONS}
                                            onChange={(e) => setReplyData({ ...replyData, status: e.value })}
                                            className="w-full border-2"
                                            placeholder="Select Resolution Status"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Official Reply</label>
                                        <InputTextarea
                                            value={replyData.admin_reply}
                                            onChange={(e) => setReplyData({ ...replyData, admin_reply: e.target.value })}
                                            rows={4}
                                            className="w-full border-2 p-3 text-sm focus:border-black transition-all"
                                            placeholder="Type the message the user will see..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t">
                                <Button
                                    label="Cancel"
                                    className="flex-1 p-button-secondary p-button-outlined"
                                    onClick={() => setSelectedDetail(null)}
                                />
                                <Button
                                    label="Update & Notify User"
                                    icon="pi pi-check-circle"
                                    className="flex-1 p-button-primary font-bold"
                                    onClick={handleUpdate}
                                    loading={detailLoading}
                                />
                            </div>
                        </div>
                    )}
                </Dialog>
            </div>
       </>
    );
}