import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CARDS, AchievementCard, rarityConfig, CardCategory } from "../data";
import { CollectibleCard } from "../components/CollectibleCard";

type Filter = "all" | CardCategory;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all",      label: "All"      },
  { key: "distance", label: "Distance" },
  { key: "habit",    label: "Habit"    },
  { key: "time",     label: "Time"     },
  { key: "explorer", label: "Explorer" },
  { key: "special",  label: "Special"  },
];

function CardDetailModal({ card, onClose }: { card: AchievementCard; onClose: () => void }) {
  const cfg = rarityConfig[card.rarity];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(11,16,35,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 0 0",
      }}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 390,
          background: "#0F1726",
          borderRadius: "32px 32px 0 0",
          padding: "32px 24px 48px",
          border: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "none",
        }}
      >
        {/* Drag handle */}
        <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.12)", margin: "0 auto 28px" }} />

        {/* Large card + glow */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28, position: "relative" }}>
          <div style={{
            position: "absolute",
            inset: -24,
            background: `radial-gradient(ellipse at center, ${cfg.glow} 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
          <CollectibleCard card={card} size="lg" glow />
        </div>

        {/* Detail */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <p style={{ margin: "0 0 4px", fontSize: 11, color: "rgba(240,242,248,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {card.category}
            </p>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#F0F2F8", letterSpacing: "-0.02em" }}>
              {card.unlocked ? card.name : "???"}
            </h2>
          </div>
          <div style={{
            background: cfg.badge,
            borderRadius: 20,
            padding: "4px 12px",
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: cfg.badgeFg, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {cfg.label}
            </span>
          </div>
        </div>

        {card.unlocked ? (
          <>
            <p style={{ margin: "0 0 8px", fontSize: 15, color: "rgba(240,242,248,0.8)", lineHeight: 1.5 }}>
              {card.description}
            </p>
            <p style={{ margin: "0 0 20px", fontSize: 13, fontStyle: "italic", color: "rgba(240,242,248,0.38)", lineHeight: 1.5, fontFamily: "var(--font-display)" }}>
              "{card.flavourText}"
            </p>
            {card.unlockedDate && (
              <div style={{ background: "rgba(46,200,122,0.08)", border: "1px solid rgba(46,200,122,0.2)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>✓</span>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(46,200,122,0.8)" }}>
                  Unlocked {new Date(card.unlockedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <p style={{ margin: "0 0 16px", fontSize: 15, color: "rgba(240,242,248,0.5)", lineHeight: 1.5 }}>
              Complete the challenge below to reveal this card.
            </p>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 16px 12px" }}>
              <p style={{ margin: "0 0 10px", fontSize: 11, color: "rgba(240,242,248,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Unlock Condition
              </p>
              <p style={{ margin: "0 0 16px", fontSize: 14, color: "#F0F2F8", lineHeight: 1.5, fontWeight: 500 }}>
                {card.unlockCondition}
              </p>
              {card.progress !== undefined && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: "rgba(240,242,248,0.4)" }}>Progress</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: cfg.dot, fontFamily: "var(--font-mono)" }}>
                      {Math.round(card.progress * 100)}%
                    </span>
                  </div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${card.progress * 100}%`, background: cfg.dot, borderRadius: 3 }} />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export function PassportScreen() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<AchievementCard | null>(null);

  const filtered = filter === "all" ? CARDS : CARDS.filter((c) => c.category === filter);
  const unlocked = CARDS.filter((c) => c.unlocked).length;

  return (
    <div style={{ minHeight: "100dvh", background: "#0B1023", paddingBottom: 96 }}>
      {/* Header */}
      <div style={{ padding: "60px 22px 0" }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 700, color: "#F0F2F8", letterSpacing: "-0.02em" }}>
          Passport
        </h1>
        <p style={{ margin: "0 0 16px", fontSize: 14, color: "rgba(240,242,248,0.4)" }}>
          {unlocked} of {CARDS.length} cards collected
        </p>

        {/* Progress bar */}
        <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden", marginBottom: 20 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(unlocked / CARDS.length) * 100}%` }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ height: "100%", background: "linear-gradient(90deg, #1A4FA0, #6B28B0, #D4A63D)", borderRadius: 2 }}
          />
        </div>

        {/* Rarity legend */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          {(["common", "rare", "epic", "legendary"] as const).map((r) => {
            const cfg = rarityConfig[r];
            const count = CARDS.filter((c) => c.rarity === r).length;
            const unlockedCount = CARDS.filter((c) => c.rarity === r && c.unlocked).length;
            return (
              <div key={r} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.dot }} />
                <span style={{ fontSize: 11, color: "rgba(240,242,248,0.4)" }}>
                  {cfg.label} <span style={{ color: cfg.dot }}>{unlockedCount}/{count}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, padding: "0 22px 20px", overflowX: "auto", scrollbarWidth: "none" }}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: "7px 14px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 500,
              border: "1px solid",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-sans)",
              transition: "all 0.15s",
              background: filter === f.key ? "#D4A63D" : "transparent",
              color: filter === f.key ? "#0B1023" : "rgba(240,242,248,0.45)",
              borderColor: filter === f.key ? "#D4A63D" : "rgba(255,255,255,0.1)",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div style={{ padding: "0 22px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {filtered.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CollectibleCard card={card} size="sm" onClick={() => setSelected(card)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Card detail modal */}
      <AnimatePresence>
        {selected && <CardDetailModal card={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
