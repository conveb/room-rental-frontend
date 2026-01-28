import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

const PayoutModal = ({ isOpen, onClose, onSubmit, initialValue}) => {
const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync with initialValue when editing
  useEffect(() => {
    if (isOpen) setIdentifier(initialValue);
  }, [isOpen, initialValue]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(identifier);
      onClose();
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Payout Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <IoClose size={24} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Account Identifier (IBAN)
              </label>
              <input
                autoFocus
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="FR76 0000 0000 0000..."
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-2xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-black/80 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all"
              >
                {loading ? "Saving..." : "Save Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PayoutModal;