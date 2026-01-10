import React from "react";
import { useUserCompleteDetails } from "../../../hooks/users/useUserCompleteDetails";

const StudentDetailsModal = ({ id, onClose, onBlock }) => {
    
    const { data, loading } = useUserCompleteDetails(id);
    if (!id) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md">
          <p className="text-sm text-gray-500">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const {
    email,
    is_active,
    student_profile,
    support_tickets = [],
  } = data;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto space-y-5">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">User Details</h2>
          <button onClick={onClose} className="text-sm text-gray-500">
            Close
          </button>
        </div>

        {/* BASIC INFO */}
        <div className="border rounded-xl p-4 space-y-2 text-sm">
          <h3 className="font-medium">Basic Information</h3>
          <p><span className="font-medium">Name:</span> {student_profile?.full_name || "-"}</p>
          <p><span className="font-medium">Email:</span> {email}</p>
          <p><span className="font-medium">Phone:</span> {student_profile?.phone || "-"}</p>
          <p><span className="font-medium">Verified:</span> {student_profile?.is_verified ? "Yes" : "No"}</p>
          <p>
            <span className="font-medium">Status:</span>
            <span className={`ml-2 px-2 py-1 text-xs rounded ${
              is_active ? "bg-green-500" : "bg-red-200"
            }`}>
              {is_active ? "Active" : "Blocked"}
            </span>
          </p>
        </div>

        {/* SUPPORT TICKETS */}
        <div className="border rounded-xl p-4 space-y-3 text-sm">
          <h3 className="font-medium">Support Tickets</h3>

          {support_tickets.length === 0 ? (
            <p className="text-gray-500">No support tickets</p>
          ) : (
            support_tickets.map(ticket => (
              <div key={ticket.id} className="border rounded-xl p-3 space-y-1">
                <p><span className="font-medium">Issue:</span> {ticket.issue_type}</p>
                <p><span className="font-medium">Message:</span> {ticket.message}</p>
                <p><span className="font-medium">Status:</span> {ticket.status}</p>
                <p><span className="font-medium">Admin Response:</span> {ticket.admin_response || "-"}</p>
              </div>
            ))
          )}
        </div>

        {/* ACTION */}
        {is_active && (
          <button
            onClick={onBlock}
            className="w-full bg-red-500 text-white py-2 rounded-xl"
          >
            Block Student
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentDetailsModal;
