import React, { useState } from "react";
import { MdAdd, MdEdit, MdCheck, MdClose, MdDelete, MdLanguage, MdCreditCard, MdAccountBalance } from "react-icons/md";
import { usePayoutProviders } from "../../../hooks/payout_providers/usePayoutProviders";
import { useCountryPayoutProviders } from "../../../hooks/payout_providers/useCountryPayoutProviders";
import { useCountries } from "../../../hooks/admin/constants/useCountries";

export function CountryRulesTab() {
  const { providers } = usePayoutProviders();
  const { countries = [], loading: countriesLoading } = useCountries();
  const {
    countryProviders,
    addCountryProvider,
    updateCountryProvider,
    removeCountryProvider,
    fetchLinkDetails,
    loading: cpLoading,
    actionLoading: cpAction
  } = useCountryPayoutProviders();

  const [newLink, setNewLink] = useState({ country: "", provider: "" });
  const [cpEditingId, setCpEditingId] = useState(null);
  const [cpEditForm, setCpEditForm] = useState({ country: "", provider: "" });

  const handleAddMapping = async () => {
    if (!newLink.country || !newLink.provider) {
      alert("Select both country and provider");
      return;
    }
    const success = await addCountryProvider(newLink);
    if (success) setNewLink({ country: "", provider: "" });
  };

  const handleStartCpEdit = async (id) => {
    setCpEditingId(id);
    const data = await fetchLinkDetails(id);
    if (data) {
      setCpEditForm({
        country: data.country_id || data.country,
        provider: data.provider_id || data.provider
      });
    }
  };

  const handleSaveCpUpdate = async (id) => {
    if (!cpEditForm.country || !cpEditForm.provider) {
      alert("Select both country and provider");
      return;
    }
    const success = await updateCountryProvider(id, cpEditForm);
    if (success) setCpEditingId(null);
  };

  // Get country name by ID
  const getCountryName = (countryId) => {
    const country = countries.find(c => c.id === countryId);
    return country ? country.name : "Unknown";
  };

  // Get provider name by ID
  const getProviderName = (providerId) => {
    const provider = providers.find(p => p.id === providerId);
    return provider ? provider.name : "Unknown";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* ADD MAPPING BAR */}
      <div className="flex flex-row gap-3 bg-white p-2 md:p-5 rounded-2xl border border-gray-100 shadow-sm">
        <select
          className="flex-1 bg-gray-50 border-none rounded-2xl px-2 py-2 md:px-5 md:py-4 text-xs md:text-sm font-bold outline-none ring-1 ring-gray-100 focus:ring-black transition-all appearance-none disabled:opacity-50"
          value={newLink.country}
          onChange={(e) => setNewLink({ ...newLink, country: e.target.value })}
          disabled={countriesLoading}
        >
          <option value="">Select Country</option>
          {countries?.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          className="flex-1 bg-gray-50 border-none rounded-2xl px-2 py-2 md:px-5 md:py-4 text-xs md:text-sm font-bold outline-none ring-1 ring-gray-100 focus:ring-black transition-all appearance-none"
          value={newLink.provider}
          onChange={(e) => setNewLink({ ...newLink, provider: e.target.value })}
        >
          <option value="">Select Provider</option>
          {providers?.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <button
          onClick={handleAddMapping}
          disabled={cpAction || !newLink.country || !newLink.provider}
          className="bg-black text-white px-3 py-2 md:px-10 md:py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center md:gap-2"
        >
          <MdAdd size={18} /> {cpAction ? "Linking.." : "Link Rule"}
        </button>
      </div>

      {/* LIST OF RULES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cpLoading ? (
          <div className="py-12 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : countryProviders.length > 0 ? (
          countryProviders.map((cp) => {
            const provider = providers?.find(p => p.id === (cp.provider_id || cp.provider));
            const country = countries?.find(c => c.id === (cp.country_id || cp.country));

            return (
              <div key={cp.id} className="group bg-white border border-gray-50 p-4 rounded-2xl flex items-center justify-between hover:border-gray-200 transition-all shadow-sm">
                {cpEditingId === cp.id ? (
                  <div className="flex gap-3 flex-1 mr-6 animate-in fade-in zoom-in-95">
                    <select
                      className="flex-1 text-xs  bg-gray-50 rounded-xl p-3 outline-none ring-1 ring-gray-200"
                      value={cpEditForm.country}
                      onChange={(e) => setCpEditForm({ ...cpEditForm, country: e.target.value })}
                    >
                      <option value="">Select Country</option>
                      {countries?.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <select
                      className="flex-1 text-xs  bg-gray-50 rounded-xl p-3 outline-none ring-1 ring-gray-200"
                      value={cpEditForm.provider}
                      onChange={(e) => setCpEditForm({ ...cpEditForm, provider: e.target.value })}
                    >
                      <option value="">Select Provider</option>
                      {providers?.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex flex-1 gap-12">
                    {/* COUNTRY SECTION */}
                    <div className="">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Region</span>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-50 shrink-0">
                          <MdLanguage size={20} className="text-emerald-500" />
                        </div>
                        <div className="flex ">
                          <div className="text-sm md:text-lg font-bold text-gray-900">
                            {country?.name || getCountryName(cp.country_id || cp.country)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PROVIDER SECTION WITH LOGO */}
                    <div className="">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Provider</span>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-50 shrink-0">
                          {provider ? (
                            <>
                              <img
                                src={`https://www.google.com/s2/favicons?sz=128&domain=${provider.name.toLowerCase().replace(/\s/g, "")}.com`}
                                alt={provider.name}
                                className="w-6 h-6 object-contain rounded-md"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  const fallback = e.target.parentElement.querySelector('.provider-fallback-icon');
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                              <div className="provider-fallback-icon hidden items-center justify-center text-gray-400">
                                {provider.code.includes('bank') ? <MdAccountBalance size={20} /> : <MdCreditCard size={20} />}
                              </div>
                            </>
                          ) : (
                            <MdCreditCard size={20} className="text-gray-400" />
                          )}
                        </div>
                        <div className="text-sm md:text-lg font-bold text-gray-900">
                          {provider?.name || getProviderName(cp.provider_id || cp.provider)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 pr-2">
                  {cpEditingId === cp.id ? (
                    <>
                      <button
                        onClick={() => handleSaveCpUpdate(cp.id)}
                        disabled={cpAction}
                        className="p-3 bg-black text-white rounded-full hover:bg-zinc-800 disabled:opacity-50"
                      >
                        <MdCheck size={20} />
                      </button>
                      <button
                        onClick={() => setCpEditingId(null)}
                        className="p-3 bg-gray-100 text-gray-400 rounded-full hover:bg-gray-200"
                      >
                        <MdClose size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleStartCpEdit(cp.id)}
                        className="p-3 text-gray-300 hover:text-black hover:bg-gray-50 rounded-full transition-all"
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        onClick={() => removeCountryProvider(cp.id)}
                        disabled={cpAction}
                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all disabled:opacity-50"
                      >
                        <MdDelete size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 flex flex-col items-center border-2 border-dashed border-gray-100 rounded-[2rem]">
            <p className="text-[10px] font-bold text-gray-400 tracking-widest">No Country Rules Found</p>
            <p className="text-[9px] text-gray-300 mt-2">Add your first rule above</p>
          </div>
        )}
      </div>
    </div>
  );
}