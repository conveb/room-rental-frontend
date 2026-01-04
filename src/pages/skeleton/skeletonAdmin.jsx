export default function skeletonAdmin  ()  {

    <div className="space-y-4 animate-pulse">
    {/* Title */}
    <div className="h-6 w-64 bg-gray-200 rounded-md" />

    {/* Search bar */}
    <div className="flex gap-2 w-full items-center">
      <div className="h-10 w-full bg-gray-200 rounded-md" />
    </div>

    {/* Property cards */}
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="flex justify-between items-center border p-2 rounded-xl"
      >
        {/* Left content */}
        <div className="space-y-2">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-3 w-32 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>

        {/* Right buttons */}
        <div className="flex flex-col gap-2">
          <div className="h-10 w-24 bg-gray-200 rounded-lg" />
          <div className="h-10 w-24 bg-gray-200 rounded-lg" />
        </div>
      </div>
    ))}
  </div>
}
