import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";

// Example countries with ISO codes
const ALL_COUNTRIES = [
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "Italy", code: "IT" },
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
];

export function AddLocations() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState([]);

  const addLocation = () => {
    if (!selectedCountry || !city) return;

    // Prevent duplicates
    const exists = locations.some(
      (l) =>
        l.city.toLowerCase() === city.trim().toLowerCase() &&
        l.country === selectedCountry
    );
    if (exists) return;

    // Find country object
    const countryObj = ALL_COUNTRIES.find((c) => c.name === selectedCountry);
    if (!countryObj) return;

    setLocations((prev) => [
      ...prev,
      { city: city.trim(), country: selectedCountry, code: countryObj.code },
    ]);
    setCity("");
  };

  const removeLocation = (index) => {
    setLocations((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3 md:space-y-6">
      <h2 className="text-lg font-semibold">Locations</h2>

      {/* Country selector */}
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="border p-3 rounded-lg w-full text-xs md:text-sm"
      >
        <option value="">Select Country</option>
        {ALL_COUNTRIES.map((c) => (
          <option key={c.code} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {/* City input */}
      <div className="flex gap-3 text-xs md:text-sm">
        <input
          placeholder="City / Location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-3 rounded-lg flex-1"
        />
        <button
          onClick={addLocation}
          className="bg-black text-white px-6 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Locations list */}
      <div className="space-y-2">
        {locations.map((l, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <ReactCountryFlag
                countryCode={l.code}
                svg
                style={{ width: "1.5em", height: "1.5em" }}
              />
              {l.city} ({l.country})
            </span>
            <button
              onClick={() => removeLocation(i)}
              className="text-sm text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
