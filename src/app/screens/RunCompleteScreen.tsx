import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { PicoMessage } from "../components/Pico";

interface Props {
  onContinue: () => void;
}

const RUN = {
  distance: 8.42,
  duration: "47:27",
  pace: "5:38",
  date: "Thursday, June 19",
  time: "6:14 AM",
};

// Passport stamp SVG — presses in like an ink stamp
function PassportStamp({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ scale: 1.2, opacity: 0, rotate: -2 }}
      animate={visible ? { scale: 1, opacity: 1, rotate: -2 } : { scale: 1.2, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        {/* Outer dashed ring */}
        <circle cx="70" cy="70" r="66" stroke="rgba(212,166,61,0.35)" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Inner solid ring */}
        <circle cx="70" cy="70" r="58" stroke="rgba(212,166,61,0.25)" strokeWidth="1" />
        {/* Center circle (ink area) */}
        <circle cx="70" cy="70" r="48" fill="rgba(212,166,61,0.04)" stroke="rgba(212,166,61,0.2)" strokeWidth="1" />

        {/* Top arc text */}
        <path id="topArc" d="M 24 70 A 46 46 0 0 1 116 70" fill="none" />
        <text fontSize="8.5" fontWeight="700" fill="rgba(212,166,61,0.6)" letterSpacing="3" fontFamily="var(--font-sans)" textAnchor="middle">
          <textPath href="#topArc" startOffset="50%">RUN PASSPORT</textPath>
        </text>

        {/* Bottom arc text */}
        <path id="botArc" d="M 116 74 A 46 46 0 0 1 24 74" fill="none" />
        <text fontSize="7.5" fontWeight="600" fill="rgba(212,166,61,0.5)" letterSpacing="2.5" fontFamily="var(--font-mono)" textAnchor="middle">
          <textPath href="#botArc" startOffset="50%">JUNE 19 · 2026</textPath>
        </text>

        {/* Center content */}
        <text x="70" y="62" textAnchor="middle" fontSize="22" fontFamily="var(--font-mono)" fontWeight="500" fill="rgba(212,166,61,0.8)" letterSpacing="-1">
          8.42
        </text>
        <text x="70" y="74" textAnchor="middle" fontSize="9" fontFamily="var(--font-sans)" fontWeight="600" fill="rgba(212,166,61,0.45)" letterSpacing="2">
          KM
        </text>
        <line x1="46" y1="80" x2="94" y2="80" stroke="rgba(212,166,61,0.25)" strokeWidth="0.75" />
        <text x="70" y="92" textAnchor="middle" fontSize="7.5" fontFamily="var(--font-mono)" fill="rgba(212,166,61,0.4)" letterSpacing="1">
          {RUN.duration}
        </text>
      </svg>
    </motion.div>
  );
}

export function RunCompleteScreen({ onContinue }: Props) {
  const [stampVisible, setStampVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStampVisible(true), 600);
    const t2 = setTimeout(() => setMessageVisible(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      minHeight: "100dvh",
      background: "#0B1023",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "72px 28px 48px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Very subtle warm glow at center */}
      <div style={{
        position: "absolute",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 320,
        height: 320,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,166,61,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Top section */}
      <div style={{ width: "100%", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            margin: "0 0 6px",
            fontSize: 12,
            color: "rgba(240,242,248,0.3)",
            letterSpacing: "0.1em",
            fontFamily: "var(--font-mono)",
          }}
        >
          {RUN.date} · {RUN.time}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 32,
            fontWeight: 400,
            color: "#F0F2F8",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          Your run is complete.
        </motion.h1>
      </div>

      {/* Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        style={{ width: "100%", textAlign: "center" }}
      >
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 6,
          marginBottom: 18,
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 68,
            fontWeight: 500,
            color: "#F0F2F8",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}>
            {RUN.distance.toFixed(2)}
          </span>
          <span style={{ fontSize: 20, color: "rgba(240,242,248,0.35)", marginBottom: 10 }}>km</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
          {[
            { label: "Duration", value: RUN.duration },
            { label: "Avg Pace", value: RUN.pace, unit: "/km" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ margin: "0 0 3px", fontSize: 10, color: "rgba(240,242,248,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {s.label}
              </p>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 500, color: "rgba(240,242,248,0.8)", lineHeight: 1 }}>
                {s.value}
                {s.unit && <span style={{ fontSize: 12, color: "rgba(240,242,248,0.35)", marginLeft: 2 }}>{s.unit}</span>}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stamp area */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: "100%" }}>
        <PassportStamp visible={stampVisible} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: messageVisible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: "100%" }}
        >
          <PicoMessage>
            Every journey deserves a page. This one is yours.
          </PicoMessage>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: messageVisible ? 1 : 0, y: messageVisible ? 0 : 12 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%" }}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          style={{
            width: "100%",
            padding: "17px",
            background: "rgba(212,166,61,0.1)",
            border: "1px solid rgba(212,166,61,0.25)",
            borderRadius: 50,
            fontSize: 15,
            fontWeight: 600,
            color: "#D4A63D",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.01em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          Continue
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#D4A63D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}
