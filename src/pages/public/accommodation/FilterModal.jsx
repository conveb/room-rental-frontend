import React from "react";

const FilterModal = ({ filters, onChange, onClose, onApply }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:hidden">
      <div className="bg-white w-full rounded-t-2xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">More Filters</h2>
          <button onClick={onClose} className="text-sm text-gray-500">
            Close
          </button>
        </div>

        {/* DATE */}
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={onChange}
          className="w-full border rounded-xl px-4 py-3"
        />

        {/* TYPE */}
        <select
          name="type"
          value={filters.type}
          onChange={onChange}
          className="w-full border rounded-xl px-4 py-3"
        >
          <option value="">Accommodation Type</option>
          <option value="Private Room">Private Room</option>
          <option value="Shared Room">Shared Room</option>
          <option value="Studio">Studio</option>
        </select>

        {/* BUDGET */}
        <input
          type="number"
          name="budget"
          placeholder="Max Budget (€)"
          value={filters.budget}
          onChange={onChange}
          className="w-full border rounded-xl px-4 py-3"
        />

        {/* ROOMS */}
        <select
          name="rooms"
          value={filters.rooms}
          onChange={onChange}
          className="w-full border rounded-xl px-4 py-3"
        >
          <option value="">Rooms</option>
          <option value="1">1 Room</option>
          <option value="2">2 Rooms</option>
        </select>

        <button
          onClick={() => {
            onApply();
            onClose();
          }}
          className="w-full bg-black text-white py-3 rounded-xl"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
