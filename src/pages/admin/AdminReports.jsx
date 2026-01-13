import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Helmet } from "react-helmet";

/* ---------------- DEMO DATA ---------------- */
const ENTRIES = [
  {
    id: "RPT001",
    type: "REPORT", // REPORT or COMPLAINT
    reporter: "John Doe",
    reportedUser: "Landowner_22",
    role: "LANDOWNER",
    reason: "Fraud listing",
    description: "Property photos are fake and misleading.",
    status: "PENDING",
    createdAt: "2025-01-12",
  },
  {
    id: "CMP001",
    type: "COMPLAINT",
    reporter: "Alice Smith",
    reportedUser: "Tenant_11",
    role: "TENANT",
    reason: "Noise complaint",
    description: "Tenant plays loud music at night.",
    status: "RESOLVED",
    createdAt: "2025-01-10",
  },
];

const STATUS_OPTIONS = [
  { label: "Status", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Resolved", value: "RESOLVED" },
];

const TYPE_OPTIONS = [
  { label: "Type", value: "ALL" },
  { label: "Reports", value: "REPORT" },
  { label: "Complaints", value: "COMPLAINT" },
];

export default function AdminReportsAndComplaints() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [selectedEntry, setSelectedEntry] = useState(null);

  const filteredEntries = ENTRIES.filter(
    (e) =>
      (statusFilter === "ALL" || e.status === statusFilter) &&
      (typeFilter === "ALL" || e.type === typeFilter)
  );

  return (
    <>
      <Helmet>
        <title>Admin Console | Reports & Complaints</title>
        <meta name="description" content="Admin Reports & Complaints" />
      </Helmet>

      <div className="p-0 md:p-6 space-y-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-semibold">
            Reports & Complaints
          </h1>

          <div className="flex gap-2 md:flex-nowrap text-sm">
            <Dropdown
              value={typeFilter}
              options={TYPE_OPTIONS}
              onChange={(e) => setTypeFilter(e.value)}
              className="w-full md:w-40"
            />
            <Dropdown
              value={statusFilter}
              options={STATUS_OPTIONS}
              onChange={(e) => setStatusFilter(e.value)}
              className="w-full md:w-40"
            />
          </div>
        </div>

        {/* TABLE WRAPPER */}
        {/* DESKTOP TABLE */}
        <div className="hidden md:block bg-white rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Reported User</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{entry.id}</td>
                  <td className="p-3">{entry.type}</td>
                  <td className="p-3">{entry.reportedUser}</td>
                  <td className="p-3">{entry.role}</td>
                  <td className="p-3">{entry.reason}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        entry.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="p-3">{entry.createdAt}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedEntry(entry)}
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
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl shadow p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{entry.reportedUser}</p>
                  <p className="text-xs text-gray-500">
                    {entry.role} • {entry.createdAt} • {entry.type}
                  </p>
                </div>

                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    entry.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {entry.status}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500">Reason</p>
                <p className="text-sm font-medium">{entry.reason}</p>
              </div>

              <button
                onClick={() => setSelectedEntry(entry)}
                className="w-full border border-black py-2 rounded-lg text-sm font-medium"
              >
                View Details
              </button>
            </div>
          ))}

          {filteredEntries.length === 0 && (
            <p className="text-center text-gray-500 py-6">No entries found</p>
          )}
        </div>

        {/* DETAILS MODAL */}
        <Dialog
          header="Details"
          visible={!!selectedEntry}
          onHide={() => setSelectedEntry(null)}
          className="w-[95vw] sm:w-[32rem]"
        >
          {selectedEntry && (
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-medium">{selectedEntry.type}</p>
              </div>

              <div>
                <p className="text-gray-500">Reported User</p>
                <p className="font-medium">
                  {selectedEntry.reportedUser} ({selectedEntry.role})
                </p>
              </div>

              <div>
                <p className="text-gray-500">Reported By</p>
                <p className="font-medium">{selectedEntry.reporter}</p>
              </div>

              <div>
                <p className="text-gray-500">Reason</p>
                <p className="font-medium">{selectedEntry.reason}</p>
              </div>

              <div>
                <p className="text-gray-500">Description</p>
                <p className="text-gray-700">{selectedEntry.description}</p>
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
