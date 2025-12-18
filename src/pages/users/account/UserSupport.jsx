import { useState } from "react";

export default function UserSupport() {
  const [category, setCategory] = useState("general");

  return (
    <div className="space-y-6 px-2 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Support & Help</h1>
        <p className="text-sm text-gray-500 mt-1">
          Contact our support team or report issues related to properties or owners.
        </p>
      </div>

      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="font-medium text-gray-900">Booking Issues</p>
          <p className="text-sm text-gray-500 mt-1">
            Problems with payments, cancellations, or refunds.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="font-medium text-gray-900">Report Property</p>
          <p className="text-sm text-gray-500 mt-1">
            Fake listings, incorrect details, or policy violations.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="font-medium text-gray-900">Report Owner</p>
          <p className="text-sm text-gray-500 mt-1">
            Suspicious behavior or guideline violations.
          </p>
        </div>
      </div>

      {/* Support Form */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
        <h2 className="text-lg font-semibold text-gray-900">Submit a Support Request</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="general">General Support</option>
              <option value="booking">Booking / Payment Issue</option>
              <option value="property">Report Property</option>
              <option value="owner">Report Owner</option>
              <option value="technical">Technical Issue</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Related Booking / Property ID</label>
            <input
              type="text"
              placeholder="Optional"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            placeholder="Brief summary of the issue"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows={5}
            placeholder="Describe the issue in detail"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attachments (optional)</label>
          <input
            type="file"
            className="w-full text-sm"
          />
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
            Submit Request
          </button>
        </div>
      </div>

      {/* Info Note */}
      <div className="text-sm text-gray-500">
        Reports are reviewed by our admin team. False reports may lead to account action.
      </div>
    </div>
  );
}
