import React, { useState, useEffect } from "react";
import { MdMyLocation, MdMap, MdLink } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { toast } from "sonner";

export default function LocationPicker({ formData, onLocationChange }) {
  const [mapVisible, setMapVisible] = useState(false);
  const [mapUrl, setMapUrl] = useState("");

  const updateLocationDetails = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data.address) {
        // Pass the structured object back to the parent
        onLocationChange({
          latitude: lat,
          longitude: lng,
          address: data.display_name,
          city: data.address.city || data.address.town || data.address.village || "",
          region: data.address.state || data.address.county || "",
          country: data.address.country || "",
        });
      }
    } catch (err) {
      console.error("Geocoding failed", err);
      toast.error("Failed to fetch address details");
    }
  };

  const getLiveLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => updateLocationDetails(pos.coords.latitude, pos.coords.longitude),
      () => toast.error("Could not get location")
    );
  };

  const handleLinkPaste = () => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = mapUrl.match(regex);
    if (match) {
      updateLocationDetails(parseFloat(match[1]), parseFloat(match[2]));
      setMapUrl("");
      toast.success("Coordinates imported!");
    } else {
      toast.error("Invalid Google Maps Link. Ensure it contains @lat,lng");
    }
  };

  /* --- INTERNAL MAP HELPERS --- */
  function MapEvents() {
    useMapEvents({
      click(e) {
        updateLocationDetails(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, [center]);
    return null;
  }

  return (
    <div className="bg-gray-50 p-3 md:p-5 rounded-2xl border border-gray-100 space-y-4 shadow-inner">
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
        Location Selection (3 Options)
      </h3>

      <div className="grid grid-cols-1 gap-2 w-full">
        <button
          type="button"
          onClick={getLiveLocation}
          className="flex items-center gap-3 bg-white border p-3 rounded-xl hover:shadow-md transition text-left"
        >
          <MdMyLocation size={25} className="text-blue-500" /> Use My Current GPS
        </button>

        <button
          type="button"
          onClick={() => setMapVisible(true)}
          className="flex items-center gap-3 bg-white border p-3 rounded-xl hover:shadow-md transition text-left"
        >
          <MdMap size={25} className="text-green-500" /> Pick on Interactive Map
        </button>

        <div className="bg-white border p-3 rounded-xl space-y-2">
          <div className="flex items-center gap-3">
            <MdLink size={25} className="text-purple-500" />
            <span className="font-medium">Google Maps URL</span>
          </div>
          <div className="flex gap-2 w-full">
            <input
              className="flex-1 min-w-0 bg-gray-50 p-2 rounded text-xs outline-none border"
              placeholder="Paste link with @lat,lng..."
              value={mapUrl}
              onChange={(e) => setMapUrl(e.target.value)}
            />
            <button
              type="button"
              onClick={handleLinkPaste}
              className="shrink-0 bg-black text-white px-4 py-1 rounded-lg text-xs"
            >
              Import
            </button>
          </div>
        </div>
      </div>

      {/* Manual Overrides / Display */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <input
          value={formData.country}
          readOnly
          className="border p-2 rounded-lg bg-white/50 cursor-not-allowed"
          placeholder="Country"
        />
        <input
          value={formData.region}
          readOnly
          className="border p-2 rounded-lg bg-white/50 cursor-not-allowed"
          placeholder="Region"
        />
        <input
          value={formData.city}
          readOnly
          className="border p-2 rounded-lg bg-white/50 cursor-not-allowed"
          placeholder="City"
        />
        <textarea
          value={formData.address}
          readOnly
          className="col-span-3 border p-2 rounded-lg bg-white/50 cursor-not-allowed"
          rows={2}
          placeholder="Full Address"
        />
      </div>

      <Dialog
        header="Drag Marker to Property Location"
        visible={mapVisible}
        style={{ width: "90vw", maxWidth: "800px" }}
        onHide={() => setMapVisible(false)}
      >
        <div className="h-[450px] w-full rounded-xl overflow-hidden border">
          <MapContainer
            center={[formData.latitude, formData.longitude]}
            zoom={13}
            style={{ height: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapEvents />
            <ChangeView center={[formData.latitude, formData.longitude]} />
            <Marker position={[formData.latitude, formData.longitude]} />
          </MapContainer>
        </div>
      </Dialog>
    </div>
  );
}