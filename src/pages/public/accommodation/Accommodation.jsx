import React, { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiFilter, FiHeart, FiX } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useProperties } from "../../../hooks/property/useProperties";
import { FaHeart, FaSearch } from "react-icons/fa";
import ImgSkeleton from '../../../Assets/pngs/img_skeleton.png';
import AccommodationSkeleton from "../../skeleton/AccommodationSkeleton";
import { useFavorites } from "../../../hooks/users/useFavorites";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "sonner";
import { TbDoor, TbUsers } from "react-icons/tb";
import PropertyCard from "./components/PropertyCard";

const TYPE_LABELS = {
  ENTIRE_HOME: "Entire Home",
  PRIVATE_ROOM: "Private Room",
  SHARED_ROOM: "Shared Room",
  STUDIO: "Studio",
};

const MAX_BUDGET = 5000;

const Accommodation = ({ baseRoute }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    loading,
    error,
    filters,
    filteredProperties,
    handleFilterChange,
    applyFilters,
    resetFilters,
  } = useProperties();

  const [showFilters, setShowFilters] = useState(false);
  const { isSaved, addToFavorites, removeFromFavorites } = useFavorites();

  const handleFavoriteClick = useCallback((e, property) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { navigate("/signin"); return; }
    if (isSaved(property.id)) {
      removeFromFavorites(property.id);
      toast.success("Removed from saved!");
    } else {
      addToFavorites(property.id);
      toast.success("Added to saved!");
    }
  }, [user, isSaved, addToFavorites, removeFromFavorites, navigate]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { applyFilters(); setShowFilters(false); }
  };

  const handleBoolChange = (e) => {
    const { name, checked } = e.target;
    handleFilterChange({ target: { name, value: checked } });
  };

  const activeTags = useMemo(() => [
    filters.city && { key: "city", label: `City: ${filters.city}` },
    filters.budget && { key: "budget", label: `Max: €${filters.budget}` },
    filters.type && { key: "type", label: TYPE_LABELS[filters.type] },
    filters.rooms && { key: "rooms", label: `${filters.rooms === "3" ? "3+" : filters.rooms} Rooms` },
    filters.maxPeople && { key: "maxPeople", label: `Max ${filters.maxPeople === "4" ? "4+" : filters.maxPeople} people` },
    filters.date && { key: "date", label: `From ${filters.date}` },
    filters.minStay && { key: "minStay", label: `Min ${filters.minStay}mo stay` },
    filters.furnished && { key: "furnished", label: "Furnished" },
    filters.is_caf_eligible && { key: "is_caf_eligible", label: "CAF eligible" },
    filters.is_domicile_allowed && { key: "is_domicile_allowed", label: "Domicile ok" },
    filters.contract && { key: "contract", label: "Contract incl." },
  ].filter(Boolean), [filters]);

  const clearTag = (key) => {
    const isBool = ["furnished", "is_caf_eligible", "is_domicile_allowed", "contract"].includes(key);
    handleFilterChange({ target: { name: key, value: isBool ? false : "" } });
  };

  const advancedActiveCount = activeTags.filter(
    (t) => !["city", "type", "rooms"].includes(t.key)
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-14 mt-16 md:mt-14">
      
      {/* HEADER SECTION */}
      <div className="bg-black px-3 md:px-8 lg:px-20 pb-4 md:pb-8">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-2xl md:text-4xl font-semibold text-white text-center mb-4 md:mb-8 pt-4 md:pt-10">
            Find Rooms
          </h1>

          {/* SEARCH BAR CONTAINER */}
          <div className="bg-white p-2 rounded-2xl shadow-xl relative">

            {/* ── MOBILE VIEW: city | rooms | filter | search ── */}
            <div className="flex gap-2 md:hidden">
              <input
                name="city"
                placeholder="City"
                value={filters.city}
                onChange={handleFilterChange}
                onKeyDown={handleKeyDown}
                className="flex-1 text-sm bg-gray-50 px-4 py-3 rounded-xl min-w-0 outline-none focus:bg-gray-100"
              />
              <select
                name="rooms"
                value={filters.rooms}
                onChange={handleFilterChange}
                className="w-24 text-sm bg-gray-50 px-3 py-3 rounded-xl text-gray-500 flex-shrink-0 outline-none"
              >
                <option value="">Rooms</option>
                <option value="1">1 room</option>
                <option value="2">2 rooms</option>
                <option value="3">3+ rooms</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-11 flex-shrink-0 bg-gray-100 rounded-xl flex items-center justify-center relative active:scale-95 transition-transform"
              >
                <FiFilter size={16} />
                {advancedActiveCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {advancedActiveCount}
                  </span>
                )}
              </button>
              <button
                onClick={applyFilters}
                className="w-11 flex-shrink-0 flex items-center justify-center bg-black text-white rounded-xl active:scale-95 transition-transform"
              >
                <FaSearch size={15} />
              </button>
            </div>

            {/* ── DESKTOP VIEW: city | type | rooms | filter | search ── */}
            <div className="hidden md:flex gap-2">
              <input
                name="city"
                placeholder="City or title"
                value={filters.city}
                onChange={handleFilterChange}
                onKeyDown={handleKeyDown}
                className="flex-[2] text-sm bg-gray-50 px-4 py-3 rounded-xl min-w-0 outline-none focus:ring-1 focus:ring-black/10"
              />
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="flex-[1.5] text-sm bg-gray-50 px-4 py-3 rounded-xl text-gray-500 outline-none cursor-pointer"
              >
                <option value="">Any type</option>
                <option value="ENTIRE_HOME">Entire Home</option>
                <option value="PRIVATE_ROOM">Private Room</option>
                <option value="SHARED_ROOM">Shared Room</option>
                <option value="STUDIO">Studio</option>
              </select>
              <select
                name="rooms"
                value={filters.rooms}
                onChange={handleFilterChange}
                className="flex-1 text-sm bg-gray-50 px-4 py-3 rounded-xl text-gray-500 outline-none cursor-pointer"
              >
                <option value="">Rooms</option>
                <option value="1">1 room</option>
                <option value="2">2 rooms</option>
                <option value="3">3+ rooms</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex-shrink-0 px-5 bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl flex items-center justify-center gap-2 text-sm relative"
              >
                <FiFilter size={15} />
                <span className="hidden lg:inline">Filters</span>
                {advancedActiveCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {advancedActiveCount}
                  </span>
                )}
              </button>
              <button
                onClick={applyFilters}
                className="flex-shrink-0 px-8 flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 transition-colors rounded-xl font-medium text-sm"
              >
                <FaSearch size={14} />
                <span>Search</span>
              </button>
            </div>

            {/* ACTIVE FILTER TAGS */}
            {activeTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-gray-100">
                {activeTags.map((tag) => (
                  <span
                    key={tag.key}
                    className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                  >
                    {tag.label}
                    <button onClick={() => clearTag(tag.key)} className="ml-1 hover:text-black">
                      <FiX size={11} />
                    </button>
                  </span>
                ))}
                <button
                  onClick={resetFilters}
                  className="text-xs text-gray-400 hover:text-black underline px-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FILTER MODAL */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowFilters(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-50 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-semibold">More filters</h3>
                <button onClick={() => setShowFilters(false)} className="md:hidden text-gray-400"><FiX size={20}/></button>
            </div>

            {/* BUDGET SLIDER */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider">Max budget</label>
                <span className="text-sm font-semibold text-black">
                  {filters.budget ? `€${filters.budget}` : "Any"}
                </span>
              </div>
              <input
                type="range"
                name="budget"
                min={0}
                max={MAX_BUDGET}
                step={50}
                value={filters.budget || 0}
                onChange={handleFilterChange}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>€0</span>
                <span>€{MAX_BUDGET}+</span>
              </div>
            </div>

            {/* DATE */}
            <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Available from</label>
            <input
              name="date"
              type="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full text-sm bg-gray-50 px-4 py-3 rounded-xl mb-4 border-none focus:ring-1 focus:ring-black/10"
            />

            {/* TYPE — mobile only dropdown */}
            <div className="md:hidden">
              <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Property type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full text-sm bg-gray-50 px-4 py-3 rounded-xl mb-4 border-none"
              >
                <option value="">Any type</option>
                <option value="ENTIRE_HOME">Entire Home</option>
                <option value="PRIVATE_ROOM">Private Room</option>
                <option value="SHARED_ROOM">Shared Room</option>
                <option value="STUDIO">Studio</option>
              </select>
            </div>

            {/* MAX PEOPLE + MIN STAY */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Max people</label>
                <select
                  name="maxPeople"
                  value={filters.maxPeople}
                  onChange={handleFilterChange}
                  className="w-full text-sm bg-gray-50 px-4 py-3 rounded-xl border-none"
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Min stay</label>
                <select
                  name="minStay"
                  value={filters.minStay}
                  onChange={handleFilterChange}
                  className="w-full text-sm bg-gray-50 px-4 py-3 rounded-xl border-none"
                >
                  <option value="">Any</option>
                  <option value="1">1+ month</option>
                  <option value="3">3+ months</option>
                  <option value="6">6+ months</option>
                  <option value="12">12+ months</option>
                </select>
              </div>
            </div>

            {/* BOOLEAN TOGGLES */}
            <label className="text-xs text-gray-500 mb-2 block uppercase tracking-wider">Amenities & perks</label>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                { name: "furnished", label: "Furnished" },
                { name: "is_caf_eligible", label: "CAF eligible" },
                { name: "is_domicile_allowed", label: "Domicile ok" },
                { name: "contract", label: "Contract incl." },
              ].map(({ name, label }) => (
                <label
                  key={name}
                  className={`flex items-center gap-2 px-3 py-3 rounded-xl border cursor-pointer text-sm transition-all
                    ${filters[name]
                      ? "bg-black text-white border-black"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <input
                    type="checkbox"
                    name={name}
                    checked={!!filters[name]}
                    onChange={handleBoolChange}
                    className="hidden"
                  />
                  <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors
                    ${filters[name] ? "bg-white border-white" : "border-gray-400 bg-white"}`}
                  >
                    {filters[name] && <span className="text-black text-[10px] font-bold">✓</span>}
                  </span>
                  {label}
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { resetFilters(); setShowFilters(false); }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl text-sm font-medium transition-colors"
              >
                Reset all
              </button>
              <button
                onClick={() => { applyFilters(); setShowFilters(false); }}
                className="flex-1 bg-black text-white hover:bg-gray-800 py-3 rounded-xl text-sm font-medium transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN PROPERTY GRID AREA */}
      <div className="max-w-7xl mx-auto px-3 md:px-8 mt-2 md:mt-6">
        {loading && <AccommodationSkeleton />}
        {error && <p className="text-center text-red-500 mt-10">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 md:gap-6 items-stretch">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              baseRoute={baseRoute}
              isSaved={isSaved(property.id)}
              onFavoriteClick={handleFavoriteClick}
            />
          ))}
        </div>

        {!loading && filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No properties match your filters.</p>
            <button onClick={resetFilters} className="mt-2 text-black underline text-sm">Clear all search terms</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accommodation;