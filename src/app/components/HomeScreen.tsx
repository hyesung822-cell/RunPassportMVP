import { motion } from "motion/react";
import { RunCard, CardData } from "./RunCard";

const recentCards: CardData[] = [
  {
    id: "1",
    name: "Night Owl",
    subtitle: "Run after 9 PM",
    rarity: "rare",
    icon: "🌙",
    unlocked: true,
    category: "habit",
    stat: "23",
    statLabel: "runs",
  },
  {
    id: "2",
    name: "Iron Streak",
    subtitle: "7-day streak",
    rarity: "epic",
    icon: "⚡",
    unlocked: true,
    category: "habit",
    stat: "14",
    statLabel: "days",
  },
  {
    id: "3",
    name: "Dawn Chaser",
    subtitle: "Run before 6 AM",
    rarity: "legendary",
    icon: "🌅",
    unlocked: true,
    category: "habit",
    stat: "5",
    statLabel: "am",
  },
];

const identityProgress = [
  { label: "Endurance", value: 78, color: "#2a5298" },
  { label: "Consistency", value: 62, color: "#6b2fa0" },
  { label: "Speed", value: 44, color: "#c9841c" },
];

// Rarity config for the identity hero badge
const rarityMeta = {
  common:    { label: "Common",    color: "#8a8a9a", bg: "rgba(138,138,154,0.15)", border: "rgba(138,138,154,0.3)" },
  rare:      { label: "Rare",      color: "#6fa0f0", bg: "rgba(42,82,152,0.15)",   border: "rgba(80,140,255,0.35)" },
  epic:      { label: "Epic",      color: "#b07ae8", bg: "rgba(107,47,160,0.15)",  border: "rgba(160,80,255,0.35)" },
  legendary: { label: "Legendary", color: "#f0b429", bg: "rgba(201,132,28,0.15)",  border: "rgba(240,180,40,0.4)"  },
  mythic:    { label: "Mythic",    color: "#40d090", bg: "rgba(13,128,68,0.15)",   border: "rgba(40,200,100,0.4)"  },
};

export function HomeScreen() {
  const identityRarity = "legendary" as const;
  const rarity = rarityMeta[identityRarity];

  return (
    <div style={{ paddingBottom: 88 }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(180deg, #0a0e1a 0%, #1a2240 100%)",
          padding: "56px 24px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 4, letterSpacing: "0.04em" }}>
              Good morning
            </p>
            <h1
              style={{
                color: "#ffffff",
                fontSize: 26,
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Alex Rivera
            </h1>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #c9841c, #f0b429)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            🏃
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, position: "relative", zIndex: 1 }}>
          <div
            style={{
              background: "rgba(201,168,76,0.15)",
              border: "1px solid rgba(201,168,76,0.4)",
              borderRadius: 20,
              padding: "4px 12px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#c9a84c", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>LEVEL 24</span>
          </div>
          <div
            style={{
              background: "rgba(42,82,152,0.2)",
              border: "1px solid rgba(80,140,255,0.3)",
              borderRadius: 20,
              padding: "4px 12px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#6fa0f0", fontSize: 11, fontWeight: 600 }}>94 runs · 2,847 km</span>
          </div>
        </div>
      </div>

      {/* ── MAIN IDENTITY — hero card ── */}
      <div style={{ padding: "20px 20px 0" }}>
        <div
          style={{
            background: "linear-gradient(145deg, #0c1228 0%, #1a2e62 45%, #0e1a3a 100%)",
            borderRadius: 24,
            padding: "24px 22px 22px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 16px 48px rgba(10,14,26,0.22), inset 0 1px 0 rgba(255,255,255,0.07)",
            border: "1px solid rgba(240,180,40,0.18)",
          }}
        >
          {/* Ambient glow */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,132,28,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -80, left: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(42,82,152,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />
          {/* Dot grid texture */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "18px 18px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Top row: label + rarity badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 11, letterSpacing: "0.12em", fontWeight: 600 }}>
                MAIN IDENTITY
              </span>
              <div
                style={{
                  background: rarity.bg,
                  border: `1px solid ${rarity.border}`,
                  borderRadius: 20,
                  padding: "3px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: rarity.color }} />
                <span style={{ color: rarity.color, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em" }}>
                  {rarity.label.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Icon + Name */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  background: "linear-gradient(145deg, rgba(201,132,28,0.25) 0%, rgba(240,180,40,0.1) 100%)",
                  border: "1px solid rgba(240,180,40,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 38,
                  flexShrink: 0,
                }}
              >
                🏔️
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#ffffff",
                    margin: "0 0 5px",
                    lineHeight: 1.15,
                  }}
                >
                  The Endurance Seeker
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: 12,
                    margin: 0,
                    lineHeight: 1.5,
                    fontStyle: "italic",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  "Distance doesn't intimidate you — it defines you."
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 16 }} />

            {/* Progress to next card */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                  Next card — <span style={{ color: "rgba(255,255,255,0.8)" }}>Century Rider</span>
                </span>
                <span style={{ color: "#c9a84c", fontSize: 12, fontWeight: 600 }}>847 / 1000 km</span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "84.7%" }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #c9841c, #f0b429)",
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Unlocked */}
      <div style={{ padding: "24px 0 0" }}>
        <div style={{ padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: "#0a0e1a" }}>Recently Unlocked</h3>
          <span style={{ fontSize: 13, color: "#8a8a9a", cursor: "pointer" }}>See all</span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            paddingLeft: 20,
            paddingRight: 20,
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {recentCards.map((card) => (
            <RunCard key={card.id} card={card} size="md" />
          ))}
        </div>
      </div>

      {/* Identity Progress */}
      <div style={{ padding: "24px 20px 0" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px", color: "#0a0e1a" }}>Identity Progress</h3>
        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 2px 12px rgba(10,14,26,0.06)",
            border: "1px solid rgba(10,14,26,0.06)",
          }}
        >
          {identityProgress.map((item) => (
            <div key={item.label} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, color: "#0a0e1a", fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontSize: 13, color: "#8a8a9a" }}>{item.value}%</span>
              </div>
              <div style={{ height: 6, background: "#f0f0f5", borderRadius: 3, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  style={{ height: "100%", background: item.color, borderRadius: 3 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
