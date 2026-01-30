import React from "react";
import AccommodationSkeleton from "./AccommodationSkeleton";

const AccommodationGridSkeleton = () => {
  // Create an array of 6 items
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 px-2 md:px-32 mt-2 md:mt-6 items-stretch">
      {skeletons.map((_, index) => (
    <div className="flex flex-col h-full animate-pulse" key={index}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100">
        {/* Image Placeholder */}
        <div className="w-full h-60 bg-gray-300" />

        {/* Content Placeholder */}
        <div className="p-3 md:p-4 flex flex-col flex-1 space-y-3">
          {/* Title */}
          <div className="h-5 bg-gray-300 rounded w-3/4" />
          
          {/* City/Country */}
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          
          {/* Stats (Rooms/People) */}
          <div className="h-3 bg-gray-200 rounded w-5/6" />

          {/* Price (Pushed to bottom) */}
          <div className="mt-auto pt-2">
            <div className="h-5 bg-gray-300 rounded w-1/3" />
          </div>
        </div>
      </div>
    </div>
    ))}
    </div>
);
};

export default AccommodationGridSkeleton;