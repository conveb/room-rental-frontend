import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { MdDelete, MdAdd } from "react-icons/md";

export default function InstructionModal({ visible, onHide, rules, setRules }) {
  // Local state to hold rules while editing
  const [localRules, setLocalRules] = useState([]);
  const [newRule, setNewRule] = useState({ category: "House Rules", instruction: "", is_active: true });

  // Sync local state when the modal opens
  useEffect(() => {
    if (visible) {
      setLocalRules([...rules]);
    }
  }, [visible, rules]);

  const addRule = () => {
    if (!newRule.instruction.trim()) return;
    setLocalRules([...localRules, newRule]);
    setNewRule({ ...newRule, instruction: "" });
  };

  const removeRule = (index) => {
    setLocalRules(localRules.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setRules(localRules); // Update parent state ONCE
    onHide(); // Close modal
  };

  return (
    <Dialog 
      header="Manage House Rules & Instructions" 
      visible={visible} 
      onHide={onHide}
      style={{ width: '90vw', maxWidth: '500px' }}
      className="text-sm"
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2 bg-gray-50 p-3 rounded-lg border">
          <input 
            placeholder="Category" 
            value={newRule.category}
            onChange={(e) => setNewRule({...newRule, category: e.target.value})}
            className="p-2 border rounded-md text-xs"
          />
          <div className="flex gap-2">
            <input 
              placeholder="Instruction..." 
              value={newRule.instruction}
              onChange={(e) => setNewRule({...newRule, instruction: e.target.value})}
              className="flex-1 p-2 border rounded-md text-xs"
            />
            <Button type="button" icon={<MdAdd />} onClick={addRule} className="p-button-sm p-button-black" />
          </div>
        </div>

        <div className="max-h-60 overflow-y-auto space-y-2">
          {localRules.map((rule, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white border rounded-xl">
              <div>
                <p className="text-[10px] font-bold text-blue-500 uppercase">{rule.category}</p>
                <p className="text-sm text-gray-700">{rule.instruction}</p>
              </div>
              <button type="button" onClick={() => removeRule(index)} className="text-red-400"><MdDelete size={20} /></button>
            </div>
          ))}
        </div>

        <Button label="Save Changes" onClick={handleSave} className="w-full mt-4 p-button-sm" />
      </div>
    </Dialog>
  );
}