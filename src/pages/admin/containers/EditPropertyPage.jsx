import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdAddCircle,
  MdDelete,
  MdClose,
  MdOutlinePlace,
  MdOutlineStraighten,
  MdOutlineBed,
  MdOutlineBathtub,
  MdOutlineEuroSymbol,
  MdOutlineEventAvailable,
  MdHomeWork
} from "react-icons/md";
import { MultiSelect } from "primereact/multiselect";
import { toast } from "sonner";

// Hooks
import { useAmenities } from "../../../hooks/admin/constants/useAmenities";
import useMyProperties from "../../../hooks/property/useMyProperties";
import { usePropertyInstructions } from "../../../hooks/property/usePropertyInstructions";
import { usePropertyImages } from "../../../hooks/property/usePropertyImages";

// Components
import PropertyInstructionManager from "./PropertyInstructionManager";
import PropertyImageManager from "./PropertyImageManager";

export default function EditPropertyPage() {
  const { id: propertyId } = useParams();
  const navigate = useNavigate();

  // Data Fetching Hooks
  const { properties } = useMyProperties();
  const {
    amenities: masterAmenities,
    linkAmenityToProperty,
    unlinkAmenity,
    linking
  } = useAmenities();

  const {
    instructions,
    fetchInstructions,
    addInstruction,
    updateInstruction,
    deleteInstruction
  } = usePropertyInstructions(propertyId);

  const {
    images,
    fetchImages,
    addImage,
    deleteImage
  } = usePropertyImages(propertyId);

  // Local UI States
  const [formData, setFormData] = useState(null);
  const [showAmenityModal, setShowAmenityModal] = useState(false);
  const [selectedNewAmenities, setSelectedNewAmenities] = useState([]);
  const [rulesVisible, setRulesVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [deletingAmenityId, setDeletingAmenityId] = useState(null);

  // Initial Data Load
  useEffect(() => {
    const prop = properties.find((p) => p.id === propertyId);
    if (prop) {
      setFormData(prop);
    }
    fetchInstructions();
    fetchImages();
  }, [propertyId, properties, fetchInstructions, fetchImages]);

  // Amenity Actions
  const handleRemoveAmenity = async (propAmenityId) => {
    setDeletingAmenityId(propAmenityId);
    try {
      await unlinkAmenity(propertyId, propAmenityId);
      setFormData(prev => ({
        ...prev,
        amenities_data: prev.amenities_data.filter(a => a.id !== propAmenityId)
      }));
      toast.success("Amenity removed");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setDeletingAmenityId(null);
    }
  };

  const handleAddAmenities = async () => {
    try {
      const newItems = await linkAmenityToProperty(propertyId, selectedNewAmenities);
      setFormData(prev => ({
        ...prev,
        amenities_data: [...(prev.amenities_data || []), ...newItems]
      }));
      setShowAmenityModal(false);
      setSelectedNewAmenities([]);
      toast.success("Amenities updated");
    } catch (err) {
      toast.error("Failed to add amenities");
    }
  };

  if (!formData) return (
    <div className="flex items-center justify-center min-h-screen font-light text-gray-400 italic">
      Loading property portfolio...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-[#1A1A1A] font-sans pb-20">

      {/* 1. ELEGANT HEADER */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 border-b border-gray-100 flex justify-between items-end">
        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-black transition"
          >
            <MdArrowBack size={14} /> Back to Collection
          </button>
          <h1 className="text-4xl font-serif tracking-tight text-gray-900">{formData.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><MdOutlinePlace /> {formData.location?.location_name}</span>
            <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
            <span className="uppercase text-[10px] font-bold tracking-widest text-blue-600">Property ID: {propertyId.slice(0, 8)}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${formData.is_active ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-100 text-gray-500'}`}>
            {formData.is_active ? "Listed & Active" : "Private Draft"}
          </span>
          <div className="text-3xl font-light">€{formData.rent_per_month}<span className="text-xs text-gray-400 ml-1">/ month</span></div>
        </div>
      </div>

      <div className=" rounded-3xl overflow-hidden bg-gray-100 border border-gray-100 m-5" >
        <img src={formData.cover_image} className="w-full h-52 object-cover hover:scale-105 transition-transform duration-700" alt="Master" />
      </div>
      <main className=" grid grid-cols-1 md:grid-cols-2 gap-5  px-5">

        {/* LEFT: INTERACTIVE MANAGEMENT (60%) */}
        <div className=" space-y-16">

          {/* GALLERY MANAGEMENT */}
          <section>

            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((index) => {
                const img = images[index];
                const isLastSlot = index === 3;

                return (
                  <div
                    key={index}
                    onClick={() => isLastSlot && setImageModalVisible(true)}
                    className={`relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 ${isLastSlot ? 'cursor-pointer group' : ''}`}
                  >
                    {img ? (
                      <>
                        <img src={img.image} className="w-full h-52 object-cover" alt={`Gallery ${index}`} />
                        {/* Only show "View All" overlay on the 3rd sidebar slot if there are more images */}
                        {isLastSlot && (
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 backdrop-blur-[2px] transition-all flex flex-col items-center justify-center text-white">
                            <span className="text-xl font-light">+{images.length}</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">View Gallery</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 text-gray-300">
                        {isLastSlot ? (
                          <div onClick={() => setImageModalVisible(true)} className="flex flex-col items-center cursor-pointer hover:text-blue-400 transition-colors">
                            <MdAddCircle size={24} className="mb-1" />
                            <span className="text-[8px] font-bold uppercase tracking-tighter">Add More</span>
                          </div>
                        ) : (
                          <MdHomeWork size={24} />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* INSTRUCTIONS MANAGEMENT */}
        </div>
        <div>

          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Resident Protocols</h2>
            <div
              onClick={() => setRulesVisible(true)}
              className="group border border-gray-200 p-6 rounded-[2rem] bg-white hover:border-blue-400 transition-all cursor-pointer flex justify-between items-center shadow-sm hover:shadow-md"
            >
              <div className="space-y-1">
                <p className="text-lg font-medium text-gray-900">Check-in & House Rules</p>
                <p className="text-sm text-gray-400">{instructions.length} protocol(s) established.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <MdAddCircle size={24} className="text-gray-300 group-hover:text-blue-500" />
              </div>
            </div>
          </section>

          {/* AMENITIES MANAGEMENT */}
          {/* AMENITIES MANAGEMENT */}
          <section className="space-y-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">

            </h2>
            <div
              onClick={() => setShowAmenityModal(true)}
              className="group border border-gray-200 p-6 rounded-[2rem] bg-white hover:border-blue-400 transition-all cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col gap-3">

                <div className="space-y-1">
                  <p className="text-lg font-medium text-gray-900">Amenities</p>
                </div>
                <div className="flex flex-wrap gap-2 max-w-[85%]">
                  {formData.amenities_data?.length > 0 ? (
                    formData.amenities_data.map((a) => (
                      <span
                        key={a.id}
                        className="px-4 py-2 bg-[#FBFBFB] border border-gray-100 rounded-full text-[11px] font-medium text-gray-600 shadow-sm group-hover:bg-white group-hover:border-blue-100 transition-colors"
                      >
                        {a.amenity_name}
                      </span>
                    ))
                  ) : (
                    <div className="space-y-1">
                      <p className="text-lg font-medium text-gray-900">Equipment & Features</p>
                      <p className="text-sm text-gray-400">No amenities listed yet.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <MdAddCircle size={24} className="text-gray-300 group-hover:text-blue-500" />
              </div>
            </div>
          </section>
        </div>
      </main>

      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-xl   shadow-gray-200/  40 space-y-10">
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">Specifications</h2>
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center space-y-2 border p-3 rounded-xl">
                <MdOutlineStraighten className="mx-auto text-gray-300" size={24} />
                <div className="text-xl font-medium">{formData.size_m2}</div>
                <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">Sq. Meters</p>
              </div>
              <div className="text-center space-y-2 border p-3 rounded-xl ">
                <MdOutlineBed className="mx-auto text-gray-300" size={24} />
                <div className="text-xl font-medium">{formData.rooms}</div>
                <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">Bedrooms</p>
              </div>
              <div className="text-center space-y-2 border p-3 rounded-xl">
                <MdOutlineBathtub className="mx-auto text-gray-300" size={24} />
                <div className="text-xl font-medium">{formData.bathrooms}</div>
                <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">Bathrooms</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 border-t border-gray-50">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 flex items-center gap-2"><MdOutlineEuroSymbol /> Security Deposit</span>
              <span className="font-semibold text-gray-900">€{formData.security_deposit}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 flex items-center gap-2"><MdOutlineEuroSymbol /> Monthly Service Charges</span>
              <span className="font-semibold text-gray-900">€{formData.charges}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 flex items-center gap-2"><MdOutlineEventAvailable /> Available From</span>
              <span className="font-semibold text-gray-900">
                {new Date(formData.available_from).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="bg-[#F9F9F9] p-6 rounded-3xl text-center space-y-2">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">DPE Index</p>
              <div className="text-2xl font-serif text-orange-600">{formData.dpe_class}</div>
            </div>
            <div className="bg-[#F9F9F9] p-6 rounded-3xl text-center space-y-2">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">GES Index</p>
              <div className="text-2xl font-serif text-blue-600">{formData.ges_class}</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL OVERLAYS --- */}

      {/* Instruction Modal */}
      <PropertyInstructionManager
        visible={rulesVisible}
        onHide={() => setRulesVisible(false)}
        instructions={instructions}
        onAdd={addInstruction}
        onUpdate={updateInstruction}
        onDelete={deleteInstruction}
      />

      {/* Gallery Modal */}
      <PropertyImageManager
        visible={imageModalVisible}
        onHide={() => setImageModalVisible(false)}
        images={images}
        onAdd={addImage}
        onDelete={deleteImage}
      />

      {/* Amenities Modal */}
      {showAmenityModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif">Manage Features</h2>
              <button onClick={() => setShowAmenityModal(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
                <MdClose size={24} />
              </button>
            </div>

            <div className="space-y-8">
              <div className="max-h-56 overflow-y-auto pr-2 flex flex-wrap gap-2">
                {formData.amenities_data?.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-2 rounded-full text-xs">
                    <span className="text-gray-700 font-medium">{a.amenity_name}</span>
                    <button onClick={() => handleRemoveAmenity(a.id)} disabled={deletingAmenityId === a.id} className="text-gray-300 hover:text-red-500 transition">
                      {deletingAmenityId === a.id ? "..." : <MdDelete size={16} />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Add New Assets</label>
                <MultiSelect
                  value={selectedNewAmenities}
                  options={masterAmenities.filter(m => !formData.amenities_data?.some(l => l.amenity === m.id || l.amenity_id === m.id))}
                  onChange={(e) => setSelectedNewAmenities(e.value)}
                  optionLabel="name"
                  optionValue="id"
                  placeholder="Select items to add..."
                  className="w-full rounded-2xl border-gray-200"
                  display="chip"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setShowAmenityModal(false)} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Cancel</button>
                <button onClick={handleAddAmenities} disabled={linking} className="flex-1 py-4 bg-[#1A1A1A] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg">
                  {linking ? "Processing..." : "Commit Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}