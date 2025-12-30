import { useState } from "react";
import VerificationRequests from "./VerificationRequests";
import PropertyApprovals from "./PropertyApprovals";

export default function AdminRequests() {
  const [tab, setTab] = useState("verification");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Requests</h1>

      {/* Tabs */}
      <div className="flex bg-white rounded-3xl overflow-hidden w-full p-2 gap-2">
        {["verification", "properties"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 md:py-4 text-sm font-medium transition rounded-2xl shadow
              ${
                tab === t
                  ? "bg-black text-white"
                  : "bg-white text-gray-500 hover:bg-gray-200"
              }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "verification" && <VerificationRequests />}
      {tab === "properties" && <PropertyApprovals />}
    </div>
  );
}
