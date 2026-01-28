import React, { useState } from "react";
import { MdSearch, MdCreditCard, MdAccountBalance, MdEdit, MdCheck, MdClose, MdDelete } from "react-icons/md";
import { usePayoutProviders } from "../../../hooks/payout_providers/usePayoutProviders";

export function ProvidersTab() {
  const { providers, addProvider, updateProvider, removeProvider, loading, actionLoading } = usePayoutProviders();
  const [form, setForm] = useState({ name: "", code: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", code: "" });

  const handleAdd = async () => {
    if (!form.name.trim() || !form.code.trim()) {
      alert("Please fill both fields");
      return;
    }
    const success = await addProvider(form);
    if (success) setForm({ name: "", code: "" });
  };

  const startEditing = (p) => {
    setEditingId(p.id);
    setEditForm({ name: p.name, code: p.code });
  };

  const handleUpdate = async (id) => {
    if (!editForm.name.trim() || !editForm.code.trim()) {
      alert("Please fill both fields");
      return;
    }
    const success = await updateProvider(id, editForm);
    if (success) setEditingId(null);
  };

  const generateCode = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '_')     // Replace spaces with underscores
      .replace(/[^\w-]+/g, ''); // Remove special characters
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-400">Manage Methods</h2>
        {loading && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-1 group">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            placeholder="Provider Name (e.g., PayPal)"
            value={form.name}
            onChange={(e) => {
              const newName = e.target.value;
              setForm({
                ...form,
                name: newName,
                // Automatically generate the code as you type the name
                code: generateCode(newName)
              });
            }}
            className="w-full border border-gray-200 pl-12 pr-4 py-3.5 rounded-2xl text-sm focus:border-blue-400 transition-all bg-white outline-none"
          />
        </div>
        <input
          placeholder="Code"
          value={form.code}
          readOnly // This prevents manual typos
          className="w-full md:w-48 border border-gray-100 px-4 py-3.5 rounded-2xl text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
        />
        <button
          onClick={handleAdd}
          disabled={actionLoading}
          className="bg-black text-white px-8 py-3.5 rounded-2xl text-xs font-bold tracking-widest hover:bg-zinc-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {actionLoading ? "Adding..." : "Add"}
        </button>
      </div>

      <hr className="border-gray-100" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-12 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : providers.length > 0 ? (
          providers.map((p) => (
            <div key={p.id} className="group relative bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-50 shrink-0">
                  <img
                    src={`https://www.google.com/s2/favicons?sz=128&domain=${p.name.toLowerCase().replace(/\s/g, "")}.com`}
                    alt={p.name}
                    className="w-7 h-7 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.parentElement.querySelector('.fallback-icon');
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                  <div className="fallback-icon hidden text-gray-400">
                    {p.code.includes('bank') ? <MdAccountBalance size={22} /> : <MdCreditCard size={22} />}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  {editingId === p.id ? (
                    <div className="flex flex-col gap-1">
                      <input
                        className="text-sm border rounded px-2 py-1 w-full"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      />
                      <input
                        className="text-[10px] border rounded px-2 py-1 w-full"
                        value={editForm.code}
                        onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-gray-900 truncate">{p.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold tracking-tight">{p.code}</p>
                    </>
                  )}
                </div>

                <div className="flex gap-1">
                  {editingId === p.id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(p.id)}
                        disabled={actionLoading}
                        className="text-green-500 hover:bg-green-50 p-1.5 rounded-full disabled:opacity-50"
                      >
                        <MdCheck size={20} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-400 hover:bg-gray-50 p-1.5 rounded-full"
                      >
                        <MdClose size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(p)}
                        className="text-gray-300 hover:text-blue-500 p-1.5 hover:bg-gray-50 rounded-full"
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        onClick={() => removeProvider(p.id)}
                        disabled={actionLoading}
                        className="text-gray-300 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-full disabled:opacity-50"
                      >
                        <MdDelete size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center border-2 border-dashed border-gray-100 rounded-[2rem]">
            <p className="text-[10px] font-bold text-gray-400 tracking-widest">No Providers Found</p>
          </div>
        )}
      </div>
    </div>
  );
}