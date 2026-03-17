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
      setNotifications([]);
      setLoading(false);
    }
  }, [isLoggedIn]);

  return { notifications, setNotifications, loading, fetchNotifications };
};