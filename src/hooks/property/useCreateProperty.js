import { useState } from "react";
import { createPropertyApi } from "../../services/allAPI";

export const useCreateProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProperty = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      // basic fields
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("property_type", values.property_type);
      formData.append("size_m2", values.size_m2);
      formData.append("max_people", values.max_people);
      formData.append("furnished", values.furnished);
      formData.append("rooms", values.rooms);
      formData.append("bathrooms", values.bathrooms);
      formData.append("rent_per_month", values.rent_per_month);
      formData.append("charges", values.charges);
      formData.append("booking_fee", values.booking_fee);
      formData.append("security_deposit", values.security_deposit);
      formData.append("available_from", values.available_from);
      formData.append("minimum_stay_months", values.minimum_stay_months);
      formData.append("location_id", values.location_id);

      // address fields
      formData.append("address", values.address);
      formData.append("city", values.city);
      formData.append("region", values.region);
      formData.append("country", values.country);
      formData.append("latitude", values.latitude);
      formData.append("longitude", values.longitude);

      // energy classes
      formData.append("dpe_class", values.dpe_class);
      formData.append("ges_class", values.ges_class);

      // amenities (MULTIPLE ENTRIES)
      values.amenities.forEach((amenityId) => {
        formData.append("amenities", amenityId);
      });

      // images
      formData.append("cover_image", values.cover_image);

      values.images.forEach((image) => {
        formData.append("images", image);
      });

      // instructions (JSON string)
      formData.append(
        "instructions",
        JSON.stringify(values.instructions)
      );

      const response = await createPropertyApi(formData);
      return response.data;

    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProperty, loading, error };
};
