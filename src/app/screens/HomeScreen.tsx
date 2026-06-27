import { motion } from "motion/react";
import { CARDS, IDENTITIES, rarityConfig } from "../data";
import { CollectibleCard } from "../components/CollectibleCard";
import { PicoMessage } from "../components/Pico";

const mainIdentity = IDENTITIES.find((i) => i.isMain)!;
const unlockedCards = CARDS.filter((c) => c.unlocked).slice(-4).reverse();

const identityProgress = [
  { label: "Endurance",   value: 0.78, color: "#3A6ED8" },
  { label: "Consistency", value: 0.62, color: "#8B40C8" },
  { label: "Explorer",    value: 0.45, color: "#2EA87A" },
  { label: "Speed",       value: 0.33, color: "#D4A63D" },
];

const identityCfg = rarityConfig[mainIdentity.rarity];

export function HomeScreen() {
  return (
    <div style={{ minHeight: "100dvh", background: "#0B1023", paddingBottom: 96 }}>
      {/* ── HEADER ── */}
      <div style={{ padding: "60px 22px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <p style={{ margin: "0 0 5px", fontSize: 14, color: "rgba(240,242,248,0.45)", letterSpacing: "0.02em" }}>
              Thursday, June 19
            </p>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#F0F2F8", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Good morning,<br />Alex 👋
            </h1>
            <p style={{ margin: "6px 0 0", fontSize: 12, color: "rgba(240,242,248,0.28)", letterSpacing: "0.01em" }}>
              Running since March 2021 · 94 journeys
            </p>
          </div>
          {/* Avatar */}
          <div style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #D4A63D 0%, #F0C850 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            boxShadow: "0 0 0 2px rgba(212,166,61,0.3), 0 0 0 5px rgba(212,166,61,0.08)",
          }}>
            🏃
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          {[
            { label: "Total Distance", value: "2,847", unit: "km" },
            { label: "Journeys", value: "94", unit: "" },
            { label: "Cards", value: "8 / 12", unit: "" },
          ].map((s) => (
            <div key={s.label} style={{
              flex: 1,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: "12px 10px",
              textAlign: "center",
            }}>
              <p style={{ margin: "0 0 3px", fontSize: 9, color: "rgba(240,242,248,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {s.label}
              </p>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 500, color: "#F0F2F8", letterSpacing: "-0.01em" }}>
                {s.value}
                {s.unit && <span style={{ fontSize: 10, color: "rgba(240,242,248,0.4)", marginLeft: 2 }}>{s.unit}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PICO ── */}
      <div style={{ padding: "0 22px 22px" }}>
        <PicoMessage>
          Your passport has grown since we last opened it.
        </PicoMessage>
      </div>

      {/* ── MAIN IDENTITY CARD ── */}
      <div style={{ padding: "0 22px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "rgba(240,242,248,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Your Identity
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: identityCfg.dot }} />
            <span style={{ fontSize: 11, color: identityCfg.dot, fontWeight: 600, letterSpacing: "0.06em" }}>
              {identityCfg.label.toUpperCase()}
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "linear-gradient(145deg, #0E1C3A 0%, #1A3068 50%, #0C1830 100%)",
            borderRadius: 24,
            padding: "22px 20px",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(60,120,255,0.2)",
            boxShadow: "0 16px 48px rgba(11,16,35,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Ambient glows */}
          <div style={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,166,61,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -30, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,80,220,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Identity + icon */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 18 }}>
              <div style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                flexShrink: 0,
              }}>
                {mainIdentity.icon}
              </div>
              <div style={{ flex: 1, paddingTop: 4 }}>
                <p style={{ margin: "0 0 5px", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Active Identity
                </p>
                <h3 style={{
                  margin: "0 0 5px",
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#F0F2F8",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                }}>
                  {mainIdentity.name}
                </h3>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>
                  {mainIdentity.tagline}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 16 }} />

            {/* Progress to next identity */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "baseline" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                  Next — <span style={{ color: "rgba(255,255,255,0.75)" }}>The Endurance Beast</span>
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#D4A63D", fontFamily: "var(--font-mono)" }}>1,284 / 2,000 km</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "64.2%" }}
                  transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
                  style={{ height: "100%", background: "linear-gradient(90deg, #B87820, #D4A63D, #F0C850)", borderRadius: 2 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── RECENT ACHIEVEMENTS ── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ padding: "0 22px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "rgba(240,242,248,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Recent Cards
          </h2>
          <span style={{ fontSize: 13, color: "rgba(212,166,61,0.8)", cursor: "pointer" }}>See all →</span>
        </div>
        <div style={{ display: "flex", gap: 12, paddingLeft: 22, paddingRight: 22, overflowX: "auto", scrollbarWidth: "none" }}>
          {unlockedCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <CollectibleCard card={card} size="md" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── IDENTITY PROGRESS ── */}
      <div style={{ padding: "0 22px" }}>
        <h2 style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 600, color: "rgba(240,242,248,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Identity Progress
        </h2>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20,
          padding: "18px 18px 10px",
        }}>
          {identityProgress.map((item, i) => (
            <div key={item.label} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "#F0F2F8", fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "rgba(240,242,248,0.4)" }}>
                  {Math.round(item.value * 100)}%
                </span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 + i * 0.1 }}
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
