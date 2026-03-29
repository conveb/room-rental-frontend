import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { MdMyLocation, MdMap, MdSearch, MdCheck, MdClose, MdLocationPin } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";

// ── Fix Leaflet's broken default icon paths in Vite/Webpack ──────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom red "confirm" marker
const confirmIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ── Sub-components ────────────────────────────────────────────────────────────

/** Forces the map to recalculate its size after the Dialog finishes rendering */
function InvalidateOnMount() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 200);
  }, [map]);
  return null;
}

/** Keeps the map centered when pendingPos changes */
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, map.getZoom());
  }, [center?.[0], center?.[1]]); // eslint-disable-line
  return null;
}

/** Listens for map clicks and sets pending position */
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Reverse geocode a lat/lng → structured address object */
async function reverseGeocode(lat, lng) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
    { headers: { "Accept-Language": "en" } }
  );
  const data = await res.json();
  if (!data.address) return null;

  const a = data.address;
  const houseNumber = a.house_number || "";
  const road = a.road || a.pedestrian || a.footway || a.path || "";
  const suburb = a.suburb || a.neighbourhood || a.quarter || "";
  const city = a.city || a.town || a.village || a.municipality || "";
  const region = a.state || a.county || "";
  const country = a.country || "";
  const postcode = a.postcode || "";

  const address = [
    [houseNumber, road].filter(Boolean).join(" "),
    suburb,
    [city, postcode].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");

  return {
    latitude: lat,
    longitude: lng,
    address: address || data.display_name,
    city,
    region,
    country,
  };
}

/** Forward geocode a search query → array of suggestions */
async function forwardGeocode(query) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&limit=6&addressdetails=1`,
    { headers: { "Accept-Language": "en" } }
  );
  return res.json();
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function LocationPicker({ formData, onLocationChange }) {
  const [mapVisible, setMapVisible] = useState(false);
  const [mapUrl, setMapUrl] = useState("");

  // Pending state inside the map dialog (not committed yet)
  const [pendingPos, setPendingPos] = useState(null);
  const [pendingAddress, setPendingAddress] = useState(null);
  const [resolving, setResolving] = useState(false);

  // Address search inside the map dialog
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchDebounce = useRef(null);

  // Default: Paris center if no coords set yet
  const savedPosition = useMemo(
    () =>
      formData.latitude && formData.longitude
        ? [Number(formData.latitude), Number(formData.longitude)]
        : [48.8566, 2.3522],
    [formData.latitude, formData.longitude]
  );

  // ── Search logic ────────────────────────────────────────────────────────────

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setSuggestions([]);
    clearTimeout(searchDebounce.current);
    if (val.trim().length < 3) return;
    searchDebounce.current = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await forwardGeocode(val);
        setSuggestions(results);
      } catch {
        toast.error("Search failed");
      } finally {
        setSearching(false);
      }
    }, 400);
  };

  const handleSuggestionClick = async (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setSuggestions([]);
    setSearchQuery(result.display_name);
    setPendingPos([lat, lng]);
    setResolving(true);
    try {
      const details = await reverseGeocode(lat, lng);
      setPendingAddress(details);
    } catch {
      toast.error("Could not resolve address");
    } finally {
      setResolving(false);
    }
  };

  // ── Map click ───────────────────────────────────────────────────────────────

  const handleMapClick = useCallback(async (pos) => {
    setPendingPos(pos);
    setResolving(true);
    setSuggestions([]);
    try {
      const details = await reverseGeocode(pos[0], pos[1]);
      setPendingAddress(details);
      if (details) setSearchQuery(details.address);
    } catch {
      toast.error("Failed to resolve address");
    } finally {
      setResolving(false);
    }
  }, []);

  // ── Confirm pin ─────────────────────────────────────────────────────────────

  const handleConfirm = () => {
    if (!pendingAddress) return;
    onLocationChange(pendingAddress);
    setMapVisible(false);
    toast.success("Location saved!");
  };

  // ── Open map dialog ─────────────────────────────────────────────────────────

  const openMap = () => {
    setPendingPos(savedPosition);
    setPendingAddress(null);
    setSearchQuery("");
    setSuggestions([]);
    setMapVisible(true);
  };

  // ── GPS ─────────────────────────────────────────────────────────────────────

  const getLiveLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        try {
          const details = await reverseGeocode(lat, lng);
          if (details) {
            onLocationChange(details);
            toast.success("Location detected!");
          }
        } catch {
          toast.error("Failed to fetch address");
        }
      },
      () => toast.error("Location access denied"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // ── Google Maps URL import ──────────────────────────────────────────────────

  const handleLinkPaste = async () => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = mapUrl.match(regex);
    if (!match) return toast.error("No coordinates found in URL");
    const lat = parseFloat(match[1]);
    const lng = parseFloat(match[2]);
    try {
      const details = await reverseGeocode(lat, lng);
      if (details) {
        onLocationChange(details);
        setMapUrl("");
        toast.success("Location imported!");
      }
    } catch {
      toast.error("Failed to resolve coordinates");
    }
  };

  // ── Manual field edits ──────────────────────────────────────────────────────

  const handleFieldChange = (field, value) => {
    onLocationChange({
      latitude: formData.latitude,
      longitude: formData.longitude,
      address: formData.address || "",
      city: formData.city || "",
      region: formData.region || "",
      country: formData.country || "",
      [field]: value,
    });
  };

  const hasLocation = formData.latitude && formData.longitude;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-4 shadow-sm">
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <MdMap /> Property Location
      </h3>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={getLiveLocation}
          className="flex items-center gap-3 bg-blue-50/50 border border-blue-100 p-3 rounded-xl text-blue-700 text-xs font-bold hover:bg-blue-100 transition"
        >
          <MdMyLocation size={18} /> GPS
        </button>
        <button
          type="button"
          onClick={openMap}
          className="flex items-center gap-3 bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition"
        >
          <MdMap size={18} /> Pin on Map
        </button>
      </div>

      {/* Google Maps URL import */}
      <div className="bg-slate-50 border p-3 rounded-xl flex gap-2">
        <input
          className="flex-1 bg-white p-2 rounded-lg text-xs border focus:ring-2 ring-blue-500/20 outline-none"
          placeholder="Paste Google Maps URL..."
          value={mapUrl}
          onChange={(e) => setMapUrl(e.target.value)}
        />
        <button
          type="button"
          onClick={handleLinkPaste}
          className="bg-indigo-600 text-white px-4 rounded-lg text-xs font-bold hover:bg-indigo-700 transition"
        >
          Import
        </button>
      </div>

      {/* Current coords badge */}
      {hasLocation && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
          <MdLocationPin className="text-green-500" size={16} />
          <span className="text-[10px] text-green-700 font-mono">
            {Number(formData.latitude).toFixed(6)},{" "}
            {Number(formData.longitude).toFixed(6)}
          </span>
          <span className="ml-auto text-[9px] text-green-500 font-bold uppercase">
            Saved ✓
          </span>
        </div>
      )}

      {/* Editable fields */}
      <div className="space-y-2 pt-2 border-t border-dashed">
        <p className="text-[9px] text-slate-400 uppercase font-bold">
          You can edit the details below manually
        </p>
        <div className="grid grid-cols-3 gap-2">
          {["city", "region", "country"].map((field) => (
            <div key={field} className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">
                {field}
              </label>
              <input
                value={formData[field] || ""}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full border p-2 rounded-lg text-[10px] focus:ring-2 ring-blue-500/20 outline-none"
              />
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">
            Address
          </label>
          <textarea
            value={formData.address || ""}
            onChange={(e) => handleFieldChange("address", e.target.value)}
            rows={2}
            className="w-full border p-2 rounded-lg text-[10px] resize-none focus:ring-2 ring-blue-500/20 outline-none"
            placeholder="Full address"
          />
        </div>
      </div>

      {/* ── Map Dialog ─────────────────────────────────────────────────────── */}
      <Dialog
        header="📍 Pick Location"
        visible={mapVisible}
        style={{ width: "95vw", maxWidth: "820px" }}
        onHide={() => setMapVisible(false)}
        className="location-picker-dialog"
      >
        <div className="flex flex-col gap-3">
          {/* Search bar inside dialog */}
          <div className="relative">
            <div className="flex gap-2 items-center border rounded-xl px-3 py-2 bg-white shadow-sm">
              <MdSearch size={18} className="text-gray-400 shrink-0" />
              <input
                className="flex-1 text-xs outline-none"
                placeholder="Search address, street, city..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searching && (
                <span className="text-[10px] text-gray-400 animate-pulse">
                  Searching...
                </span>
              )}
            </div>

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute z-[9999] top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg overflow-hidden max-h-52 overflow-y-auto">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-3 py-2 text-xs cursor-pointer hover:bg-blue-50 border-b last:border-0 flex items-start gap-2"
                  >
                    <MdLocationPin
                      className="text-red-400 mt-0.5 shrink-0"
                      size={14}
                    />
                    <span className="text-gray-700 leading-relaxed">
                      {s.display_name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Hint */}
          <p className="text-[10px] text-slate-400 text-center">
            Search for an address above, or click anywhere on the map to drop a
            pin. Drag the marker to fine-tune.
          </p>

          {/* Map */}
          <div
            className="rounded-xl overflow-hidden border"
            style={{ height: "380px", width: "100%" }}
          >
            {mapVisible && (
              <MapContainer
                center={pendingPos || savedPosition}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <InvalidateOnMount />
                {pendingPos && <ChangeView center={pendingPos} />}
                <MapClickHandler onMapClick={handleMapClick} />
                {pendingPos && (
                  <Marker
                    position={pendingPos}
                    icon={confirmIcon}
                    draggable={true}
                    eventHandlers={{
                      dragend(e) {
                        const { lat, lng } = e.target.getLatLng();
                        handleMapClick([lat, lng]);
                      },
                    }}
                  />
                )}
              </MapContainer>
            )}
          </div>

          {/* Pending address preview */}
          {resolving && (
            <div className="bg-slate-50 rounded-xl px-4 py-3 text-xs text-slate-400 animate-pulse">
              Resolving address...
            </div>
          )}

          {pendingAddress && !resolving && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 space-y-1">
              <p className="text-[10px] font-bold text-emerald-600 uppercase">
                Selected Location
              </p>
              <p className="text-xs text-gray-700">{pendingAddress.address}</p>
              <p className="text-[10px] text-gray-500">
                {[pendingAddress.city, pendingAddress.region, pendingAddress.country]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <p className="text-[10px] font-mono text-gray-400">
                {pendingAddress.latitude?.toFixed(6)},{" "}
                {pendingAddress.longitude?.toFixed(6)}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 justify-end pt-1">
            <button
              type="button"
              onClick={() => setMapVisible(false)}
              className="flex items-center gap-2 px-4 py-2 border rounded-xl text-xs text-gray-600 hover:bg-gray-50 transition"
            >
              <MdClose size={14} /> Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!pendingAddress || resolving}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <MdCheck size={14} /> Confirm Location
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}