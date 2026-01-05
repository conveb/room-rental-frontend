import { useState } from "react";

import { useAmenities } from "../../../hooks/useAmenities";

export function AddAmenities() {
  const [name, setName] = useState("");
  const { amenities, loading, addAmenity, adding ,deleteAmenity   } = useAmenities();
  const [deletingId, setDeletingId] = useState(null); 

  const handleAdd = async () => {
    try {
      await addAmenity(name);
      alert("Amenity added");
      setName("");
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  };

    const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteAmenity(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 text-xs md:text-sm">
      <h2 className="text-lg font-semibold">Amenities</h2>

      {/* Add Amenity */}
      <div className="flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Amenity name"
          className="border p-3 rounded-lg flex-1"
        />
        <button
          onClick={handleAdd}
          disabled={adding}
          className="bg-black text-white px-6 rounded-lg disabled:opacity-50"
        >
          {adding ? "Adding..." : "Add"}
        </button>
      </div>

      {/* List Amenities */}
      <div className="space-y-2">
        {loading ? (
          <p className="text-gray-500">Loading amenities...</p>
        ) : amenities.length === 0 ? (
          <p className="text-gray-500">No amenities added</p>
        ) : (
          amenities.map((a) => (
            <div
              key={a.id}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
            >
              <span>{a.name}</span>
              <button
                onClick={() => handleDelete(a.id)}
                disabled={deletingId === a.id}
                className="text-sm text-red-500 disabled:opacity-50"
              >
                {deletingId === a.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
