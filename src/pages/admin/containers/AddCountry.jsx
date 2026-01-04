import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";

// Full list of countries with ISO codes
const ALL_COUNTRIES = [
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "Italy", code: "IT" },
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "Japan", code: "JP" },
  { name: "India", code: "IN" },
  // ... add more countries if needed
];

export function AddCountries() {
  const [countries, setCountries] = useState([]); // Only show added countries
  const [newCountry, setNewCountry] = useState("");

  const addCountry = () => {
    if (!newCountry) return;

    // Find country from the ALL_COUNTRIES list
    const found = ALL_COUNTRIES.find(
      (c) => c.name.toLowerCase() === newCountry.trim().toLowerCase()
    );

    if (!found) {
      alert("Country not found in database");
      return;
    }

    // Prevent duplicates
    if (countries.some((c) => c.code === found.code)) return;

    setCountries((prev) => [...prev, found]);
    setNewCountry(""); // reset input
  };

  const removeCountry = (code) => {
    setCountries((prev) => prev.filter((c) => c.code !== code));
  };

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-lg font-semibold">Countries</h2>

      <div className="text-sm  flex gap-1 md:gap-3">
        <input
          placeholder="Type country name"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
          className="border p-3 rounded-lg "
        />
        <button
          onClick={addCountry}
          className="bg-black text-white px-4 md:px-6 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Only show added countries */}
      <div className="space-y-2">
        {countries.map((c) => (
          <div
            key={c.code}
            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <ReactCountryFlag
                countryCode={c.code}
                svg
                style={{ width: "1.5em", height: "1.5em" }}
              />
              {c.name}
            </span>
            <button
              onClick={() => removeCountry(c.code)}
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
