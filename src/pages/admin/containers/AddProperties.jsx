import React, { useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { useCreateProperty } from "../../../hooks/property/useCreateProperty";
import PropertyImageUpload from "../components/PropertyImageUpload";
import LocationPicker from "../components/LocationPicker";
import PropertyFormFields from "../components/PropertyFormFields";

export default function AddProperties() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property_type: "ENTIRE_HOME",
    size_m2: "",
    max_people: "",
    furnished: true,
    is_domicile_allowed: false,
    is_caf_eligible: false,
    contract: false,
    rooms: "",
    bhk: "",
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
    latitude: 48.8566,
    longitude: 2.3522,
    instructions: []
  });

  const [coverImage, setCoverImage] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitButtonRef = useRef(null);
  const { createProperty, loading: isPublishing } = useCreateProperty();

  const handleNext = () => {
    if (currentStep === 1 && !coverImage) {
      return toast.error("Please upload a cover image.");
    }
    if (currentStep === 2 && !formData.address) {
      return toast.error("Please select a location.");
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => setCurrentStep(prev => prev - 1);

  const handleLocationUpdate = useCallback((locationData) => {
    setFormData((prev) => ({
      ...prev,
      ...locationData,
      location_id: locationData.location_id || "manual_selection"
    }));
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isSubmitting || isPublishing) return;

    setIsSubmitting(true);
    try {
      const submissionData = {
        ...formData,
        amenities: selectedAmenities,
        cover_image: coverImage.file,
        images: images.map((img) => img.file),
      };
      await createProperty(submissionData);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6 bg-white min-h-screen rounded-3xl">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Add New Property</h1>

      {/* Progress Header */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(num => (
          <div key={num} className={`h-2 flex-1 rounded-full ${currentStep >= num ? 'bg-black' : 'bg-gray-200'}`} />
        ))}
      </div>

      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
        {/* STEP 1: IMAGES */}
        {currentStep === 1 && (
          <PropertyImageUpload
            coverImage={coverImage}
            setCoverImage={setCoverImage}
            images={images}
            setImages={setImages}
          />
        )}

        {/* STEP 2: LOCATION */}
        {currentStep === 2 && (
          <LocationPicker
            formData={formData}
            onLocationChange={handleLocationUpdate}
          />
        )}

        {/* STEP 3: FORM FIELDS */}
        {currentStep === 3 && (
          <form onSubmit={handleSubmit}>
            <PropertyFormFields
              formData={formData}
              setFormData={setFormData}
              handleInputChange={(e) => {
                const { name, value } = e.target;
                setFormData(prev => ({ ...prev, [name]: value }));
              }}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              isSubmitting={isSubmitting || isPublishing}
              submitButtonRef={submitButtonRef}
            />
          </form>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handleBack}
          className={`px-6 py-2 rounded-xl border ${currentStep === 1 ? 'invisible' : 'visible'}`}
        >
          Back
        </button>

        {currentStep < 3 && (
          <button
            type="button"
            onClick={handleNext}
            className="bg-black text-white px-8 py-2 rounded-xl font-bold"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}