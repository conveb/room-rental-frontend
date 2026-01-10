import { useEffect, useState } from "react";
import { getUserCompleteDetailsAPI } from "../../services/allAPI";

export const useUserCompleteDetails = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await getUserCompleteDetailsAPI(id);
        setData(res?.data || null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return { data, loading, error };
};
