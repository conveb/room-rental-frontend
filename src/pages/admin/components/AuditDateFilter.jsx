import React from "react";
import DateTimePicker from "./DateTimePicker";

const QUICK_RANGES = [
  { label: "Last 1h",  getValue: () => ({ from: subHours(new Date(), 1),  to: new Date() }) },
  { label: "Last 24h", getValue: () => ({ from: subHours(new Date(), 24), to: new Date() }) },
  { label: "Last 7d",  getValue: () => ({ from: subDays(new Date(), 7),   to: new Date() }) },
  { label: "Last 30d", getValue: () => ({ from: subDays(new Date(), 30),  to: new Date() }) },
  { label: "All time", getValue: () => ({ from: null, to: null }) },
];

function subHours(date, h) { return new Date(date.getTime() - h * 3600 * 1000); }
function subDays(date, d)  { return new Date(date.getTime() - d * 86400 * 1000); }

export default function AuditDateFilter({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  activeQuick,
  setActiveQuick,
  filterOpen,
  setFilterOpen,
}) {
  const hasActiveFilter = dateFrom !== null || dateTo !== null;

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

  return (
    <div className="bg-white rounded-2xl shadow-sm border mb-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
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
            onClick={() => setFilterOpen(v => !v)}
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

      {/* Quick range pills */}
      <div className="px-2 md:px-4 py-3 flex flex-wrap gap-2 items-center">
        {QUICK_RANGES.map((r) => (
          <button
            key={r.label}
            onClick={() => applyQuickRange(r)}
            className={`px-2.5 md:px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
              activeQuick === r.label
                ? "bg-black text-white border-black shadow-sm"
                : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            {r.label}
          </button>
        ))}
        {hasActiveFilter && (
          <span className="ml-auto text-[11px] text-gray-400 font-mono hidden md:block">
            {dateFrom ? new Date(dateFrom).toLocaleString() : "—"} → {dateTo ? new Date(dateTo).toLocaleString() : "now"}
          </span>
        )}
      </div>

      {/* Expandable custom pickers */}
      {filterOpen && (
        <div className="px-2 md:px-4 pb-4 border-t pt-3 grid grid-cols-2 gap-1 md:gap-4">
          <DateTimePicker
            label="From"
            value={dateFrom}
            maxDate={dateTo || new Date()}
            onChange={(d) => { setDateFrom(d); setActiveQuick(""); }}
          />
          <DateTimePicker
            label="To"
            value={dateTo}
            minDate={dateFrom}
            maxDate={new Date()}
            onChange={(d) => { setDateTo(d); setActiveQuick(""); }}
          />
        </div>
      )}
    </div>
  );
}