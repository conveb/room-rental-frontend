import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Helmet } from "react-helmet";

/* ---------------- TYPE & STATUS OPTIONS ---------------- */
const TYPE_OPTIONS = [
  { label: "Type", value: "ALL" },
  { label: "Reports", value: "REPORT" },
  { label: "Complaints", value: "COMPLAINT" },
  { label: "Support Tickets", value: "SUPPORT" },
  { label: "Feedback", value: "FEEDBACK" },
];

const STATUS_OPTIONS = [
  { label: "Status", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Resolved", value: "RESOLVED" },
];

/* ---------------- DEMO FETCH FUNCTIONS ---------------- */
async function fetchReportsAPI() {
  // Replace with your real API call
  return [
    {
      id: "RPT001",
      type: "REPORT",
      reporter: "John Doe",
      reportedUser: "Landowner_22",
      role: "LANDOWNER",
      reason: "Fraud listing",
      description: "Property photos are fake and misleading.",
      status: "PENDING",
      createdAt: "2025-01-12",
    },
  ];
}

async function fetchComplaintsAPI() {
  return [
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
}

async function fetchSupportAPI() {
  return [
    {
      id: "SUP001",
      type: "SUPPORT",
      user: "User123",
      subject: "Login Issue",
      message: "I can't log in to my account.",
      status: "PENDING",
      createdAt: "2025-01-15",
    },
  ];
}

async function fetchFeedbackAPI() {
  return [
    {
      id: "FB001",
      type: "FEEDBACK",
      user: "User456",
      message: "Great platform, really helpful!",
      rating: 5,
      createdAt: "2025-01-11",
    },
  ];
}

async function updateSupportStatusAPI(id, newStatus) {
  // Replace with real API call: PATCH Admin_support_status_update
  console.log("Updating support ticket", id, "to", newStatus);
  return true;
}

/* ---------------- COMPONENT ---------------- */
export default function AdminSupportAndFeedback() {
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Fetch entries whenever typeFilter changes
  useEffect(() => {
    async function fetchData() {
      let data = [];
      if (typeFilter === "REPORT") data = await fetchReportsAPI();
      else if (typeFilter === "COMPLAINT") data = await fetchComplaintsAPI();
      else if (typeFilter === "SUPPORT") data = await fetchSupportAPI();
      else if (typeFilter === "FEEDBACK") data = await fetchFeedbackAPI();
      else {
        // ALL: combine all types
        const [r, c, s, f] = await Promise.all([
          fetchReportsAPI(),
          fetchComplaintsAPI(),
          fetchSupportAPI(),
          fetchFeedbackAPI(),
        ]);
        data = [...r, ...c, ...s, ...f];
      }
      setEntries(data);
    }
    fetchData();
  }, [typeFilter]);

  const filteredEntries = entries.filter(
    (e) => statusFilter === "ALL" || e.status === statusFilter
  );

  // Handle support ticket status update
  const handleStatusUpdate = async (entry, newStatus) => {
    if (entry.type === "SUPPORT") {
      const success = await updateSupportStatusAPI(entry.id, newStatus);
      if (success) {
        setEntries((prev) =>
          prev.map((e) =>
            e.id === entry.id ? { ...e, status: newStatus } : e
          )
        );
        setSelectedEntry((prev) => ({ ...prev, status: newStatus }));
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Console | Dashboard</title>
        <meta name="description" content="Admin Dashboard for reports, complaints, support, and feedback" />
      </Helmet>

      <div className="p-2 md:p-6 space-y-6">
        {/* HEADER & FILTERS */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-semibold">
            Admin Dashboard
          </h1>

          <div className="flex gap-2  md:flex-nowrap">
            <Dropdown
              value={typeFilter}
              options={TYPE_OPTIONS}
              onChange={(e) => setTypeFilter(e.value)}
              className="w-full md:w-48"
            />
            <Dropdown
              value={statusFilter}
              options={STATUS_OPTIONS}
              onChange={(e) => setStatusFilter(e.value)}
              className="w-full md:w-48"
            />
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">User / Reported User</th>
                <th className="p-3 text-left">Role / Subject</th>
                <th className="p-3 text-left">Reason / Message</th>
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
                  <td className="p-3">{entry.user || entry.reportedUser}</td>
                  <td className="p-3">{entry.role || entry.subject || "-"}</td>
                  <td className="p-3">{entry.reason || entry.message || "-"}</td>
                  <td className="p-3">
                    {entry.status ? (
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          entry.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {entry.status}
                      </span>
                    ) : (
                      "-"
                    )}
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
            <div key={entry.id} className="bg-white rounded-xl shadow p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{entry.user || entry.reportedUser}</p>
                  <p className="text-xs text-gray-500">
                    {entry.role || entry.subject || "-"} • {entry.createdAt} • {entry.type}
                  </p>
                </div>
                {entry.status && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      entry.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {entry.status}
                  </span>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-500">Reason / Message</p>
                <p className="text-sm font-medium">{entry.reason || entry.message || "-"}</p>
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
          header={selectedEntry?.type || "Details"}
          visible={!!selectedEntry}
          onHide={() => setSelectedEntry(null)}
          className="w-[95vw] sm:w-[32rem]"
        >
          {selectedEntry && (
            <div className="space-y-4 text-sm">
              {selectedEntry.type === "FEEDBACK" ? (
                <>
                  <div>
                    <p className="text-gray-500">User</p>
                    <p className="font-medium">{selectedEntry.user}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Message</p>
                    <p className="text-gray-700">{selectedEntry.message}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Rating</p>
                    <p className="font-medium">{selectedEntry.rating}</p>
                  </div>
                </>
              ) : selectedEntry.type === "SUPPORT" ? (
                <>
                  <div>
                    <p className="text-gray-500">User</p>
                    <p className="font-medium">{selectedEntry.user}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Subject</p>
                    <p className="font-medium">{selectedEntry.subject}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Message</p>
                    <p className="text-gray-700">{selectedEntry.message}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-medium">{selectedEntry.status}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    {selectedEntry.status !== "RESOLVED" && (
                      <Button
                        label="Mark as Resolved"
                        severity="success"
                        className="w-full sm:w-auto"
                        onClick={() => handleStatusUpdate(selectedEntry, "RESOLVED")}
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-gray-500">Reported User</p>
                    <p className="font-medium">{selectedEntry.reportedUser} ({selectedEntry.role})</p>
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
                    <Button label="Block User" severity="warning" className="w-full sm:w-auto" />
                    <Button label="Delete Permanently" severity="danger" className="w-full sm:w-auto" />
                    {selectedEntry.status !== "RESOLVED" && (
                      <Button label="Mark as Resolved" severity="success" className="w-full sm:w-auto" />
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </Dialog>
      </div>
    </>
  );
}
