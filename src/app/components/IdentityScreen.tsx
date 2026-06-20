import { useState } from "react";
import { motion } from "motion/react";

interface Identity {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bg: string;
  unlocked: boolean;
  requirement: string;
  stat: string;
  isMain?: boolean;
}

const identities: Identity[] = [
  {
    id: "i1",
    name: "The Endurance Seeker",
    description:
      "You're built for the long game. Distance doesn't intimidate you — it defines you. Every kilometer is a quiet assertion of will.",
    icon: "🏔️",
    color: "#2a5298",
    bg: "linear-gradient(135deg, #0a0e1a 0%, #1e2d5a 50%, #0f1f3d 100%)",
    unlocked: true,
    requirement: "Run 2,000+ km total",
    stat: "2,847 km",
    isMain: true,
  },
  {
    id: "i2",
    name: "The Night Runner",
    description:
      "While the world sleeps, you run. You've made darkness your friend and solitude your pace setter.",
    icon: "🌑",
    color: "#6b2fa0",
    bg: "linear-gradient(135deg, #1a0a2e 0%, #3d1a6e 50%, #2a0f4d 100%)",
    unlocked: true,
    requirement: "20+ night runs logged",
    stat: "23 night runs",
  },
  {
    id: "i3",
    name: "The Speed Merchant",
    description:
      "Pace is your language. You've shaved seconds like a sculptor chips marble — with obsession and grace.",
    icon: "⚡",
    color: "#c9841c",
    bg: "linear-gradient(135deg, #3a1e00 0%, #7a4a00 50%, #c9841c 100%)",
    unlocked: false,
    requirement: "Achieve sub-4:00/km pace",
    stat: "Best: 4:12/km",
  },
  {
    id: "i4",
    name: "The Globe Trotter",
    description:
      "Running is your passport. You've laced up on streets that speak different languages and breathed air with unfamiliar names.",
    icon: "🌍",
    color: "#0d8044",
    bg: "linear-gradient(135deg, #0a1a0a 0%, #0d3320 50%, #0d8044 100%)",
    unlocked: false,
    requirement: "Run in 5+ cities",
    stat: "3 cities so far",
  },
];

export function IdentityScreen() {
  const [selected, setSelected] = useState<Identity>(identities[0]);

  return (
    <div style={{ paddingBottom: 88 }}>
      {/* Hero */}
      <motion.div
        key={selected.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background: selected.bg,
          padding: "56px 24px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${selected.color}40 0%, transparent 70%)`,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 11,
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}
          >
            {selected.isMain ? "MAIN IDENTITY" : "IDENTITY"}
          </p>

          <div style={{ fontSize: 56, marginBottom: 12 }}>{selected.icon}</div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 600,
              color: "#ffffff",
              margin: "0 0 12px",
              lineHeight: 1.2,
            }}
          >
            {selected.name}
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 15,
              lineHeight: 1.6,
              margin: "0 0 20px",
              fontStyle: "italic",
              fontFamily: "var(--font-display)",
            }}
          >
            "{selected.description}"
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 20,
              padding: "6px 14px",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
              {selected.stat}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Identity Collection */}
      <div style={{ padding: "24px 20px 0" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px", color: "#0a0e1a" }}>
          Identity Collection
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {identities.map((identity) => (
            <motion.div
              key={identity.id}
              onClick={() => setSelected(identity)}
              whileTap={{ scale: 0.98 }}
              style={{
                background: selected.id === identity.id
                  ? identity.bg
                  : identity.unlocked
                    ? "#ffffff"
                    : "#f0f0f5",
                borderRadius: 16,
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                border: `1px solid ${selected.id === identity.id ? "rgba(255,255,255,0.1)" : "rgba(10,14,26,0.07)"}`,
                boxShadow: selected.id === identity.id
                  ? `0 8px 24px ${identity.color}30`
                  : "0 2px 8px rgba(10,14,26,0.04)",
                transition: "all 0.2s",
                position: "relative",
                overflow: "hidden",
                filter: identity.unlocked ? "none" : "grayscale(0.4) opacity(0.7)",
              }}
            >
              {!identity.unlocked && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 12,
                    background: "rgba(100,100,120,0.15)",
                    borderRadius: 20,
                    padding: "2px 8px",
                    fontSize: 10,
                    color: "#8a8a9a",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  LOCKED
                </div>
              )}
              {identity.isMain && identity.unlocked && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 12,
                    background: "rgba(201,168,76,0.2)",
                    borderRadius: 20,
                    padding: "2px 8px",
                    fontSize: 10,
                    color: selected.id === identity.id ? "#f0b429" : "#c9841c",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  ACTIVE
                </div>
              )}

              <div style={{ fontSize: 32 }}>{identity.icon}</div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin: "0 0 2px",
                    fontSize: 15,
                    fontWeight: 600,
                    color: selected.id === identity.id ? "#ffffff" : "#0a0e1a",
                  }}
                >
                  {identity.name}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: selected.id === identity.id
                      ? "rgba(255,255,255,0.55)"
                      : "#8a8a9a",
                  }}
                >
                  {identity.requirement}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next unlockable hint */}
        <div
          style={{
            marginTop: 20,
            background: "linear-gradient(135deg, rgba(201,132,28,0.08) 0%, rgba(240,180,40,0.05) 100%)",
            border: "1px solid rgba(201,132,28,0.2)",
            borderRadius: 16,
            padding: "16px 18px",
          }}
        >
          <p style={{ margin: "0 0 4px", fontSize: 11, color: "#c9841c", fontWeight: 700, letterSpacing: "0.08em" }}>
            NEXT TO UNLOCK
          </p>
          <p style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 600, color: "#0a0e1a" }}>
            The Speed Merchant
          </p>
          <p style={{ margin: 0, fontSize: 13, color: "#8a8a9a" }}>
            Achieve sub-4:00/km pace · Current best: 4:12/km
          </p>
        </div>
      </div>
    </div>
  );
}
