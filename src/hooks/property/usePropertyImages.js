import { useState, useCallback } from "react";
import { toast } from "sonner";
import { createPropImageApi, getPropImageApi, DeletePropImageApi } from "../../services/allAPI";

export const usePropertyImages = (propertyId) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchImages = useCallback(async () => {
        if (!propertyId) return;
        setLoading(true);
        try {
            const res = await getPropImageApi(propertyId);
            setImages(res.data || []);
        } catch (err) {
            console.error("Fetch Images Error:", err);
        } finally {
            setLoading(false);
        }
    }, [propertyId]);

    const addImage = async (file) => {
        try {
            // Since images usually require multipart/form-data
            const formData = new FormData();
            formData.append("image", file);
            
            const res = await createPropImageApi(propertyId, formData);
            setImages((prev) => [...prev, res.data]);
            toast.success("Image uploaded successfully");
            return res.data;
        } catch (err) {
            toast.error("Failed to upload image");
            throw err;
        }
    };

    const deleteImage = async (imageId) => {
        try {
            await DeletePropImageApi(propertyId, imageId);
            setImages((prev) => prev.filter((img) => img.id !== imageId));
            toast.success("Image deleted");
        } catch (err) {
            toast.error("Failed to delete image");
            throw err;
        }
    };

    return { images, loading, fetchImages, addImage, deleteImage };
};