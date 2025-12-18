import { useEffect, useState } from "react";
import { getPropertyByIdAPI } from "../../services/allAPI";

export const usePropertyDetails = (propertyId) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!propertyId) return;

    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await getPropertyByIdAPI(propertyId);
        setProperty(res.data);
      } catch (err) {
        setError("Unable to load property");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  return { property, loading, error };
};
