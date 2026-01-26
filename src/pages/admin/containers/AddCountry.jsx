import React, { useState, useMemo } from "react";
import ReactCountryFlag from "react-country-flag";
import { countries as staticCountries } from "countries-list";
import Fuse from "fuse.js";
import { 
  MdDelete, MdSearch, MdPublicOff, 
  MdEdit, MdCheck, MdClose 
} from "react-icons/md";
import { useCountries } from "../../../hooks/admin/constants/useCountries";

export function AddCountries() {
  const { countries, addCountry, updateCountry, removeCountry, loading } = useCountries();
  const [inputName, setInputName] = useState("");
  
  // Local state for inline editing
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ currency: "", phone_code: "" });

  // 1. Prepare global dictionary for search logic
  const worldDictionary = useMemo(() => {
    return Object.entries(staticCountries).map(([code, info]) => ({
      name: info.name,
      code: code,
      currency: Array.isArray(info.currency) ? info.currency[0] : (info.currency?.split(',')[0] || ""), 
      phone_code: Array.isArray(info.phone) ? `+${info.phone[0]}` : `+${info.phone}`,
    }));
  }, []);

  const fuse = useMemo(() => new Fuse(worldDictionary, {
    keys: ["name"],
    threshold: 0.3, 
  }), [worldDictionary]);

  const handleAdd = async () => {
    const results = fuse.search(inputName);
    if (results.length === 0) return alert("Country not found");
    const found = results[0].item;

    if (countries.some((c) => c.code === found.code)) return alert("Already added");

    const success = await addCountry({ ...found, is_active: true });
    if (success) setInputName("");
  };

  const startEditing = (c) => {
    setEditingId(c.id);
    setEditForm({ currency: c.currency, phone_code: c.phone_code });
  };

  const saveEdit = async (id) => {
    await updateCountry(id, editForm);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">Admin Portfolio</h2>
        {loading && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
      </div>

      {/* SEARCH & ADD */}
      <div className="flex gap-2">
        <div className="relative flex-1 group">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            placeholder="Search global database to add..."
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="w-full border border-gray-200 pl-12 pr-4 py-3.5 rounded-2xl text-sm focus:border-blue-400 transition-all bg-white"
          />
        </div>
        <button onClick={handleAdd} className="bg-black text-white px-8 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg">
          Add
        </button>
      </div>

      <hr className="border-gray-100" />

      {/* DATABASE LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.length > 0 ? (
          countries.map((c) => (
            <div key={c.id} className="group relative bg-white border border-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="rounded-lg overflow-hidden shadow-sm border border-gray-50 shrink-0">
                  <ReactCountryFlag countryCode={c.code} svg style={{ width: "2.8em", height: "2em", objectFit: 'cover' }} />
                </div>

                <div className="flex-1 space-y-1">
                  <p className="text-sm font-bold text-gray-900">{c.name}</p>
                  
                  {editingId === c.id ? (
                    <div className="flex flex-col gap-2 pt-1">
                      <input 
                        className="text-[10px] border rounded px-1 w-20" 
                        value={editForm.currency} 
                        onChange={(e) => setEditForm({...editForm, currency: e.target.value})} 
                      />
                      <input 
                        className="text-[10px] border rounded px-1 w-20" 
                        value={editForm.phone_code} 
                        onChange={(e) => setEditForm({...editForm, phone_code: e.target.value})} 
                      />
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      {c.currency} | {c.phone_code}
                    </p>
                  )}
                </div>

                <div className="flex  gap-2">
                  {editingId === c.id ? (
                    <>
                      <button onClick={() => saveEdit(c.id)} className="text-green-500 hover:bg-green-50 p-1.5 rounded-full"><MdCheck size={18}/></button>
                      <button onClick={() => setEditingId(null)} className="text-gray-400 hover:bg-gray-50 p-1.5 rounded-full"><MdClose size={18}/></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(c)} className="text-gray-300 hover:text-blue-500 transition-colors"><MdEdit size={16}/></button>
                      <button onClick={() => removeCountry(c.id, c.name)} className="text-gray-300 hover:text-red-500 transition-colors"><MdDelete size={16}/></button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center border-2 border-dashed border-gray-100 rounded-[3rem]">
            <MdPublicOff size={48} className="text-gray-100 mb-4" />
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Database Empty</p>
          </div>
        )}
      </div>
    </div>
  );
}