export default function PropertyApprovals() {
  return (
    <div className="bg-gray-50 rounded-xl p-2 md:p-6">
      <h2 className="text-xl font-semibold tracking-wide mb-6 text-gray-800">
        Property Approval Requests
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            {/* Property Image */}
            <div className="h-44 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">
                Property Image
              </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3 text-xs md:text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Luxury Apartment #{i}
                  </h3>
                  <p className=" text-gray-500">
                    Owner: Alex Johnson
                  </p>
                </div>

                <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium">
                  Pending
                </span>
              </div>

              <div className="text-sm text-gray-600 leading-relaxed">
                Prime location property with modern amenities and
                premium interior finishes.
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 border border-black hover:bg-emerald-700 text-black py-2 rounded-lg font-medium transition">
                  Approve
                </button>
                <button className="flex-1 bg-black hover:bg-red-700 text-white py-2 rounded-lg font-medium transition">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
