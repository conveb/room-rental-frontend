import React, { useState, useEffect } from "react";
import { MdAddCircle, MdMyLocation, MdMap, MdLink, MdDelete, MdInfoOutline, MdEuro } from "react-icons/md";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";

// --- FREE MAP IMPORTS ---
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useAmenities } from "../../../hooks/admin/constants/useAmenities";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { toast } from "sonner";
import { useCreateProperty } from "../../../hooks/property/useCreateProperty";
import { useLocations } from "../../../hooks/admin/constants/useLocations";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function AddProperties() {
  const [formData, setFormData] = useState({
    title: "", description: "", property_type: "ENTIRE_HOME",
    size_m2: "", max_people: "", furnished: true,
    rooms: "", bathrooms: "", rent_per_month: "",
    charges: "", booking_fee: "", security_deposit: "",
    available_from: new Date(), minimum_stay_months: "",
    location_id: "",
    address: "", city: "", region: "", country: "",
    latitude: 9.9312, longitude: 76.2673,
    dpe_class: "A", ges_class: "A",
    instructions: ""
  });

  const [coverImage, setCoverImage] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [mapVisible, setMapVisible] = useState(false);
  const [mapUrl, setMapUrl] = useState("");
  const { locations } = useLocations();

  const { amenities } = useAmenities();
  const { createProperty, loading: isPublishing } = useCreateProperty();

  /* ---------- LOCATION LOGIC (3 OPTIONS) ---------- */

  const updateLocationDetails = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      if (data.address) {
        setFormData(prev => ({
          ...prev,
          latitude: lat,
          longitude: lng,
          address: data.display_name,
          city: data.address.city || data.address.town || data.address.village || "",
          region: data.address.state || data.address.county || "",
          country: data.address.country || ""
        }));
      }
    } catch (err) {
      console.error("Geocoding failed", err);
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

  /* ---------- IMAGE HANDLERS ---------- */

  const handleCoverImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage({ file, preview: URL.createObjectURL(file) });
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 5 - images.length;
    const mapped = files.slice(0, remainingSlots).map(file => ({
      file, preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...mapped]);
  };

  /* ---------- SUBMISSION ---------- */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImage) return toast.error("Please upload a cover image.");

    // Prepare clean data object to pass to the hook
    const submissionData = {
      ...formData,
      amenities: selectedAmenities,
      cover_image: coverImage.file,
      images: images.map(img => img.file),
    };

    try {
      await createProperty(submissionData);
    } catch (err) {
      console.error(err);
    }
  };

  /* --- MAP HELPERS --- */
  function MapEvents() {
    useMapEvents({ click(e) { updateLocationDetails(e.latlng.lat, e.latlng.lng); } });
    return null;
  }
  function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => { map.setView(center); }, [center]);
    return null;
  }

  return (
    <div className="text-xs md:text-sm p-2 md:p-6 max-w-7xl mx-auto bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">Add New Property</h1>

      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT COLUMN: IMAGES & LOCATION */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              {!coverImage ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-40 cursor-pointer hover:bg-blue-50 transition border-blue-200 bg-blue-50/20">
                  <input type="file" accept="image/*" onChange={handleCoverImageSelect} className="hidden" />
                  <MdAddCircle className="text-2xl text-blue-500 mb-1" />
                  <span className="font-bold text-gray-600">Cover Image</span>
                </label>
              ) : (
                <div className="relative h-40 rounded-xl overflow-hidden border">
                  <img src={coverImage.preview} className="w-full h-full object-cover" alt="Cover" />
                  <button type="button" onClick={() => setCoverImage(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"><MdDelete /></button>
                </div>
              )}
            </div>
            <div className="w-full">
              <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-40 transition ${images.length >= 5 ? 'bg-gray-100' : 'cursor-pointer hover:bg-gray-50'}`}>
                <input type="file" multiple onChange={handleImageSelect} className="hidden" disabled={images.length >= 5} />
                <MdAddCircle className="text-2xl text-gray-400 mb-1" />
                <span className="font-bold text-gray-600">Gallery ({images.length}/5)</span>
              </label>
            </div>
          </div>

          <div className="bg-gray-50 p-3 md:p-5 rounded-2xl border border-gray-100 space-y-4 shadow-inner">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Location Selection (3 Options)</h3>

            <div className="grid grid-cols-1 gap-2 w-full">
              <button type="button" onClick={getLiveLocation} className="flex items-center gap-3 bg-white border p-3 rounded-xl hover:shadow-md transition">
                <MdMyLocation size={25} className="text-blue-500" /> Use My Current GPS
              </button>
              <button type="button" onClick={() => setMapVisible(true)} className="flex items-center gap-3 bg-white border p-3 rounded-xl hover:shadow-md transition">
                <MdMap size={25} className="text-green-500" /> Pick on Interactive Map
              </button>
              <div className="bg-white border p-3 rounded-xl space-y-2">
                <div className="flex items-center gap-3">
                  <MdLink size={25} className="text-purple-500" /> <span className="font-medium">Google Maps URL</span>
                </div>
                <div className="flex gap-2 w-full">
                  <input
                    className="flex-1 min-w-0 bg-gray-50 p-2 rounded text-xs outline-none"
                    placeholder="Paste link with @lat,lng..."
                    value={mapUrl}
                    onChange={(e) => setMapUrl(e.target.value)}
                  />
                  <button type="button" onClick={handleLinkPaste} className="shrink-0 bg-black text-white px-4 py-1 rounded-lg text-xs">Import</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <input name="country" value={formData.country} onChange={handleInputChange} className="border p-2 rounded-lg" placeholder="Country" />
              <input name="region" value={formData.region} onChange={handleInputChange} className="border p-2 rounded-lg" placeholder="Region" />
              <input name="city" value={formData.city} onChange={handleInputChange} className="border p-2 rounded-lg" placeholder="City" />
              <textarea name="address" value={formData.address} onChange={handleInputChange} className="col-span-3 border p-2 rounded-lg" rows={2} placeholder="Full Address" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PROPERTY INFO */}
        <div className="space-y-4">
          <input name="title" placeholder="Listing Title" value={formData.title} onChange={handleInputChange} className="w-full border p-4 rounded-xl text-sm shadow-sm outline-none" required />
          <textarea
            name="description"
            placeholder="Property Description (e.g. Beautiful garden, near shops...)"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border p-4 rounded-xl text-sm shadow-sm outline-none"
            rows={4}
            required
          />

          <div className="flex flex-col items-end gap-1">
            <label className="text-[10px] font-bold text-gray-400 mr-1 uppercase">Select Location ID</label>
            <Dropdown
              value={formData.location_id}
              options={locations || []}
              optionLabel="location_name"    // Shows "Aix en Provence" in the list
              optionValue="id"               // Passes "26c3eed9-aa85-47bf-acda-a0223a83b9cd" to formData
              onChange={(e) => setFormData({ ...formData, location_id: e.value })}
              placeholder="Select a Location"
              filter                         // Allows you to type "Aix" to find it quickly
              className="w-full md:w-80 shadow-sm text-xs"
              loading={!locations}
            />
          </div>
          <Calendar
            value={formData.available_from}
            onChange={(e) => setFormData({ ...formData, available_from: e.value })}
            dateFormat="yy-mm-dd" // Displays as 2024-05-20
            showIcon
            placeholder="Select Date"
            className="w-full"
            inputClassName="p-2.5 border rounded-lg" // Matches your other inputs
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Property Type</label>
              <Dropdown value={formData.property_type} options={['ENTIRE_HOME', 'APARTMENT', 'STUDIO']} onChange={(e) => setFormData({ ...formData, property_type: e.value })} className="w-full" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Max Occupancy</label>
              <input type="number" name="max_people" value={formData.max_people} onChange={handleInputChange} placeholder="e.g. 4" className="w-full border p-2.5 rounded-lg" />
            </div>
          </div>

          <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-3 text-blue-800 font-bold text-xs"><MdEuro /> PRICING & DEPOSITS</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <input name="rent_per_month" value={formData.rent_per_month} onChange={handleInputChange} placeholder="Rent/Mo" className="border-b bg-transparent font-bold py-1 outline-none" />
              <input name="charges" value={formData.charges} onChange={handleInputChange} placeholder="Charges" className="border-b bg-transparent py-1 outline-none" />
              <input name="security_deposit" value={formData.security_deposit} onChange={handleInputChange} placeholder="Security" className="border-b bg-transparent py-1 outline-none" />
              <input name="booking_fee" value={formData.booking_fee} onChange={handleInputChange} placeholder="Booking" className="border-b bg-transparent py-1 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <input name="size_m2" placeholder="m²" value={formData.size_m2} onChange={handleInputChange} className="border p-3 rounded-lg" />
            <input name="rooms" placeholder="Rooms" value={formData.rooms} onChange={handleInputChange} className="border p-3 rounded-lg" />
            <input name="bathrooms" placeholder="Baths" value={formData.bathrooms} onChange={handleInputChange} className="border p-3 rounded-lg" />
          </div>

          <div className="bg-orange-50/30 p-4 rounded-xl border border-orange-100">
            <div className="flex items-center gap-2 mb-3 text-orange-800 font-bold text-xs"><MdInfoOutline /> PERFORMANCE CLASSES</div>
            <div className="grid grid-cols-2 gap-4">
              <Dropdown value={formData.dpe_class} options={['A', 'B', 'C', 'D', 'E', 'F', 'G']} onChange={(e) => setFormData({ ...formData, dpe_class: e.value })} className="w-full" />
              <Dropdown value={formData.ges_class} options={['A', 'B', 'C', 'D', 'E', 'F', 'G']} onChange={(e) => setFormData({ ...formData, ges_class: e.value })} className="w-full" />
            </div>
          </div>

          {/* AMENITIES SELECTION */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">
              Property Amenities
            </label>
            <MultiSelect
              value={selectedAmenities}
              options={amenities}
              onChange={(e) => setSelectedAmenities(e.value)}
              optionLabel="name"
              optionValue="id"
              placeholder="Select Amenities"
              display="chip"
              filter
              maxSelectedLabels={100} 
              selectedItemsLabel="{0} items"
  

              className="w-full rounded-xl shadow-sm text-xs border border-gray-200"
              panelClassName="text-xs"
              style={{ minHeight: '44px' }}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">House Rules</label>
            <textarea name="instruction" value={formData.instructions} onChange={handleInputChange} rows={3} placeholder="Key pickup, WiFi codes..." className="w-full border p-3 rounded-xl" />
          </div>

          <button type="submit" disabled={isPublishing} className="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase shadow-xl hover:bg-gray-900 transition-all disabled:opacity-50">
            {isPublishing ? "Publishing Listing..." : "Publish Property"}
          </button>
        </div>
      </form>

      <Dialog header="Drag Marker to Property Location" visible={mapVisible} style={{ width: '90vw', maxWidth: '800px' }} onHide={() => setMapVisible(false)}>
        <div className="h-[450px] w-full rounded-xl overflow-hidden border">
          <MapContainer center={[formData.latitude, formData.longitude]} zoom={13} style={{ height: "100%" }}>
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