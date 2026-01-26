import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { MdDelete, MdEdit, MdAdd, MdSubject, MdDescription, MdClose } from "react-icons/md";
import { toast } from "sonner";

export default function PropertyInstructionManager({
    visible,
    onHide,
    instructions,
    onAdd,
    onUpdate,
    onDelete
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentInst, setCurrentInst] = useState({ category: "", instruction: "" });

    const resetForm = () => {
        setCurrentInst({ category: "", instruction: "" });
        setIsEditing(false);
    };

    const handleSubmit = async () => {
        if (!currentInst.category.trim() || !currentInst.instruction.trim()) {
            toast.error("Please fill in both fields");
            return;
        }

        setLoading(true);
        try {
            if (isEditing) {
                // Pass the specific ID and the new data
                await onUpdate(currentInst.id, currentInst);
            } else {
                await onAdd(currentInst);
            }
            resetForm();
        } catch (err) {
            // Error is handled by the hook's toast usually, but as a backup:
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this instruction?")) {
            try {
                await onDelete(id);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleEdit = (inst) => {
        setCurrentInst(inst); // Loads existing data (including ID) into form
        setIsEditing(true);
    };

    return (
        <Dialog
            header={isEditing ? "Edit Instruction" : "Add Instruction"}
            visible={visible}
            onHide={() => { resetForm(); onHide(); }}
            style={{ width: '95vw', maxWidth: '500px' }}
            className="text-sm font-sans"
        >
            <div className="space-y-6">
                {/* Input Form */}
                <div className={`p-4 rounded-2xl border transition-all ${isEditing ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                                <MdSubject /> Subject / Category
                            </label>
                            <input
                                type="text"
                                value={currentInst.category}
                                onChange={(e) => setCurrentInst({ ...currentInst, category: e.target.value })}
                                placeholder="e.g. WiFi Code"
                                className="w-full p-2.5 border rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                                <MdDescription /> Details
                            </label>
                            <textarea
                                value={currentInst.instruction}
                                onChange={(e) => setCurrentInst({ ...currentInst, instruction: e.target.value })}
                                placeholder="Enter details..."
                                className="w-full p-2.5 border rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-100"
                                rows={3}
                            />
                        </div>

                        <div className="flex gap-2">
                            {isEditing && (
                                <button
                                    onClick={resetForm}
                                    className="px-4 py-2.5 rounded-xl font-bold bg-white border border-gray-200 text-gray-500 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`flex-1 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isEditing ? "bg-blue-600 text-white" : "bg-black text-white"
                                    } disabled:opacity-50`}
                            >
                                {loading ? "Saving..." : isEditing ? "Update Instruction" : "Add Instruction"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* List Section */}
                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Saved Instructions</h3>
                    {instructions.map((inst) => (
                        <div key={inst.id} className="p-4 border border-gray-100 rounded-2xl bg-white shadow-sm group hover:border-blue-200 transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg">
                                    {inst.category}
                                </span>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => handleEdit(inst)} 
                                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                        title="Edit"
                                    >
                                        <MdEdit size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(inst.id)} 
                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                                        title="Delete"
                                    >
                                        <MdDelete size={16} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 whitespace-pre-wrap">{inst.instruction}</p>
                        </div>
                    ))}
                    {instructions.length === 0 && (
                        <p className="text-center py-10 text-gray-400 italic text-xs">No instructions added yet.</p>
                    )}
                </div>
            </div>
        </Dialog>
    );
}