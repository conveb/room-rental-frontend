import React from "react";

const UserPayments = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-2 md:p-10 py-5">
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
                    Payments
                </h1>
                <p className="text-gray-500 mt-1 text-xs md:text-sm">
                    View your payment history and transaction details
                </p>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                <div className="col-span-1 bg-white rounded-2xl shadow p-6">
                    <p className="text-sm text-gray-500">Total Paid</p>
                    <h2 className="text-2xl font-semibold mt-2">€2,450</h2>
                </div>

                <div className="col-span-1 bg-white rounded-2xl shadow p-6">
                    <p className="text-sm text-gray-500">Last Payment</p>
                    <h2 className="text-2xl font-semibold mt-2">€650</h2>
                </div>

                <div className="col-span-2 md:col-span-1 bg-white rounded-2xl shadow p-6">
                    <p className="text-sm text-gray-500">Pending</p>
                    <h2 className="text-2xl font-semibold mt-2">€0</h2>
                </div>
            </div>

            {/* PAYMENT HISTORY */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
  {/* Header */}
  <div className="p-6 border-b">
    <h2 className="text-xl font-semibold">Payment History</h2>
  </div>

  {/* Table for large screens */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-50 text-gray-600">
        <tr>
          <th className="text-left px-6 py-4">Date</th>
          <th className="text-left px-6 py-4">Property</th>
          <th className="text-left px-6 py-4">Amount</th>
          <th className="text-left px-6 py-4">Status</th>
          <th className="text-right px-6 py-4">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y">
        {[
          { date: "12 Jan 2026", property: "Studio Room - Paris", amount: "€650", status: "Paid" },
          { date: "12 Dec 2025", property: "Private Room - Paris", amount: "€600", status: "Paid" },
        ].map((item, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="px-6 py-4">{item.date}</td>
            <td className="px-6 py-4">{item.property}</td>
            <td className="px-6 py-4 font-medium">{item.amount}</td>
            <td className="px-6 py-4">
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                {item.status}
              </span>
            </td>
            <td className="px-6 py-4 text-right">
              <button className="text-black font-medium hover:underline">View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile cards for small screens */}
  <div className="md:hidden space-y-4 p-4">
    {[
      { date: "12 Jan 2026", property: "Studio Room - Paris", amount: "€650", status: "Paid" },
      { date: "12 Dec 2025", property: "Private Room - Paris", amount: "€600", status: "Paid" },
    ].map((item, idx) => (
      <div
        key={idx}
        className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 shadow-sm"
      >
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">{item.property}</p>
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
            {item.status}
          </span>
        </div>
        <p className="text-gray-500 text-sm">{item.date}</p>
        <p className="font-medium">{item.amount}</p>
        <button className="mt-2 w-full text-center bg-black text-white py-2 rounded-lg text-sm">
          View
        </button>
      </div>
    ))}
  </div>
</div>

        </div>
    );
};

export default UserPayments;
