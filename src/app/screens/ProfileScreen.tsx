import { motion } from "motion/react";
import { CARDS, IDENTITIES, rarityConfig } from "../data";
import { CollectibleCard } from "../components/CollectibleCard";

// Injected by App.tsx so Profile can trigger P1 screens
export interface ProfileScreenProps {
  onMonthlyReview?: () => void;
  onAnnualPassport?: () => void;
}

const featuredCards = CARDS.filter((c) => c.unlocked).slice(0, 5);
const mainIdentity = IDENTITIES.find((i) => i.isMain)!;
const mainCfg = rarityConfig[mainIdentity.rarity];

const stats = [
  { label: "Total Distance",    value: "2,847",  unit: "km",  icon: "🛣️" },
  { label: "Total Runs",        value: "94",     unit: "runs", icon: "👟" },
  { label: "Cards Collected",   value: "8 / 12", unit: "",     icon: "🃏" },
  { label: "Identities",        value: "2 / 5",  unit: "",     icon: "⭐" },
  { label: "Longest Run",       value: "21.1",   unit: "km",  icon: "📏" },
  { label: "Current Streak",    value: "14",     unit: "days", icon: "🔥" },
];

export function ProfileScreen({ onMonthlyReview, onAnnualPassport }: ProfileScreenProps = {}) {
  return (
    <div style={{ minHeight: "100dvh", background: "#0B1023", paddingBottom: 96 }}>
      {/* Hero header */}
      <div style={{
        background: "linear-gradient(180deg, #0C1528 0%, #0B1023 100%)",
        padding: "60px 22px 28px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "22px 22px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,166,61,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #C89020, #D4A63D, #F0C850)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              marginBottom: 14,
              boxShadow: "0 0 0 3px rgba(212,166,61,0.25), 0 0 0 7px rgba(212,166,61,0.08)",
            }}
          >
            🏃
          </motion.div>

          <h1 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 700, color: "#F0F2F8", letterSpacing: "-0.02em" }}>
            Alex Rivera
          </h1>
          <p style={{ margin: "0 0 4px", fontSize: 13, color: "rgba(240,242,248,0.4)" }}>
            São Paulo, Brazil
          </p>
          <p style={{ margin: "0 0 14px", fontSize: 12, color: "rgba(240,242,248,0.25)" }}>
            Running since March 2021 · 94 journeys collected
          </p>

          {/* Identity badge */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{
              background: mainCfg.badge,
              borderRadius: 20,
              padding: "5px 14px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              <span style={{ fontSize: 14 }}>{mainIdentity.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: mainCfg.badgeFg }}>{mainIdentity.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Collection snapshot */}
      <div style={{ padding: "20px 22px 0" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "18px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <p style={{ margin: "0 0 3px", fontSize: 12, color: "rgba(240,242,248,0.35)" }}>Collection Complete</p>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 36, fontWeight: 500, color: "#F0F2F8", lineHeight: 1, letterSpacing: "-0.03em" }}>
                68<span style={{ fontSize: 20, color: "rgba(240,242,248,0.4)" }}>%</span>
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: "0 0 3px", fontSize: 12, color: "rgba(240,242,248,0.35)" }}>Cards · Identities</p>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#F0F2F8", fontFamily: "var(--font-mono)" }}>
                8/12 · 2/5
              </p>
            </div>
          </div>
          <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              style={{ height: "100%", background: "linear-gradient(90deg, #1A4FA0, #6B28B0, #D4A63D)", borderRadius: 3 }}
            />
          </div>
        </div>
      </div>

      {/* Featured Cards showcase */}
      <div style={{ padding: "24px 0 0" }}>
        <div style={{ padding: "0 22px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <h2 style={{ margin: "0 0 2px", fontSize: 16, fontWeight: 700, color: "#F0F2F8", letterSpacing: "-0.01em" }}>Featured Cards</h2>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(240,242,248,0.35)" }}>Your identity, in cards</p>
          </div>
        </div>

        {/* Dark showcase panel */}
        <div style={{
          margin: "0 22px",
          background: "linear-gradient(160deg, #0E1830 0%, #131E38 100%)",
          borderRadius: 24,
          padding: "22px 18px 18px",
          border: "1px solid rgba(255,255,255,0.07)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "18px 18px", pointerEvents: "none" }} />

          {/* Hero card centered */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, position: "relative", zIndex: 1 }}>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                inset: -20,
                background: `radial-gradient(ellipse at center, ${rarityConfig[featuredCards[0].rarity].glow} 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />
              <CollectibleCard card={featuredCards[0]} size="lg" glow />
            </div>
          </div>

          {/* 4 smaller cards */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", position: "relative", zIndex: 1 }}>
            {featuredCards.slice(1).map((card) => (
              <CollectibleCard key={card.id} card={card} size="sm" />
            ))}
          </div>

          <p style={{ textAlign: "center", margin: "14px 0 0", fontSize: 10, color: "rgba(240,242,248,0.2)", letterSpacing: "0.12em", position: "relative", zIndex: 1, textTransform: "uppercase" }}>
            Identity Set
          </p>
        </div>
      </div>

      {/* Statistics grid */}
      <div style={{ padding: "24px 22px 0" }}>
        <h2 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 600, color: "rgba(240,242,248,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Statistics
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "14px 14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 14 }}>{stat.icon}</span>
                <p style={{ margin: 0, fontSize: 10, color: "rgba(240,242,248,0.3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {stat.label}
                </p>
              </div>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 500, color: "#F0F2F8", lineHeight: 1, letterSpacing: "-0.02em" }}>
                {stat.value}
                {stat.unit && <span style={{ fontSize: 12, color: "rgba(240,242,248,0.35)", marginLeft: 3 }}>{stat.unit}</span>}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── P1 Review screens ── */}
      <div style={{ padding: "24px 22px 8px" }}>
        <h2 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: "rgba(240,242,248,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Your Collection
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              icon: "📅", label: "Monthly Review", sub: "June 2026 · 84.3 km",
              badge: "P1", color: "#5090E0",
              onTap: onMonthlyReview,
            },
            {
              icon: "📖", label: "2026 Passport", sub: "Your year in running",
              badge: "P1", color: "#D4A63D",
              onTap: onAnnualPassport,
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileTap={{ scale: 0.98 }}
              onClick={item.onTap}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 18,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: item.onTap ? "pointer" : "default",
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 13,
                background: `${item.color}15`,
                border: `1px solid ${item.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 600, color: "#F0F2F8" }}>{item.label}</p>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(240,242,248,0.4)" }}>{item.sub}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ background: `${item.color}18`, border: `1px solid ${item.color}30`, borderRadius: 8, padding: "2px 7px" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: item.color, letterSpacing: "0.08em" }}>{item.badge}</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2l5 5-5 5" stroke="rgba(240,242,248,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
