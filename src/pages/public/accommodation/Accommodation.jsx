import React, { useState } from "react";
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

  const handleFavoriteClick = (e, property) => {
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
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { applyFilters(); setShowFilters(false); }
  };

  const handleBoolChange = (e) => {
    const { name, checked } = e.target;
    handleFilterChange({ target: { name, value: checked } });
  };

  const activeTags = [
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
  ].filter(Boolean);

  const clearTag = (key) => {
    const isBool = ["furnished", "is_caf_eligible", "is_domicile_allowed", "contract"].includes(key);
    handleFilterChange({ target: { name: key, value: isBool ? false : "" } });
  };

  const advancedActiveCount = activeTags.filter(
    (t) => !["city", "type", "rooms"].includes(t.key)
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-14 mt-14">

      {/* HEADER */}
      <div className="bg-black px-4 md:px-20 pb-3 md:pb-6">
        <h1 className="text-2xl md:text-4xl font-semibold text-white text-center mb-2 md:mb-6 pt-3 md:pt-8">
          Find Rooms
        </h1>

        <div className="bg-white p-2 rounded-2xl shadow-xl relative">

          {/* ── MOBILE: city | rooms | filter | search ── */}
          <div className="flex gap-2 md:hidden">
            <input
              name="city"
              placeholder="City"
              value={filters.city}
              onChange={handleFilterChange}
              onKeyDown={handleKeyDown}
              className="flex-1 text-sm bg-gray-50 px-4 py-3 rounded-xl min-w-0"
            />
            <select
              name="rooms"
              value={filters.rooms}
              onChange={handleFilterChange}
              className="w-24 text-sm bg-gray-50 px-3 py-3 rounded-xl text-gray-500 flex-shrink-0"
            >
              <option value="">Rooms</option>
              <option value="1">1 room</option>
              <option value="2">2 rooms</option>
              <option value="3">3+ rooms</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-11 flex-shrink-0 bg-gray-100 rounded-xl flex items-center justify-center relative"
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
              className="w-11 flex-shrink-0 flex items-center justify-center bg-black text-white rounded-xl"
            >
              <FaSearch size={15} />
            </button>
          </div>

          {/* ── DESKTOP: city | type | rooms | filter | search ── */}
          <div className="hidden md:flex gap-2">
            <input
              name="city"
              placeholder="City or title"
              value={filters.city}
              onChange={handleFilterChange}
              onKeyDown={handleKeyDown}
              className="flex-[2] text-sm bg-gray-50 px-4 py-3 rounded-xl min-w-0"
            />
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="flex-[2] text-sm bg-gray-50 px-4 py-3 rounded-xl text-gray-500"
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
              className="flex-1 text-sm bg-gray-50 px-4 py-3 rounded-xl text-gray-500"
            >
              <option value="">Rooms</option>
              <option value="1">1 room</option>
              <option value="2">2 rooms</option>
              <option value="3">3+ rooms</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex-shrink-0 px-5 bg-gray-100 rounded-xl flex items-center justify-center gap-2 text-sm relative"
            >
              <FiFilter size={15} />
              <span>Filters</span>
              {advancedActiveCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {advancedActiveCount}
                </span>
              )}
            </button>
            <button
              onClick={applyFilters}
              className="flex-shrink-0 px-6 flex items-center justify-center gap-2 bg-black text-white rounded-xl font-medium text-sm"
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

      {/* FILTER MODAL */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 z-50 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-5">More filters</h3>

            {/* BUDGET SLIDER */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-500">Max budget</label>
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
                className="w-full accent-black"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>€0</span>
                <span>€{MAX_BUDGET}+</span>
              </div>
              {filters.budget > 0 && (
                <button
                  onClick={() => handleFilterChange({ target: { name: "budget", value: "" } })}
                  className="text-xs text-gray-400 hover:text-black underline mt-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* DATE */}
            <label className="text-xs text-gray-500 mb-1 block">Available from</label>
            <input
              name="date"
              type="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full text-sm bg-gray-50 px-4 py-3 rounded-xl mb-4"
            />

            {/* TYPE — mobile only, desktop has it in search bar */}
            <div className="md:hidden">
              <label className="text-xs text-gray-500 mb-1 block">Property type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full text-sm bg-gray-50 px-4 py-3 rounded-xl mb-4"
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
                <label className="text-xs text-gray-500 mb-1 block">Max people</label>
                <select
                  name="maxPeople"
                  value={filters.maxPeople}
                  onChange={handleFilterChange}
                  className="w-full text-sm bg-gray-50 px-4 py-3 rounded-xl"
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Minimum stay</label>
                <select
                  name="minStay"
                  value={filters.minStay}
                  onChange={handleFilterChange}
                  className="w-full text-sm bg-gray-50 px-4 py-3 rounded-xl"
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
            <label className="text-xs text-gray-500 mb-2 block">Amenities & perks</label>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                { name: "furnished", label: "Furnished" },
                { name: "is_caf_eligible", label: "CAF eligible" },
                { name: "is_domicile_allowed", label: "Domicile ok" },
                { name: "contract", label: "Contract incl." },
              ].map(({ name, label }) => (
                <label
                  key={name}
                  className={`flex items-center gap-2 px-3 py-3 rounded-xl border cursor-pointer text-sm transition
                    ${filters[name]
                      ? "bg-black text-white border-black"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                >
                  <input
                    type="checkbox"
                    name={name}
                    checked={!!filters[name]}
                    onChange={handleBoolChange}
                    className="hidden"
                  />
                  <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0
                    ${filters[name] ? "bg-white border-white" : "border-gray-400"}`}
                  >
                    {filters[name] && <span className="text-black text-[10px]">✓</span>}
                  </span>
                  {label}
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { resetFilters(); setShowFilters(false); }}
                className="flex-1 bg-gray-100 py-3 rounded-xl text-sm"
              >
                Reset all
              </button>
              <button
                onClick={() => { applyFilters(); setShowFilters(false); }}
                className="flex-1 bg-black text-white py-3 rounded-xl text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATES */}
      {loading && <AccommodationSkeleton />}
      {error && <p className="text-center text-red-500 mt-10">{error}</p>}

      {/* PROPERTY LIST */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 px-2 md:px-32 mt-2 md:mt-6 items-stretch">
        {filteredProperties.map((property) => (
          <Link
            to={`${baseRoute}accommodation-details/${property.id}`}
            key={property.id}
            className="flex flex-col h-full"
          >
            <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col h-full">
              <div className="relative">
                <img
                  src={property.cover_image}
                  alt={property.title}
                  onError={(e) => { e.target.onerror = null; e.target.src = ImgSkeleton; }}
                  className="w-full h-72 md:h-96 object-cover"
                />
                <div className="absolute top-0 left-0 w-full p-3 flex items-start justify-between pointer-events-none">
                  <p className="text-xs md:text-base font-semibold text-white drop-shadow-md bg-black/30 px-3 py-2 rounded-full backdrop-blur-[2px]">
                    €{property.rent_per_month}
                  </p>
                  <button
                    onClick={(e) => handleFavoriteClick(e, property)}
                    className="pointer-events-auto p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:scale-110 active:scale-95 transition-all z-10"
                    aria-label="Toggle Favorite"
                  >
                    {isSaved(property.id) ? (
                      <FaHeart className="text-red-500 animate-pulse" size={18} />
                    ) : (
                      <FiHeart className="text-gray-600 hover:text-red-500 transition-colors" size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div className="absolute bg-black/20 backdrop-blur-sm bottom-0 left-0 right-0 p-3 flex flex-col flex-1 text-white rounded-tl-2xl rounded-tr-2xl">
                <h2 className="text-base md:text-lg font-semibold line-clamp-1">{property.title}</h2>
                <p className="text-white/90 text-xs flex items-center gap-1">
                  <HiOutlineLocationMarker /> {property.city}, {property.country}
                </p>
                <p className="text-[10px] md:text-sm text-white/90 flex items-center gap-1 md:gap-3 mt-1">
                  <TbDoor /> {property.rooms} Rooms <TbUsers /> Max {property.max_people} people
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!loading && filteredProperties.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No properties match your filters.</p>
      )}
    </div>
  );
};

export default Accommodation;