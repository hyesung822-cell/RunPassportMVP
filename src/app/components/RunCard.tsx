import { motion } from "motion/react";

export type Rarity = "common" | "rare" | "epic" | "legendary" | "mythic";

export interface CardData {
  id: string;
  name: string;
  subtitle: string;
  rarity: Rarity;
  icon: string;
  unlocked: boolean;
  category: "time" | "habit" | "distance" | "passport" | "growth";
  stat?: string;
  statLabel?: string;
}

const rarityConfig: Record<Rarity, {
  label: string;
  bg: string;
  border: string;
  shimmer: string;
  badge: string;
  badgeText: string;
  glow: string;
}> = {
  common: {
    label: "Common",
    bg: "linear-gradient(145deg, #e8e8ee 0%, #f5f5f8 50%, #dcdce4 100%)",
    border: "rgba(180,180,200,0.5)",
    shimmer: "rgba(255,255,255,0.6)",
    badge: "#8a8a9a",
    badgeText: "#ffffff",
    glow: "rgba(180,180,200,0.2)",
  },
  rare: {
    label: "Rare",
    bg: "linear-gradient(145deg, #1a3a6e 0%, #2a5298 50%, #1557b0 100%)",
    border: "rgba(80,140,255,0.5)",
    shimmer: "rgba(100,160,255,0.3)",
    badge: "#2a5298",
    badgeText: "#ffffff",
    glow: "rgba(42,82,152,0.3)",
  },
  epic: {
    label: "Epic",
    bg: "linear-gradient(145deg, #3d1a6e 0%, #6b2fa0 50%, #8b44c8 100%)",
    border: "rgba(160,80,255,0.5)",
    shimmer: "rgba(200,120,255,0.3)",
    badge: "#6b2fa0",
    badgeText: "#ffffff",
    glow: "rgba(107,47,160,0.3)",
  },
  legendary: {
    label: "Legendary",
    bg: "linear-gradient(145deg, #5c3800 0%, #c9841c 40%, #f0b429 70%, #c9841c 100%)",
    border: "rgba(240,180,40,0.6)",
    shimmer: "rgba(255,220,100,0.4)",
    badge: "#c9841c",
    badgeText: "#ffffff",
    glow: "rgba(201,132,28,0.4)",
  },
  mythic: {
    label: "Mythic",
    bg: "linear-gradient(145deg, #0a1a0a 0%, #0d3320 30%, #1a5c38 60%, #0d8044 100%)",
    border: "rgba(40,200,100,0.5)",
    shimmer: "rgba(80,220,140,0.3)",
    badge: "#0d8044",
    badgeText: "#ffffff",
    glow: "rgba(13,128,68,0.4)",
  },
};

interface RunCardProps {
  card: CardData;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function RunCard({ card, size = "md", onClick }: RunCardProps) {
  const cfg = rarityConfig[card.rarity];
  const isLocked = !card.unlocked;

  const dimensions = {
    sm: { width: 100, height: 140, iconSize: 28, fontSize: "10px" },
    md: { width: 140, height: 196, iconSize: 40, fontSize: "12px" },
    lg: { width: 180, height: 252, iconSize: 52, fontSize: "14px" },
  }[size];

  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        flexShrink: 0,
        position: "relative",
        borderRadius: 16,
        background: isLocked
          ? "linear-gradient(145deg, #d0d0d8 0%, #e8e8f0 100%)"
          : cfg.bg,
        border: `1px solid ${isLocked ? "rgba(160,160,180,0.3)" : cfg.border}`,
        boxShadow: isLocked
          ? "none"
          : `0 8px 32px ${cfg.glow}, inset 0 1px 0 ${cfg.shimmer}`,
        cursor: onClick ? "pointer" : "default",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: size === "sm" ? "10px 8px" : "14px 12px",
        filter: isLocked ? "grayscale(0.6) opacity(0.55)" : "none",
      }}
    >
      {/* Holographic shimmer overlay */}
      {!isLocked && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 30% 20%, ${cfg.shimmer} 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Lock overlay */}
      {isLocked && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(100,100,120,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <rect x="2" y="7" width="10" height="8" rx="2" fill="rgba(255,255,255,0.7)" />
              <path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}

      {/* Rarity badge */}
      <div style={{ alignSelf: "flex-end", zIndex: 1 }}>
        <div
          style={{
            background: isLocked ? "rgba(120,120,140,0.5)" : cfg.badge,
            color: cfg.badgeText,
            fontSize: "8px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "2px 6px",
            borderRadius: 20,
          }}
        >
          {card.rarity}
        </div>
      </div>

      {/* Icon */}
      <div
        style={{
          fontSize: dimensions.iconSize,
          lineHeight: 1,
          zIndex: 1,
          filter: isLocked ? "opacity(0.4)" : "none",
        }}
      >
        {card.icon}
      </div>

      {/* Name & stat */}
      <div style={{ zIndex: 1, textAlign: "center", width: "100%" }}>
        {card.stat && !isLocked && (
          <div
            style={{
              color: "rgba(255,255,255,0.95)",
              fontSize: size === "sm" ? "16px" : "20px",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              lineHeight: 1,
              marginBottom: 2,
            }}
          >
            {card.stat}
            <span style={{ fontSize: "10px", fontFamily: "var(--font-sans)", fontWeight: 400, marginLeft: 2 }}>
              {card.statLabel}
            </span>
          </div>
        )}
        <div
          style={{
            color: isLocked ? "rgba(100,100,120,0.7)" : "rgba(255,255,255,0.95)",
            fontSize: dimensions.fontSize,
            fontWeight: 600,
            lineHeight: 1.2,
            marginBottom: 1,
          }}
        >
          {card.name}
        </div>
        <div
          style={{
            color: isLocked ? "rgba(100,100,120,0.5)" : "rgba(255,255,255,0.6)",
            fontSize: "9px",
            fontWeight: 400,
          }}
        >
          {card.subtitle}
        </div>
      </div>
    </motion.div>
  );
}
