import React, { useState } from 'react';
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { MdEuro, MdInfoOutline } from "react-icons/md";
import { useAmenities } from "../../../hooks/admin/constants/useAmenities";
import { useLocations } from "../../../hooks/admin/constants/useLocations";
import InstructionModal from "./InstructionModal";

const PropertyFormFields = ({ 
  formData, 
  setFormData, 
  handleInputChange, 
  selectedAmenities, 
  setSelectedAmenities, 
  isSubmitting,
  submitButtonRef  }) => {
  const { locations } = useLocations();
  const { amenities } = useAmenities();
  const [rulesVisible, setRulesVisible] = useState(false);

  // [NEW] Handler for file upload (contract_file only)
  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Check if it's a PDF file for contract_file
      if (fieldName === 'contract_file' && file.type !== 'application/pdf') {
        alert('Please upload a PDF file only for Contract File');
        return;
      }
      setFormData({ ...formData, [fieldName]: file });
    }
  };

  return (
    <div className="space-y-5">
      {/* Title & Description */}
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Listing Title *</label>
          <input name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Modern Apartment" className="w-full border p-3 rounded-xl focus:ring-2 ring-blue-500/20 outline-none transition" required />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Description *</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full border p-3 rounded-xl focus:ring-2 ring-blue-500/20 outline-none transition" placeholder="Tell us about your place..." required />
        </div>
      </div>

      {/* Location & Availability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Location ID *</label>
          <Dropdown value={formData.location_id} options={locations || []} optionLabel="location_name" optionValue="id" onChange={(e) => setFormData({ ...formData, location_id: e.value })} placeholder="Select Location" filter className="w-full text-xs shadow-none border" required />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Available From</label>
          <Calendar
            value={formData.available_from ? new Date(formData.available_from) : null}
            onChange={(e) => {
              const formatted = e.value ? e.value.toISOString().split('T')[0] : "";
              setFormData({ ...formData, available_from: formatted });
            }}
            dateFormat="yy-mm-dd"
            showIcon
            className="w-full"
            inputClassName="p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Property Type & Capacity */}
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Type</label>
          <Dropdown value={formData.property_type} options={['ENTIRE_HOME', 'APARTMENT', 'STUDIO']} onChange={(e) => setFormData({ ...formData, property_type: e.value })} className="w-full border" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Max People *</label>
          <input type="number" name="max_people" value={formData.max_people} onChange={handleInputChange} className="w-full border p-2 rounded-lg" required />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Min Stay (Mo)</label>
          <input type="number" name="minimum_stay_months" value={formData.minimum_stay_months} onChange={handleInputChange} className="w-full border p-2 rounded-lg" />
        </div>
      </div>

      {/* [NEW SECTION] Three New Fields - CORRECTED TYPES */}
      <div className="bg-purple-50/40 p-4 rounded-xl border border-purple-100 space-y-4">
        <div className="text-[10px] font-bold text-purple-600 uppercase">Additional Information</div>

        {/* 1. is_domicile_allowed - BOOLEAN (Fixed) */}
        <div className="flex items-center justify-between py-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Domicile Allowed</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, is_domicile_allowed: true })}
              className={`px-4 py-1.5 rounded-l-lg text-xs font-medium transition ${formData.is_domicile_allowed === true
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, is_domicile_allowed: false })}
              className={`px-4 py-1.5 rounded-r-lg text-xs font-medium transition ${formData.is_domicile_allowed === false
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              No
            </button>
          </div>
        </div>

        {/* 2. is_caf_eligible - BOOLEAN */}
        <div className="flex items-center justify-between py-2 border-t border-purple-200">
          <label className="text-[10px] font-bold text-gray-400 uppercase">CAF Eligible</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, is_caf_eligible: true })}
              className={`px-4 py-1.5 rounded-l-lg text-xs font-medium transition ${formData.is_caf_eligible === true
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, is_caf_eligible: false })}
              className={`px-4 py-1.5 rounded-r-lg text-xs font-medium transition ${formData.is_caf_eligible === false
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              No
            </button>
          </div>
        </div>

        {/* 3. contract_file - PDF FILE UPLOAD (Fixed) */}
        <div className="space-y-2 py-2 border-t border-purple-200">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Contract File (PDF) *</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => handleFileUpload(e, 'contract_file')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            {formData.contract_file && (
              <span className="text-xs text-green-600 font-medium">✓ File selected</span>
            )}
          </div>
          <p className="text-[9px] text-gray-400">Upload PDF contract document</p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-blue-50/40 p-4 rounded-xl border border-blue-100 grid grid-cols-3 gap-3">
        <div className="col-span-3 text-[10px] font-bold text-blue-600 uppercase flex items-center gap-1"><MdEuro /> Pricing & Deposits</div>
        <div>
          <label className="text-[9px] font-bold text-gray-400 uppercase">Rent/Mo *</label>
          <input name="rent_per_month" value={formData.rent_per_month} onChange={handleInputChange} className="w-full border-b bg-transparent font-bold py-1 focus:border-blue-500 outline-none" placeholder="€" required />
        </div>
        <div>
          <label className="text-[9px] font-bold text-gray-400 uppercase">Charges</label>
          <input name="charges" value={formData.charges} onChange={handleInputChange} className="w-full border-b bg-transparent py-1 focus:border-blue-500 outline-none" placeholder="€" />
        </div>
        <div>
          <label className="text-[9px] font-bold text-gray-400 uppercase">Deposit</label>
          <input name="security_deposit" value={formData.security_deposit} onChange={handleInputChange} className="w-full border-b bg-transparent py-1 focus:border-blue-500 outline-none" placeholder="€" />
        </div>
      </div>

      {/* Property Specs */}
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Size m² *</label>
          <input name="size_m2" value={formData.size_m2} onChange={handleInputChange} className="w-full border p-2 rounded-lg focus:border-blue-500 outline-none" required />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Rooms *</label>
          <input name="rooms" value={formData.rooms} onChange={handleInputChange} className="w-full border p-2 rounded-lg focus:border-blue-500 outline-none" required />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Baths *</label>
          <input name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} className="w-full border p-2 rounded-lg focus:border-blue-500 outline-none" required />
        </div>
      </div>

      {/* Energy Performance */}
      <div className="bg-orange-50/40 p-4 rounded-xl border border-orange-100 grid grid-cols-2 gap-4">
        <div className="col-span-2 text-[10px] font-bold text-orange-700 uppercase flex items-center gap-1"><MdInfoOutline /> Energy Performance</div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase">DPE Class</label>
          <Dropdown value={formData.dpe_class} options={['A', 'B', 'C', 'D', 'E', 'F', 'G']} onChange={(e) => setFormData({ ...formData, dpe_class: e.value })} className="w-full border h-9" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase">GES Class</label>
          <Dropdown value={formData.ges_class} options={['A', 'B', 'C', 'D', 'E', 'F', 'G']} onChange={(e) => setFormData({ ...formData, ges_class: e.value })} className="w-full border h-9" />
        </div>
      </div>

      {/* Amenities & Rules */}
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Amenities</label>
          <MultiSelect value={selectedAmenities} options={amenities} onChange={(e) => setSelectedAmenities(e.value)} optionLabel="name" optionValue="id" placeholder="Select Amenities" display="chip" className="w-full text-xs" />
        </div>
        <div onClick={() => setRulesVisible(true)} className="border-2 border-dashed p-4 rounded-xl cursor-pointer hover:bg-slate-50 transition flex flex-col items-center">
          <span className="text-sm font-bold text-blue-600">
            {formData.instructions.length > 0 ? `${formData.instructions.length} Rules Added` : "+ Add House Rules & WiFi"}
          </span>
        </div>
      </div>

      <InstructionModal
        visible={rulesVisible}
        onHide={() => setRulesVisible(false)}
        rules={formData.instructions}
        setRules={(newRules) => setFormData(prev => ({ ...prev, instructions: newRules }))}
      />

      <button
        ref={submitButtonRef}
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold uppercase hover:bg-black transition-all shadow-xl disabled:opacity-50 mt-4"
      >
        {isSubmitting ? "Publishing Listing..." : "Publish Property"}
      </button>
    </div>
  );
};

export default PropertyFormFields;