import React, { useEffect, useState, useMemo } from "react";
import { useAuditLogs } from "../../hooks/admin/useAuditLogs";
import Title from "../../components/Title";

const TABS = [
  { key: "users", label: "User Audits" },
  { key: "properties", label: "Property Audits" },
  { key: "all", label: "All Logs" },
];

const QUICK_RANGES = [
  { label: "Last 1h",  getValue: () => ({ from: subHours(new Date(), 1),  to: new Date() }) },
  { label: "Last 24h", getValue: () => ({ from: subHours(new Date(), 24), to: new Date() }) },
  { label: "Last 7d",  getValue: () => ({ from: subDays(new Date(), 7),   to: new Date() }) },
  { label: "Last 30d", getValue: () => ({ from: subDays(new Date(), 30),  to: new Date() }) },
  { label: "All time", getValue: () => ({ from: null, to: null }) },
];

function subHours(date, h) {
  return new Date(date.getTime() - h * 3600 * 1000);
}
function subDays(date, d) {
  return new Date(date.getTime() - d * 86400 * 1000);
}
// Format a Date to datetime-local input value string
function toInputValue(date) {
  if (!date) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function AdminAuditPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { logs, loading, error } = useAuditLogs(activeTab);
  const [selectedLog, setSelectedLog] = useState(null);

  // ─── Date filter state ───────────────────────────────────────────────
  const [dateFrom, setDateFrom] = useState(null);   // Date | null
  const [dateTo, setDateTo]     = useState(null);   // Date | null
  const [activeQuick, setActiveQuick] = useState("All time");
  const [filterOpen, setFilterOpen] = useState(false);

  const applyQuickRange = (range) => {
    const { from, to } = range.getValue();
    setDateFrom(from);
    setDateTo(to);
    setActiveQuick(range.label);
  };

  const clearFilter = () => {
    setDateFrom(null);
    setDateTo(null);
    setActiveQuick("All time");
  };

  const hasActiveFilter = dateFrom !== null || dateTo !== null;

  // ─── Pagination state ────────────────────────────────────────────────
  const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
  const [pageSize, setPageSize]   = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  // ─── Filtered logs ───────────────────────────────────────────────────
  const filteredLogs = useMemo(() => {
    if (!dateFrom && !dateTo) return logs;
    return logs.filter((log) => {
      const ts = new Date(log.created_at).getTime();
      if (dateFrom && ts < dateFrom.getTime()) return false;
      if (dateTo   && ts > dateTo.getTime())   return false;
      return true;
    });
  }, [logs, dateFrom, dateTo]);

  // Reset to page 1 whenever filters or tab change
  useEffect(() => { setCurrentPage(1); }, [activeTab, dateFrom, dateTo, pageSize]);

  const totalPages  = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
  const pagedLogs   = filteredLogs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Page window: show up to 5 page numbers centred on current page
  const pageWindow = useMemo(() => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) range.push(i);
    return range;
  }, [currentPage, totalPages]);

  const renderMetadataSummary = (log) => {
    const { metadata, entity_type } = log;
    if (!metadata) return <span className="text-gray-400 italic">No details</span>;

    switch (entity_type) {
      case "PROPERTY":       return metadata.title || metadata.location;
      case "PROPERTY_IMAGE": return `Img: ${metadata.image}`;
      case "PROPERTY_AMENITY": return metadata.amenity;
      case "PROPERTY_INSTRUCTION": return metadata.instruction || metadata.category;
      case "PAYOUT_PROVIDER": return `${metadata.name || ""} (${metadata.code || ""})`;
      case "USER": return metadata.email || `Login: ${metadata.login_type}`;
      default:
        const firstValue = Object.values(metadata).find((v) => typeof v === "string");
        return firstValue || "View Details";
    }
  };

  return (
    <>
      <Title><title>Admin Console | Audits</title></Title>

      <div className="min-h-screen md:px-8 py-3 md:py-6 text-xs md:text-sm bg-gray-50/50">
        <h1 className="text-2xl font-semibold mb-6">Audit Logs</h1>

        {/* ===== TABS ===== */}
        <div className="flex bg-white rounded-2xl p-2 gap-2 shadow-sm mb-4 border">
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

        {/* ===== DATE / TIME FILTER BAR ===== */}
        <div className="bg-white rounded-2xl shadow-sm border mb-6 overflow-hidden">
          {/* Header row */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              {/* Calendar icon */}
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Date & Time Filter
              </span>
              {hasActiveFilter && (
                <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full uppercase">
                  Active
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilter && (
                <button
                  onClick={clearFilter}
                  className="text-[11px] text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setFilterOpen((v) => !v)}
                className="text-[11px] text-gray-500 hover:text-gray-800 font-medium flex items-center gap-1 transition-colors"
              >
                {filterOpen ? "Hide" : "Expand"}
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Always-visible quick range pills */}
          <div className="px-4 py-3 flex flex-wrap gap-2 items-center">
            {QUICK_RANGES.map((r) => (
              <button
                key={r.label}
                onClick={() => applyQuickRange(r)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                  activeQuick === r.label
                    ? "bg-black text-white border-black shadow-sm"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {r.label}
              </button>
            ))}

            {/* Summary label when a filter is active */}
            {hasActiveFilter && (
              <span className="ml-auto text-[11px] text-gray-400 font-mono hidden md:block">
                {dateFrom ? new Date(dateFrom).toLocaleString() : "—"} → {dateTo ? new Date(dateTo).toLocaleString() : "now"}
              </span>
            )}
          </div>

          {/* Expandable custom range pickers */}
          {filterOpen && (
            <div className="px-4 pb-4 border-t pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From */}
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">
                  From
                </label>
                <input
                  type="datetime-local"
                  value={toInputValue(dateFrom)}
                  max={toInputValue(dateTo || new Date())}
                  onChange={(e) => {
                    setDateFrom(e.target.value ? new Date(e.target.value) : null);
                    setActiveQuick("");
                  }}
                  className="w-full px-3 py-2 border rounded-xl text-xs text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/30 transition"
                />
              </div>

              {/* To */}
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">
                  To
                </label>
                <input
                  type="datetime-local"
                  value={toInputValue(dateTo)}
                  min={toInputValue(dateFrom)}
                  max={toInputValue(new Date())}
                  onChange={(e) => {
                    setDateTo(e.target.value ? new Date(e.target.value) : null);
                    setActiveQuick("");
                  }}
                  className="w-full px-3 py-2 border rounded-xl text-xs text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/30 transition"
                />
              </div>
            </div>
          )}
        </div>

        {/* ===== RESULTS COUNT + PAGE SIZE ===== */}
        {!loading && !error && (
          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-xs text-gray-400">
              {filteredLogs.length === 0 ? (
                "No logs"
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-gray-700">
                    {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredLogs.length)}
                  </span>{" "}
                  of <span className="font-semibold text-gray-700">{filteredLogs.length}</span>
                  {hasActiveFilter && (
                    <> (filtered from <span className="font-semibold text-gray-700">{logs.length}</span>)</>
                  )}
                </>
              )}
            </p>
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Rows</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="text-xs border rounded-lg px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black/10"
              >
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ===== CONTENT ===== */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          {loading && <div className="p-12 text-center text-gray-500 italic">Loading audit logs...</div>}
          {error   && <div className="p-12 text-center text-red-500 font-bold">{error}</div>}
          {!loading && !error && filteredLogs.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              {hasActiveFilter ? "No logs found for the selected time range." : "No audit logs found"}
            </div>
          )}

          {!loading && pagedLogs.length > 0 && (
            <>
              {/* ===== MOBILE CARDS ===== */}
              <div className="space-y-4 md:hidden p-4">
                {pagedLogs.map((log) => (
                  <div
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className="border rounded-2xl p-4 shadow-sm bg-white active:scale-[0.98] transition-transform"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[10px] px-2 py-1 rounded-lg font-bold uppercase ${
                        log.action === "DELETE" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
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
                    {pagedLogs.map((log) => (
                      <tr
                        key={log.id}
                        onClick={() => setSelectedLog(log)}
                        className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase border ${
                            log.action === "DELETE" ? "bg-red-50 text-red-600 border-red-100" :
                            log.action === "CREATE" ? "bg-green-50 text-green-600 border-green-100" :
                            "bg-blue-50 text-blue-600 border-blue-100"
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
                          <div className="text-gray-700 font-mono text-[11px]">{log.ip_address || "0.0.0.0"}</div>
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

              {/* ===== PAGINATION FOOTER ===== */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50/60">
                  {/* Prev */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-white hover:enabled:shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Prev
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {pageWindow[0] > 1 && (
                      <>
                        <button onClick={() => setCurrentPage(1)} className="w-8 h-8 rounded-lg text-xs font-medium hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-200">1</button>
                        {pageWindow[0] > 2 && <span className="text-gray-300 text-xs px-1">···</span>}
                      </>
                    )}
                    {pageWindow.map((p) => (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                          p === currentPage
                            ? "bg-black text-white shadow-sm"
                            : "hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 text-gray-600"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    {pageWindow[pageWindow.length - 1] < totalPages && (
                      <>
                        {pageWindow[pageWindow.length - 1] < totalPages - 1 && <span className="text-gray-300 text-xs px-1">···</span>}
                        <button onClick={() => setCurrentPage(totalPages)} className="w-8 h-8 rounded-lg text-xs font-medium hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-200">{totalPages}</button>
                      </>
                    )}
                  </div>

                  {/* Next */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-white hover:enabled:shadow-sm"
                  >
                    Next
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ===== DETAIL MODAL ===== */}
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