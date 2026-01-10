export default function UserProfileSkeleton() {
  return (
    <div className="animate-pulse p-6 space-y-6 md:mx-auto md:container">

      {/* TOP CARD */}
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 shadow-sm">
        {/* Avatar */}
        <div className="relative">
          <div className="w-52 h-52 rounded-full bg-gray-200" />
          <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-gray-300" />
        </div>

        {/* Name */}
        <div className="h-5 w-40 bg-gray-200 rounded" />
        {/* Email */}
        <div className="h-4 w-56 bg-gray-200 rounded" />
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT FORM */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 space-y-4 shadow-sm">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-11 w-full bg-gray-200 rounded-xl" />
            </div>
          ))}

          {/* Edit Button */}
          <div className="h-11 w-40 bg-gray-300 rounded-xl mt-4" />
        </div>

        {/* RIGHT ACTIONS */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-200" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
