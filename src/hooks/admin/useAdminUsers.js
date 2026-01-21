import { useEffect, useState, useCallback } from "react";
import { getAllUsersAPI } from "../../services/allAPI";

export function useAdminUsers(activeTab) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllUsersAPI();
      setUsers(res.data.users || []);
      console.log(res.data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "users" || activeTab === "overview") {
      fetchUsers();
    }
  }, [activeTab, fetchUsers]);

  return {
    users,
    loading,
    totalUsers: users.length,
    studentsCount: users.filter(u => u.role === "STUDENT").length,
    landOwnersCount: users.filter(u => u.role === "LAND_OWNER").length,
    refetchUsers: fetchUsers,
  };
}
