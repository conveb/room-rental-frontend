import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { MdDelete, MdCloudUpload, MdImage } from "react-icons/md";

export default function PropertyImageManager({ visible, onHide, images, onAdd, onDelete }) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            await onAdd(file);
        } finally {
            setUploading(false);
            e.target.value = null; // Reset input
        }
    };

    return (
        <Dialog 
            header="Property Gallery" 
            visible={visible} 
            onHide={onHide} 
            style={{ width: '95vw', maxWidth: '600px' }}
        >
            <div className="space-y-6">
                {/* Upload Area */}
                <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 transition-colors hover:border-blue-400 group bg-gray-50/50">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploading}
                    />
                    <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-blue-500">
                        <MdCloudUpload size={40} />
                        <span className="text-xs font-bold uppercase tracking-wider">
                            {uploading ? "Uploading..." : "Click to upload gallery image"}
                        </span>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
                    {images.map((img) => (
                        <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border group">
                            <img src={img.image} alt="Property" className="w-full h-full object-cover" />
                            <button 
                                onClick={() => onDelete(img.id)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                                <MdDelete size={16} />
                            </button>
                        </div>
                    ))}
                </div>
                
                {images.length === 0 && !uploading && (
                    <div className="text-center py-10 text-gray-400 text-xs italic">
                        No gallery images yet.
                    </div>
                )}
            </div>
        </Dialog>
    );
}