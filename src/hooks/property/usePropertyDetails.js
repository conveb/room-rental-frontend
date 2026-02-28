import { useEffect, useState } from "react";
import { getPropertyByIdAPI } from "../../services/allAPI";

export const usePropertyDetails = (propertyId) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!propertyId) return;

    let isMounted = true; 
    const fetchProperty = async () => {
      try {
        const res = await getPropertyByIdAPI(propertyId);
        if (isMounted) {
          // Only set if data actually exists
          setProperty(res.data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) setLoading(false);
      }
    };

    fetchProperty();
    return () => { isMounted = false; };
  }, [propertyId]);

  return {  property, loading };
};