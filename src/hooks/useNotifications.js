import { useState, useEffect } from "react";
import { ListNotificationsApi } from "../services/allAPI";

export const useFetchNotifications = (isLoggedIn) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await ListNotificationsApi();
      setNotifications(res.data?.notifications || []);
    } catch (err) {
      console.error("Notification fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
    } else {
      setNotifications([]); // ✅ clear on logout
      setLoading(false);
    }
  }, [isLoggedIn]); // ✅ re-runs when auth state changes

  return { notifications, setNotifications, loading, fetchNotifications };
};