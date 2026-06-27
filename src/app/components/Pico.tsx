// PICO — Passport Keeper
// Role: emotional companionship only. No evolution, no mechanics.

interface PicoAvatarProps {
  size?: number;
}

export function PicoAvatar({ size = 36 }: PicoAvatarProps) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: "rgba(212,166,61,0.08)",
      border: "1.5px solid rgba(212,166,61,0.28)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}>
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 22 22" fill="none">
        {/* Eyes */}
        <circle cx="8.2" cy="9" r="1.4" fill="rgba(212,166,61,0.75)" />
        <circle cx="13.8" cy="9" r="1.4" fill="rgba(212,166,61,0.75)" />
        {/* Smile */}
        <path d="M 7 13.5 Q 11 17 15 13.5" stroke="rgba(212,166,61,0.55)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

interface PicoMessageProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function PicoMessage({ children, style = {} }: PicoMessageProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, ...style }}>
      <PicoAvatar size={34} />
      <div style={{
        background: "rgba(212,166,61,0.05)",
        border: "1px solid rgba(212,166,61,0.14)",
        borderRadius: "4px 16px 16px 16px",
        padding: "9px 13px",
        flex: 1,
      }}>
        <p style={{
          margin: "0 0 3px",
          fontSize: 9,
          fontWeight: 700,
          color: "rgba(212,166,61,0.45)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily: "var(--font-sans)",
        }}>
          PICO · Passport Keeper
        </p>
        <p style={{
          margin: 0,
          fontSize: 13,
          color: "rgba(240,242,248,0.55)",
          lineHeight: 1.55,
          fontStyle: "italic",
          fontFamily: "var(--font-display)",
        }}>
          {children}
        </p>
      </div>
    </div>
  );
}
