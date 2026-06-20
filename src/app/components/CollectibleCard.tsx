import { motion } from "motion/react";
import { AchievementCard, rarityConfig } from "../data";

type CardSize = "sm" | "md" | "lg";

const DIMS: Record<CardSize, { w: number; h: number; iconSize: number; nameSize: number; badgeSize: number }> = {
  sm:  { w: 100, h: 148, iconSize: 30, nameSize: 10, badgeSize: 7 },
  md:  { w: 136, h: 200, iconSize: 40, nameSize: 12, badgeSize: 8 },
  lg:  { w: 220, h: 320, iconSize: 72, nameSize: 18, badgeSize: 10 },
};

interface CollectibleCardProps {
  card: AchievementCard;
  size?: CardSize;
  onClick?: () => void;
  glow?: boolean;
}

export function CollectibleCard({ card, size = "md", onClick, glow = true }: CollectibleCardProps) {
  const cfg = rarityConfig[card.rarity];
  const d = DIMS[size];
  const isLocked = !card.unlocked;

  return (
    <motion.div
      onClick={onClick}
      whileTap={onClick ? { scale: 0.94 } : undefined}
      style={{
        width: d.w,
        height: d.h,
        flexShrink: 0,
        position: "relative",
        borderRadius: size === "lg" ? 24 : 14,
        background: isLocked
          ? "linear-gradient(145deg, #151E32 0%, #1E2840 100%)"
          : cfg.gradient,
        border: `1px solid ${isLocked ? "rgba(255,255,255,0.06)" : cfg.border}`,
        boxShadow: (!isLocked && glow)
          ? `0 8px 32px ${cfg.glow}, inset 0 1px 0 ${cfg.shimmer}`
          : "none",
        cursor: onClick ? "pointer" : "default",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: size === "sm" ? "10px 8px" : size === "md" ? "14px 12px" : "24px 20px",
        filter: isLocked ? "saturate(0) brightness(0.6)" : "none",
      }}
    >
      {/* Holographic shimmer overlay */}
      {!isLocked && (
        <>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 15%, ${cfg.shimmer} 0%, transparent 55%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 75% 85%, rgba(255,255,255,0.04) 0%, transparent 50%)`, pointerEvents: "none" }} />
        </>
      )}

      {/* Stamp perforation border */}
      <div
        style={{
          position: "absolute",
          inset: size === "sm" ? 4 : 6,
          borderRadius: size === "lg" ? 18 : 10,
          border: `1px dashed ${isLocked ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.15)"}`,
          pointerEvents: "none",
        }}
      />

      {/* Top row: card number + rarity badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", position: "relative", zIndex: 1 }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: d.badgeSize,
          color: isLocked ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.35)",
          letterSpacing: "0.04em",
        }}>
          #{String(card.number).padStart(3, "0")}
        </span>
        <div style={{
          background: isLocked ? "rgba(255,255,255,0.06)" : cfg.badge,
          borderRadius: 20,
          padding: `${d.badgeSize * 0.25}px ${d.badgeSize * 0.9}px`,
        }}>
          <span style={{
            fontSize: d.badgeSize,
            fontWeight: 700,
            color: isLocked ? "rgba(255,255,255,0.2)" : cfg.badgeFg,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Icon */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: size === "lg" ? 16 : 8 }}>
        <div
          style={{
            width: d.iconSize * 1.8,
            height: d.iconSize * 1.8,
            borderRadius: size === "lg" ? 24 : 12,
            background: isLocked ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.25)",
            border: `1px solid ${isLocked ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: d.iconSize,
            position: "relative",
          }}
        >
          {isLocked ? (
            <svg width={d.iconSize * 0.55} height={d.iconSize * 0.65} viewBox="0 0 22 26" fill="none">
              <rect x="2" y="11" width="18" height="14" rx="3" fill="rgba(255,255,255,0.15)" />
              <path d="M6 11V8a5 5 0 0 1 10 0v3" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            card.icon
          )}
        </div>

        {/* Stat display for unlocked cards */}
        {!isLocked && card.stat && size !== "sm" && (
          <div style={{ textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: d.nameSize * 1.4, fontWeight: 500, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em" }}>
              {card.stat}
            </span>
            {card.statLabel && (
              <span style={{ fontSize: d.nameSize * 0.8, color: "rgba(255,255,255,0.45)", marginLeft: 3 }}>
                {card.statLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom: name + category */}
      <div style={{ width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
        {size === "lg" && (
          <p style={{ margin: "0 0 4px", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {card.category}
          </p>
        )}
        <p style={{
          margin: 0,
          fontSize: d.nameSize,
          fontWeight: 600,
          color: isLocked ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.92)",
          lineHeight: 1.2,
        }}>
          {isLocked ? "???" : card.name}
        </p>
        {size !== "sm" && (
          <p style={{ margin: "2px 0 0", fontSize: d.nameSize * 0.8, color: isLocked ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.4)", lineHeight: 1.3 }}>
            {isLocked ? "Locked" : card.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
