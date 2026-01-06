import React, { useState } from "react";
import { useAuditLogs } from "../../hooks/admin/useAuditLogs";
import { Helmet } from "react-helmet";

const TABS = [
  { key: "users", label: "User Audits" },
  { key: "properties", label: "Property Audits" },
  { key: "all", label: "All Logs" },
];

export default function AdminAuditPage() {
  const [activeTab, setActiveTab] = useState("users");
  const { logs, loading, error } = useAuditLogs(activeTab);

  return (
    <>
      <Helmet>
        <title>Admin Console | Audits</title>
        <meta name="description" content="This is the home page" />
        <meta name="keywords" content="react, seo, helmet" />
      </Helmet>
      <div className="min-h-screen  md:px-8 py-3 md:py-6 text-xs md:text-sm">
        <h1 className="text-2xl font-semibold mb-6">Audit Logs</h1>

        {/* ===== TABS ===== */}
        <div className="flex bg-white rounded-2xl p-2 gap-2 shadow mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-xs md:text-sm rounded-xl font-medium transition ${activeTab === tab.key
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== CONTENT ===== */}
        <div className="bg-white rounded-2xl shadow p-4 md:p-0">
          {loading && (
            <div className="p-6 text-center text-gray-500">
              Loading audit logs…
            </div>
          )}

          {error && (
            <div className="p-6 text-center text-red-500">{error}</div>
          )}

          {!loading && !error && logs.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No audit logs found
            </div>
          )}

          {!loading && logs.length > 0 && (
            <>
              {/* ===== MOBILE CARDS ===== */}
              <div className="space-y-4 md:hidden ">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="border rounded-2xl p-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600 font-medium">
                        {log.action}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(log.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-gray-400 text-xs">Reason</p>
                        <p className="text-gray-700">
                          {log.reason || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-xs">Target User</p>
                        <p className="font-medium">
                          {log.target_user_email}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {log.target_user}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-xs">Action By</p>
                        <p className="font-medium">
                          {log.action_by_email}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {log.action_by}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ===== DESKTOP TABLE ===== */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 text-left">Action</th>
                      <th className="px-4 py-3 text-left">Reason</th>
                      <th className="px-4 py-3 text-left">Target User</th>
                      <th className="px-4 py-3 text-left">Action By</th>
                      <th className="px-4 py-3 text-left">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {logs.map((log) => (
                      <tr
                        key={log.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                            {log.action}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-gray-600">
                          {log.reason || "-"}
                        </td>

                        <td className="px-4 py-3">
                          <div className="font-medium">
                            {log.target_user_email}
                          </div>
                          <div className="text-xs text-gray-400">
                            {log.target_user}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="font-medium">
                            {log.action_by_email}
                          </div>
                          <div className="text-xs text-gray-400">
                            {log.action_by}
                          </div>
                        </td>

                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
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
    </>
  );
}
