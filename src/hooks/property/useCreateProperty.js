import { useState } from "react";
import { commonAPI } from "../../services/commonAPI";

export const useCreateProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const createProperty = async (form) => {
    setError("");
    setSuccess(false);

    try {
      setLoading(true);

      const formData = new FormData();

      // BASIC INFO
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("property_type", form.property_type);
      formData.append("size_m2", form.size_m2);
      formData.append("max_people", form.max_people);
      formData.append("rooms", form.rooms);
      formData.append("bathrooms", form.bathrooms);

      // PRICING
      formData.append("rent_per_month", form.rent_per_month);
      formData.append("charges", form.charges);
      formData.append("booking_fee", form.booking_fee);
      formData.append("security_deposit", form.security_deposit);

      // RULES
      formData.append("available_from", form.available_from);
      formData.append("minimum_stay_months", form.minimum_stay_months);
      formData.append("furnished", form.furnished);

      // LOCATION
      formData.append("address", form.address);
      formData.append("city", form.city);
      formData.append("region", form.region);
      formData.append("country", form.country);
      formData.append("latitude", form.latitude);
      formData.append("longitude", form.longitude);

      // ENERGY
      formData.append("dpe_class", form.dpe_class);
      formData.append("ges_class", form.ges_class);

      // AMENITIES (many-to-many)
      form.amenities.forEach((id) => {
        formData.append("amenities", id);
      });

      // IMAGES
      if (form.cover_image) {
        formData.append("cover_image", form.cover_image);
      }

      form.images.forEach((img) => {
        formData.append("images", img);
      });

      await commonAPI(
        "POST",
        "/api/v1/properties/create/",
        formData,
        { "Content-Type": "multipart/form-data" }
      );

      setSuccess(true);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        "Failed to create property"
      );
    } finally {
      setLoading(false);
    }
  };

  return { createProperty, loading, error, success };
};
