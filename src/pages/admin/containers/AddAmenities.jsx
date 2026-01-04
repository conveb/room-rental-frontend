export function AddAmenities() {
    
    return (
        <div className="space-y-6 text-xs md:text-sm">
            <h2 className="text-lg font-semibold">Amenities</h2>

            <div className="flex gap-3">
                <input
                    placeholder="Amenity name"
                    className="border p-3 rounded-lg flex-1"
                />
                <button className="bg-black text-white px-6 rounded-lg">
                    Add
                </button>
            </div>

            <div className="space-y-2">
                {["WiFi", "Parking", "Swimming Pool"].map((a, i) => (
                    <div
                        key={i}
                        className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
                    >
                        <span>{a}</span>
                        <button className="text-sm text-red-500">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
