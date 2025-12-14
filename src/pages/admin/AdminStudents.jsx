// src/pages/admin/AdminStudents.jsx
import React, { useState } from "react";

const initialStudents = [
  { id: 1, name: "Alex Martin", email: "alex@student.fr", university: "Sorbonne", status: "Active" },
  { id: 2, name: "Sara Khan", email: "sara@student.fr", university: "Lyon 1", status: "Active" },
  { id: 3, name: "John Doe", email: "john@student.fr", university: "Marseille", status: "Blocked" },
];

const AdminStudents = () => {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === "Active" ? "Blocked" : "Active" } : s
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Students</h2>
          <p className="text-sm text-gray-500">
            Manage student accounts and access.
          </p>
        </div>
        <input
          type="text"
          placeholder="Search name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-xs border bg-white px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4 overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="border-b bg-gray-50 text-gray-500">
            <tr>
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">University</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="py-2 px-3 text-gray-500">{s.id}</td>
                <td className="py-2 px-3 text-gray-800">{s.name}</td>
                <td className="py-2 px-3 text-gray-600">{s.email}</td>
                <td className="py-2 px-3 text-gray-600">{s.university}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-2 py-1 rounded-full text-[11px] ${
                      s.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="py-2 px-3 text-right">
                  <button
                    onClick={() => toggleStatus(s.id)}
                    className="text-xs text-gray-700 hover:text-black mr-3"
                  >
                    {s.status === "Active" ? "Block" : "Unblock"}
                  </button>
                  <button className="text-xs text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-400">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStudents;
