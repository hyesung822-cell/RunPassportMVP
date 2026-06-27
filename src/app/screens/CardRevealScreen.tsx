import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PicoMessage } from "../components/Pico";

interface Props {
  onCollect: () => void;
}

// The special first-ever card — never in the main CARDS array
const FIRST_STEP_CARD = {
  name: "First Step",
  rarity: "COMMON",
  icon: "👣",
  number: "000",
  description: "Today, a runner was born who did not exist yesterday.",
  flavourText: "The only step that truly matters is the one you almost didn't take.",
  category: "SPECIAL",
};

// Floating ambient particles
function Particles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 10 + (i * 7.2) % 80,
    delay: i * 0.28,
    duration: 3.5 + (i % 4) * 0.7,
    size: 2 + (i % 3),
    opacity: 0.1 + (i % 4) * 0.06,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110%", x: `${p.x}%`, opacity: 0 }}
          animate={{ y: "-10%", opacity: [0, p.opacity, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#D4A63D",
          }}
        />
      ))}
    </div>
  );
}

// The collectible card — full premium treatment
function RevealCard({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0.75, opacity: 0, y: 30 }}
      animate={visible ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.75, opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.34, 1.28, 0.64, 1] }}
      style={{ position: "relative" }}
    >
      {/* Card glow halo */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: -28,
          borderRadius: 48,
          background: "radial-gradient(ellipse at center, rgba(160,168,200,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* The card itself */}
      <div style={{
        width: 200,
        height: 296,
        borderRadius: 22,
        background: "linear-gradient(145deg, #4A5068 0%, #7A8099 45%, #5A6078 100%)",
        border: "1px solid rgba(180,188,210,0.4)",
        boxShadow: "0 10px 40px rgba(120,128,160,0.25), inset 0 1px 0 rgba(220,228,248,0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 16px 20px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Shimmer overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 30% 15%, rgba(220,228,255,0.2) 0%, transparent 55%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 70% 85%, rgba(255,255,255,0.05) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />

        {/* Perforation border */}
        <div style={{
          position: "absolute", inset: 6,
          borderRadius: 16,
          border: "1px dashed rgba(255,255,255,0.18)",
          pointerEvents: "none",
        }} />

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", zIndex: 1 }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.04em",
          }}>
            #{FIRST_STEP_CARD.number}
          </span>
          <div style={{ background: "#5A6380", borderRadius: 20, padding: "2px 8px" }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: "#C8D0E0", letterSpacing: "0.1em" }}>
              {FIRST_STEP_CARD.rarity}
            </span>
          </div>
        </div>

        {/* Icon */}
        <div style={{ zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 88,
            height: 88,
            borderRadius: 22,
            background: "rgba(0,0,0,0.22)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 44,
          }}>
            {FIRST_STEP_CARD.icon}
          </div>
        </div>

        {/* Bottom text */}
        <div style={{ zIndex: 1, textAlign: "center", width: "100%" }}>
          <p style={{ margin: "0 0 3px", fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {FIRST_STEP_CARD.category}
          </p>
          <p style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.9)", lineHeight: 1.1 }}>
            {FIRST_STEP_CARD.name}
          </p>
          <p style={{ margin: 0, fontSize: 9.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>
            {FIRST_STEP_CARD.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function CardRevealScreen({ onCollect }: Props) {
  const [cardVisible, setCardVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [collected, setCollected] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setCardVisible(true), 300);
    const t2 = setTimeout(() => setTextVisible(true), 1000);
    const t3 = setTimeout(() => setButtonVisible(true), 1500);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  function handleCollect() {
    setCollected(true);
    setTimeout(onCollect, 700);
  }

  return (
    <div style={{
      minHeight: "100dvh",
      background: "#06101E",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "72px 28px 52px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Deep space background gradients */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 40%, rgba(80,90,130,0.12) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Floating particles */}
      <Particles />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", position: "relative", zIndex: 2 }}
      >
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(160,168,200,0.08)",
          border: "1px solid rgba(160,168,200,0.15)",
          borderRadius: 20,
          padding: "5px 14px",
          marginBottom: 10,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#9AA0B8" }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(160,168,200,0.7)", letterSpacing: "0.1em" }}>
            COMMON · A MEMORY
          </span>
        </div>
        <p style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 20,
          color: "rgba(240,242,248,0.7)",
          lineHeight: 1.3,
        }}>
          A memory has arrived.
        </p>
      </motion.div>

      {/* Card */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <RevealCard visible={cardVisible} />
      </div>

      {/* Description + button */}
      <div style={{ width: "100%", position: "relative", zIndex: 2 }}>
        <AnimatePresence>
          {textVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 20 }}
            >
              <PicoMessage>
                I've kept this one safe for you. It belongs in your passport now.
              </PicoMessage>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {buttonVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: collected ? 0 : 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleCollect}
                style={{
                  width: "100%",
                  padding: "17px",
                  background: collected
                    ? "rgba(46,200,122,0.1)"
                    : "rgba(160,168,200,0.1)",
                  border: `1px solid ${collected ? "rgba(46,200,122,0.3)" : "rgba(160,168,200,0.25)"}`,
                  borderRadius: 50,
                  fontSize: 15,
                  fontWeight: 700,
                  color: collected ? "#2EC87A" : "rgba(200,208,224,0.8)",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "-0.01em",
                  transition: "all 0.2s",
                }}
              >
                {collected ? "✓ Added to Passport" : "Add to Passport"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
