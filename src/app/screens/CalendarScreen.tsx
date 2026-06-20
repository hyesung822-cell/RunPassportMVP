import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RUN_HISTORY, RunRecord, formatDuration, formatPace } from "../data";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function getIntensity(km: number): string {
  if (km === 0) return "rgba(255,255,255,0)";
  if (km < 4)   return "rgba(212,166,61,0.25)";
  if (km < 7)   return "rgba(212,166,61,0.45)";
  if (km < 10)  return "rgba(212,166,61,0.65)";
  return "rgba(212,166,61,0.88)";
}

function getIntensityBorder(km: number): string {
  if (km === 0) return "rgba(255,255,255,0.05)";
  if (km < 4)   return "rgba(212,166,61,0.2)";
  if (km < 7)   return "rgba(212,166,61,0.35)";
  if (km < 10)  return "rgba(212,166,61,0.5)";
  return "rgba(212,166,61,0.7)";
}

export function CalendarScreen() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(5); // June = 5
  const [selectedDay, setSelectedDay] = useState<RunRecord | null>(null);

  const runMap: Record<string, RunRecord> = {};
  RUN_HISTORY.forEach((r) => { runMap[r.date] = r; });

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = { y: 2026, m: 5, d: 19 };

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  // pad to complete weeks
  while (cells.length % 7 !== 0) cells.push(null);

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  }

  function padded(n: number) { return String(n).padStart(2, "0"); }
  function dateKey(d: number) { return `${year}-${padded(month + 1)}-${padded(d)}`; }

  const monthTotal = Object.entries(runMap)
    .filter(([k]) => k.startsWith(`${year}-${padded(month + 1)}`))
    .reduce((sum, [, r]) => sum + r.distance, 0);
  const monthRuns = Object.entries(runMap)
    .filter(([k]) => k.startsWith(`${year}-${padded(month + 1)}`))
    .length;

  return (
    <div style={{ minHeight: "100dvh", background: "#0B1023", paddingBottom: 96 }}>
      {/* Header */}
      <div style={{ padding: "60px 22px 24px" }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 700, color: "#F0F2F8", letterSpacing: "-0.02em" }}>
          Calendar
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: "rgba(240,242,248,0.4)" }}>
          Your running history
        </p>
      </div>

      {/* Month stats */}
      <div style={{ padding: "0 22px 20px", display: "flex", gap: 10 }}>
        {[
          { label: "This Month", value: `${monthTotal.toFixed(1)} km` },
          { label: "Runs", value: `${monthRuns}` },
          { label: "Active Days", value: `${monthRuns}` },
        ].map((s) => (
          <div key={s.label} style={{
            flex: 1,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14,
            padding: "10px 10px",
            textAlign: "center",
          }}>
            <p style={{ margin: "0 0 3px", fontSize: 9, color: "rgba(240,242,248,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</p>
            <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 500, color: "#F0F2F8" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Calendar container */}
      <div style={{
        margin: "0 22px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 24,
        padding: "20px 16px",
      }}>
        {/* Month navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <button
            onClick={prevMonth}
            style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="rgba(240,242,248,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#F0F2F8" }}>{MONTHS[month]}</p>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(240,242,248,0.35)" }}>{year}</p>
          </div>
          <button
            onClick={nextMonth}
            style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l5 5-5 5" stroke="rgba(240,242,248,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Day labels */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
          {DAYS.map((d) => (
            <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 600, color: "rgba(240,242,248,0.25)", letterSpacing: "0.06em", padding: "0 0 6px" }}>
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
          {cells.map((day, idx) => {
            if (day === null) return <div key={`empty-${idx}`} />;
            const key = dateKey(day);
            const run = runMap[key];
            const km = run?.distance ?? 0;
            const isToday = year === today.y && month === today.m && day === today.d;
            const intensity = getIntensity(km);
            const border = getIntensityBorder(km);

            return (
              <motion.div
                key={key}
                whileTap={run ? { scale: 0.9 } : undefined}
                onClick={() => run && setSelectedDay(run)}
                style={{
                  aspectRatio: "1",
                  borderRadius: 10,
                  background: km > 0 ? intensity : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isToday ? "rgba(212,166,61,0.6)" : border}`,
                  cursor: run ? "pointer" : "default",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  position: "relative",
                  boxShadow: isToday ? "0 0 0 2px rgba(212,166,61,0.2)" : "none",
                }}
              >
                <span style={{
                  fontSize: 11,
                  fontWeight: isToday ? 700 : 400,
                  color: km > 0 ? (km >= 7 ? "#0B1023" : "#F0F2F8") : isToday ? "#D4A63D" : "rgba(240,242,248,0.35)",
                  lineHeight: 1,
                }}>
                  {day}
                </span>
                {km > 0 && (
                  <span style={{
                    fontSize: 7,
                    fontFamily: "var(--font-mono)",
                    color: km >= 7 ? "rgba(11,16,35,0.7)" : "rgba(240,242,248,0.6)",
                    lineHeight: 1,
                  }}>
                    {km.toFixed(1)}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16, justifyContent: "flex-end" }}>
          <span style={{ fontSize: 10, color: "rgba(240,242,248,0.25)" }}>Less</span>
          {[0, 0.25, 0.45, 0.65, 0.88].map((a) => (
            <div key={a} style={{ width: 10, height: 10, borderRadius: 3, background: a === 0 ? "rgba(255,255,255,0.04)" : `rgba(212,166,61,${a})`, border: "1px solid rgba(255,255,255,0.05)" }} />
          ))}
          <span style={{ fontSize: 10, color: "rgba(240,242,248,0.25)" }}>More</span>
        </div>
      </div>

      {/* Bottom sheet for run detail */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDay(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(11,16,35,0.7)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 390,
                background: "#131B2E",
                borderRadius: "24px 24px 0 0",
                padding: "28px 24px 48px",
                border: "1px solid rgba(255,255,255,0.07)",
                borderBottom: "none",
              }}
            >
              {/* Drag handle */}
              <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)", margin: "0 auto 24px" }} />

              <p style={{ margin: "0 0 6px", fontSize: 12, color: "rgba(240,242,248,0.4)", letterSpacing: "0.1em" }}>
                {new Date(selectedDay.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
              <h3 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 700, color: "#F0F2F8", letterSpacing: "-0.01em" }}>
                {selectedDay.title ?? "Run"}
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[
                  { label: "Distance", value: `${selectedDay.distance.toFixed(1)}`, unit: "km" },
                  { label: "Duration", value: formatDuration(selectedDay.duration), unit: "" },
                  { label: "Avg Pace", value: formatPace(selectedDay.avgPace), unit: "/km" },
                ].map((s) => (
                  <div key={s.label} style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 14,
                    padding: "14px 10px",
                    textAlign: "center",
                  }}>
                    <p style={{ margin: "0 0 5px", fontSize: 9, color: "rgba(240,242,248,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</p>
                    <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 500, color: "#F0F2F8", lineHeight: 1 }}>
                      {s.value}<span style={{ fontSize: 11, color: "rgba(240,242,248,0.4)" }}>{s.unit}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16, background: "rgba(212,166,61,0.07)", border: "1px solid rgba(212,166,61,0.18)", borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>🏅</span>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(240,242,248,0.6)", lineHeight: 1.4 }}>
                  This run contributed to your <span style={{ color: "#D4A63D", fontWeight: 600 }}>The Grinder</span> card.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
