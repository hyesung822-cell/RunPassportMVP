import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IDENTITIES, RunnerIdentity, rarityConfig } from "../data";

function IdentityDetailModal({
  identity,
  onClose,
  onSetMain,
}: {
  identity: RunnerIdentity;
  onClose: () => void;
  onSetMain: (id: string) => void;
}) {
  const cfg = rarityConfig[identity.rarity];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(11,16,35,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
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
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "none",
        }}
      >
        {/* Hero section */}
        <div style={{
          padding: "28px 24px 28px",
          background: identity.unlocked
            ? "linear-gradient(160deg, rgba(11,28,60,0.9) 0%, rgba(20,40,80,0.8) 100%)"
            : "rgba(20,26,44,0.9)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Glow */}
          {identity.unlocked && (
            <div style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />
          )}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "18px 18px", pointerEvents: "none" }} />

          {/* Handle */}
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.12)", margin: "0 auto 24px" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 20 }}>
              {/* Icon */}
              <div style={{
                width: 80,
                height: 80,
                borderRadius: 22,
                background: identity.unlocked ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${identity.unlocked ? cfg.border : "rgba(255,255,255,0.06)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                flexShrink: 0,
                filter: identity.unlocked ? "none" : "saturate(0) opacity(0.3)",
              }}>
                {identity.icon}
              </div>
              <div style={{ flex: 1, paddingTop: 4 }}>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: cfg.badge, borderRadius: 12, padding: "3px 10px", marginBottom: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.badgeFg, opacity: 0.7 }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: cfg.badgeFg, letterSpacing: "0.1em" }}>{cfg.label.toUpperCase()}</span>
                  </div>
                </div>
                <h2 style={{
                  margin: "0 0 5px",
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: identity.unlocked ? "#F0F2F8" : "rgba(240,242,248,0.3)",
                  lineHeight: 1.15,
                }}>
                  {identity.name}
                </h2>
                <p style={{ margin: 0, fontSize: 13, color: identity.unlocked ? "rgba(240,242,248,0.5)" : "rgba(240,242,248,0.2)" }}>
                  {identity.tagline}
                </p>
              </div>
            </div>

            {identity.isMain && (
              <div style={{
                background: "rgba(212,166,61,0.12)",
                border: "1px solid rgba(212,166,61,0.3)",
                borderRadius: 12,
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}>
                <span style={{ fontSize: 14 }}>⭐</span>
                <span style={{ fontSize: 13, color: "#D4A63D", fontWeight: 600 }}>Your active identity</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px 24px 48px", overflowY: "auto", maxHeight: "55vh" }}>
          {identity.unlocked ? (
            <p style={{ margin: "0 0 24px", fontSize: 15, color: "rgba(240,242,248,0.7)", lineHeight: 1.65 }}>
              {identity.description}
            </p>
          ) : (
            <div style={{ marginBottom: 24 }}>
              <p style={{ margin: "0 0 16px", fontSize: 15, color: "rgba(240,242,248,0.4)", lineHeight: 1.65 }}>
                This identity is locked. Complete the requirements to reveal who you could become.
              </p>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "16px" }}>
                <p style={{ margin: "0 0 8px", fontSize: 11, color: "rgba(240,242,248,0.3)", letterSpacing: "0.1em" }}>UNLOCK CONDITION</p>
                <p style={{ margin: 0, fontSize: 14, color: "rgba(240,242,248,0.6)", lineHeight: 1.5 }}>{identity.unlockCondition}</p>
              </div>
            </div>
          )}

          {/* Progress */}
          {identity.progress !== undefined && !identity.isMain && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "rgba(240,242,248,0.45)" }}>{identity.progressLabel}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: cfg.dot, fontFamily: "var(--font-mono)" }}>
                  {Math.round(identity.progress * 100)}%
                </span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${identity.progress * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ height: "100%", background: cfg.dot, borderRadius: 3 }}
                />
              </div>
            </div>
          )}

          {/* CTA */}
          {identity.unlocked && !identity.isMain && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { onSetMain(identity.id); onClose(); }}
              style={{
                width: "100%",
                padding: "16px",
                background: `linear-gradient(135deg, ${cfg.badge}, ${cfg.dot})`,
                border: "none",
                borderRadius: 18,
                fontSize: 16,
                fontWeight: 700,
                color: "#0B1023",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                letterSpacing: "-0.01em",
              }}
            >
              Set as Main Identity
            </motion.button>
          )}

          {identity.isMain && (
            <div style={{ textAlign: "center", padding: "12px 0", color: "rgba(240,242,248,0.3)", fontSize: 13 }}>
              This is your current identity
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function IdentityRow({ identity, onTap }: { identity: RunnerIdentity; onTap: () => void }) {
  const cfg = rarityConfig[identity.rarity];

  return (
    <motion.div
      onClick={onTap}
      whileTap={{ scale: 0.975 }}
      style={{
        background: identity.unlocked
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${identity.isMain ? cfg.border : "rgba(255,255,255,0.07)"}`,
        borderRadius: 20,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: identity.isMain ? `0 0 0 1px ${cfg.border}, 0 8px 24px ${cfg.glow}` : "none",
      }}
    >
      {identity.isMain && (
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${cfg.glow} 0%, transparent 60%)`, pointerEvents: "none" }} />
      )}

      {/* Icon */}
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 15,
        background: identity.unlocked ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${identity.unlocked ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26,
        flexShrink: 0,
        filter: identity.unlocked ? "none" : "saturate(0) opacity(0.25)",
      }}>
        {identity.unlocked ? identity.icon : "🔒"}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          <h3 style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 600,
            color: identity.unlocked ? "#F0F2F8" : "rgba(240,242,248,0.25)",
            letterSpacing: "-0.01em",
          }}>
            {identity.name}
          </h3>
          {identity.isMain && (
            <div style={{ background: "rgba(212,166,61,0.15)", border: "1px solid rgba(212,166,61,0.3)", borderRadius: 8, padding: "1px 6px" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#D4A63D", letterSpacing: "0.06em" }}>ACTIVE</span>
            </div>
          )}
        </div>
        <p style={{ margin: "0 0 8px", fontSize: 12, color: identity.unlocked ? "rgba(240,242,248,0.4)" : "rgba(240,242,248,0.15)" }}>
          {identity.tagline}
        </p>

        {/* Progress bar for locked/progressing */}
        {identity.progress !== undefined && identity.progress < 1 && (
          <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${identity.progress * 100}%`, background: cfg.dot, borderRadius: 2 }} />
          </div>
        )}
      </div>

      {/* Rarity dot */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: identity.unlocked ? cfg.dot : "rgba(255,255,255,0.12)" }} />
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 2l5 5-5 5" stroke={identity.unlocked ? "rgba(240,242,248,0.25)" : "rgba(240,242,248,0.1)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  );
}

export function IdentityScreen() {
  const [selected, setSelected] = useState<RunnerIdentity | null>(null);
  const [mainId, setMainId] = useState("i1");

  const identities = IDENTITIES.map((i) => ({ ...i, isMain: i.id === mainId }));
  const unlocked = identities.filter((i) => i.unlocked).length;

  return (
    <div style={{ minHeight: "100dvh", background: "#0B1023", paddingBottom: 96 }}>
      {/* Header */}
      <div style={{ padding: "60px 22px 24px" }}>
        <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 700, color: "#F0F2F8", letterSpacing: "-0.02em" }}>
          Identities
        </h1>
        <p style={{ margin: "0 0 20px", fontSize: 14, color: "rgba(240,242,248,0.4)" }}>
          {unlocked} of {IDENTITIES.length} unlocked · Tap to explore
        </p>

        {/* Active identity hero pill */}
        {(() => {
          const main = identities.find((i) => i.isMain)!;
          const cfg = rarityConfig[main.rarity];
          return (
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${cfg.border}`,
              borderRadius: 20,
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 8,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${cfg.glow} 0%, transparent 55%)`, pointerEvents: "none" }} />
              <div style={{ fontSize: 32, position: "relative", zIndex: 1 }}>{main.icon}</div>
              <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                <p style={{ margin: "0 0 3px", fontSize: 11, color: "rgba(240,242,248,0.35)", letterSpacing: "0.1em" }}>ACTIVE IDENTITY</p>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#F0F2F8", fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                  {main.name}
                </p>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.dot, flexShrink: 0, position: "relative", zIndex: 1 }} />
            </div>
          );
        })()}
      </div>

      {/* ── Identity Forming — shown when early-stage runner ── */}
      <div style={{ padding: "0 22px 16px" }}>
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20,
          padding: "18px 18px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 50%, rgba(46,200,122,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 26 }}>🌱</div>
            <div>
              <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "rgba(240,242,248,0.7)" }}>
                Identity Forming...
              </p>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(240,242,248,0.35)", lineHeight: 1.45 }}>
                We are observing your running style.
              </p>
            </div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "rgba(240,242,248,0.3)" }}>Progress to first identity</span>
              <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "rgba(46,200,122,0.7)" }}>0 / 10 runs</span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
              <div style={{ height: "100%", width: "0%", background: "#2EC87A", borderRadius: 2 }} />
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 11, color: "rgba(240,242,248,0.2)", fontStyle: "italic", fontFamily: "var(--font-display)" }}>
            Every runner starts here.
          </p>
        </div>
      </div>

      {/* Identity list */}
      <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 600, color: "rgba(240,242,248,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          All Identities
        </p>
        {identities.map((identity, i) => (
          <motion.div
            key={identity.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <IdentityRow identity={identity} onTap={() => setSelected(identity)} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <IdentityDetailModal
            identity={{ ...selected, isMain: selected.id === mainId }}
            onClose={() => setSelected(null)}
            onSetMain={(id) => setMainId(id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
