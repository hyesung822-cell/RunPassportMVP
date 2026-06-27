import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { rarityConfig, CARDS, IDENTITIES, formatDuration } from "../data";

// ─── Run data for this session ────────────────────────────────────────────────
const RUN = {
  date: "Thursday, June 19, 2026",
  time: "6:14 AM",
  title: "Morning Run",
  distance: 8.42,
  duration: 2847,      // 47m 27s
  avgPace: 338,        // 5:38 /km
  calories: 612,
  steps: 9840,
  cadence: 172,        // spm
  elevation: 48,       // m gained
  temperature: 21,     // °C
  humidity: 68,        // %
  wind: 12,            // km/h
  windDir: "NE",
};

const SPLITS = [
  { km: 1, time: "5:32", pace: "5:32" },
  { km: 2, time: "5:28", pace: "5:28" },
  { km: 3, time: "5:41", pace: "5:41" },
  { km: 4, time: "5:35", pace: "5:35" },
  { km: 5, time: "5:44", pace: "5:44" },
  { km: 6, time: "5:30", pace: "5:30" },
  { km: 7, time: "5:22", pace: "5:22" },
  { km: 8, time: "5:19", pace: "5:19" },
  { km: 8.42, time: "2:27", pace: "5:49", isPartial: true },
];

const BEST_PACE_KM = 7; // km 7 had the best pace

// The newly unlocked card
const UNLOCKED_CARD = CARDS.find((c) => c.id === "c08")!;
const cardCfg = rarityConfig[UNLOCKED_CARD.rarity];

// Identity being progressed
const PROGRESSED_IDENTITY = IDENTITIES.find((i) => i.id === "i3")!;
const identCfg = rarityConfig[PROGRESSED_IDENTITY.rarity];

// Required cards for that identity
const REQUIRED_CARD_IDS = ["c07", "c04"];
const REQUIRED_CARDS = CARDS.filter((c) => REQUIRED_CARD_IDS.includes(c.id));

// ─── Helpers ──────────────────────────────────────────────────────────────────
function paceToSeconds(pace: string): number {
  const [m, s] = pace.split(":").map(Number);
  return m * 60 + s;
}

const BEST = paceToSeconds("5:19");
const WORST = paceToSeconds("5:49");

function paceBar(pace: string, isPartial?: boolean): number {
  if (isPartial) return 0.4;
  const s = paceToSeconds(pace);
  return 1 - (s - BEST) / (WORST - BEST + 1);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "#131B2E",
      borderRadius: 28,
      border: "1px solid rgba(255,255,255,0.07)",
      overflow: "hidden",
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      margin: "0 0 14px",
      fontSize: 11,
      fontWeight: 700,
      color: "rgba(240,242,248,0.35)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      fontFamily: "var(--font-sans)",
    }}>
      {children}
    </p>
  );
}

// ─── 1. Hero Header ───────────────────────────────────────────────────────────

function HeroHeader() {
  return (
    <div style={{
      background: "linear-gradient(180deg, #0C1528 0%, #0B1023 100%)",
      padding: "56px 22px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        pointerEvents: "none",
      }} />
      {/* Warm ambient glow */}
      <div style={{
        position: "absolute", top: -80, right: -60,
        width: 260, height: 260, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,166,61,0.09) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Back row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, position: "relative", zIndex: 1 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.09)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="rgba(240,242,248,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "rgba(240,242,248,0.55)" }}>
            {RUN.title}
          </p>
          <p style={{ margin: 0, fontSize: 11, color: "rgba(240,242,248,0.3)" }}>
            {RUN.date} · {RUN.time}
          </p>
        </div>
      </div>

      {/* Hero distance */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: 24 }}>
        <p style={{ margin: "0 0 2px", fontSize: 11, color: "rgba(240,242,248,0.35)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Total Distance
        </p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, lineHeight: 1 }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 72,
            fontWeight: 500,
            color: "#F0F2F8",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}>
            {RUN.distance.toFixed(2)}
          </span>
          <span style={{ fontSize: 22, color: "rgba(240,242,248,0.4)", marginBottom: 10 }}>km</span>
        </div>
      </div>

      {/* Duration + Pace row */}
      <div style={{ display: "flex", gap: 0, position: "relative", zIndex: 1 }}>
        {[
          { label: "Duration", value: formatDuration(RUN.duration) },
          { label: "Avg Pace", value: `${Math.floor(RUN.avgPace / 60)}:${String(RUN.avgPace % 60).padStart(2, "0")}`, unit: "/km" },
        ].map((s, i) => (
          <div key={s.label} style={{
            flex: 1,
            paddingRight: i === 0 ? 16 : 0,
            paddingLeft: i === 1 ? 16 : 0,
            borderRight: i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}>
            <p style={{ margin: "0 0 3px", fontSize: 10, color: "rgba(240,242,248,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {s.label}
            </p>
            <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 500, color: "#F0F2F8", lineHeight: 1, letterSpacing: "-0.02em" }}>
              {s.value}
              {s.unit && <span style={{ fontSize: 13, color: "rgba(240,242,248,0.4)", marginLeft: 2 }}>{s.unit}</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 2. Workout Metrics ───────────────────────────────────────────────────────

const metrics = [
  { icon: "🔥", label: "Calories", value: "612", unit: "kcal", color: "#E8694A" },
  { icon: "👟", label: "Steps",    value: "9,840", unit: "steps", color: "#5090E0" },
  { icon: "🔄", label: "Cadence",  value: "172", unit: "spm",   color: "#A060E8" },
  { icon: "⛰️", label: "Elevation", value: "+48", unit: "m",   color: "#2EC87A" },
];

function WorkoutMetrics() {
  return (
    <Card>
      <div style={{ padding: "22px 20px" }}>
        <SectionLabel>Workout Metrics</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 18,
                padding: "14px 14px 12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: `${m.color}18`,
                  border: `1px solid ${m.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 15,
                }}>
                  {m.icon}
                </div>
                <p style={{ margin: 0, fontSize: 11, color: "rgba(240,242,248,0.4)", fontWeight: 500 }}>{m.label}</p>
              </div>
              <p style={{
                margin: 0,
                fontFamily: "var(--font-mono)",
                fontSize: 24,
                fontWeight: 500,
                color: "#F0F2F8",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}>
                {m.value}
                <span style={{ fontSize: 11, color: "rgba(240,242,248,0.35)", marginLeft: 3, fontFamily: "var(--font-sans)" }}>{m.unit}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── 3. Route Map ─────────────────────────────────────────────────────────────

function RouteMap() {
  // SVG path approximating an 8.4 km run loop
  const path = "M 60 200 C 60 160 80 120 120 100 C 160 80 220 70 270 90 C 320 110 350 150 360 190 C 370 230 360 270 340 290 C 310 320 270 330 230 320 C 180 308 150 280 130 250 C 100 210 80 220 60 200 Z";
  const startPt = { x: 60, y: 200 };
  const endPt   = { x: 62, y: 198 };

  return (
    <Card style={{ overflow: "hidden" }}>
      <div style={{ position: "relative" }}>
        {/* Satellite-style map */}
        <div style={{
          height: 220,
          background: "linear-gradient(160deg, #0D1F0E 0%, #142818 30%, #0E1C10 60%, #121A0F 100%)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Terrain texture layers */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 30% 40%, rgba(30,80,20,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(15,50,15,0.3) 0%, transparent 50%)", pointerEvents: "none" }} />
          {/* Block pattern imitating satellite streets */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }} viewBox="0 0 420 220" preserveAspectRatio="xMidYMid slice">
            <line x1="100" y1="0" x2="100" y2="220" stroke="#4A6A3A" strokeWidth="6" />
            <line x1="200" y1="0" x2="200" y2="220" stroke="#4A6A3A" strokeWidth="4" />
            <line x1="300" y1="0" x2="300" y2="220" stroke="#3A5A2A" strokeWidth="6" />
            <line x1="0" y1="80" x2="420" y2="80" stroke="#4A6A3A" strokeWidth="5" />
            <line x1="0" y1="150" x2="420" y2="150" stroke="#3A5A2A" strokeWidth="4" />
            <rect x="108" y="88" width="84" height="54" fill="#1E3A18" />
            <rect x="208" y="88" width="84" height="54" fill="#162E12" />
            <rect x="108" y="8" width="84" height="64" fill="#182E14" />
            <rect x="308" y="88" width="104" height="54" fill="#1A3216" />
            <rect x="108" y="158" width="84" height="54" fill="#1A3216" />
            <rect x="208" y="158" width="84" height="54" fill="#162C10" />
          </svg>

          {/* Run route SVG */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 420 360" preserveAspectRatio="xMidYMid slice">
            {/* Route shadow */}
            <path d={path} fill="none" stroke="rgba(212,166,61,0.25)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            {/* Route line */}
            <path d={path} fill="none" stroke="#D4A63D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="8 0" />
            {/* Directional arrows along path (chevrons) */}
            <path d="M 195 78 L 205 72 L 215 78" fill="none" stroke="rgba(212,166,61,0.7)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 345 215 L 352 225 L 345 235" fill="none" stroke="rgba(212,166,61,0.7)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 115 285 L 105 275 L 115 265" fill="none" stroke="rgba(212,166,61,0.7)" strokeWidth="2.5" strokeLinecap="round" />

            {/* Start marker */}
            <circle cx={startPt.x} cy={startPt.y} r="12" fill="#2EC87A" />
            <circle cx={startPt.x} cy={startPt.y} r="6" fill="#F0F2F8" />
            <circle cx={startPt.x} cy={startPt.y} r="18" fill="none" stroke="rgba(46,200,122,0.3)" strokeWidth="3" />

            {/* Finish marker */}
            <circle cx={endPt.x} cy={endPt.y} r="12" fill="#D4A63D" />
            <circle cx={endPt.x} cy={endPt.y} r="6" fill="#0B1023" />
            <circle cx={endPt.x} cy={endPt.y} r="18" fill="none" stroke="rgba(212,166,61,0.3)" strokeWidth="3" />
          </svg>

          {/* Legend */}
          <div style={{
            position: "absolute", bottom: 12, right: 14,
            display: "flex", flexDirection: "column", gap: 5,
          }}>
            {[
              { color: "#2EC87A", label: "Start" },
              { color: "#D4A63D", label: "Finish" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(11,16,35,0.7)", borderRadius: 8, padding: "3px 8px 3px 5px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
                <span style={{ fontSize: 10, color: "rgba(240,242,248,0.7)", fontWeight: 500 }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Satellite badge */}
          <div style={{
            position: "absolute", top: 12, left: 14,
            background: "rgba(11,16,35,0.75)",
            borderRadius: 8, padding: "3px 8px",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2EC87A" }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(240,242,248,0.7)", letterSpacing: "0.06em" }}>SATELLITE</span>
          </div>
        </div>

        {/* Map stats strip */}
        <div style={{
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          {[
            { label: "Route", value: "8.42 km loop" },
            { label: "Surface", value: "Road / Trail" },
            { label: "Terrain", value: "Moderate" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ margin: "0 0 2px", fontSize: 9, color: "rgba(240,242,248,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "rgba(240,242,248,0.75)" }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── 4. Split Records ─────────────────────────────────────────────────────────

function SplitRecords() {
  const best = BEST;

  return (
    <Card>
      <div style={{ padding: "22px 20px" }}>
        <SectionLabel>Km Splits</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Column headers */}
          <div style={{ display: "flex", alignItems: "center", paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 4 }}>
            <span style={{ width: 32, fontSize: 10, color: "rgba(240,242,248,0.25)", letterSpacing: "0.08em" }}>KM</span>
            <span style={{ flex: 1, fontSize: 10, color: "rgba(240,242,248,0.25)", letterSpacing: "0.08em" }}>Pace bar</span>
            <span style={{ width: 54, textAlign: "right", fontSize: 10, color: "rgba(240,242,248,0.25)", letterSpacing: "0.08em" }}>TIME</span>
            <span style={{ width: 52, textAlign: "right", fontSize: 10, color: "rgba(240,242,248,0.25)", letterSpacing: "0.08em" }}>PACE</span>
          </div>

          {SPLITS.map((split, i) => {
            const fill = paceBar(split.pace, split.isPartial);
            const isBest = split.km === BEST_PACE_KM;
            const barColor = isBest ? "#D4A63D" : split.isPartial ? "rgba(255,255,255,0.15)" : "#3A6ED8";

            return (
              <motion.div
                key={split.km}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.04 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "9px 0",
                  borderBottom: i < SPLITS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                {/* KM label */}
                <div style={{ width: 32 }}>
                  <span style={{
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    color: split.isPartial ? "rgba(240,242,248,0.3)" : "rgba(240,242,248,0.65)",
                  }}>
                    {split.isPartial ? "~" : split.km}
                  </span>
                </div>

                {/* Pace bar */}
                <div style={{ flex: 1, paddingRight: 14 }}>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${fill * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 + i * 0.04 }}
                      style={{
                        height: "100%",
                        background: barColor,
                        borderRadius: 3,
                      }}
                    />
                  </div>
                  {isBest && (
                    <p style={{ margin: "3px 0 0", fontSize: 9, color: "#D4A63D", fontWeight: 700, letterSpacing: "0.08em" }}>BEST SPLIT</p>
                  )}
                </div>

                {/* Time */}
                <span style={{
                  width: 54, textAlign: "right",
                  fontSize: 13, fontFamily: "var(--font-mono)",
                  color: split.isPartial ? "rgba(240,242,248,0.3)" : "rgba(240,242,248,0.7)",
                }}>
                  {split.time}
                </span>

                {/* Pace */}
                <span style={{
                  width: 52, textAlign: "right",
                  fontSize: 13, fontFamily: "var(--font-mono)", fontWeight: 600,
                  color: isBest ? "#D4A63D" : split.isPartial ? "rgba(240,242,248,0.25)" : "#F0F2F8",
                }}>
                  {split.pace}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

// ─── 5. Weather Card ─────────────────────────────────────────────────────────

function WeatherCard() {
  const conditions = [
    { icon: "🌡️", label: "Temperature", value: `${RUN.temperature}°`, sub: "Feels like 23°", color: "#E8694A" },
    { icon: "💧", label: "Humidity",    value: `${RUN.humidity}%`,   sub: "Moderate",     color: "#5090E0" },
    { icon: "🌬️", label: "Wind",        value: `${RUN.wind}`,        sub: `${RUN.windDir} · km/h`, color: "#2EC87A" },
  ];

  return (
    <Card>
      <div style={{ padding: "22px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <SectionLabel>Weather</SectionLabel>
          <div style={{
            background: "rgba(212,166,61,0.1)",
            border: "1px solid rgba(212,166,61,0.2)",
            borderRadius: 10,
            padding: "3px 10px",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}>
            <span style={{ fontSize: 12 }}>☀️</span>
            <span style={{ fontSize: 11, color: "#D4A63D", fontWeight: 600 }}>Clear</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {conditions.map((c) => (
            <div key={c.label} style={{
              flex: 1,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 18,
              padding: "14px 10px",
              textAlign: "center",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                background: `${c.color}15`,
                border: `1px solid ${c.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 10px",
                fontSize: 16,
              }}>
                {c.icon}
              </div>
              <p style={{ margin: "0 0 2px", fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 500, color: "#F0F2F8", lineHeight: 1 }}>
                {c.value}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 9, color: "rgba(240,242,248,0.3)", letterSpacing: "0.04em" }}>{c.label}</p>
              <p style={{ margin: "2px 0 0", fontSize: 9, color: "rgba(240,242,248,0.22)" }}>{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── 6. New Card Unlocked ─────────────────────────────────────────────────────

function NewCardUnlocked() {
  const [claimed, setClaimed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div style={{
        borderRadius: 28,
        overflow: "hidden",
        position: "relative",
        background: `linear-gradient(145deg, ${cardCfg.badge}22 0%, #131B2E 50%, ${cardCfg.badge}10 100%)`,
        border: `1px solid ${cardCfg.border}`,
        boxShadow: `0 0 40px ${cardCfg.glow}, inset 0 1px 0 ${cardCfg.shimmer}`,
      }}>
        {/* Shimmer overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 20% 20%, ${cardCfg.shimmer} 0%, transparent 60%)`,
          pointerEvents: "none",
        }} />

        <div style={{ padding: "24px 22px" }}>
          {/* Badge row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: claimed ? "#2EC87A" : "#D4A63D",
              boxShadow: `0 0 8px ${claimed ? "rgba(46,200,122,0.6)" : "rgba(212,166,61,0.6)"}`,
            }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: claimed ? "#2EC87A" : "#D4A63D", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {claimed ? "Card Collected" : "New Card Unlocked!"}
            </span>
          </div>

          {/* Card display + info */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}>
            {/* Mini card art */}
            <div style={{
              width: 90, height: 130, flexShrink: 0,
              borderRadius: 16,
              background: cardCfg.gradient,
              border: `1px solid ${cardCfg.border}`,
              boxShadow: `0 8px 24px ${cardCfg.glow}`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "space-between",
              padding: "10px 8px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 20%, ${cardCfg.shimmer} 0%, transparent 55%)`, pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: 4, borderRadius: 12, border: "1px dashed rgba(255,255,255,0.18)", pointerEvents: "none" }} />
              <div style={{ alignSelf: "flex-end", zIndex: 1 }}>
                <div style={{ background: cardCfg.badge, borderRadius: 20, padding: "2px 6px" }}>
                  <span style={{ fontSize: 7, fontWeight: 700, color: cardCfg.badgeFg, letterSpacing: "0.1em", textTransform: "uppercase" }}>{cardCfg.label}</span>
                </div>
              </div>
              <div style={{ fontSize: 34, zIndex: 1 }}>{UNLOCKED_CARD.icon}</div>
              <div style={{ textAlign: "center", zIndex: 1 }}>
                <p style={{ margin: 0, fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.2 }}>{UNLOCKED_CARD.name}</p>
              </div>
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: cardCfg.badge,
                borderRadius: 10,
                padding: "3px 10px",
                marginBottom: 8,
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: cardCfg.badgeFg, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {cardCfg.label}
                </span>
              </div>
              <h3 style={{ margin: "0 0 5px", fontSize: 18, fontWeight: 700, color: "#F0F2F8", letterSpacing: "-0.01em" }}>
                {UNLOCKED_CARD.name}
              </h3>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: "rgba(240,242,248,0.55)", lineHeight: 1.4 }}>
                {UNLOCKED_CARD.description}
              </p>
              {/* XP reward */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(212,166,61,0.1)",
                border: "1px solid rgba(212,166,61,0.25)",
                borderRadius: 10,
                padding: "5px 10px",
              }}>
                <span style={{ fontSize: 14 }}>⭐</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600, color: "#D4A63D" }}>+350 XP</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setClaimed(true)}
            disabled={claimed}
            style={{
              width: "100%",
              padding: "15px",
              background: claimed
                ? "rgba(46,200,122,0.1)"
                : `linear-gradient(135deg, ${cardCfg.badge}, ${cardCfg.dot})`,
              border: claimed ? "1px solid rgba(46,200,122,0.25)" : "none",
              borderRadius: 18,
              fontSize: 15,
              fontWeight: 700,
              color: claimed ? "#2EC87A" : "#0B1023",
              cursor: claimed ? "default" : "pointer",
              fontFamily: "var(--font-sans)",
              letterSpacing: "-0.01em",
              transition: "all 0.2s",
            }}
          >
            {claimed ? "✓ Card Added to Passport" : "Collect Card"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── 7. Identity Progress ─────────────────────────────────────────────────────

function IdentityProgress() {
  const prev = 0.587;
  const curr = PROGRESSED_IDENTITY.progress ?? 0.642;
  const delta = curr - prev;

  return (
    <Card>
      <div style={{ padding: "22px 20px" }}>
        <SectionLabel>Identity Progress</SectionLabel>

        {/* Identity header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 15,
            background: `${identCfg.badge}20`,
            border: `1px solid ${identCfg.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, flexShrink: 0,
          }}>
            {PROGRESSED_IDENTITY.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <div style={{ background: identCfg.badge, borderRadius: 8, padding: "2px 8px" }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: identCfg.badgeFg, letterSpacing: "0.08em", textTransform: "uppercase" }}>{identCfg.label}</span>
              </div>
            </div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#F0F2F8", letterSpacing: "-0.01em" }}>
              {PROGRESSED_IDENTITY.name}
            </h3>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(240,242,248,0.4)" }}>
              {PROGRESSED_IDENTITY.tagline}
            </p>
          </div>
          {/* Delta badge */}
          <div style={{
            background: "rgba(46,200,122,0.1)",
            border: "1px solid rgba(46,200,122,0.25)",
            borderRadius: 10,
            padding: "4px 8px",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#2EC87A", fontFamily: "var(--font-mono)" }}>
              +{(delta * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Main progress bar */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "rgba(240,242,248,0.4)" }}>{PROGRESSED_IDENTITY.progressLabel}</span>
            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", fontWeight: 600, color: identCfg.dot }}>
              {Math.round(curr * 100)}%
            </span>
          </div>
          <div style={{ height: 8, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
            {/* Previous progress ghost */}
            <div style={{
              position: "absolute", top: 0, left: 0,
              height: "100%",
              width: `${prev * 100}%`,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 4,
            }} />
            {/* Current progress */}
            <motion.div
              initial={{ width: `${prev * 100}%` }}
              animate={{ width: `${curr * 100}%` }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              style={{
                height: "100%",
                background: `linear-gradient(90deg, ${identCfg.badge}, ${identCfg.dot})`,
                borderRadius: 4,
                position: "relative",
              }}
            >
              {/* Shimmer pulse on tip */}
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  position: "absolute", right: 0, top: 0,
                  width: 16, height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4))",
                  borderRadius: "0 4px 4px 0",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Required cards */}
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 10, color: "rgba(240,242,248,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Required Cards
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {REQUIRED_CARDS.map((card) => {
              const cfg = rarityConfig[card.rarity];
              return (
                <div key={card.id} style={{
                  flex: 1,
                  background: `${cfg.badge}18`,
                  border: `1px solid ${cfg.border}`,
                  borderRadius: 14,
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 9,
                    background: cfg.gradient,
                    border: `1px solid ${cfg.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}>
                    {card.icon}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#F0F2F8" }}>{card.name}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2EC87A" }} />
                      <span style={{ fontSize: 9, color: "#2EC87A", fontWeight: 600 }}>Collected</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── 8. Memo Section ─────────────────────────────────────────────────────────

function MemoSection() {
  const [memo, setMemo] = useState("Felt strong today. The last 2 km were my fastest — legs were fresh. Early start made all the difference. Perfect conditions for a PB attempt next week.");
  const [editing, setEditing] = useState(false);

  return (
    <Card>
      <div style={{ padding: "22px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <SectionLabel>Memo</SectionLabel>
          <button
            onClick={() => setEditing(!editing)}
            style={{
              background: editing ? "rgba(212,166,61,0.12)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${editing ? "rgba(212,166,61,0.3)" : "rgba(255,255,255,0.08)"}`,
              borderRadius: 10,
              padding: "4px 12px",
              fontSize: 11,
              fontWeight: 600,
              color: editing ? "#D4A63D" : "rgba(240,242,248,0.4)",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              transition: "all 0.15s",
            }}
          >
            {editing ? "Done" : "Edit"}
          </button>
        </div>

        {editing ? (
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            autoFocus
            style={{
              width: "100%",
              minHeight: 100,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(212,166,61,0.25)",
              borderRadius: 14,
              padding: "12px 14px",
              fontSize: 14,
              color: "#F0F2F8",
              lineHeight: 1.6,
              fontFamily: "var(--font-sans)",
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        ) : (
          <p style={{
            margin: 0,
            fontSize: 14,
            color: memo ? "rgba(240,242,248,0.7)" : "rgba(240,242,248,0.2)",
            lineHeight: 1.65,
            fontStyle: memo ? "normal" : "italic",
          }}>
            {memo || "Add a note about this run…"}
          </p>
        )}

        {/* Tags */}
        <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
          {["💪 Felt strong", "🌅 Morning", "☀️ Clear weather"].map((tag) => (
            <div key={tag} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "4px 10px",
            }}>
              <span style={{ fontSize: 11, color: "rgba(240,242,248,0.45)" }}>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function RunDetailScreen() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setShowStickyHeader(el.scrollTop > 90);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ minHeight: "100dvh", background: "#0B1023", position: "relative" }}>
      {/* Sticky floating header */}
      <AnimatePresence>
        {showStickyHeader && (
          <motion.div
            key="sticky"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: 390,
              zIndex: 50,
              background: "rgba(11,16,35,0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "12px 22px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#F0F2F8" }}>{RUN.title}</p>
              <p style={{ margin: 0, fontSize: 11, color: "rgba(240,242,248,0.35)" }}>{RUN.distance.toFixed(2)} km · {RUN.date}</p>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#D4A63D", fontWeight: 600 }}>
              {Math.floor(RUN.avgPace / 60)}:{String(RUN.avgPace % 60).padStart(2, "0")}<span style={{ fontSize: 10, color: "rgba(240,242,248,0.35)", marginLeft: 2 }}>/km</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable content */}
      <div ref={scrollRef} style={{ height: "100dvh", overflowY: "auto", scrollbarWidth: "none" }}>
        <HeroHeader />

        <div style={{ padding: "20px 16px 32px", display: "flex", flexDirection: "column", gap: 14 }}>
          <WorkoutMetrics />
          <RouteMap />
          <SplitRecords />
          <WeatherCard />
          <NewCardUnlocked />
          <IdentityProgress />
          <MemoSection />
        </div>
      </div>
    </div>
  );
}
