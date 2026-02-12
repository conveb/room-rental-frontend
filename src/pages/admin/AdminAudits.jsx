import React, { useEffect, useState } from "react";
import { useAuditLogs } from "../../hooks/admin/useAuditLogs";
import { HelmetProvider } from "react-helmet-async";

const TABS = [
  { key: "users", label: "User Audits" },
  { key: "properties", label: "Property Audits" },
  { key: "all", label: "All Logs" },
];

export default function AdminAuditPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { logs, loading, error } = useAuditLogs(activeTab);
  const [selectedLog, setSelectedLog] = useState(null); // For the Detail Modal

  const renderMetadataSummary = (log) => {
    const { metadata, entity_type } = log;
    if (!metadata) return <span className="text-gray-400 italic">No details</span>;

    switch (entity_type) {
      case "PROPERTY":
        return metadata.title || metadata.location;
      case "PROPERTY_IMAGE":
        return `Img: ${metadata.image}`;
      case "PROPERTY_AMENITY":
        return metadata.amenity;
      case "PROPERTY_INSTRUCTION":
        return metadata.instruction || metadata.category;
      case "PAYOUT_PROVIDER":
        return `${metadata.name || ""} (${metadata.code || ""})`;
      case "USER":
        return metadata.email || `Login: ${metadata.login_type}`;
      default:
        // Fallback: Find the first string value in the object
        const firstValue = Object.values(metadata).find((v) => typeof v === "string");
        return firstValue || "View Details";
    }
  };

  return (
    <>
      <HelmetProvider>
        <title>Admin Console | Audits</title>
      </HelmetProvider>

      <div className="min-h-screen md:px-8 py-3 md:py-6 text-xs md:text-sm bg-gray-50/50">
        <h1 className="text-2xl font-semibold mb-6">Audit Logs</h1>

        {/* ===== TABS ===== */}
        <div className="flex bg-white rounded-2xl p-2 gap-2 shadow-sm mb-6 border">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-xs md:text-sm rounded-xl font-medium transition ${
                activeTab === tab.key
                  ? "bg-black text-white shadow-md"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== CONTENT ===== */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          {loading && <div className="p-12 text-center text-gray-500 italic">Loading audit logs...</div>}
          {error && <div className="p-12 text-center text-red-500 font-bold">{error}</div>}
          {!loading && !error && logs.length === 0 && (
            <div className="p-12 text-center text-gray-500">No audit logs found</div>
          )}

          {!loading && logs.length > 0 && (
            <>
              {/* ===== MOBILE CARDS ===== */}
              <div className="space-y-4 md:hidden p-4">
                {logs.map((log) => (
                  <div 
                    key={log.id} 
                    onClick={() => setSelectedLog(log)}
                    className="border rounded-2xl p-4 shadow-sm bg-white active:scale-[0.98] transition-transform"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[10px] px-2 py-1 rounded-lg font-bold uppercase ${
                        log.action === 'DELETE' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {log.action}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(log.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 uppercase font-bold">Entity</p>
                      <p className="text-gray-900 font-medium">{log.entity_type.replace(/_/g, " ")}</p>
                      <p className="text-blue-600 text-xs italic">{renderMetadataSummary(log)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ===== DESKTOP TABLE ===== */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 border-b text-gray-500 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="px-6 py-4 text-left">Action</th>
                      <th className="px-6 py-4 text-left">Entity & Detail</th>
                      <th className="px-6 py-4 text-left">User</th>
                      <th className="px-6 py-4 text-left">System Info</th>
                      <th className="px-6 py-4 text-left">Timestamp</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {logs.map((log) => (
                      <tr 
                        key={log.id} 
                        onClick={() => setSelectedLog(log)}
                        className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase border ${
                            log.action === 'DELETE' ? 'bg-red-50 text-red-600 border-red-100' : 
                            log.action === 'CREATE' ? 'bg-green-50 text-green-600 border-green-100' :
                            'bg-blue-50 text-blue-600 border-blue-100'
                          }`}>
                            {log.action}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] text-gray-400 font-bold border shrink-0">
                               {log.metadata?.image ? "IMG" : log.entity_type.substring(0, 2)}
                            </div>
                            <div className="max-w-[180px]">
                              <div className="font-bold text-gray-700 uppercase text-[10px] leading-tight">
                                {log.entity_type.replace(/_/g, " ")}
                              </div>
                              <div className="text-xs text-blue-600 truncate font-medium mt-0.5">
                                {renderMetadataSummary(log)}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{log.user_email || "System"}</div>
                          <div className="text-[10px] text-gray-400 font-mono truncate max-w-[120px]">
                            {log.user || "Auto-Generated"}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-gray-700 font-mono text-[11px]">
                            {log.ip_address || "0.0.0.0"}
                          </div>
                          <div className="text-[10px] text-gray-400 truncate max-w-[150px]" title={log.user_agent}>
                            {log.user_agent || "No Agent"}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap text-xs">
                          {new Date(log.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ===== DETAIL MODAL (JSON INSPECTOR) ===== */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Log Details</h3>
                <p className="text-xs text-gray-500 font-mono">{selectedLog.id}</p>
              </div>
              <button 
                onClick={() => setSelectedLog(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-gray-500"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-xl border">
                   <p className="text-[10px] font-bold text-gray-400 uppercase">Action</p>
                   <p className="font-semibold">{selectedLog.action}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border">
                   <p className="text-[10px] font-bold text-gray-400 uppercase">Entity Type</p>
                   <p className="font-semibold">{selectedLog.entity_type}</p>
                </div>
              </div>

              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Raw Metadata (JSON)</p>
              <div className="bg-gray-900 rounded-2xl p-4 overflow-auto max-h-64 scrollbar-hide">
                <pre className="text-green-400 text-xs font-mono leading-relaxed">
                  {JSON.stringify(selectedLog.metadata, null, 2)}
                </pre>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t text-right">
              <button 
                onClick={() => setSelectedLog(null)}
                className="px-6 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}