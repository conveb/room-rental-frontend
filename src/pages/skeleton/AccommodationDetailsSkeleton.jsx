import React from "react";

const AccommodationDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header Skeleton */}
      <header className="border-b bg-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12" />
      </header>

      {/* Main Skeleton */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Side: Images */}
          <section>
            <div className="aspect-[4/3] rounded-2xl bg-gray-300 w-full" />
            <div className="hidden lg:grid grid-cols-4 gap-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-28 w-28 rounded-xl bg-gray-300" />
              ))}
            </div>
          </section>

          {/* Right Side: Details */}
          <section className="space-y-6">
            {/* Title & Description */}
            <div className="space-y-3">
              <div className="h-8 bg-gray-300 rounded-md w-3/4" />
              <div className="h-4 bg-gray-200 rounded-md w-full" />
              <div className="h-4 bg-gray-200 rounded-md w-5/6" />
            </div>

            {/* Price & Booking Box */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <div className="h-10 bg-gray-300 rounded-md w-32" />
                <div className="h-6 bg-gray-200 rounded-full w-24" />
              </div>

              {/* Grid Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-12" />
                    <div className="h-4 bg-gray-200 rounded w-16" />
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="h-12 bg-gray-300 rounded-lg w-full" />
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-20" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-20 bg-gray-200 rounded-full" />
                ))}
              </div>
            </div>

            {/* Map Area */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-20" />
              <div className="h-48 bg-gray-200 rounded-lg w-full" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AccommodationDetailsSkeleton;