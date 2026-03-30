// New file: PropertyCard.jsx
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbDoor, TbUsers } from "react-icons/tb";
import ImgSkeleton from "../../../../Assets/pngs/img_skeleton.png";

const PropertyCard = memo(({ property, baseRoute, isSaved, handleFavoriteClick }) => (
  <Link to={`${baseRoute}accommodation-details/${property.id}`} className="flex flex-col h-full">
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
));

export default PropertyCard;