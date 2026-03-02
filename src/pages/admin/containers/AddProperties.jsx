import React, { useState, useEffect, useCallback, useRef } from "react";
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
    is_domicile_allowed: false,
    is_caf_eligible: false,
    contract_file: null,
    rooms: "",
    bathrooms: "",
    rent_per_month: "",
    charges: "",
    security_deposit: "",
    available_from: new Date().toISOString().split('T')[0],
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
  
  const submitButtonRef = useRef(null);
  const { createProperty, loading: isPublishing } = useCreateProperty();

  // Cleanup function
  useEffect(() => {
    return () => {
      if (coverImage?.preview) URL.revokeObjectURL(coverImage.preview);
      images.forEach(img => {
        if (img?.preview) URL.revokeObjectURL(img.preview);
      });
    };
  }, [coverImage, images]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleLocationUpdate = useCallback((locationData) => {
    setFormData((prev) => ({ ...prev, ...locationData }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Disable submit button immediately
    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true;
    }
    
    // Prevent double submission
    if (isSubmitting || isPublishing) {
      toast.warning("Already submitting...");
      return;
    }

    // Validate required fields
    if (!coverImage) {
      toast.error("Please upload a cover image.");
      if (submitButtonRef.current) {
        submitButtonRef.current.disabled = false;
      }
      return;
    }
    
    if (!formData.location_id) {
      toast.error("Please select a location.");
      if (submitButtonRef.current) {
        submitButtonRef.current.disabled = false;
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        amenities: selectedAmenities,
        cover_image: coverImage.file,
        images: images.map((img) => img.file),
      };

      await createProperty(submissionData);
      
      // Success - you can redirect or reset form here
      // toast.success("Property published successfully!"); // This is already in useCreateProperty
      
    } catch (err) {
      // Error is already handled in useCreateProperty
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
      // Re-enable submit button
      if (submitButtonRef.current) {
        submitButtonRef.current.disabled = false;
      }
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
            submitButtonRef={submitButtonRef}
          />
        </div>
      </form>
    </div>
  );
}