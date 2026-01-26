import { useState, useCallback } from "react";

import { toast } from "sonner";
import { createPropInstructionApi, DeletePropInstructionApi, getPropInstructionApi, updatePropInstructionApi } from "../../services/allAPI";

export const usePropertyInstructions = (propertyId) => {
    const [instructions, setInstructions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchInstructions = useCallback(async () => {
        if (!propertyId) return;
        setLoading(true);
        try {
            const res = await getPropInstructionApi(propertyId);
            setInstructions(res.data || []);
        } catch (err) {
            if (err.response?.status === 429) {
                toast.error("Rate limit hit. Retrying in 5 seconds...");
            }
        } finally {
            setLoading(false);
        }
    }, [propertyId]);

    const addInstruction = async (data) => {
        try {
            // Ensure the data sent to the API includes the property ID
            const payload = { ...data, property: propertyId };
            const res = await createPropInstructionApi(propertyId, payload);

            // Backend might return the new object or the whole list. 
            // Assuming it returns the single new object:
            setInstructions((prev) => [...prev, res.data]);
            toast.success("Instruction added");
            return res.data;
        } catch (err) {
            console.error("Add Error:", err.response?.data); // Check console for DB errors
            toast.error("Failed to add instruction");
            throw err;
        }
    };

    const updateInstruction = async (instId, data) => { // Added instId here
        try {
            const res = await updatePropInstructionApi(propertyId, instId, data);
            setInstructions((prev) =>
                prev.map((inst) => (inst.id === instId ? res.data : inst))
            );
            toast.success("Instruction updated");
            return res.data;
        } catch (err) {
            console.error("Update Error:", err.response?.data);
            toast.error("Failed to update instruction");
            throw err;
        }
    };

    const deleteInstruction = async (instId) => {
        try {
            await DeletePropInstructionApi(propertyId, instId);
            setInstructions((prev) => prev.filter((inst) => inst.id !== instId));
            toast.success("Instruction deleted");
        } catch (err) {
            toast.error("Failed to delete instruction");
        }
    };  

    return {
        instructions,
        loading,
        fetchInstructions,
        addInstruction,
        updateInstruction,
        deleteInstruction
    };
};