import React, { useEffect, useState } from "react";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function DateTimePicker({ label, value, onChange, minDate, maxDate }) {
  const [open, setOpen] = useState(false);
  const [pickerTab, setPickerTab] = useState("calendar");
  const [viewYear, setViewYear] = useState(() => (value || new Date()).getFullYear());
  const [viewMonth, setViewMonth] = useState(() => (value || new Date()).getMonth());
  const ref = React.useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open && value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
  }, [open]);

  const selectedHour   = value ? value.getHours()   : 0;
  const selectedMinute = value ? value.getMinutes() : 0;

  const setDate = (d) => {
    const next = value ? new Date(value) : new Date(d);
    next.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
    if (!value) next.setHours(0, 0, 0, 0);
    onChange(next);
    setOpen(false);
  };

  const setTime = (h, m) => {
    const next = value ? new Date(value) : new Date();
    next.setHours(h, m, 0, 0);
    onChange(next);
  };

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isSelected = (d) =>
    value &&
    value.getFullYear() === viewYear &&
    value.getMonth()    === viewMonth &&
    value.getDate()     === d;

  const isDisabled = (d) => {
    const cell = new Date(viewYear, viewMonth, d);
    if (minDate) { const m = new Date(minDate); m.setHours(0,0,0,0);       if (cell < m)  return true; }
    if (maxDate) { const mx = new Date(maxDate); mx.setHours(23,59,59,999); if (cell > mx) return true; }
    return false;
  };

  const today   = new Date();
  const isToday = (d) =>
    today.getFullYear() === viewYear &&
    today.getMonth()    === viewMonth &&
    today.getDate()     === d;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const displayValue = value
    ? `${MONTHS[value.getMonth()].slice(0,3)} ${value.getDate()}, ${value.getFullYear()}  ${String(value.getHours()).padStart(2,"0")}:${String(value.getMinutes()).padStart(2,"0")}`
    : "Pick date & time";

  return (
    <div ref={ref} className="relative">
      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">{label}</label>

      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center gap-2 px-3 py-2 border rounded-xl text-xs text-left transition
          ${open ? "border-black/30 ring-2 ring-black/10 bg-white" : "bg-gray-50 border-gray-200 hover:border-gray-400"}
          ${value ? "text-gray-800" : "text-gray-400"}`}
      >
        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="flex-1 font-mono">{displayValue}</span>
        {value && (
          <span
            role="button"
            onClick={(e) => { e.stopPropagation(); onChange(null); }}
            className="text-gray-300 hover:text-gray-600 transition-colors text-sm leading-none"
          >✕</span>
        )}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 left-0 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden w-72">
          {/* Tab bar */}
          <div className="flex border-b">
            {["calendar", "time"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setPickerTab(t)}
                className={`flex-1 py-2.5 text-[11px] font-semibold uppercase tracking-wide flex items-center justify-center gap-1.5 transition-colors
                  ${pickerTab === t ? "bg-black text-white" : "text-gray-500 hover:bg-gray-50"}`}
              >
                {t === "calendar" ? (
                  <>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    Date
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Time
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Calendar tab */}
          {pickerTab === "calendar" && (
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <span className="text-xs font-semibold text-gray-800">{MONTHS[viewMonth]} {viewYear}</span>
                <button type="button" onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 mb-1">
                {DAYS_OF_WEEK.map(d => (
                  <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-0.5">
                {cells.map((d, i) => (
                  <div key={i} className="flex items-center justify-center">
                    {d ? (
                      <button
                        type="button"
                        disabled={isDisabled(d)}
                        onClick={() => setDate(new Date(viewYear, viewMonth, d))}
                        className={`w-7 h-7 rounded-full text-[11px] font-medium transition-all
                          ${isSelected(d) ? "bg-black text-white" :
                            isToday(d)    ? "border border-black text-black hover:bg-gray-100" :
                                            "text-gray-700 hover:bg-gray-100"}
                          ${isDisabled(d) ? "opacity-25 cursor-not-allowed hover:bg-transparent" : ""}`}
                      >
                        {d}
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>

              {value && (
                <div className="mt-3 pt-3 border-t text-center">
                  <span className="text-[11px] text-gray-500 font-mono">
                    {MONTHS[value.getMonth()].slice(0,3)} {value.getDate()}, {value.getFullYear()}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Time tab */}
          {pickerTab === "time" && (
            <div className="p-3">
              <div className="flex gap-3 justify-center items-start">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">Hour</span>
                  <div className="h-44 overflow-y-auto scrollbar-hide flex flex-col gap-0.5 pr-1">
                    {Array.from({ length: 24 }, (_, h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setTime(h, selectedMinute)}
                        className={`w-10 h-8 rounded-lg text-xs font-mono font-medium transition-all
                          ${selectedHour === h ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        {String(h).padStart(2, "0")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xl font-bold text-gray-300 mt-10 select-none">:</div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">Min</span>
                  <div className="h-44 overflow-y-auto scrollbar-hide flex flex-col gap-0.5 pr-1">
                    {Array.from({ length: 60 }, (_, m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTime(selectedHour, m)}
                        className={`w-10 h-8 rounded-lg text-xs font-mono font-medium transition-all
                          ${selectedMinute === m ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        {String(m).padStart(2, "0")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t text-center">
                <span className="text-lg font-mono font-semibold text-gray-800 tracking-widest">
                  {String(selectedHour).padStart(2,"0")}:{String(selectedMinute).padStart(2,"0")}
                </span>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t px-3 py-2.5 flex justify-between items-center bg-gray-50">
            <span className="text-[10px] text-gray-400 font-mono">
              {value
                ? `${MONTHS[value.getMonth()].slice(0,3)} ${value.getDate()}  ${String(selectedHour).padStart(2,"0")}:${String(selectedMinute).padStart(2,"0")}`
                : "No selection"}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[11px] font-semibold bg-black text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}