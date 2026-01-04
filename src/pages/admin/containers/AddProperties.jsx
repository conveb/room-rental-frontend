import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { Dropdown } from "primereact/dropdown";
const AMENITIES = [
    { label: "WiFi", value: "wifi" },
    { label: "Parking", value: "parking" },
    { label: "Swimming Pool", value: "pool" },
    { label: "Air Conditioning", value: "ac" },
    { label: "Gym", value: "gym" },
    { label: "Pet Friendly", value: "pet" },
];
export default function AddProperties(){
    
        const [title, setTitle] = useState("");
        const [location, setLocation] = useState("");
        const [price, setPrice] = useState("");
        const [description, setDescription] = useState("");
    
        const [images, setImages] = useState([]);
        const [selectedIndex, setSelectedIndex] = useState(null);
    
        const [selectedAmenities, setSelectedAmenities] = useState([]);
        const [amenityDropdown, setAmenityDropdown] = useState(null);
    
        /* ---------------- IMAGE HANDLERS ---------------- */
        const handleImageSelect = (e) => {
            const files = Array.from(e.target.files);
            if (images.length + files.length > 5) return alert("Max 5 images");
    
            const newImages = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));
    
            setImages((prev) => {
                const updated = [...prev, ...newImages];
                if (selectedIndex === null) setSelectedIndex(0);
                return updated;
            });
        };
    
        const removeImage = (index) => {
            setImages((prev) => prev.filter((_, i) => i !== index));
            if (index === selectedIndex) setSelectedIndex(0);
        };
    
        /* ---------------- AMENITIES ---------------- */
        const handleAmenitySelect = (e) => {
            const value = e.value;
            if (!selectedAmenities.includes(value)) {
                setSelectedAmenities((prev) => [...prev, value]);
            }
            setAmenityDropdown(null); // reset dropdown
        };
    
        const removeAmenity = (value) => {
            setSelectedAmenities((prev) => prev.filter((a) => a !== value));
        };
    
        /* ---------------- SUBMIT ---------------- */
        const handleSubmit = (e) => {
            e.preventDefault();
    
            console.log({
                title,
                location,
                price,
                description,
                images,
                amenities: selectedAmenities,
            });
        };
    return(
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
                                <MdAddCircle className="text-xl text-black" /> Upload Images
                            </span>
                        </label>

                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                            {images.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedIndex(i)}
                                    className={`relative border rounded-lg overflow-hidden cursor-pointer ${
                                        i === selectedIndex ? "ring-2 ring-black" : ""
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
                        />

                        <input
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border p-3 rounded-lg"
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="border p-3 rounded-lg"
                        />

                        <textarea
                            rows={4}
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border p-3 rounded-lg"
                        />

                        {/* AMENITIES */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Amenities</label>

                            <Dropdown
                                value={amenityDropdown}
                                options={AMENITIES.filter(
                                    (a) => !selectedAmenities.includes(a.value)
                                )}
                                onChange={handleAmenitySelect}
                                placeholder="Select amenity"
                                className="w-full text-xs md:text-sm"
                            />

                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedAmenities.map((a) => {
                                    const label = AMENITIES.find(
                                        (x) => x.value === a
                                    )?.label;
                                    return (
                                        <span
                                            key={a}
                                            className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full text-sm"
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
                            className="mt-auto bg-black text-white py-3 rounded-xl"
                        >
                            Create Property
                        </button>
                    </div>
                </form>
        </div>
    )
}