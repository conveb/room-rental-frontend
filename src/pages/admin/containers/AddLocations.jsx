import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useLocations } from "../../../hooks/admin/constants/useLocations";

export function AddLocations() {
  const { locations, loading, deleteLocation, addLocation,adding, refetch } = useLocations();
  const [deletingId, setDeletingId] = useState(null);
  const [city, setCity] = useState("");
  const handleAdd = async () => {
    if (!city.trim()) return;
    try {
      await addLocation(city.trim());
      setCity("");
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  };
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteLocation(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-3 md:space-y-6">
      <h2 className="text-lg font-semibold">Locations</h2>
      <div className="flex gap-3 text-xs md:text-sm">
        <input
          placeholder="City / Location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
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
      {loading ? (
        <p className="text-gray-500">Loading locations...</p>
      ) : locations.length === 0 ? (
        <p className="text-gray-500">No locations added</p>
      ) : (
        <div className="space-y-2">
          {locations.map((l) => (
            <div
              key={l.id}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
            >
              {/* <ReactCountryFlag
                countryCode={l.country_code}
                svg
                style={{ width: "1.5em", height: "1.5em" }}
              /> */}
              <span className="flex items-center gap-2">
                {l.location_name}
              </span>
              <button
                onClick={() => handleDelete(l.id)}
                disabled={deletingId === l.id}
                className="text-sm text-red-500 disabled:opacity-50"
              >
                {deletingId === l.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
