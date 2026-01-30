// hooks/admin/useGroups.js
import { useState } from "react";
import { toast } from "sonner";

import {
    getAllGroupsApi,
    createGroupsApi,
    getGroupDetailsApi,
    updateGroupApi,
    deleteGroupApi

} from "../../../services/allAPI";

export const useGroups = () => {
    const [groups, setGroups] = useState([]);
    const [groupDetails, setGroupDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    // 1. Fetch all groups
    const fetchAllGroups = async () => {
        setLoading(true);
        try {
            const response = await getAllGroupsApi();
            if (response.status === 200) {
                setGroups(response.data);
            }
        } catch (err) {
            toast.error("Failed to fetch groups");
        } finally {
            setLoading(false);
        }
    };

    // 2. Fetch specific group details (Requested)
    const fetchGroupDetails = async (id) => {
        setLoading(true);
        try {
            const response = await getGroupDetailsApi(id);
            if (response.status === 200) {
                setGroupDetails(response.data);
                return response.data;
            }
        } catch (err) {
            toast.error("Failed to load group details");
        } finally {
            setLoading(false);
        }
    };

    // 3. Create Group
    const addGroup = async (data) => {
        setLoading(true);
        try {
            const response = await createGroupsApi(data);
            if (response.status === 201 || response.status === 200) {
                toast.success("Group created successfully");
                fetchAllGroups(); // Refresh list
                return { success: true };
            }
        } catch (err) {
            toast.error("Failed to create group");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // 4. Update Group
    const updateGroup = async (id, data) => {
        setLoading(true);
        try {
            const response = await updateGroupApi(id, data);
            if (response.status === 200) {
                toast.success("Group updated successfully");
                fetchAllGroups();
                return { success: true };
            }
        } catch (err) {
            toast.error("Update failed");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // 5. Delete Group
    const removeGroup = async (id) => {
        try {
            const response = await deleteGroupApi(id);
            if (response.status === 200 || response.status === 204) {
                toast.success("Group deleted");
                setGroups((prev) => prev.filter(g => g.id !== id));
                return { success: true };
            }
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    return {
        groups,
        groupDetails,
        loading,
        fetchAllGroups,
        fetchGroupDetails,
        addGroup,
        updateGroup,
        removeGroup,
        setGroupDetails // Useful for clearing state
    };
};