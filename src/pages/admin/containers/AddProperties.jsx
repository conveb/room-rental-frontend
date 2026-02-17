import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCreateProperty } from "../../../hooks/property/useCreateProperty";
// Sub-components
import PropertyImageUpload from "../components/PropertyImageUpload";
import LocationPicker from "../components/LocationPicker";
import PropertyFormFields from "../components/PropertyFormFields";



export default function AddProperties() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property_type: "ENTIRE_HOME",
    size_m2: "",
    max_people: "",
    furnished: true,
    rooms: "",
    bathrooms: "",
    rent_per_month: "",
    charges: "",
    security_deposit: "",
    available_from: new Date(),
    minimum_stay_months: "",
    location_id: "",
    address: "",
    city: "",
    region: "",
    country: "",
    latitude: 9.9312,
    longitude: 76.2673,
    dpe_class: "A",
    ges_class: "A",
    instructions: []
  });

  const [coverImage, setCoverImage] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createProperty, loading: isPublishing } = useCreateProperty();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationUpdate = (locationData) => {
    setFormData((prev) => ({ ...prev, ...locationData }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isPublishing) return;
    if (!coverImage) return toast.error("Please upload a cover image.");
    if (!formData.location_id) return toast.error("Please select a location.");

    setIsSubmitting(true);
    try {
      const submissionData = {
        ...formData,
        amenities: selectedAmenities,
        cover_image: coverImage.file,
        images: images.map((img) => img.file),
      };

      await createProperty(submissionData);
      toast.success("Property published successfully!");
      // Optional: Reset state or redirect here
    } catch (err) {
      toast.error(err.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-xs md:text-sm md:p-6 mx-auto bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6 px-2">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">Add New Property</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-2">
        {/* LEFT COLUMN: MEDIA & MAP */}
        <div className="space-y-6">
          <PropertyImageUpload 
            coverImage={coverImage} 
            setCoverImage={setCoverImage} 
            images={images} 
            setImages={setImages} 
          />
          <LocationPicker 
            formData={formData} 
            onLocationChange={handleLocationUpdate} 
          />
        </div>

        {/* RIGHT COLUMN: PROPERTY DETAILS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <PropertyFormFields 
            formData={formData} 
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
            isSubmitting={isSubmitting || isPublishing}
          />
        </div>
      </form>
    </div>
  );
}