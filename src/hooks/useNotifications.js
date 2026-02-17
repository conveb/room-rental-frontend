import { useState, useEffect } from "react";
import { ListNotificationsApi } from "../services/allAPI";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotifications = async () => {
    try {
      const res = await ListNotificationsApi();
      // Access the array directly from the response object
      setNotifications(res.data?.notifications || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getNotifications(); }, []);

  return { notifications, setNotifications, loading };
};