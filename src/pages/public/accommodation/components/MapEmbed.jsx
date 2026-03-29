// components/MapEmbed.jsx
import React, { useEffect, useState } from "react";
import { MdMap } from "react-icons/md";

const MapEmbed = ({ address, city, region, country }) => {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const geocode = async () => {
      setLoading(true);
      setFailed(false);

      // Extract postal code from address if present (e.g. "16 rue Michelet, 95100 Argenteuil")
      const postalMatch = address?.match(/\b\d{4,6}\b/);
      const postalCode = postalMatch ? postalMatch[0] : null;

      // Strip street number + name only (before any comma or postal code)
      const street = address?.split(",")[0]?.trim() || null;

      // Structured queries — from most to least specific
      const queries = [
        // 1. Full structured: street + postal + city + country
        postalCode
          ? `https://nominatim.openstreetmap.org/search?street=${encodeURIComponent(street)}&postalcode=${postalCode}&city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&format=json&limit=1`
          : null,

        // 2. Street + city + country (no postal)
        `https://nominatim.openstreetmap.org/search?street=${encodeURIComponent(street)}&city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&format=json&limit=1`,

        // 3. Postal code + country only
        postalCode
          ? `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=${encodeURIComponent(country)}&format=json&limit=1`
          : null,

        // 4. Last resort: free-text city + country
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${city}, ${country}`)}&format=json&limit=1`,
      ].filter(Boolean);

      let found = null;

      for (const url of queries) {
        try {
          const res = await fetch(url, {
            headers: { "Accept-Language": "en" },
          });
          const data = await res.json();
          if (data && data.length > 0) {
            found = {
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon),
            };
            break;
          }
        } catch (err) {
          console.error("Geocoding error:", err);
        }
      }

      if (found) {
        setCoords(found);
      } else {
        setFailed(true);
      }

      setLoading(false);
    };

    geocode();
  }, [address, city, region, country]);

  if (loading) {
    return (
      <div className="mt-2 h-48 w-full rounded-lg border bg-gray-50 flex items-center justify-center text-xs text-gray-400">
        Loading map...
      </div>
    );
  }

  if (failed || !coords) {
    return (
      <div className="mt-2 h-48 w-full rounded-lg border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 text-gray-400">
        <MdMap size={28} />
        <p className="text-xs">Map not available</p>
      </div>
    );
  }

  const { lat, lng } = coords;
  const delta = 0.003; // tight street-level zoom
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;

  return (
    <div className="mt-2 h-48 w-full rounded-lg overflow-hidden border">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`}
        title="Property Location"
      />
    </div>
  );
};

export default MapEmbed;