import { useState } from "react";
import { toast } from "sonner";
import { createPropertyApi } from "../../services/allAPI";

export const useCreateProperty = () => {
  const [loading, setLoading] = useState(false);

  const createProperty = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // 1. Append Text fields with type-safe handling
      Object.keys(values).forEach((key) => {
        if (key !== "images" && key !== "cover_image" && key !== "amenities") {
          let val = values[key];

          // Format Date objects to YYYY-MM-DD
          if (val instanceof Date) {
            val = val.toISOString().split('T')[0];
          }

          // FIX: Handle Booleans (Convert true to 1 or "true" based on backend needs)
          if (typeof val === "boolean") {
            val = val ? "true" : "false"; 
          }

          // FIX: Don't append empty strings or nulls for optional numeric fields
          if (val !== "" && val !== null && val !== undefined) {
            formData.append(key, val);
          }
        }
      });

      // 2. Append Files
      if (values.cover_image) {
        formData.append("cover_image", values.cover_image);
      }

      if (values.images && values.images.length > 0) {
        values.images.forEach((file) => {
          formData.append("images", file);
        });
      }

      // 3. Append Amenities individually (Standard for Django/Rest Framework lists)
      if (values.amenities && Array.isArray(values.amenities)) {
        values.amenities.forEach(id => {
          formData.append("amenities", id);
        });
      }

      // Debugging: View exactly what is being sent in the console
      // for (let pair of formData.entries()) { console.log(pair[0] + ': ' + pair[1]); }

      const response = await createPropertyApi(formData);
      toast.success("Property published successfully!");
      return response.data;

    } catch (err) {
      if (err.response && err.response.data) {
        const serverErrors = err.response.data;
        // The catch block now handles both arrays and single strings safely
        Object.entries(serverErrors).forEach(([field, messages]) => {
          const errorMsg = Array.isArray(messages) ? messages.join(", ") : messages;
          toast.error(`${field}: ${errorMsg}`);
        });
      } else {
        toast.error("An unexpected error occurred.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProperty, loading };
};