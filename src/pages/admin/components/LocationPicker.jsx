import React, { useState, useCallback, useMemo, useEffect } from "react";
import { MdMyLocation, MdMap } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { toast } from "sonner";

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center[0], center[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function LocationPicker({ formData, onLocationChange }) {
  const [mapVisible, setMapVisible] = useState(false);
  const [mapUrl, setMapUrl] = useState("");

  const currentPosition = useMemo(() => [
    formData.latitude || 9.9312,
    formData.longitude || 76.2673
  ], [formData.latitude, formData.longitude]);

  const updateLocationDetails = useCallback(async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();

      if (data.address) {
        const a = data.address;
        const houseNumber = a.house_number || "";
        const road = a.road || a.pedestrian || a.footway || a.path || "";
        const suburb = a.suburb || a.neighbourhood || a.quarter || "";
        const city = a.city || a.town || a.village || a.municipality || "";
        const region = a.state || a.county || "";
        const country = a.country || "";
        const postcode = a.postcode || "";

        const preciseAddress = [
          [houseNumber, road].filter(Boolean).join(" "),
          suburb,
          [city, postcode].filter(Boolean).join(" "),
          region,
          country
        ].filter(Boolean).join(", ");

        onLocationChange({
          latitude: lat,
          longitude: lng,
          address: preciseAddress || data.display_name,
          city,
          region,
          country,
        });
      }
    } catch (err) {
      toast.error("Failed to fetch address details");
    }
  }, [onLocationChange]);

  // Handler for manual field edits
  const handleFieldChange = (field, value) => {
    onLocationChange({
      latitude: formData.latitude,
      longitude: formData.longitude,
      address: formData.address || "",
      city: formData.city || "",
      region: formData.region || "",
      country: formData.country || "",
      [field]: value, // override whichever field changed
    });
  };

  const getLiveLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => updateLocationDetails(pos.coords.latitude, pos.coords.longitude),
      () => toast.error("Access denied"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleLinkPaste = () => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = mapUrl.match(regex);
    if (match) {
      updateLocationDetails(parseFloat(match[1]), parseFloat(match[2]));
      setMapUrl("");
    } else {
      toast.error("Ensure link contains @lat,lng");
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        updateLocationDetails(e.latlng.lat, e.latlng.lng);
        setMapVisible(false);
      },
    });
    return null;
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-4 shadow-sm">
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <MdMap /> Property Location
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={getLiveLocation} className="flex items-center gap-3 bg-blue-50/50 border border-blue-100 p-3 rounded-xl text-blue-700 text-xs font-bold">
          <MdMyLocation size={18} /> GPS
        </button>
        <button type="button" onClick={() => setMapVisible(true)} className="flex items-center gap-3 bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl text-emerald-700 text-xs font-bold">
          <MdMap size={18} /> Pin Map
        </button>
      </div>

      <div className="bg-slate-50 border p-3 rounded-xl flex gap-2">
        <input
          className="flex-1 bg-white p-2 rounded-lg text-xs border"
          placeholder="Paste Maps URL..."
          value={mapUrl}
          onChange={(e) => setMapUrl(e.target.value)}
        />
        <button type="button" onClick={handleLinkPaste} className="bg-indigo-600 text-white px-4 rounded-lg text-xs font-bold">
          Import
        </button>
      </div>

      {/* Editable fields */}
      <div className="space-y-2 pt-2 border-t border-dashed">
        <p className="text-[9px] text-slate-400 uppercase font-bold">You can edit the details below manually</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">City</label>
            <input
              value={formData.city || ''}
              onChange={(e) => handleFieldChange('city', e.target.value)}
              placeholder="City"
              className="w-full border p-2 rounded-lg text-[10px] focus:ring-2 ring-blue-500/20 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">Region</label>
            <input
              value={formData.region || ''}
              onChange={(e) => handleFieldChange('region', e.target.value)}
              placeholder="Region"
              className="w-full border p-2 rounded-lg text-[10px] focus:ring-2 ring-blue-500/20 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">Country</label>
            <input
              value={formData.country || ''}
              onChange={(e) => handleFieldChange('country', e.target.value)}
              placeholder="Country"
              className="w-full border p-2 rounded-lg text-[10px] focus:ring-2 ring-blue-500/20 outline-none"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-gray-400 uppercase ml-1">Address</label>
          <textarea
            value={formData.address || ''}
            onChange={(e) => handleFieldChange('address', e.target.value)}
            rows={2}
            className="w-full border p-2 rounded-lg text-[10px] resize-none focus:ring-2 ring-blue-500/20 outline-none"
            placeholder="Full address"
          />
        </div>
      </div>

      <Dialog header="Pick Location" visible={mapVisible} style={{ width: "95vw", maxWidth: "800px" }} onHide={() => setMapVisible(false)}>
        <div className="h-[400px] w-full rounded-xl overflow-hidden">
          {mapVisible && (
            <MapContainer center={currentPosition} zoom={15} style={{ height: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ChangeView center={currentPosition} />
              <MapClickHandler />
              <Marker position={currentPosition} />
            </MapContainer>
          )}
        </div>
      </Dialog>
    </div>
  );
}