export default function LoremSection() {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-0 py-10">
      <section className="mb-20">
        <div className="relative grid md:grid-cols-7 gap-5 items-start">
          <div className="md:col-span-2 flex flex-col justify-end h-full">
            <h2 className="absolute top-0 md:top-20 left-0 z-20 max-w-6xl special-font text-4xl md:text-6xl font-extrabold leading-tight">
              Move In.<br />
              Settle Fast.<br />
              Focus on Studies.
            </h2>

            <div className="mt-32 md:mt-0">
              <p className="mt-6 text-sm text-gray-600 max-w-md">
                Skip the stress of house hunting. Find ready-to-move student
                rooms with furniture, Wi-Fi, and utilities already set up. Book
                online, move in quickly, and spend your time where it matters
                most — on your studies and student life.
              </p>

              <button className="mt-6 px-4 py-2 bg-black text-white rounded">
                Explore student rooms
              </button>

              <div className="mt-6 text-2xl text-gray-400">2025</div>
            </div>
          </div>

          <div className="md:col-span-3">
            {/* Large central image card */}
            <div className="relative md:w-[470px] h-96 md:h-[700px] bg-gray-200 overflow-hidden rounded">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-black/30 to-black/80" />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col justify-between h-full">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              <div
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80')",
                }}
                className="w-full h-64 bg-cover bg-center rounded"
              ></div>

              <div
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80')",
                }}
                className="w-full h-64 bg-cover bg-center rounded"
              ></div>
            </div>

            <p className="text-end mt-10 text-sm text-gray-600">
              Designed for students who value convenience and comfort. Flexible
              monthly rentals, verified rooms, and locations close to
              universities make settling in fast and stress-free.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
