import { motion } from "motion/react";

interface Props {
  onOpen: () => void;
}

// Closed envelope illustration
function ClosedEnvelope() {
  return (
    <svg width="240" height="168" viewBox="0 0 240 168" fill="none">
      {/* Drop shadow */}
      <ellipse cx="120" cy="164" rx="72" ry="6" fill="rgba(0,0,0,0.4)" />

      {/* Envelope body */}
      <rect x="1" y="1" width="238" height="166" rx="14" fill="#131B2E" />
      <rect x="1" y="1" width="238" height="166" rx="14" stroke="rgba(212,166,61,0.22)" strokeWidth="1.5" />

      {/* Left fold shadow */}
      <path d="M 1 1 L 1 167 L 120 95 Z" fill="#0C1422" />
      {/* Right fold shadow */}
      <path d="M 239 1 L 239 167 L 120 95 Z" fill="#0C1422" />
      {/* Bottom fold */}
      <path d="M 1 167 L 120 95 L 239 167 Z" fill="#0F1B2E" />

      {/* Top flap */}
      <path d="M 1 1 L 239 1 L 120 82 Z" fill="#111D34" />
      <path d="M 1 1 L 239 1 L 120 82 Z" stroke="rgba(212,166,61,0.18)" strokeWidth="1" />

      {/* Fold crease lines */}
      <line x1="1" y1="95" x2="239" y2="95" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />

      {/* Wax seal */}
      <circle cx="120" cy="57" r="26" fill="#1A2540" />
      <circle cx="120" cy="57" r="22" fill="#D4A63D" />
      <circle cx="120" cy="57" r="18" fill="#C89020" />
      {/* Seal outer ring texture */}
      <circle cx="120" cy="57" r="22" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
      {/* Seal inner embossed detail */}
      <circle cx="120" cy="57" r="14" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      {/* RP monogram */}
      <text x="119" y="62" textAnchor="middle" fill="#0B1023" fontSize="13" fontWeight="800" fontFamily="var(--font-display)">RP</text>

      {/* Small corner decorations */}
      <circle cx="30" cy="30" r="2" fill="rgba(212,166,61,0.15)" />
      <circle cx="210" cy="30" r="2" fill="rgba(212,166,61,0.15)" />
    </svg>
  );
}

export function NewMailScreen({ onOpen }: Props) {
  return (
    <div style={{
      minHeight: "100dvh",
      background: "#0B1023",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "80px 28px 56px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Warm amber bloom — behind the envelope */}
      <div style={{
        position: "absolute",
        top: "28%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 380,
        height: 380,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,166,61,0.08) 0%, rgba(212,166,61,0.02) 40%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Cool blue secondary glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(26,60,140,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Notification dot */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          background: "rgba(212,166,61,0.08)",
          border: "1px solid rgba(212,166,61,0.18)",
          borderRadius: 20,
          padding: "5px 14px",
        }}
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4A63D" }}
        />
        <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(212,166,61,0.8)", letterSpacing: "0.05em" }}>
          1 new message
        </span>
      </motion.div>

      {/* Envelope — main illustration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Gentle floating animation */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ClosedEnvelope />
        </motion.div>
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ textAlign: "center", width: "100%" }}
      >
        <p style={{
          margin: "0 0 10px",
          fontSize: 24,
          letterSpacing: "0.01em",
          color: "rgba(240,242,248,0.85)",
          lineHeight: 1.3,
        }}>
          📬 A new letter has arrived.
        </p>
        <p style={{
          margin: "0 0 36px",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 17,
          color: "rgba(240,242,248,0.4)",
          lineHeight: 1.55,
          letterSpacing: "0.01em",
        }}>
          For the person who ran 8.42 km today.
        </p>

        {/* Open button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onOpen}
          style={{
            width: "100%",
            padding: "18px",
            background: "linear-gradient(135deg, #C89020, #D4A63D)",
            border: "none",
            borderRadius: 50,
            fontSize: 16,
            fontWeight: 700,
            color: "#0B1023",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            letterSpacing: "-0.01em",
            boxShadow: "0 8px 32px rgba(212,166,61,0.25)",
          }}
        >
          Open
        </motion.button>

        <p style={{ margin: "16px 0 0", fontSize: 12, color: "rgba(240,242,248,0.18)" }}>
          From RunPassport · Your running companion
        </p>
      </motion.div>
    </div>
  );
}
