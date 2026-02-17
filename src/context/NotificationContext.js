import React, { createContext, useContext, useState, useEffect } from "react";
import { ListNotificationsApi } from "../services/allAPI";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await ListNotificationsApi();
      // Accessing res.data.notifications based on your API structure
      setNotifications(res.data?.notifications || []);
    } catch (err) {
      console.error("Notification Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Professional: Derived state. This updates automatically whenever notifications change.
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <NotificationContext.Provider 
      value={{ notifications, setNotifications, unreadCount, loading, fetchNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);