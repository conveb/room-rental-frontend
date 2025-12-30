import { useState } from "react";

export default function VerificationRequests() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-50 rounded-xl p-2 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold tracking-wide text-gray-800 mb-4 md:mb-6">
          Landowner Verification Requests
        </h2>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left">Landowner</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Document</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">Edvin Johnson</td>
                <td className="px-6 py-4 text-gray-600">
                  edvin@mail.com
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setOpen(true)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View Document
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="border border-black px-4 py-2 rounded-lg hover:bg-emerald-700 hover:text-white transition">
                      Approve
                    </button>
                    <button className="bg-black px-4 py-2 rounded-lg text-white hover:bg-red-700 transition">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4">
          <div className="bg-white rounded-2xl shadow p-2 space-y-3">
            <div>
              <h3 className="font-semibold text-gray-900">
                Edvin Johnson
              </h3>
              <p className="text-sm text-gray-500">
                edvin@mail.com
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="text-blue-600 text-sm font-medium"
            >
              View Document
            </button>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 border border-black py-2 rounded-lg hover:bg-emerald-700 hover:text-white transition">
                Approve
              </button>
              <button className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-red-700 transition">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && <DocumentModal onClose={() => setOpen(false)} />}
    </>
  );
}

function DocumentModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">
            Verification Document
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Landowner: Edvin Johnson</span>
            <span>Document Type: ID Proof</span>
          </div>

          {/* Demo Document Preview */}
          <div className="border rounded-xl overflow-hidden bg-gray-100">
            <div className="h-96 flex items-center justify-center text-gray-500">
              Demo Document Preview
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Close
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">
            Approve
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
  