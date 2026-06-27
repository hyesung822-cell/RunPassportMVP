import { motion } from "motion/react";
import { RUN_HISTORY } from "../data";

interface Props {
  onBack: () => void;
}

const MONTH_STATS = {
  month: "June",
  year: 2026,
  totalKm: 84.3,
  totalRuns: 11,
  avgPace: "5:31",
  favoriteTime: "6 AM – 7 AM",
  longestRun: 12.1,
  bestPace: "4:58",
  mostEarnedCard: { name: "Iron Streak", icon: "🔗", rarity: "Rare" },
  activeDays: 11,
};

const REFLECTION =
  "You prefer quiet mornings and consistent movement. You don't run for speed — you run to show up for yourself.";

// Mini heatmap for the month
const MINI_RUNS: Record<number, number> = {
  2: 5.2, 4: 8.1, 5: 3.4, 7: 10.5,
  9: 6.8, 11: 5.0, 12: 7.3, 14: 12.1,
  16: 4.5, 17: 8.9, 19: 6.2,
};

function getHeat(km: number) {
  if (km === 0) return "rgba(255,255,255,0)";
  if (km < 5)   return "rgba(212,166,61,0.28)";
  if (km < 8)   return "rgba(212,166,61,0.52)";
  if (km < 11)  return "rgba(212,166,61,0.72)";
  return "rgba(212,166,61,0.9)";
}

function MiniCalendar() {
  // June 2026 — starts Monday (idx 1 in Sun-start grid)
  const firstDay = 1; // Monday
  const days = 30;
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, marginBottom: 4 }}>
        {["S","M","T","W","T","F","S"].map((d, i) => (
          <div key={i} style={{ textAlign: "center", fontSize: 8, color: "rgba(240,242,248,0.2)", fontWeight: 600 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
        {cells.map((day, idx) => {
          if (day === null) return <div key={`e${idx}`} />;
          const km = MINI_RUNS[day] ?? 0;
          const isToday = day === 19;
          return (
            <div
              key={day}
              style={{
                aspectRatio: "1",
                borderRadius: 5,
                background: km > 0 ? getHeat(km) : "rgba(255,255,255,0.03)",
                border: `1px solid ${isToday ? "rgba(212,166,61,0.5)" : "rgba(255,255,255,0.04)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 7, color: km > 0 ? (km >= 8 ? "#0B1023" : "rgba(240,242,248,0.6)") : "rgba(240,242,248,0.2)" }}>
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MonthlyReviewScreen({ onBack }: Props) {
  return (
    <div style={{ minHeight: "100dvh", background: "#0B1023", paddingBottom: 40 }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #0C1630 0%, #0B1023 100%)",
        padding: "56px 24px 28px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -60, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,166,61,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Back */}
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 20, padding: 0 }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9l5 5" stroke="rgba(240,242,248,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 13, color: "rgba(240,242,248,0.4)", fontFamily: "var(--font-sans)" }}>Back</span>
        </button>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* P1 badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(212,166,61,0.08)", border: "1px solid rgba(212,166,61,0.18)", borderRadius: 8, padding: "3px 10px", marginBottom: 12 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(212,166,61,0.6)", letterSpacing: "0.1em" }}>MONTHLY REVIEW · P1</span>
          </div>

          <h1 style={{
            margin: "0 0 4px",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 38,
            fontWeight: 400,
            color: "#F0F2F8",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}>
            {MONTH_STATS.month} {MONTH_STATS.year}
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "rgba(240,242,248,0.35)" }}>
            Your month in running
          </p>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Key numbers */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ background: "#131B2E", borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)", padding: "20px 18px" }}
        >
          <p style={{ margin: "0 0 16px", fontSize: 10, fontWeight: 700, color: "rgba(240,242,248,0.3)", letterSpacing: "0.12em" }}>
            THE NUMBERS
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { label: "Total Distance", value: `${MONTH_STATS.totalKm}`, unit: "km", accent: true },
              { label: "Runs",           value: `${MONTH_STATS.totalRuns}`,       unit: "sessions" },
              { label: "Avg Pace",       value: MONTH_STATS.avgPace,    unit: "/km" },
              { label: "Longest Run",    value: `${MONTH_STATS.longestRun}`,      unit: "km" },
            ].map((s, i) => (
              <div key={s.label}>
                <p style={{ margin: "0 0 3px", fontSize: 10, color: "rgba(240,242,248,0.3)", letterSpacing: "0.08em" }}>
                  {s.label.toUpperCase()}
                </p>
                <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: s.accent ? 28 : 22, fontWeight: 500, color: s.accent ? "#D4A63D" : "#F0F2F8", lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {s.value}
                  <span style={{ fontSize: 11, color: "rgba(240,242,248,0.35)", marginLeft: 3, fontFamily: "var(--font-sans)" }}>{s.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Calendar heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          style={{ background: "#131B2E", borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)", padding: "20px 18px" }}
        >
          <p style={{ margin: "0 0 14px", fontSize: 10, fontWeight: 700, color: "rgba(240,242,248,0.3)", letterSpacing: "0.12em" }}>
            RUNNING DAYS
          </p>
          <MiniCalendar />
        </motion.div>

        {/* Favorites */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          style={{ background: "#131B2E", borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)", padding: "20px 18px" }}
        >
          <p style={{ margin: "0 0 14px", fontSize: 10, fontWeight: 700, color: "rgba(240,242,248,0.3)", letterSpacing: "0.12em" }}>
            YOUR PATTERNS
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "rgba(240,242,248,0.5)" }}>Favorite running time</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#F0F2F8" }}>{MONTH_STATS.favoriteTime}</span>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "rgba(240,242,248,0.5)" }}>Best pace recorded</span>
              <span style={{ fontSize: 13, fontFamily: "var(--font-mono)", fontWeight: 600, color: "#D4A63D" }}>{MONTH_STATS.bestPace}/km</span>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "rgba(240,242,248,0.5)" }}>Most earned card</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span>{MONTH_STATS.mostEarnedCard.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#F0F2F8" }}>{MONTH_STATS.mostEarnedCard.name}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reflection — the most important section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          style={{
            background: "rgba(212,166,61,0.05)",
            border: "1px solid rgba(212,166,61,0.15)",
            borderRadius: 24,
            padding: "24px 20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 30%, rgba(212,166,61,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
          <p style={{ margin: "0 0 12px", fontSize: 10, fontWeight: 700, color: "rgba(212,166,61,0.5)", letterSpacing: "0.12em", position: "relative", zIndex: 1 }}>
            REFLECTION
          </p>
          <p style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 19,
            fontWeight: 400,
            color: "rgba(240,242,248,0.75)",
            lineHeight: 1.65,
            letterSpacing: "0.01em",
            position: "relative",
            zIndex: 1,
          }}>
            "{REFLECTION}"
          </p>
          <p style={{ margin: "14px 0 0", fontSize: 11, color: "rgba(240,242,248,0.22)", position: "relative", zIndex: 1 }}>
            — RunPassport · June 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
}
