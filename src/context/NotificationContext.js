import React, { createContext, useContext, useState, useEffect } from "react";
import { ListNotificationsApi } from "../services/allAPI";
import { useAuth } from '../context/AuthContext'
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isLoggedIn = user;

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await ListNotificationsApi();
      setNotifications(res.data?.notifications || []);
    } catch (err) {
      console.error("Notification Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [isLoggedIn]);

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