import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { Dropdown } from "primereact/dropdown";
import { useAmenities } from "../../../hooks/admin/constants/useAmenities";
import useMyProperties from "../../../hooks/property/useMyProperties";

export default function MyProperties() {
  const { properties, loading, error, deleteProperty, updateProperty, actionLoading } = useMyProperties();
  const { amenities, loading: amenitiesLoading } = useAmenities();

  const [editingProperty, setEditingProperty] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [amenityDropdown, setAmenityDropdown] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const openEditModal = (property) => {
    setEditingProperty(property);
    setTitle(property.title);
    setLocation(property.city); // or property.address
    setPrice(property.price);
    setDescription(property.description);
    setSelectedAmenities(property.amenities?.map(a => a.id) || []);
    // Prepare image previews if needed
    setImages(property.images?.map(img => ({ file: null, preview: img.url })) || []);
    setSelectedIndex(0);
  };

  const handleAmenitySelect = (e) => {
    const value = e.value;
    if (!selectedAmenities.includes(value)) {
      setSelectedAmenities((prev) => [...prev, value]);
    }
    setAmenityDropdown(null);
  };

  const removeAmenity = (id) => {
    setSelectedAmenities((prev) => prev.filter((a) => a !== id));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const mapped = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
    setImages(prev => [...prev, ...mapped]);
    if (selectedIndex === null) setSelectedIndex(0);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (selectedIndex === index) setSelectedIndex(0);
  };

  const handleUpdate = async () => {
    if (!editingProperty) return;
    setModalLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rent_per_month", price);
      formData.append("address", location);

      selectedAmenities.forEach((id) => formData.append("amenities", id));

      if (images[0]?.file) formData.append("cover_image", images[0].file);
      images.slice(1).forEach(img => img.file && formData.append("images", img.file));

      await updateProperty(editingProperty.id, formData);

      setEditingProperty(null); // close modal
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">My Properties</h2>

      {loading && <p>Loading properties...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {properties.map(property => (
        <div key={property.id} className="border p-4 rounded-xl space-y-2">
          <h3 className="font-semibold">{property.title}</h3>
          <p>{property.city}, {property.country}</p>
          <p>₹ {property.price}</p>

          <div className="flex gap-3">
            <button
              className="border py-1 px-3 rounded-lg"
              onClick={() => openEditModal(property)}
            >
              Edit
            </button>
            <button
              className="border py-1 px-3 rounded-lg text-red-500"
              disabled={actionLoading}
              onClick={() => deleteProperty(property.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* EDIT MODAL */}
      {editingProperty && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl relative overflow-y-auto max-h-[80vh]">
            <h2 className="text-lg font-semibold mb-4">Edit Property</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Images */}
              <div className="space-y-4">
                {selectedIndex !== null && images[selectedIndex] && (
                  <div className="w-full h-52 md:h-64 border rounded-xl overflow-hidden">
                    <img
                      src={images[selectedIndex].preview}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                )}

                <label className="flex items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-gray-50">
                  <input type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" />
                  <span className="flex items-center gap-3 text-gray-500">
                    <MdAddCircle className="text-xl text-black" />
                    Upload Images
                  </span>
                </label>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {images.map((img, i) => (
                    <div key={i} onClick={() => setSelectedIndex(i)} className={`relative border rounded-lg cursor-pointer ${i === selectedIndex ? "ring-2 ring-black" : ""}`}>
                      <img src={img.preview} className="h-20 w-full object-cover" />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                        className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded-full"
                      >✕</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Form */}
              <div className="space-y-4 flex flex-col">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border p-3 rounded-lg" />
                <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Address" className="border p-3 rounded-lg" />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="border p-3 rounded-lg" />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-3 rounded-lg" />

                <Dropdown
                  value={amenityDropdown}
                  options={amenities
                    .filter(a => !selectedAmenities.includes(a.id))
                    .map(a => ({ label: a.name, value: a.id }))}
                  onChange={handleAmenitySelect}
                  placeholder={amenitiesLoading ? "Loading amenities..." : "Select amenity"}
                  className="w-full"
                  disabled={amenitiesLoading}
                />

                <div className="flex flex-wrap gap-2">
                  {selectedAmenities.map((a) => {
                    const label = amenities.find(x => x.id === a)?.name;
                    return (
                      <span key={a} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full">
                        {label}
                        <button type="button" onClick={() => removeAmenity(a)} className="text-xs">✕</button>
                      </span>
                    );
                  })}
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => setEditingProperty(null)}
                    className="flex-1 border rounded-lg py-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={modalLoading}
                    className="flex-1 bg-black text-white py-2 rounded-lg disabled:opacity-50"
                  >
                    {modalLoading ? "Updating..." : "Update Property"}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
