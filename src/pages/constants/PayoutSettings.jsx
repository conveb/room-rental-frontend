import React, { useState } from "react";
import { ProvidersTab } from "./components/ProvidersTab";
import { CountryRulesTab } from "./components/CountryRulesTab";

export function PayoutSettings() {
  const [activeTab, setActiveTab] = useState("providers");

  return (
    <div className="space-y-6 w-full p-0 md:p-4">
       <div className="flex bg-white rounded-3xl p-2 gap-2 shadow-sm border border-gray-100">
      <button
        onClick={() => setActiveTab("providers")}
        className={`flex-1 py-3 rounded-2xl text-xs md:text-sm font-bold transition-all ${activeTab === "providers" ? "bg-black text-white shadow-md" : "text-gray-400 hover:bg-gray-50"
          }`}
      >
        Payment Providers
      </button>
      <button
        onClick={() => setActiveTab("other")}
        className={`flex-1 py-3 rounded-2xl text-xs md:text-sm font-bold transition-all ${activeTab === "other" ? "bg-black text-white shadow-md" : "text-gray-400 hover:bg-gray-50"
          }`}
      >
        Country Rules
      </button>
    </div>
      
      {activeTab === "providers" ? (
        <ProvidersTab />
      ) : (
        <CountryRulesTab />
      )}
    </div>
  );
}