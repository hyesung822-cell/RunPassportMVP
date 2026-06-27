import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  onContinue: () => void;
}

// Phase timeline:
// 0 — closed, seal intact
// 1 (0.8s) — seal glows, cracks
// 2 (1.8s) — flap lifts, envelope opens
// 3 (2.8s) — paper / card slides out
// 4 (3.6s) — "continue" button appears

type Phase = 0 | 1 | 2 | 3 | 4;

// Wax seal: integrated into the envelope SVG, animated separately
function WaxSeal({ phase }: { phase: Phase }) {
  const breaking = phase >= 1;
  const gone = phase >= 2;

  return (
    <motion.g
      animate={{
        scale: gone ? 0 : breaking ? 1.12 : 1,
        opacity: gone ? 0 : 1,
      }}
      transition={{ duration: gone ? 0.4 : 0.35, ease: "easeInOut" }}
      style={{ transformOrigin: "120px 57px", transformBox: "fill-box" }}
    >
      {/* Outer glow ring (only during breaking) */}
      {breaking && !gone && (
        <circle cx="120" cy="57" r="32" fill="rgba(212,166,61,0.18)" />
      )}
      <circle cx="120" cy="57" r="22" fill="#D4A63D" />
      <circle cx="120" cy="57" r="18" fill="#C89020" />
      <circle cx="120" cy="57" r="14" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <text x="119" y="62" textAnchor="middle" fill="#0B1023" fontSize="13" fontWeight="800" fontFamily="serif">RP</text>

      {/* Crack lines */}
      {breaking && (
        <>
          <line x1="120" y1="35" x2="114" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="0.75" />
          <line x1="128" y1="40" x2="122" y2="54" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          <line x1="112" y1="44" x2="118" y2="58" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
        </>
      )}
    </motion.g>
  );
}

// The envelope flap — animated open
function EnvelopeFlap({ phase }: { phase: Phase }) {
  const open = phase >= 2;
  return (
    <motion.g
      animate={{ scaleY: open ? -0.3 : 1, opacity: open ? 0.5 : 1 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      style={{ transformOrigin: "120px 1px", transformBox: "fill-box" }}
    >
      <path d="M 1 1 L 239 1 L 120 82 Z" fill="#111D34" />
      <path d="M 1 1 L 239 1 L 120 82 Z" stroke="rgba(212,166,61,0.15)" strokeWidth="1" />
    </motion.g>
  );
}

// The paper / letter that slides out of the envelope
function PaperSlide({ phase }: { phase: Phase }) {
  const emerged = phase >= 3;
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: emerged ? -30 : 60, opacity: emerged ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.34, 1.2, 0.64, 1] }}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 160,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Paper sheet */}
      <div style={{
        width: 130,
        background: "linear-gradient(160deg, #1C2A48 0%, #141E34 100%)",
        borderRadius: 12,
        border: "1px solid rgba(212,166,61,0.2)",
        padding: "18px 16px 16px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(212,166,61,0.3)" }} />
        <div style={{ width: "80%", height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)" }} />
        <div style={{ width: "60%", height: 3, borderRadius: 2, background: "rgba(255,255,255,0.04)" }} />
        <div style={{ width: "70%", height: 3, borderRadius: 2, background: "rgba(255,255,255,0.04)" }} />
        <div style={{ marginTop: 4, fontSize: 22 }}>👣</div>
        <div style={{ width: "90%", height: 3, borderRadius: 2, background: "rgba(255,255,255,0.04)" }} />
        <div style={{ width: "75%", height: 3, borderRadius: 2, background: "rgba(255,255,255,0.04)" }} />
      </div>
    </motion.div>
  );
}

export function OpenEnvelopeScreen({ onContinue }: Props) {
  const [phase, setPhase] = useState<Phase>(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1700),
      setTimeout(() => setPhase(3), 2700),
      setTimeout(() => setPhase(4), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const phaseLabels: Record<Phase, string> = {
    0: "Your letter is sealed.",
    1: "Breaking the seal…",
    2: "Opening…",
    3: "Something inside.",
    4: "It has been waiting for you.",
  };

  return (
    <div style={{
      minHeight: "100dvh",
      background: "#07101F",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Deep vignette */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, rgba(11,16,35,0) 30%, rgba(4,8,18,0.8) 100%)",
        pointerEvents: "none",
      }} />

      {/* Ambient envelope glow */}
      <motion.div
        animate={{
          opacity: phase === 1 ? 0.5 : phase >= 2 ? 0.2 : 0.1,
          scale: phase === 1 ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,166,61,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main envelope — SVG with animated parts */}
      <div style={{ position: "relative", zIndex: 5, marginBottom: 48 }}>
        <svg width="240" height="168" viewBox="0 0 240 168" fill="none">
          {/* Drop shadow */}
          <ellipse cx="120" cy="164" rx="72" ry="5" fill="rgba(0,0,0,0.4)" />

          {/* Body */}
          <rect x="1" y="1" width="238" height="166" rx="14" fill="#0F1828" />
          <rect x="1" y="1" width="238" height="166" rx="14" stroke="rgba(212,166,61,0.2)" strokeWidth="1.5" />

          {/* Side folds */}
          <path d="M 1 1 L 1 167 L 120 95 Z" fill="#0A1020" />
          <path d="M 239 1 L 239 167 L 120 95 Z" fill="#0A1020" />

          {/* Bottom fold */}
          <path d="M 1 167 L 120 95 L 239 167 Z" fill="#0C1525" />

          {/* Animated flap */}
          <EnvelopeFlap phase={phase} />

          {/* Animated wax seal */}
          <WaxSeal phase={phase} />
        </svg>

        {/* Paper slide — absolute positioned over envelope */}
        <PaperSlide phase={phase} />
      </div>

      {/* Phase label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={phaseLabels[phase]}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35 }}
          style={{
            margin: "0 0 40px",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 18,
            color: "rgba(240,242,248,0.38)",
            textAlign: "center",
            letterSpacing: "0.01em",
            position: "relative",
            zIndex: 5,
          }}
        >
          {phaseLabels[phase]}
        </motion.p>
      </AnimatePresence>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 7, marginBottom: 44, position: "relative", zIndex: 5 }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              background: phase > i ? "#D4A63D" : "rgba(255,255,255,0.12)",
              scale: phase === i + 1 ? 1.3 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{ width: 5, height: 5, borderRadius: "50%" }}
          />
        ))}
      </div>

      {/* Continue button — appears at phase 4 */}
      <AnimatePresence>
        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
            style={{ width: "calc(100% - 56px)", position: "relative", zIndex: 5 }}
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onContinue}
              style={{
                width: "100%",
                padding: "17px",
                background: "linear-gradient(135deg, #C89020, #D4A63D)",
                border: "none",
                borderRadius: 50,
                fontSize: 15,
                fontWeight: 700,
                color: "#0B1023",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                letterSpacing: "-0.01em",
                boxShadow: "0 8px 28px rgba(212,166,61,0.3)",
              }}
            >
              See what arrived
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
