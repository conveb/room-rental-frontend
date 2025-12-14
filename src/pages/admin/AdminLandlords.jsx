// src/pages/admin/AdminLandlords.jsx
import React, { useState } from "react";

const initialLandlords = [
  { id: 1, name: "Marie Dupont", email: "marie@landlord.fr", phone: "+33 6 12 34 56 78", rooms: 10, verified: true },
  { id: 2, name: "Pierre Laurent", email: "pierre@landlord.fr", phone: "+33 6 23 45 67 89", rooms: 6, verified: false },
];

const AdminLandlords = () => {
  const [landlords, setLandlords] = useState(initialLandlords);

  const toggleVerified = (id) => {
    setLandlords((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, verified: !l.verified } : l
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Landlords</h2>
          <p className="text-sm text-gray-500">
            Verify landlords and monitor their listings.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4 overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="border-b bg-gray-50 text-gray-500">
            <tr>
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Phone</th>
              <th className="py-2 px-3">Rooms</th>
              <th className="py-2 px-3">Verified</th>
              <th className="py-2 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {landlords.map((l) => (
              <tr key={l.id} className="border-b last:border-0">
                <td className="py-2 px-3 text-gray-500">{l.id}</td>
                <td className="py-2 px-3 text-gray-800">{l.name}</td>
                <td className="py-2 px-3 text-gray-600">{l.email}</td>
                <td className="py-2 px-3 text-gray-600">{l.phone}</td>
                <td className="py-2 px-3 text-gray-600">{l.rooms}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-2 py-1 rounded-full text-[11px] ${
                      l.verified
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {l.verified ? "Verified" : "Pending"}
                  </span>
                </td>
                <td className="py-2 px-3 text-right">
                  <button
                    onClick={() => toggleVerified(l.id)}
                    className="text-xs text-gray-700 hover:text-black mr-3"
                  >
                    {l.verified ? "Unverify" : "Verify"}
                  </button>
                  <button className="text-xs text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {landlords.length === 0 && (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-400">
                  No landlords found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLandlords;
