import { useEffect, useState } from "react";
import {
  getUserProfileAPI,
  updateUserProfileAPI,
  changeUserPasswordAPI,
  deleteUserProfileAPI,
} from "../../services/allAPI";
import { toast } from "sonner";

export const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await getUserProfileAPI();
      setUser(res.data);

    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (payload) => {
    try {
      setUpdating(true);

      // ✅ Double-check validation on the hook level too
      if (!payload.full_name || !payload.full_name.trim()) {
        toast.error('Full name is required');
        return { success: false, message: 'Full name is required' };
      }

      if (!payload.phone || !payload.phone.trim()) {
        toast.error('Phone number is required');
        return { success: false, message: 'Phone number is required' };
      }
      await updateUserProfileAPI(payload);

      // Always refetch source of truth
      await fetchUserProfile();

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message:
          err?.response?.data?.message || "Failed to update profile",
      };
    } finally {
      setUpdating(false);
    }
  };

  const changeUserPassword = async (payload) => {
    try {
      setChangingPassword(true);
      await changeUserPasswordAPI(payload);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message:
          err?.response?.data?.message || "Failed to change password",
      };
    } finally {
      setChangingPassword(false);
    }
  };

  const deleteUserProfile = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );
      if (!confirmed) return { success: false };

      await deleteUserProfileAPI();
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Failed to delete account",
      };
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return {
    user,
    setUser,
    loading,
    updating,
    changingPassword,
    error,
    refetch: fetchUserProfile,
    updateUserProfile,
    changeUserPassword,
    deleteUserProfile,
  };
};
