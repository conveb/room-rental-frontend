import React from 'react';
import { MdAddCircle, MdDelete } from "react-icons/md";

const PropertyImageUpload = ({ coverImage, setCoverImage, images, setImages }) => {

  const handleCoverSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke old URL before creating new one
      if (coverImage?.preview) URL.revokeObjectURL(coverImage.preview);
      setCoverImage({ file, preview: URL.createObjectURL(file) });
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 10 - images.length;
    const mapped = files.slice(0, remaining).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...mapped]);
  };

  const removeImage = (indexToRemove) => {
    const imageToRemove = images[indexToRemove];
    if (imageToRemove?.preview) URL.revokeObjectURL(imageToRemove.preview);
    setImages(images.filter((_, i) => i !== indexToRemove));
  };

  const removeCover = () => {
    if (coverImage?.preview) URL.revokeObjectURL(coverImage.preview);
    setCoverImage(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {/* Cover Image Upload */}
        <div className="w-full">
          {!coverImage ? (
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-36 md:h-52 cursor-pointer hover:bg-blue-50 transition border-blue-200 bg-blue-50/20">
              <input type="file" accept="image/*" onChange={handleCoverSelect} className="hidden" />
              <MdAddCircle className="text-2xl text-blue-500 mb-1" />
              <span className="font-bold text-gray-600 text-xs">Cover Image *</span>
            </label>
          ) : (
            <div className="relative h-36 md:h-52 rounded-xl overflow-hidden border">
              <img src={coverImage.preview} className="w-full h-full object-cover" alt="Cover" />
              <button type="button" onClick={removeCover} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"><MdDelete /></button>
            </div>
          )}
        </div>

        {/* Gallery */}
        {images.length === 0 ? (
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-36 md:h-52 cursor-pointer hover:bg-gray-50 transition">
            <input type="file" multiple accept="image/*" onChange={handleImageSelect} className="hidden" />
            <MdAddCircle className="text-2xl mb-1 text-gray-400" />
            <span className="font-bold text-gray-600 text-xs">Gallery (0/10)</span>
            <p className="text-[10px] text-gray-400">Click to upload property photos</p>
          </label>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative h-36 md:h-52 rounded-lg overflow-hidden border group">
                <img src={img.preview} className="w-full h-full object-cover" alt={`Gallery ${index}`} />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-[10px] opacity-0 group-hover:opacity-100 transition"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
            {images.length < 10 && (
              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg h-36 md:h-52 cursor-pointer hover:bg-gray-50 transition">
                <input type="file" multiple accept="image/*" onChange={handleImageSelect} className="hidden" />
                <MdAddCircle className="text-lg text-gray-400" />
                <span className="text-[10px] text-gray-500">{images.length}/10</span>
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyImageUpload;