import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Helmet } from "react-helmet";

/* ---------------- DEMO DATA ---------------- */
const REPORTS = [
    {
        id: "RPT001",
        reporter: "John Doe",
        reportedUser: "Landowner_22",
        role: "LANDOWNER",
        reason: "Fraud listing",
        description: "Property photos are fake and misleading.",
        status: "PENDING",
        createdAt: "2025-01-12",
    },
    {
        id: "RPT002",
        reporter: "Alice Smith",
        reportedUser: "Tenant_11",
        role: "TENANT",
        reason: "Abusive behavior",
        description: "User sent abusive messages in chat.",
        status: "RESOLVED",
        createdAt: "2025-01-10",
    },
];

const STATUS_OPTIONS = [
    { label: "All", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "Resolved", value: "RESOLVED" },
];

export default function AdminReports() {
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [selectedReport, setSelectedReport] = useState(null);

    const filteredReports = REPORTS.filter(
        (r) => statusFilter === "ALL" || r.status === statusFilter
    );

    return (
        <>
        <Helmet>
        <title>Admin Console | Reports</title>
        <meta name="description" content="This is the home page" />
        <meta name="keywords" content="react, seo, helmet" />
      </Helmet>
        <div className="p-2 md:p-6 space-y-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-xl md:text-2xl font-semibold">
                    Reports & Complaints
                </h1>

                <Dropdown
                    value={statusFilter}
                    options={STATUS_OPTIONS}
                    onChange={(e) => setStatusFilter(e.value)}
                    className="w-full md:w-60"
                />
            </div>

            {/* TABLE WRAPPER */}
            {/* DESKTOP TABLE */}
            <div className="hidden md:block bg-white rounded-xl shadow">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Reported User</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Reason</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredReports.map((report) => (
                            <tr key={report.id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{report.id}</td>
                                <td className="p-3">{report.reportedUser}</td>
                                <td className="p-3">{report.role}</td>
                                <td className="p-3">{report.reason}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${report.status === "PENDING"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-green-100 text-green-800"
                                            }`}
                                    >
                                        {report.status}
                                    </span>
                                </td>
                                <td className="p-3">{report.createdAt}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => setSelectedReport(report)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">
                {filteredReports.map((report) => (
                    <div
                        key={report.id}
                        className="bg-white rounded-xl shadow p-4 space-y-3"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold">{report.reportedUser}</p>
                                <p className="text-xs text-gray-500">
                                    {report.role} • {report.createdAt}
                                </p>
                            </div>

                            <span
                                className={`px-2 py-1 rounded-full text-xs ${report.status === "PENDING"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                    }`}
                            >
                                {report.status}
                            </span>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Reason</p>
                            <p className="text-sm font-medium">{report.reason}</p>
                        </div>

                        <button
                            onClick={() => setSelectedReport(report)}
                            className="w-full border border-black py-2 rounded-lg text-sm font-medium"
                        >
                            View Details
                        </button>
                    </div>
                ))}

                {filteredReports.length === 0 && (
                    <p className="text-center text-gray-500 py-6">
                        No reports found
                    </p>
                )}
            </div>


            {/* DETAILS MODAL */}
            <Dialog
                header="Report Details"
                visible={!!selectedReport}
                onHide={() => setSelectedReport(null)}
                className="w-[95vw] sm:w-[32rem]"
            >
                {selectedReport && (
                    <div className="space-y-4 text-sm">
                        <div>
                            <p className="text-gray-500">Reported User</p>
                            <p className="font-medium">
                                {selectedReport.reportedUser} ({selectedReport.role})
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Reported By</p>
                            <p className="font-medium">
                                {selectedReport.reporter}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Reason</p>
                            <p className="font-medium">
                                {selectedReport.reason}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Description</p>
                            <p className="text-gray-700">
                                {selectedReport.description}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                label="Block User"
                                severity="warning"
                                className="w-full sm:w-auto"
                            />
                            <Button
                                label="Delete Permanently"
                                severity="danger"
                                className="w-full sm:w-auto"
                            />
                            <Button
                                label="Mark as Resolved"
                                severity="success"
                                className="w-full sm:w-auto"
                            />
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
        </>
    );
}
