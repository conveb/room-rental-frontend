import React, { useState } from "react";
import ImgSkeleton from "../../../../Assets/pngs/img_skeleton.png";
import { IoIosShareAlt } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";

const ImageGallery = ({ images, property, isSaved, onFavoriteClick, onShare }) => {
  const [activeImage, setActiveImage] = useState(null);
  const [openStack, setOpenStack] = useState(false);

  const mainImage = activeImage || images[0];

  return (
    <section className="relative">
      {/* Main Image */}
      <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-gray-200">
        <img
          src={mainImage}
          alt={property.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = ImgSkeleton;
          }}
          className="h-full w-full object-cover"
        />

        {/* Overlay controls */}
        <div className="absolute top-2 md:top-4 right-0 left-0 flex justify-between items-center px-2 md:px-4">
          <span className="flex text-xs gap-1 text-white bg-black/50 px-3 py-2 rounded-full">
            <p>Available from :</p> <p>{property.available_from}</p>
          </span>
          <div>
            <button
              onClick={(e) => onFavoriteClick(e, property)}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all z-10"
            >
              {isSaved(property.id) ? (
                <FaHeart className="text-red-500 animate-pulse" size={18} />
              ) : (
                <FiHeart className="text-gray-600 hover:text-red-500" size={18} />
              )}
            </button>
            <button
              className="bg-white/80 text-gray-600 rounded-full p-2 shadow-md ml-3"
              onClick={onShare}
            >
              <IoIosShareAlt size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Image Stack */}
      <div className="absolute bottom-1 right-4 left-2 lg:hidden flex items-center max-w-[90vw]">
        <div
          className={`flex gap-2 transition-all duration-300 overflow-x-auto no-scrollbar py-2 px-1
            ${openStack ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none"}`}
          style={{ maxWidth: "calc(100vw - 80px)" }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveImage(img);
                setOpenStack(false);
              }}
              className="h-14 w-14 flex-shrink-0 rounded-2xl overflow-hidden border bg-white shadow-sm"
            >
              <img src={img} className="h-full w-full object-cover" alt={`thumb-${i}`} />
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpenStack(!openStack)}
          className="relative ml-2 flex-shrink-0 w-10 h-10 md:h-12 md:w-12 rounded-full bg-black text-white z-10 shadow-lg flex items-center justify-center"
        >
          {openStack ? (
            <span className="text-xl">✕</span>
          ) : (
            <div className="relative">
              <LuImagePlus size={22} />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black text-[10px] font-bold border-2 border-black">
                +{images.length}
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Desktop Thumbnails */}
      <div className="hidden lg:grid grid-cols-5 gap-1 mt-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(img)}
            className={`h-24 w-24 rounded-3xl overflow-hidden border-2 ${mainImage === img ? "border-black" : "border-transparent hover:border-gray-300"
              }`}
          >
            <img
              src={img}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = ImgSkeleton;
              }}
              className="h-full w-full object-cover"
              alt={`thumb-${i}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default ImageGallery;