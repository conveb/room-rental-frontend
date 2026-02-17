import React, { useState, useCallback, useMemo } from "react";
import { MdMyLocation, MdMap, MdLink } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { toast } from "sonner";

// Component to handle auto-centering map
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
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
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      
      if (data.address) {
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
      toast.error("Failed to fetch address details");
    }
  }, [onLocationChange]);

  const getLiveLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => updateLocationDetails(pos.coords.latitude, pos.coords.longitude),
      () => toast.error("Access denied")
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
        <input className="flex-1 bg-white p-2 rounded-lg text-xs border" placeholder="Paste Maps URL..." value={mapUrl} onChange={(e) => setMapUrl(e.target.value)} />
        <button type="button" onClick={handleLinkPaste} className="bg-indigo-600 text-white px-4 rounded-lg text-xs font-bold">Import</button>
      </div>

      <div className="space-y-2 pt-2 border-t border-dashed">
        <div className="grid grid-cols-3 gap-2">
          <input value={formData.city} readOnly placeholder="City" className="border p-2 rounded-lg bg-slate-50 text-[10px]" />
          <input value={formData.region} readOnly placeholder="Region" className="border p-2 rounded-lg bg-slate-50 text-[10px]" />
          <input value={formData.country} readOnly placeholder="Country" className="border p-2 rounded-lg bg-slate-50 text-[10px]" />
        </div>
        <textarea value={formData.address} readOnly rows={2} className="w-full border p-2 rounded-lg bg-slate-50 text-[10px] resize-none" placeholder="Detected Address" />
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