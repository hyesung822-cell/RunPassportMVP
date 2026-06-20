import { motion } from "motion/react";
import { RunCard, CardData } from "./RunCard";

const featuredCards: CardData[] = [
  { id: "f1", name: "Dawn Chaser",  subtitle: "Run before 6 AM",    rarity: "legendary", icon: "🌅", unlocked: true, category: "habit",    stat: "5",   statLabel: "am"   },
  { id: "f2", name: "Iron Streak",  subtitle: "7-day streak",       rarity: "epic",      icon: "⚡", unlocked: true, category: "habit",    stat: "14",  statLabel: "days" },
  { id: "f3", name: "The Grinder",  subtitle: "1,000 km total",     rarity: "epic",      icon: "⚙️", unlocked: true, category: "distance", stat: "1K",  statLabel: "km"   },
  { id: "f4", name: "Night Owl",    subtitle: "Run after 9 PM",     rarity: "rare",      icon: "🌙", unlocked: true, category: "habit",    stat: "23",  statLabel: "runs" },
  { id: "f5", name: "Half Master",  subtitle: "Complete a half marathon", rarity: "rare", icon: "🥈", unlocked: true, category: "distance", stat: "21.1", statLabel: "km" },
];

const stats = [
  { label: "Total Distance", value: "2,847 km" },
  { label: "Total Runs",     value: "94"        },
  { label: "Avg Pace",       value: "4:42 /km"  },
  { label: "Best Month",     value: "328 km"    },
  { label: "Streak",         value: "14 days"   },
  { label: "Elevation",      value: "18,240 m"  },
];

export function ProfileScreen() {
  return (
    <div style={{ paddingBottom: 88 }}>
      {/* Profile Header */}
      <div
        style={{
          background: "linear-gradient(180deg,#0a0e1a 0%,#1a2240 80%,#f8f8fa 100%)",
          padding: "56px 24px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 24 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#c9841c,#f0b429,#c9a84c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              marginBottom: 14,
              boxShadow: "0 0 0 3px rgba(201,168,76,0.3),0 0 0 6px rgba(201,168,76,0.1)",
            }}
          >
            🏃
          </motion.div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "#ffffff", margin: "0 0 4px" }}>
            Alex Rivera
          </h1>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <div style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#c9a84c", letterSpacing: "0.08em" }}>
              LEVEL 24
            </div>
            <div style={{ background: "rgba(42,82,152,0.2)", border: "1px solid rgba(80,140,255,0.3)", borderRadius: 20, padding: "3px 10px", fontSize: 11, color: "#6fa0f0", fontWeight: 500 }}>
              Endurance Seeker
            </div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: 0 }}>
            Running since March 2021 · São Paulo, Brazil
          </p>
        </div>
      </div>

      {/* Collection Completion */}
      <div style={{ padding: "0 20px", marginTop: -4 }}>
        <div style={{ background: "#ffffff", borderRadius: 20, padding: "18px 20px", boxShadow: "0 4px 20px rgba(10,14,26,0.1)", border: "1px solid rgba(10,14,26,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <p style={{ margin: "0 0 2px", fontSize: 13, color: "#8a8a9a" }}>Collection Complete</p>
              <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 600, color: "#0a0e1a", lineHeight: 1 }}>
                68%
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: "0 0 2px", fontSize: 13, color: "#8a8a9a" }}>Cards Collected</p>
              <p style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#0a0e1a" }}>8 / 12</p>
            </div>
          </div>
          <div style={{ height: 6, background: "#f0f0f5", borderRadius: 3, overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              style={{ height: "100%", background: "linear-gradient(90deg,#2a5298,#6b2fa0,#c9841c)", borderRadius: 3 }}
            />
          </div>
        </div>
      </div>

      {/* ── FEATURED CARDS ── */}
      <div style={{ padding: "28px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: "#0a0e1a" }}>Featured Cards</h3>
          <span style={{ fontSize: 12, color: "#8a8a9a" }}>5 selected</span>
        </div>
        <p style={{ fontSize: 13, color: "#8a8a9a", margin: "0 0 16px", lineHeight: 1.4 }}>
          These cards represent who you are as a runner.
        </p>

        {/* Fan/showcase layout — first card large, rest in a row below */}
        <div
          style={{
            background: "linear-gradient(135deg,#0a0e1a 0%,#1a2240 100%)",
            borderRadius: 20,
            padding: "22px 20px 20px",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 8px 32px rgba(10,14,26,0.18)",
          }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />

          {/* Hero card (first / highest rarity) */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, position: "relative", zIndex: 1 }}>
            <div style={{ position: "relative" }}>
              <RunCard card={featuredCards[0]} size="lg" />
              {/* Gold glow halo behind hero card */}
              <div style={{
                position: "absolute",
                inset: -12,
                borderRadius: 28,
                background: "radial-gradient(circle,rgba(201,132,28,0.2) 0%,transparent 70%)",
                zIndex: -1,
                pointerEvents: "none",
              }} />
            </div>
          </div>

          {/* 4 supporting cards */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", position: "relative", zIndex: 1 }}>
            {featuredCards.slice(1).map((card) => (
              <RunCard key={card.id} card={card} size="sm" />
            ))}
          </div>

          {/* Label */}
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 11, margin: "14px 0 0", letterSpacing: "0.08em", position: "relative", zIndex: 1 }}>
            YOUR IDENTITY SET
          </p>
        </div>
      </div>

      {/* Running Statistics */}
      <div style={{ padding: "24px 20px 0" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px", color: "#0a0e1a" }}>Running Statistics</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{
                background: "#ffffff",
                borderRadius: 14,
                padding: "14px 16px",
                border: "1px solid rgba(10,14,26,0.06)",
                boxShadow: "0 2px 8px rgba(10,14,26,0.04)",
              }}
            >
              <p style={{ margin: "0 0 4px", fontSize: 11, color: "#8a8a9a", letterSpacing: "0.04em" }}>
                {stat.label.toUpperCase()}
              </p>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 700, fontFamily: "var(--font-display)", color: "#0a0e1a" }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
