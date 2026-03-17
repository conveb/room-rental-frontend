import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { useFetchNotifications } from "../hooks/useNotifications";
import { useUserProfile } from "../hooks/users/useUserProfile";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const { user: authUser } = useAuth();

  const { notifications, setNotifications, loading: notifLoading, fetchNotifications } =
    useFetchNotifications(Boolean(authUser));

  const {
    user,
    setUser,
    loading: profileLoading,
    error,
    updating,
    changingPassword,
    updateUserProfile,
    changeUserPassword,
    deleteUserProfile,
  } = useUserProfile();

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <HeaderContext.Provider
      value={{
        // Profile
        user,
        setUser,
        profileLoading,
        error,
        updating,
        changingPassword,
        updateUserProfile,
        changeUserPassword,
        deleteUserProfile,
        // Notifications
        notifications,
        setNotifications,
        unreadCount,
        notifLoading,
        fetchNotifications,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used inside <HeaderProvider>");
  }
  return context;
};