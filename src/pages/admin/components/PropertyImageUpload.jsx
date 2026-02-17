import React, { useEffect } from 'react';
import { MdAddCircle, MdDelete } from "react-icons/md";

const PropertyImageUpload = ({ coverImage, setCoverImage, images, setImages }) => {
  
  const handleCoverSelect = (e) => {
    const file = e.target.files[0];
    if (file) setCoverImage({ file, preview: URL.createObjectURL(file) });
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 5 - images.length;
    const mapped = files.slice(0, remaining).map(file => ({
      file, preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...mapped]);
  };

  useEffect(() => {
    return () => {
      if (coverImage?.preview) URL.revokeObjectURL(coverImage.preview);
      images.forEach(img => URL.revokeObjectURL(img.preview));
    };
  }, [coverImage, images]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Cover Image Upload */}
        <div className="w-full">
          {!coverImage ? (
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-40 cursor-pointer hover:bg-blue-50 transition border-blue-200 bg-blue-50/20">
              <input type="file" accept="image/*" onChange={handleCoverSelect} className="hidden" />
              <MdAddCircle className="text-2xl text-blue-500 mb-1" />
              <span className="font-bold text-gray-600 text-xs">Cover Image *</span>
            </label>
          ) : (
            <div className="relative h-40 rounded-xl overflow-hidden border">
              <img src={coverImage.preview} className="w-full h-full object-cover" alt="Cover" />
              <button type="button" onClick={() => setCoverImage(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"><MdDelete /></button>
            </div>
          )}
        </div>

        {/* Gallery Upload Button */}
        <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-40 transition ${images.length >= 5 ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}>
          <input type="file" multiple accept="image/*" onChange={handleImageSelect} className="hidden" disabled={images.length >= 5} />
          <MdAddCircle className={`text-2xl mb-1 ${images.length >= 5 ? 'text-gray-300' : 'text-gray-400'}`} />
          <span className="font-bold text-gray-600 text-xs">Gallery ({images.length}/5)</span>
        </label>
      </div>

      {/* Gallery Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, index) => (
            <div key={index} className="relative h-16 rounded-lg overflow-hidden border">
              <img src={img.preview} className="w-full h-full object-cover" />
              <button type="button" onClick={() => setImages(images.filter((_, i) => i !== index))} className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-full text-[10px]"><MdDelete /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyImageUpload;