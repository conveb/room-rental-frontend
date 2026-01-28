import React, { useState } from "react";
import { MdAddCircle, MdDelete, MdInfoOutline, MdEuro } from "react-icons/md";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useAmenities } from "../../../hooks/admin/constants/useAmenities";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { toast } from "sonner";
import { useCreateProperty } from "../../../hooks/property/useCreateProperty";
import { useLocations } from "../../../hooks/admin/constants/useLocations";
import LocationPicker from "../components/LocationPicker";
import InstructionModal from "../components/InstructionModal";

// Fix Leaflet default icon
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

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
    // booking_fee: "",
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
  
  const [rulesVisible, setRulesVisible] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { locations } = useLocations();
  const { amenities } = useAmenities();
  const { createProperty, loading: isPublishing } = useCreateProperty();

  // Simplified handler for location updates from LocationPicker
  const handleLocationUpdate = (locationData) => {
    setFormData((prev) => ({
      ...prev,
      ...locationData,
    }));
  };

  // Image handlers
  const handleCoverImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous URL to prevent memory leaks
      if (coverImage?.preview) {
        URL.revokeObjectURL(coverImage.preview);
      }
      setCoverImage({ file, preview: URL.createObjectURL(file) });
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 5 - images.length;
    const mapped = files.slice(0, remainingSlots).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...mapped]);
  };

  // Clean up object URLs on component unmount
  React.useEffect(() => {
    return () => {
      if (coverImage?.preview) {
        URL.revokeObjectURL(coverImage.preview);
      }
      images.forEach(img => {
        if (img.preview) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [coverImage, images]);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting || isPublishing) {
      return;
    }
    
    // Basic validation
    if (!coverImage) {
      toast.error("Please upload a cover image.");
      return;
    }
    
    if (!formData.title.trim()) {
      toast.error("Please enter a listing title.");
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error("Please enter a property description.");
      return;
    }
    
    if (!formData.location_id) {
      toast.error("Please select a location.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare clean data object
      const submissionData = {
        ...formData,
        amenities: selectedAmenities,
        cover_image: coverImage.file,
        images: images.map(img => img.file),
      };

      await createProperty(submissionData);
      
      // Reset form on success (assuming createProperty handles success toast)
      setFormData({
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
        // booking_fee: "",
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
      
      setCoverImage(null);
      setImages([]);
      setSelectedAmenities([]);
      
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.message || "Failed to create property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Remove single image
  const removeImage = (index) => {
    const updatedImages = [...images];
    URL.revokeObjectURL(updatedImages[index].preview);
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div className="text-xs md:text-sm md:p-6 mx-auto">
      <div className="flex justify-between items-center mb-2 md:mb-6">
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">Add New Property</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-2 bg-white rounded-xl">
        {/* LEFT COLUMN: IMAGES & LOCATION */}
        <div className="space-y-6">
          {/* Image Upload Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Cover Image */}
            <div className="w-full">
              {!coverImage ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-40 cursor-pointer hover:bg-blue-50 transition border-blue-200 bg-blue-50/20">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleCoverImageSelect} 
                    className="hidden" 
                    required
                  />
                  <MdAddCircle className="text-2xl text-blue-500 mb-1" />
                  <span className="font-bold text-gray-600">Cover Image *</span>
                  <span className="text-xs text-gray-400 mt-1">Required</span>
                </label>
              ) : (
                <div className="relative h-40 rounded-xl overflow-hidden border">
                  <img 
                    src={coverImage.preview} 
                    className="w-full h-full object-cover" 
                    alt="Cover" 
                  />
                  <button 
                    type="button" 
                    onClick={() => {
                      URL.revokeObjectURL(coverImage.preview);
                      setCoverImage(null);
                    }} 
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
            
            {/* Gallery Images */}
            <div className="w-full">
              <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-40 transition ${images.length >= 5 ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}>
                <input 
                  type="file" 
                  multiple 
                  onChange={handleImageSelect} 
                  className="hidden" 
                  disabled={images.length >= 5} 
                  accept="image/*"
                />
                <MdAddCircle className={`text-2xl mb-1 ${images.length >= 5 ? 'text-gray-300' : 'text-gray-400'}`} />
                <span className="font-bold text-gray-600">Gallery ({images.length}/5)</span>
                {images.length >= 5 && (
                  <span className="text-xs text-gray-400 mt-1">Maximum reached</span>
                )}
              </label>
            </div>
          </div>

          {/* Display selected gallery images */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative h-24 rounded-lg overflow-hidden border">
                  <img 
                    src={img.preview} 
                    className="w-full h-full object-cover" 
                    alt={`Gallery ${index + 1}`} 
                  />
                  <button 
                    type="button" 
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600 transition"
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Location Picker */}
          <LocationPicker
            formData={formData}
            onLocationChange={handleLocationUpdate}
          />
        </div>

        {/* RIGHT COLUMN: PROPERTY INFO */}
        <div className="space-y-4">
          {/* Basic Information */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Listing Title *</label>
            <input 
              name="title" 
              placeholder="Beautiful 3-bedroom apartment in city center" 
              value={formData.title} 
              onChange={handleInputChange} 
              className="w-full border p-4 rounded-xl text-sm shadow-sm outline-none focus:border-blue-500 transition" 
              required 
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Description *</label>
            <textarea
              name="description"
              placeholder="Describe your property in detail (amenities, nearby attractions, features...)"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border p-4 rounded-xl text-sm shadow-sm outline-none focus:border-blue-500 transition"
              rows={4}
              required
            />
          </div>

          {/* Location ID and Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Location ID *</label>
              <Dropdown
                value={formData.location_id}
                options={locations || []}
                optionLabel="location_name"
                optionValue="id"
                onChange={(e) => setFormData({ ...formData, location_id: e.value })}
                placeholder="Select a Location"
                filter
                className="w-full shadow-sm text-xs border border-gray-200"
                loading={!locations}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Available From</label>
              <Calendar
                value={formData.available_from}
                onChange={(e) => setFormData({ ...formData, available_from: e.value })}
                dateFormat="yy-mm-dd"
                showIcon
                placeholder="Select Date"
                className="w-full"
                inputClassName="p-2.5 border rounded-lg w-full"
              />
            </div>
          </div>

          {/* Property Type and Occupancy */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Property Type</label>
              <Dropdown 
                value={formData.property_type} 
                options={['ENTIRE_HOME', 'APARTMENT', 'STUDIO']} 
                onChange={(e) => setFormData({ ...formData, property_type: e.value })} 
                className="w-full border border-gray-200" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Max Occupancy *</label>
              <input 
                type="number" 
                name="max_people" 
                value={formData.max_people} 
                onChange={handleInputChange} 
                placeholder="e.g. 4" 
                className="w-full border p-2.5 rounded-lg outline-none focus:border-blue-500 transition" 
                min="1"
                required
              />
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-3 text-blue-800 font-bold text-xs">
              <MdEuro /> PRICING & DEPOSITS
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Rent/Mo *</label>
                <input 
                  name="rent_per_month" 
                  value={formData.rent_per_month} 
                  onChange={handleInputChange} 
                  placeholder="€" 
                  className="border-b bg-transparent font-bold py-1 outline-none w-full focus:border-blue-500 transition" 
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Charges</label>
                <input 
                  name="charges" 
                  value={formData.charges} 
                  onChange={handleInputChange} 
                  placeholder="€" 
                  className="border-b bg-transparent py-1 outline-none w-full focus:border-blue-500 transition" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Security</label>
                <input 
                  name="security_deposit" 
                  value={formData.security_deposit} 
                  onChange={handleInputChange} 
                  placeholder="€" 
                  className="border-b bg-transparent py-1 outline-none w-full focus:border-blue-500 transition" 
                />
              </div>
              
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Size (m²) *</label>
              <input 
                name="size_m2" 
                placeholder="m²" 
                value={formData.size_m2} 
                onChange={handleInputChange} 
                className="border p-3 rounded-lg w-full outline-none focus:border-blue-500 transition" 
                min="1"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Rooms *</label>
              <input 
                name="rooms" 
                placeholder="Rooms" 
                value={formData.rooms} 
                onChange={handleInputChange} 
                className="border p-3 rounded-lg w-full outline-none focus:border-blue-500 transition" 
                min="0"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Bathrooms *</label>
              <input 
                name="bathrooms" 
                placeholder="Baths" 
                value={formData.bathrooms} 
                onChange={handleInputChange} 
                className="border p-3 rounded-lg w-full outline-none focus:border-blue-500 transition" 
                min="0"
                required
              />
            </div>
          </div>

          {/* Energy Performance */}
          <div className="bg-orange-50/30 p-4 rounded-xl border border-orange-100">
            <div className="flex items-center gap-2 mb-3 text-orange-800 font-bold text-xs">
              <MdInfoOutline /> PERFORMANCE CLASSES
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">DPE Class</label>
                <Dropdown 
                  value={formData.dpe_class} 
                  options={['A', 'B', 'C', 'D', 'E', 'F', 'G']} 
                  onChange={(e) => setFormData({ ...formData, dpe_class: e.value })} 
                  className="w-full border border-gray-200" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">GES Class</label>
                <Dropdown 
                  value={formData.ges_class} 
                  options={['A', 'B', 'C', 'D', 'E', 'F', 'G']} 
                  onChange={(e) => setFormData({ ...formData, ges_class: e.value })} 
                  className="w-full border border-gray-200" 
                />
              </div>
            </div>
          </div>

          {/* Amenities Selection */}
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
              maxSelectedLabels={3}
              selectedItemsLabel="{0} items selected"
              className="w-full rounded-xl shadow-sm text-xs border border-gray-200"
              panelClassName="text-xs"
              style={{ minHeight: '44px' }}
            />
          </div>

          {/* House Rules & Instructions */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">
              House Rules & Instructions
            </label>
            <div
              onClick={() => setRulesVisible(true)}
              className="w-full border-2 border-dashed p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all flex flex-col items-center justify-center gap-2"
            >
              {formData.instructions.length > 0 ? (
                <>
                  <span className="font-bold text-blue-600">
                    {formData.instructions.length} Rule{formData.instructions.length !== 1 ? 's' : ''} Added
                  </span>
                  <span className="text-xs text-gray-500">Click to edit rules</span>
                </>
              ) : (
                <>
                  <MdAddCircle className="text-xl text-gray-400" />
                  <span className="text-xs text-gray-500">Add instructions, WiFi, or Smoking rules</span>
                </>
              )}
            </div>

            <InstructionModal
              visible={rulesVisible}
              onHide={() => setRulesVisible(false)}
              rules={formData.instructions}
              setRules={(newRules) => {
                setFormData(prev => ({
                  ...prev,
                  instructions: newRules
                }));
              }}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting || isPublishing} 
            className="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase shadow-xl hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || isPublishing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing Listing...
              </span>
            ) : (
              "Publish Property"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}