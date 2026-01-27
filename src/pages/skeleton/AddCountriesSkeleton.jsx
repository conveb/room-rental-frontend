import React from "react";

export function AddCountriesSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse">
      {/* 1. Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-3 w-32 bg-gray-200 rounded-full"></div>
        {/* Spinner placeholder */}
        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
      </div>

      {/* 2. SEARCH & ADD SKELETON */}
      <div className="flex gap-2">
        {/* Search Input Placeholder */}
        <div className="relative flex-1 h-[54px] bg-gray-100 rounded-2xl border border-gray-100 flex items-center px-4">
            <div className="w-5 h-5 bg-gray-200 rounded-full mr-3"></div> {/* Icon circle */}
            <div className="h-3 w-32 bg-gray-200 rounded-full"></div> {/* Text placeholder */}
        </div>
        {/* Add Button Placeholder */}
        <div className="w-28 h-[54px] bg-gray-200 rounded-2xl"></div>
      </div>

      <hr className="border-gray-100" />

      {/* 3. GRID LIST SKELETON */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white border border-gray-100 p-3 rounded-xl flex items-center gap-4">
            {/* Flag box */}
            <div className="w-11 h-8 bg-gray-200 rounded-lg shrink-0"></div>
            
            {/* Text lines */}
            <div className="flex-1 space-y-2">
              <div className="h-3 w-20 bg-gray-200 rounded-full"></div>
              <div className="h-2 w-16 bg-gray-100 rounded-full"></div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <div className="w-4 h-4 bg-gray-100 rounded-md"></div>
              <div className="w-4 h-4 bg-gray-100 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}