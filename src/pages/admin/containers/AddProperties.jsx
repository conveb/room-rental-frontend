import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { Dropdown } from "primereact/dropdown";
import { createPropertyApi } from "../../../services/allAPI";
import { useAmenities } from "../../../hooks/useAmenities";



export default function AddProperties() {
  /* ---------- BASIC INFO ---------- */
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  /* ---------- IMAGES ---------- */
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  /* ---------- AMENITIES ---------- */
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [amenityDropdown, setAmenityDropdown] = useState(null);
  const { amenities, loading: amenitiesLoading } = useAmenities();

  const [loading, setLoading] = useState(false);

  /* ---------- IMAGE HANDLERS ---------- */
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    const mapped = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => {
      const updated = [...prev, ...mapped];
      if (selectedIndex === null) setSelectedIndex(0);
      return updated;
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (index === selectedIndex) setSelectedIndex(0);
  };

  /* ---------- AMENITIES ---------- */
  const handleAmenitySelect = (e) => {
    const value = e.value;
    if (!selectedAmenities.includes(value)) {
      setSelectedAmenities((prev) => [...prev, value]);
    }
    setAmenityDropdown(null);
  };

  const removeAmenity = (value) => {
    setSelectedAmenities((prev) => prev.filter((a) => a !== value));
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!images.length) {
      alert("Please upload at least one image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      /* BASIC */
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rent_per_month", price);
      formData.append("address", location);

      /* REQUIRED STATIC FIELDS (example values) */
      formData.append("property_type", "ENTIRE_HOME");
      formData.append("size_m2", 28);
      formData.append("max_people", 2);
      formData.append("furnished", true);
      formData.append("rooms", 1);
      formData.append("bathrooms", 1);
      formData.append("charges", 80);
      formData.append("booking_fee", 150);
      formData.append("security_deposit", 2400);
      formData.append("available_from", "2025-01-01");
      formData.append("minimum_stay_months", 6);
      formData.append("city", "Paris");
      formData.append("region", "Île-de-France");
      formData.append("country", "France");
      formData.append("latitude", 9.9312);
      formData.append("longitude", 76.2673);
      formData.append("dpe_class", "A");
      formData.append("ges_class", "B");
      formData.append("location_id", "LOCATION_ID_HERE");

      /* AMENITIES */
      selectedAmenities.forEach((id) => {
        formData.append("amenities", id);
      });

      /* IMAGES */
      formData.append("cover_image", images[0].file);
      images.slice(1).forEach((img) => {
        formData.append("images", img.file);
      });

      /* INSTRUCTIONS */
      formData.append(
        "instructions",
        JSON.stringify({
          category: "House Rules",
          instruction: "No smoking",
        })
      );

      await createPropertyApi(formData);
      alert("Property created successfully");

    } catch (err) {
      console.error(err);
      alert("Failed to create property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-xs md:text-sm">
      <h1 className="text-2xl font-semibold mb-5">Add New Property</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* LEFT : IMAGES */}
        <div className="space-y-4">
          {selectedIndex !== null && images[selectedIndex] && (
            <div className="w-full h-52 md:h-96 border rounded-xl overflow-hidden">
              <img
                src={images[selectedIndex].preview}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          )}

          <label className="flex items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />
            <span className="flex items-center gap-3 text-gray-500">
              <MdAddCircle className="text-xl text-black" />
              Upload Images
            </span>
          </label>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`relative border rounded-lg overflow-hidden cursor-pointer ${i === selectedIndex ? "ring-2 ring-black" : ""
                  }`}
              >
                <img
                  src={img.preview}
                  className="h-20 w-full object-cover"
                  alt=""
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(i);
                  }}
                  className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT : FORM */}
        <div className="space-y-4 flex flex-col">
          <input
            placeholder="Property Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <input
            placeholder="Address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            placeholder="Price per month"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <textarea
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          {/* AMENITIES */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amenities</label>

            <Dropdown
              value={amenityDropdown}
              options={amenities
                .filter((a) => !selectedAmenities.includes(a.id))
                .map((a) => ({
                  label: a.name,
                  value: a.id,
                }))
              }
              onChange={handleAmenitySelect}
              placeholder={amenitiesLoading ? "Loading amenities..." : "Select amenity"}
              className="w-full"
              disabled={amenitiesLoading}
            />


            <div className="flex flex-wrap gap-2">
              {selectedAmenities.map((a) => {
                const label = amenities.find((x) => x.id === a)?.name;
                return (
                  <span
                    key={a}
                    className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full"
                  >
                    {label}
                    <button
                      type="button"
                      onClick={() => removeAmenity(a)}
                      className="text-xs"
                    >
                      ✕
                    </button>
                  </span>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-auto bg-black text-white py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
