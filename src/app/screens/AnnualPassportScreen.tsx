import { motion } from "motion/react";
import { CARDS, IDENTITIES, rarityConfig } from "../data";

interface Props {
  onBack: () => void;
}

const YEAR_STATS = {
  year: 2026,
  totalKm: 2847,
  totalRuns: 94,
  favoriteCity: "São Paulo",
  mainIdentity: IDENTITIES.find((i) => i.isMain)!,
  cardsCollected: 8,
  totalCards: 12,
  countriesRun: 2,
  bestMonth: { name: "May", km: 328 },
  longestStreak: 14,
};

const MILESTONES = [
  { month: "Mar", event: "First 1,000 km total", icon: "⚙️", color: "#A060E8" },
  { month: "Apr", event: "First century month (100 km)", icon: "💯", color: "#A060E8" },
  { month: "May", event: "Best month ever — 328 km", icon: "📈", color: "#D4A63D" },
  { month: "May", event: "Completed first half-marathon", icon: "🥈", color: "#5090E0" },
  { month: "Jun", event: "14-day running streak", icon: "🔗", color: "#5090E0" },
  { month: "Jun", event: "Unlocked Night Runner identity", icon: "🌑", color: "#5090E0" },
];

// Cards displayed as circular passport stamps
const STAMP_CARDS = CARDS.filter((c) => c.unlocked).slice(0, 8);

function PassportStampGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
      {STAMP_CARDS.map((card, i) => {
        const cfg = rarityConfig[card.rarity];
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.06, ease: [0.34, 1.2, 0.64, 1] }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}
          >
            <div style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: cfg.gradient,
              border: `2px solid ${cfg.border}`,
              boxShadow: `0 4px 14px ${cfg.glow}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Shimmer */}
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 25%, ${cfg.shimmer} 0%, transparent 60%)`, pointerEvents: "none" }} />
              {card.icon}
            </div>
            <p style={{ margin: 0, fontSize: 8, fontWeight: 600, color: "rgba(240,242,248,0.4)", textAlign: "center", lineHeight: 1.2 }}>
              {card.name}
            </p>
          </motion.div>
        );
      })}

      {/* Locked placeholders */}
      {Array.from({ length: YEAR_STATS.totalCards - YEAR_STATS.cardsCollected }).map((_, i) => (
        <div key={`lock-${i}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            border: "1.5px dashed rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{ fontSize: 14, opacity: 0.2 }}>🔒</span>
          </div>
          <p style={{ margin: 0, fontSize: 8, color: "rgba(240,242,248,0.15)" }}>Locked</p>
        </div>
      ))}
    </div>
  );
}

// Milestone timeline
function MilestoneTimeline() {
  return (
    <div style={{ position: "relative", paddingLeft: 20 }}>
      {/* Vertical line */}
      <div style={{
        position: "absolute",
        left: 7,
        top: 8,
        bottom: 8,
        width: 1,
        background: "linear-gradient(180deg, transparent, rgba(212,166,61,0.3), transparent)",
      }} />

      {MILESTONES.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.08 }}
          style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16, position: "relative" }}
        >
          {/* Dot */}
          <div style={{
            position: "absolute",
            left: -16,
            top: 3,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: m.color,
            flexShrink: 0,
            boxShadow: `0 0 6px ${m.color}`,
          }} />

          <div>
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              color: "rgba(240,242,248,0.3)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              display: "block",
              marginBottom: 2,
            }}>
              {m.month} 2026
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>{m.icon}</span>
              <span style={{ fontSize: 13, color: "rgba(240,242,248,0.7)", lineHeight: 1.4 }}>{m.event}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function AnnualPassportScreen({ onBack }: Props) {
  const identCfg = rarityConfig[YEAR_STATS.mainIdentity.rarity];

  return (
    <div style={{ minHeight: "100dvh", background: "#0B1023", paddingBottom: 40 }}>
      {/* Cover — passport-style header */}
      <div style={{
        background: "linear-gradient(160deg, #0A1428 0%, #0E1C38 50%, #0B1023 100%)",
        padding: "56px 24px 36px",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(212,166,61,0.1)",
      }}>
        {/* Embossed dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "18px 18px", pointerEvents: "none" }} />

        {/* Gold border frames — passport corner details */}
        <div style={{ position: "absolute", top: 18, left: 18, width: 24, height: 24, borderTop: "2px solid rgba(212,166,61,0.3)", borderLeft: "2px solid rgba(212,166,61,0.3)", borderRadius: "3px 0 0 0" }} />
        <div style={{ position: "absolute", top: 18, right: 18, width: 24, height: 24, borderTop: "2px solid rgba(212,166,61,0.3)", borderRight: "2px solid rgba(212,166,61,0.3)", borderRadius: "0 3px 0 0" }} />

        {/* Back button */}
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 24, padding: 0 }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9l5 5" stroke="rgba(240,242,248,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 13, color: "rgba(240,242,248,0.4)", fontFamily: "var(--font-sans)" }}>Back</span>
        </button>

        {/* P1 badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(212,166,61,0.08)", border: "1px solid rgba(212,166,61,0.18)", borderRadius: 8, padding: "3px 10px", marginBottom: 16 }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(212,166,61,0.6)", letterSpacing: "0.1em" }}>ANNUAL PASSPORT · P1</span>
        </div>

        {/* Title */}
        <h1 style={{
          margin: "0 0 5px",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 36,
          fontWeight: 400,
          color: "#F0F2F8",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}>
          {YEAR_STATS.year} Running<br />Passport
        </h1>
        <p style={{ margin: "0 0 24px", fontSize: 14, color: "rgba(240,242,248,0.35)" }}>
          Alex Rivera · São Paulo, Brazil
        </p>

        {/* Hero stats trio */}
        <div style={{ display: "flex", gap: 0 }}>
          {[
            { label: "Distance",  value: `${YEAR_STATS.totalKm.toLocaleString()}`, unit: "km",   accent: true  },
            { label: "Runs",      value: `${YEAR_STATS.totalRuns}`,                unit: "runs"               },
            { label: "Cards",     value: `${YEAR_STATS.cardsCollected}/${YEAR_STATS.totalCards}`, unit: ""      },
          ].map((s, i) => (
            <div key={s.label} style={{
              flex: 1,
              textAlign: "center",
              paddingTop: 14,
              paddingBottom: 14,
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <p style={{ margin: "0 0 3px", fontSize: 9, color: "rgba(240,242,248,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</p>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: s.accent ? 26 : 20, fontWeight: 500, color: s.accent ? "#D4A63D" : "#F0F2F8", lineHeight: 1, letterSpacing: "-0.02em" }}>
                {s.value}
                {s.unit && <span style={{ fontSize: 10, color: "rgba(240,242,248,0.35)", marginLeft: 2, fontFamily: "var(--font-sans)" }}>{s.unit}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 20px 0", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Main Identity */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: "#131B2E",
            borderRadius: 24,
            border: `1px solid ${identCfg.border}`,
            padding: "20px 18px",
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 0 40px ${identCfg.glow}`,
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${identCfg.glow} 0%, transparent 55%)`, pointerEvents: "none" }} />
          <p style={{ margin: "0 0 12px", fontSize: 10, fontWeight: 700, color: "rgba(240,242,248,0.3)", letterSpacing: "0.12em", position: "relative", zIndex: 1 }}>
            MAIN IDENTITY · {YEAR_STATS.year}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 1 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: "rgba(255,255,255,0.07)",
              border: `1px solid ${identCfg.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, flexShrink: 0,
            }}>
              {YEAR_STATS.mainIdentity.icon}
            </div>
            <div>
              <div style={{ background: identCfg.badge, borderRadius: 10, padding: "2px 8px", display: "inline-block", marginBottom: 5 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: identCfg.badgeFg, letterSpacing: "0.08em" }}>{identCfg.label.toUpperCase()}</span>
              </div>
              <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 19, fontWeight: 400, color: "#F0F2F8", lineHeight: 1.15 }}>
                {YEAR_STATS.mainIdentity.name}
              </h3>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: "rgba(240,242,248,0.4)" }}>
                {YEAR_STATS.mainIdentity.tagline}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Collection stamps */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          style={{ background: "#131B2E", borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)", padding: "20px 18px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: "rgba(240,242,248,0.3)", letterSpacing: "0.12em" }}>
              COLLECTED CARDS
            </p>
            <span style={{ fontSize: 12, color: "rgba(212,166,61,0.7)", fontFamily: "var(--font-mono)" }}>
              {YEAR_STATS.cardsCollected} / {YEAR_STATS.totalCards}
            </span>
          </div>
          <PassportStampGrid />
        </motion.div>

        {/* Key moments timeline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          style={{ background: "#131B2E", borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)", padding: "20px 18px" }}
        >
          <p style={{ margin: "0 0 16px", fontSize: 10, fontWeight: 700, color: "rgba(240,242,248,0.3)", letterSpacing: "0.12em" }}>
            KEY MOMENTS
          </p>
          <MilestoneTimeline />
        </motion.div>

        {/* Closing message */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
          style={{
            background: "rgba(212,166,61,0.04)",
            border: "1px solid rgba(212,166,61,0.12)",
            borderRadius: 24,
            padding: "28px 22px",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 20%, rgba(212,166,61,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ fontSize: 28, marginBottom: 14 }}>📖</div>
          <p style={{
            margin: "0 0 6px",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 17,
            fontWeight: 400,
            color: "rgba(240,242,248,0.65)",
            lineHeight: 1.65,
          }}>
            "You ran through 2026. Not to prove anything. Not to win anything. Just to keep showing up — one page of your passport at a time."
          </p>
          <p style={{ margin: "16px 0 0", fontSize: 11, color: "rgba(240,242,248,0.2)", letterSpacing: "0.05em" }}>
            — RunPassport · Your running life, collected.
          </p>
        </motion.div>

        {/* Bottom corner decoration */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ height: 1, width: 32, background: "rgba(212,166,61,0.15)" }} />
            <span style={{ fontSize: 16 }}>👣</span>
            <div style={{ height: 1, width: 32, background: "rgba(212,166,61,0.15)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
