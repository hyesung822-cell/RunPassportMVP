import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CardData, Rarity } from "./RunCard";

type FilterTab = "time" | "habit" | "distance" | "passport" | "growth";

const allCards: CardData[] = [
  { id: "c1",  name: "Night Owl",    subtitle: "Run after 9 PM",          rarity: "rare",      icon: "🌙", unlocked: true,  category: "habit",    stat: "23",   statLabel: "runs"   },
  { id: "c2",  name: "Iron Streak",  subtitle: "7-day streak",            rarity: "epic",      icon: "⚡", unlocked: true,  category: "habit",    stat: "14",   statLabel: "days"   },
  { id: "c3",  name: "Dawn Chaser",  subtitle: "Run before 6 AM",         rarity: "legendary", icon: "🌅", unlocked: true,  category: "habit",    stat: "5",    statLabel: "am"     },
  { id: "c4",  name: "Centurion",    subtitle: "100 km in a month",       rarity: "epic",      icon: "💯", unlocked: true,  category: "distance", stat: "100",  statLabel: "km"     },
  { id: "c5",  name: "Speed Demon",  subtitle: "Sub-4 min/km pace",       rarity: "legendary", icon: "🔥", unlocked: false, category: "time",     stat: "3:58", statLabel: "/km"    },
  { id: "c6",  name: "Trail Blazer", subtitle: "Complete 5 trail runs",   rarity: "mythic",    icon: "🗻", unlocked: false, category: "passport", stat: "5",    statLabel: "trails" },
  { id: "c7",  name: "Early Bird",   subtitle: "30-day morning run",      rarity: "common",    icon: "🐦", unlocked: true,  category: "habit",    stat: "30",   statLabel: "days"   },
  { id: "c8",  name: "Half Master",  subtitle: "Complete a half marathon", rarity: "rare",     icon: "🥈", unlocked: true,  category: "distance", stat: "21.1", statLabel: "km"     },
  { id: "c9",  name: "The Grinder",  subtitle: "1,000 km total",          rarity: "epic",      icon: "⚙️", unlocked: true,  category: "distance", stat: "1K",   statLabel: "km"     },
  { id: "c10", name: "Nomad",        subtitle: "Run in 5 different cities",rarity: "legendary", icon: "🌍", unlocked: false, category: "passport", stat: "5",    statLabel: "cities" },
  { id: "c11", name: "Minute Man",   subtitle: "Beat your personal best", rarity: "common",    icon: "⏱️", unlocked: true,  category: "time",     stat: "PR",   statLabel: ""       },
  { id: "c12", name: "Transformer",  subtitle: "Run-fuelled body change", rarity: "rare",      icon: "✨", unlocked: false, category: "growth",   stat: "−5",   statLabel: "kg"     },
];

// Unlock requirements detail copy
const unlockRequirements: Record<string, { title: string; requirement: string; hint: string; progress?: string }> = {
  c5:  { title: "Speed Demon",  requirement: "Achieve a sub-4:00 min/km pace on any run",  hint: "Your best is 4:12/km — you're 12 seconds away.",  progress: "4:12 / 4:00 min/km" },
  c6:  { title: "Trail Blazer", requirement: "Complete 5 official trail runs",              hint: "Join a local trail run series to earn this mythic stamp.", progress: "1 / 5 trails" },
  c10: { title: "Nomad",        requirement: "Log runs in 5 different cities",              hint: "You've run in 3 cities — 2 more to unlock the globe.", progress: "3 / 5 cities" },
  c12: { title: "Transformer",  requirement: "Log a 5 kg body weight reduction alongside running activity", hint: "Track your weight in the app to measure progress.", progress: "2.1 / 5 kg" },
};

const rarityConfig: Record<Rarity, { label: string; bg: string; border: string; shimmer: string; badge: string; badgeText: string; glow: string; stampColor: string }> = {
  common:    { label: "Common",    bg: "linear-gradient(145deg,#e8e8ee,#f5f5f8,#dcdce4)", border: "rgba(180,180,200,0.5)", shimmer: "rgba(255,255,255,0.6)", badge: "#8a8a9a", badgeText: "#fff", glow: "rgba(180,180,200,0.2)",   stampColor: "#8a8a9a" },
  rare:      { label: "Rare",      bg: "linear-gradient(145deg,#1a3a6e,#2a5298,#1557b0)", border: "rgba(80,140,255,0.5)",  shimmer: "rgba(100,160,255,0.3)", badge: "#2a5298", badgeText: "#fff", glow: "rgba(42,82,152,0.3)",     stampColor: "#6fa0f0" },
  epic:      { label: "Epic",      bg: "linear-gradient(145deg,#3d1a6e,#6b2fa0,#8b44c8)", border: "rgba(160,80,255,0.5)", shimmer: "rgba(200,120,255,0.3)", badge: "#6b2fa0", badgeText: "#fff", glow: "rgba(107,47,160,0.3)",    stampColor: "#b07ae8" },
  legendary: { label: "Legendary", bg: "linear-gradient(145deg,#5c3800,#c9841c,#f0b429,#c9841c)", border: "rgba(240,180,40,0.6)", shimmer: "rgba(255,220,100,0.4)", badge: "#c9841c", badgeText: "#fff", glow: "rgba(201,132,28,0.4)", stampColor: "#f0b429" },
  mythic:    { label: "Mythic",    bg: "linear-gradient(145deg,#0a1a0a,#0d3320,#1a5c38,#0d8044)", border: "rgba(40,200,100,0.5)", shimmer: "rgba(80,220,140,0.3)", badge: "#0d8044", badgeText: "#fff", glow: "rgba(13,128,68,0.4)", stampColor: "#40d090" },
};

const tabs: { key: FilterTab; label: string }[] = [
  { key: "time",     label: "Time"     },
  { key: "habit",    label: "Habit"    },
  { key: "distance", label: "Distance" },
  { key: "passport", label: "Passport" },
  { key: "growth",   label: "Growth"   },
];

// Standalone premium stamp card (replaces the RunCard import for this screen)
function StampCard({ card, onTap }: { card: CardData; onTap: () => void }) {
  const cfg = rarityConfig[card.rarity];
  const isLocked = !card.unlocked;
  const W = 102, H = 148;

  return (
    <motion.div
      onClick={onTap}
      whileTap={{ scale: 0.94 }}
      style={{
        width: W,
        height: H,
        flexShrink: 0,
        position: "relative",
        borderRadius: 14,
        background: isLocked
          ? "linear-gradient(145deg,#d8d8e0,#e8e8f0)"
          : cfg.bg,
        border: `1px solid ${isLocked ? "rgba(160,160,180,0.3)" : cfg.border}`,
        boxShadow: isLocked
          ? "inset 0 1px 0 rgba(255,255,255,0.5)"
          : `0 6px 24px ${cfg.glow}, inset 0 1px 0 ${cfg.shimmer}`,
        cursor: "pointer",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 8px",
        filter: isLocked ? "grayscale(0.5) opacity(0.6)" : "none",
      }}
    >
      {/* Holographic shimmer */}
      {!isLocked && (
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 20%, ${cfg.shimmer} 0%, transparent 60%)`, pointerEvents: "none" }} />
      )}

      {/* Stamp perforation border (SVG dashes) */}
      <div
        style={{
          position: "absolute",
          inset: 5,
          borderRadius: 10,
          border: `1.5px dashed ${isLocked ? "rgba(150,150,170,0.25)" : "rgba(255,255,255,0.18)"}`,
          pointerEvents: "none",
        }}
      />

      {/* Rarity badge */}
      <div style={{ alignSelf: "flex-end", zIndex: 1 }}>
        <div style={{
          background: isLocked ? "rgba(120,120,140,0.4)" : cfg.badge,
          color: cfg.badgeText,
          fontSize: "7px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "2px 6px",
          borderRadius: 20,
        }}>
          {card.rarity}
        </div>
      </div>

      {/* Icon */}
      <div style={{ fontSize: 34, lineHeight: 1, zIndex: 1, filter: isLocked ? "opacity(0.35)" : "none" }}>
        {card.icon}
      </div>

      {/* Lock icon */}
      {isLocked && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(80,80,100,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <rect x="1.5" y="6" width="9" height="7" rx="1.5" fill="rgba(255,255,255,0.75)" />
              <path d="M3.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="rgba(255,255,255,0.75)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}

      {/* Stat */}
      {!isLocked && card.stat && (
        <div style={{ zIndex: 1, textAlign: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.95)", fontSize: 17, fontWeight: 700, fontFamily: "var(--font-display)", lineHeight: 1 }}>
            {card.stat}
          </span>
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 8, marginLeft: 2 }}>{card.statLabel}</span>
        </div>
      )}

      {/* Name */}
      <div style={{ zIndex: 1, textAlign: "center", width: "100%" }}>
        <div style={{
          color: isLocked ? "rgba(100,100,120,0.55)" : "rgba(255,255,255,0.92)",
          fontSize: 10,
          fontWeight: 600,
          lineHeight: 1.2,
          marginBottom: 1,
        }}>
          {card.name}
        </div>
        <div style={{ color: isLocked ? "rgba(100,100,120,0.4)" : "rgba(255,255,255,0.5)", fontSize: 8 }}>
          {card.subtitle}
        </div>
      </div>
    </motion.div>
  );
}

// Bottom sheet modal for locked card details
function LockedCardSheet({ card, onClose }: { card: CardData; onClose: () => void }) {
  const req = unlockRequirements[card.id];
  const cfg = rarityConfig[card.rarity];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,14,26,0.6)",
        zIndex: 200,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
      onClick={onClose}
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
          background: "#ffffff",
          borderRadius: "24px 24px 0 0",
          overflow: "hidden",
          paddingBottom: 40,
        }}
      >
        {/* Gradient header using card color */}
        <div
          style={{
            background: cfg.bg,
            padding: "32px 24px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 30%, ${cfg.shimmer} 0%, transparent 60%)`, pointerEvents: "none" }} />
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "rgba(0,0,0,0.2)",
              border: `1.5px dashed rgba(255,255,255,0.3)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              filter: "grayscale(0.6) opacity(0.6)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {card.icon}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                  <rect x="2" y="7" width="10" height="8" rx="2" fill="rgba(255,255,255,0.8)" />
                  <path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
          <div style={{ zIndex: 1, textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <div style={{ background: cfg.badge, borderRadius: 20, padding: "3px 10px", fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.1em" }}>
                {card.rarity.toUpperCase()}
              </div>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "#fff", margin: "0 0 4px" }}>
              {card.name}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: 0 }}>{card.subtitle}</p>
          </div>
        </div>

        {/* Requirements */}
        <div style={{ padding: "24px 24px 0" }}>
          <p style={{ fontSize: 11, color: "#8a8a9a", fontWeight: 700, letterSpacing: "0.1em", margin: "0 0 12px" }}>
            HOW TO UNLOCK
          </p>
          <div
            style={{
              background: "#f8f8fa",
              borderRadius: 14,
              padding: "14px 16px",
              marginBottom: 12,
              border: "1px solid rgba(10,14,26,0.06)",
            }}
          >
            <p style={{ fontSize: 14, color: "#0a0e1a", margin: "0 0 6px", fontWeight: 500, lineHeight: 1.5 }}>
              {req?.requirement ?? card.subtitle}
            </p>
            {req?.hint && (
              <p style={{ fontSize: 13, color: "#8a8a9a", margin: 0, lineHeight: 1.5 }}>
                {req.hint}
              </p>
            )}
          </div>

          {/* Progress bar */}
          {req?.progress && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "#8a8a9a" }}>Progress</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: cfg.badge }}>{req.progress}</span>
              </div>
              <div style={{ height: 6, background: "#f0f0f5", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: card.id === "c5" ? "70%" : card.id === "c6" ? "20%" : card.id === "c10" ? "60%" : "42%",
                  background: cfg.badge,
                  borderRadius: 3,
                  transition: "width 0.8s ease",
                }} />
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            style={{
              width: "100%",
              marginTop: 20,
              padding: "14px",
              background: "#0a0e1a",
              color: "#ffffff",
              border: "none",
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
            }}
          >
            Got it
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PassportScreen() {
  const [activeTab, setActiveTab] = useState<FilterTab | "all">("all");
  const [lockedCard, setLockedCard] = useState<CardData | null>(null);

  const filtered = activeTab === "all"
    ? allCards
    : allCards.filter((c) => c.category === activeTab);

  const unlocked = allCards.filter((c) => c.unlocked).length;

  function handleCardTap(card: CardData) {
    if (!card.unlocked) setLockedCard(card);
  }

  return (
    <div style={{ paddingBottom: 88 }}>
      {/* Header */}
      <div style={{ padding: "56px 24px 20px", background: "#ffffff", borderBottom: "1px solid rgba(10,14,26,0.06)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, color: "#0a0e1a", margin: "0 0 4px" }}>
          My Passport
        </h1>
        <p style={{ color: "#8a8a9a", fontSize: 14, margin: "0 0 16px" }}>
          {unlocked} of {allCards.length} cards collected
        </p>
        <div style={{ height: 4, background: "#f0f0f5", borderRadius: 2, overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(unlocked / allCards.length) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ height: "100%", background: "linear-gradient(90deg,#2a5298,#6b2fa0,#c9841c)", borderRadius: 2 }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 8, padding: "14px 20px", overflowX: "auto", scrollbarWidth: "none", background: "#ffffff", borderBottom: "1px solid rgba(10,14,26,0.06)" }}>
        {[{ key: "all" as const, label: "All" }, ...tabs].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 500,
              border: "1px solid",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
              background: activeTab === tab.key ? "#0a0e1a" : "transparent",
              color: activeTab === tab.key ? "#ffffff" : "#8a8a9a",
              borderColor: activeTab === tab.key ? "#0a0e1a" : "rgba(10,14,26,0.12)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hint */}
      <div style={{ padding: "12px 20px 0" }}>
        <p style={{ fontSize: 12, color: "#8a8a9a", margin: 0 }}>
          Tap a locked card to see how to unlock it.
        </p>
      </div>

      {/* Card Grid */}
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {filtered.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <StampCard card={card} onTap={() => handleCardTap(card)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Locked card sheet */}
      <AnimatePresence>
        {lockedCard && (
          <LockedCardSheet card={lockedCard} onClose={() => setLockedCard(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
