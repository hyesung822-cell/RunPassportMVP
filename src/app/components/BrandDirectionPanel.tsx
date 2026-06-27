// Brand Direction v2 — RunPassport
// Visual reference board: Moleskine travel journals + vintage passport aesthetics
// This panel lives to the left of the app canvas. Read-only. Never modify app screens.

const IMAGES = {
  notebook:  "https://images.unsplash.com/photo-1470047721614-35220c146849?w=420&h=280&fit=crop&auto=format",
  envelopes: "https://images.unsplash.com/photo-1637597384611-0c33cef6ec03?w=420&h=280&fit=crop&auto=format",
  waxSeal:   "https://images.unsplash.com/photo-1641477176034-1a3e10c343a8?w=320&h=240&fit=crop&auto=format",
  runner:    "https://images.unsplash.com/photo-1696906833563-b17e3fbe2bd4?w=540&h=320&fit=crop&auto=format",
  stamp:     "https://images.unsplash.com/photo-1648994605536-10633d3e0886?w=320&h=240&fit=crop&auto=format",
};

const PALETTE = [
  { hex: "#0B1023", name: "Midnight",       role: "Canvas background"          },
  { hex: "#D4A63D", name: "Passport Gold",  role: "Primary accent, PICO accents" },
  { hex: "#F4EFE6", name: "Page Cream",     role: "Inspiration — warm paper"    },
  { hex: "#7D5234", name: "Leather Brown",  role: "PICO body, warmth"          },
  { hex: "#EFE2C0", name: "Chest Cream",    role: "PICO chest, soft warmth"    },
  { hex: "#2D4B35", name: "Passport Green", role: "Passport notebook cover"    },
  { hex: "#F0F2F8", name: "Soft White",     role: "Foreground text"            },
  { hex: "#8A8A9A", name: "Muted Slate",    role: "Secondary, captions"        },
];

const KEYWORDS = [
  "Cozy", "Warm", "Collectible", "Memory",
  "Travel", "Quiet", "Personal", "Handwritten",
  "Timeless", "Earned", "Kept",
];

const PRINCIPLES = [
  {
    num: "01",
    title: "Memory over metrics",
    desc: "A run is an experience, not a data point. Store the feeling. Let Samsung Health keep the watts.",
  },
  {
    num: "02",
    title: "Ritual over gamification",
    desc: "A passport filled slowly and deliberately. No streaks. No push notifications. No pressure to return.",
  },
  {
    num: "03",
    title: "Companion over chatbot",
    desc: "PICO remembers every journey. PICO never gives advice. PICO just keeps the letters safe until you open them.",
  },
  {
    num: "04",
    title: "Collecting over competing",
    desc: "Every card is earned through running — never purchased, never scored against anyone but yourself.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
      <span style={{
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#8B6040",
        fontFamily: "var(--font-mono)",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}>
        {children}
      </span>
      <div style={{
        flex: 1,
        height: 1,
        backgroundImage: "repeating-linear-gradient(90deg, rgba(139,96,64,0.3) 0px, rgba(139,96,64,0.3) 3px, transparent 3px, transparent 7px)",
      }} />
    </div>
  );
}

function Polaroid({
  src, alt, caption, rotate = 0, tapeColor = "rgba(212,185,120,0.55)", width = 192,
}: {
  src: string; alt: string; caption: string; rotate?: number; tapeColor?: string; width?: number;
}) {
  const imgH = Math.round(width * 0.65);
  return (
    <div style={{ position: "relative", display: "inline-block", flexShrink: 0 }}>
      {/* Washi tape */}
      <div style={{
        position: "absolute",
        top: -9,
        left: "50%",
        transform: `translateX(-50%) rotate(${-rotate * 0.5}deg)`,
        width: width * 0.42,
        height: 17,
        background: tapeColor,
        zIndex: 2,
        borderLeft: "1px solid rgba(180,145,80,0.15)",
        borderRight: "1px solid rgba(180,145,80,0.15)",
      }} />
      {/* Frame */}
      <div style={{
        background: "#FEFCF8",
        padding: "9px 9px 30px",
        boxShadow: "0 4px 18px rgba(60,35,15,0.2), 0 1px 3px rgba(60,35,15,0.1)",
        transform: `rotate(${rotate}deg)`,
        width: width + 18,
      }}>
        <img
          src={src}
          alt={alt}
          style={{
            width,
            height: imgH,
            objectFit: "cover",
            display: "block",
            background: "#D8CFBE",
          }}
        />
        <p style={{
          margin: "8px 0 0",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 10.5,
          color: "rgba(42,26,14,0.5)",
          textAlign: "center",
          lineHeight: 1.3,
        }}>
          {caption}
        </p>
      </div>
    </div>
  );
}

// Tiny hand-sketch of PICO — not the polished asset, a journal doodle
function PicoSketch() {
  return (
    <svg width="80" height="104" viewBox="0 0 80 104" fill="none" style={{ opacity: 0.75 }}>
      {/* Body */}
      <ellipse cx="40" cy="70" rx="22" ry="27" stroke="#7A5230" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      {/* Chest */}
      <ellipse cx="41" cy="73" rx="13" ry="18" stroke="#B8A080" strokeWidth="1" fill="none" opacity="0.55"/>
      {/* Head */}
      <circle cx="40" cy="36" r="20" stroke="#7A5230" strokeWidth="1.6" fill="none"/>
      {/* Crown feathers */}
      <path d="M 34 18 C 33 11 36 7 37 15" stroke="#7A5230" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M 40 16 C 39 9 42 5 43 13" stroke="#7A5230" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M 46 18 C 45 11 48 7 49 15" stroke="#7A5230" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      {/* Eyes */}
      <circle cx="33" cy="33" r="3.2" fill="#7A5230"/>
      <circle cx="31.8" cy="31.8" r="1.1" fill="white"/>
      <circle cx="48" cy="34.5" r="2.8" fill="#7A5230"/>
      <circle cx="47" cy="33.2" r="1" fill="white"/>
      {/* Beak */}
      <path d="M 38 44 L 30 51 L 50 50 Z" fill="#C4922A"/>
      <path d="M 38 47 L 30 51 L 50 50 Z" fill="#9A6E18"/>
      {/* Strap */}
      <path d="M 52 55 C 47 62 40 67 32 70" stroke="#7A5230" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Bag */}
      <rect x="13" y="62" width="20" height="22" rx="3" stroke="#7A5230" strokeWidth="1.5" fill="none"/>
      <path d="M 13 70 L 33 70" stroke="#7A5230" strokeWidth="0.9" strokeDasharray="2 1.5" opacity="0.6"/>
      <circle cx="23" cy="76" r="2.5" stroke="#C4922A" strokeWidth="1.2" fill="none"/>
      {/* Passport peeking */}
      <rect x="16" y="55" width="14" height="10" rx="2" stroke="#3A6045" strokeWidth="1.2" fill="none"/>
      {/* Feet */}
      <path d="M 32 95 L 29 103" stroke="#7A5230" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 32 95 L 36 103" stroke="#7A5230" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 32 95 L 40 100" stroke="#7A5230" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 50 95 L 47 103" stroke="#7A5230" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 50 95 L 54 103" stroke="#7A5230" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 50 95 L 58 100" stroke="#7A5230" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// Ink stamp decorative mark
function InkStamp({ text, size = 56 }: { text: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 3}
        stroke="rgba(139,96,64,0.28)" strokeWidth="1.5" strokeDasharray="2.5 2"/>
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 9}
        stroke="rgba(139,96,64,0.15)" strokeWidth="0.75"/>
      <text
        x={size / 2} y={size / 2 + 4}
        textAnchor="middle"
        fontSize={size * 0.16}
        fill="rgba(139,96,64,0.4)"
        fontFamily="Georgia, serif"
        fontWeight="600"
        letterSpacing="1"
      >
        {text}
      </text>
    </svg>
  );
}

// ─── Main Panel ───────────────────────────────────────────────────────────────

export function BrandDirectionPanel() {
  return (
    <div style={{
      width: 480,
      flexShrink: 0,
      height: "100dvh",
      overflowY: "auto",
      overflowX: "hidden",
      scrollbarWidth: "none",
      fontFamily: "var(--font-sans)",
      borderRight: "1px solid rgba(0,0,0,0.18)",
    }}>

      {/* ── COVER — leather notebook ────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(160deg, #241608 0%, #2E1C0A 50%, #1E1205 100%)",
        padding: "44px 40px 36px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Embossed grid texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          pointerEvents: "none",
        }} />
        {/* Corner bookmark ribbon */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: 0, height: 0,
          borderStyle: "solid",
          borderWidth: "0 48px 48px 0",
          borderColor: `transparent rgba(212,166,61,0.35) transparent transparent`,
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Stamp mark */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "rgba(212,166,61,0.1)",
              border: "1px solid rgba(212,166,61,0.25)",
              borderRadius: 6,
              padding: "4px 10px",
            }}>
              <svg width="6" height="6" viewBox="0 0 6 6">
                <circle cx="3" cy="3" r="3" fill="#D4A63D" opacity="0.6"/>
              </svg>
              <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(212,166,61,0.6)", letterSpacing: "0.14em" }}>
                RUNPASSPORT
              </span>
            </div>
          </div>

          <h1 style={{
            margin: "0 0 6px",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 42,
            fontWeight: 400,
            color: "#EDE8DC",
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
          }}>
            Brand Direction
          </h1>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 4 }}>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(237,232,220,0.35)", letterSpacing: "0.05em" }}>
              Visual Reference Board
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                background: "#D4A63D",
                color: "#1E1205",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.06em",
                borderRadius: 5,
                padding: "3px 8px",
              }}>
                v2
              </span>
              <span style={{ fontSize: 11, color: "rgba(237,232,220,0.25)", fontFamily: "var(--font-mono)" }}>
                June 2026
              </span>
            </div>
          </div>

          {/* Cover rule */}
          <div style={{ height: 1, background: "rgba(237,232,220,0.1)", margin: "22px 0 0" }} />
        </div>
      </div>

      {/* ── PAPER BODY ─────────────────────────────────────────────────── */}
      <div style={{
        background: "#F4EFE6",
        backgroundImage: "linear-gradient(rgba(140,100,60,0.09) 1px, transparent 1px)",
        backgroundSize: "100% 28px",
        backgroundPosition: "0 0",
        padding: "36px 40px 60px",
        position: "relative",
      }}>

        {/* ── PHILOSOPHY ─────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 48 }}>
          <SectionLabel>Philosophy</SectionLabel>

          <p style={{
            margin: "0 0 14px",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 26,
            fontWeight: 400,
            color: "#2A1A0E",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}>
            "Not a fitness dashboard."
          </p>
          <p style={{
            margin: "0 0 22px",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 22,
            fontWeight: 400,
            color: "#5C3A1E",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}>
            "A memory collection system<br />for runners."
          </p>

          <div style={{ paddingLeft: 14, borderLeft: "2px solid rgba(139,96,64,0.3)" }}>
            <p style={{ margin: "0 0 8px", fontSize: 13, color: "rgba(42,26,14,0.6)", lineHeight: 1.65 }}>
              Users already use Samsung Health, Apple Watch, or Strava for data.
              RunPassport is their second layer — a collection of memories and identities
              that grows slowly, earned through running, kept forever.
            </p>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(42,26,14,0.4)", lineHeight: 1.5, fontStyle: "italic", fontFamily: "var(--font-display)" }}>
              "I want to add one more page to my passport." — not "I should run again."
            </p>
          </div>
        </div>

        {/* ── MOOD BOARD ─────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 52 }}>
          <SectionLabel>Mood Board</SectionLabel>

          {/* Row 1 — two polaroids */}
          <div style={{
            display: "flex",
            gap: 28,
            alignItems: "flex-start",
            marginBottom: 36,
            paddingLeft: 4,
          }}>
            <Polaroid
              src={IMAGES.notebook}
              alt="Notebook and coffee, warm morning light"
              caption="Morning pages. The ritual before the run."
              rotate={-2.5}
              tapeColor="rgba(210,182,118,0.6)"
              width={184}
            />
            <Polaroid
              src={IMAGES.envelopes}
              alt="Pile of vintage envelopes"
              caption="Letters never lost. Journeys never forgotten."
              rotate={2}
              tapeColor="rgba(235,220,190,0.75)"
              width={176}
            />
          </div>

          {/* Row 2 — large + small */}
          <div style={{
            display: "flex",
            gap: 24,
            alignItems: "flex-start",
            paddingLeft: 16,
          }}>
            <Polaroid
              src={IMAGES.runner}
              alt="Two figures walking on a foggy road at dawn"
              caption="The quiet hours belong to runners."
              rotate={-1.2}
              tapeColor="rgba(210,182,118,0.55)"
              width={218}
            />
            <Polaroid
              src={IMAGES.waxSeal}
              alt="Gold wax seal on paper"
              caption="Sealed and kept."
              rotate={3}
              tapeColor="rgba(235,220,190,0.7)"
              width={130}
            />
          </div>
        </div>

        {/* ── COLOR PALETTE ──────────────────────────────────────────────── */}
        <div style={{ marginBottom: 48 }}>
          <SectionLabel>Color Palette</SectionLabel>

          {/* App colors row */}
          <p style={{ margin: "0 0 12px", fontSize: 9, color: "#8B6040", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            App
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", marginBottom: 20 }}>
            {PALETTE.slice(0, 4).map((s) => (
              <div key={s.hex} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 7,
                  background: s.hex,
                  border: "1px solid rgba(42,26,14,0.12)",
                  flexShrink: 0,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                }} />
                <div>
                  <p style={{ margin: "0 0 1px", fontSize: 12, fontWeight: 600, color: "#2A1A0E", lineHeight: 1 }}>
                    {s.name}
                  </p>
                  <p style={{ margin: 0, fontSize: 9, color: "rgba(42,26,14,0.4)", fontFamily: "var(--font-mono)" }}>
                    {s.hex} · {s.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Inspiration colors row */}
          <p style={{ margin: "0 0 12px", fontSize: 9, color: "#8B6040", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            Inspirations
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
            {PALETTE.slice(4).map((s) => (
              <div key={s.hex} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 7,
                  background: s.hex,
                  border: "1px solid rgba(42,26,14,0.12)",
                  flexShrink: 0,
                }} />
                <div>
                  <p style={{ margin: "0 0 1px", fontSize: 12, fontWeight: 600, color: "#2A1A0E", lineHeight: 1 }}>
                    {s.name}
                  </p>
                  <p style={{ margin: 0, fontSize: 9, color: "rgba(42,26,14,0.4)", fontFamily: "var(--font-mono)" }}>
                    {s.hex} · {s.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TYPOGRAPHY ─────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 48 }}>
          <SectionLabel>Typography</SectionLabel>

          {/* Display */}
          <div style={{
            background: "rgba(42,26,14,0.04)",
            border: "1px solid rgba(42,26,14,0.08)",
            borderRadius: 12,
            padding: "18px 18px 14px",
            marginBottom: 12,
          }}>
            <p style={{ margin: "0 0 4px", fontSize: 9, color: "#8B6040", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
              Instrument Serif — Display, Emotional
            </p>
            <p style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 24,
              fontWeight: 400,
              color: "#2A1A0E",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
            }}>
              "Every journey deserves<br />a page in your passport."
            </p>
          </div>

          {/* Body */}
          <div style={{
            background: "rgba(42,26,14,0.04)",
            border: "1px solid rgba(42,26,14,0.08)",
            borderRadius: 12,
            padding: "16px 18px 12px",
            marginBottom: 12,
          }}>
            <p style={{ margin: "0 0 6px", fontSize: 9, color: "#8B6040", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
              DM Sans — Body, Clear, Readable
            </p>
            <p style={{ margin: "0 0 3px", fontSize: 15, color: "#2A1A0E", fontWeight: 500, lineHeight: 1.4 }}>
              Running since March 2021 · 94 journeys collected.
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(42,26,14,0.55)", lineHeight: 1.5 }}>
              Your run has been added to your passport.
            </p>
          </div>

          {/* Mono */}
          <div style={{
            background: "rgba(42,26,14,0.04)",
            border: "1px solid rgba(42,26,14,0.08)",
            borderRadius: 12,
            padding: "16px 18px 12px",
          }}>
            <p style={{ margin: "0 0 6px", fontSize: 9, color: "#8B6040", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
              DM Mono — Data, Structural, Honest
            </p>
            <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 19, color: "#2A1A0E", fontWeight: 500, letterSpacing: "-0.02em" }}>
              8.42 km · 47:27 · 5:38<span style={{ fontSize: 12 }}>/km</span>
            </p>
          </div>

          <p style={{ margin: "14px 0 0", fontSize: 11, color: "rgba(42,26,14,0.4)", fontStyle: "italic", fontFamily: "var(--font-display)", lineHeight: 1.5 }}>
            Serif adds warmth. Sans adds clarity. Mono adds honesty.<br />
            Together they sound like a handwritten letter with precise coordinates.
          </p>
        </div>

        {/* ── KEYWORDS ───────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 48 }}>
          <SectionLabel>Keywords</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {KEYWORDS.map((kw) => (
              <span key={kw} style={{
                background: "rgba(139,96,64,0.07)",
                border: "1px solid rgba(139,96,64,0.22)",
                borderRadius: 20,
                padding: "5px 14px",
                fontSize: 13,
                color: "#6B4A2A",
                fontWeight: 500,
              }}>
                {kw}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 18, display: "flex", gap: 14, alignItems: "center" }}>
            <InkStamp text="COZY" size={52} />
            <InkStamp text="TRAVEL" size={52} />
            <InkStamp text="MEMORY" size={52} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 11, color: "rgba(42,26,14,0.38)", fontStyle: "italic", fontFamily: "var(--font-display)", lineHeight: 1.6 }}>
                Not excitement. Not achievement. The quiet satisfaction of a stamp in the right page.
              </p>
            </div>
          </div>
        </div>

        {/* ── PICO ───────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 48 }}>
          <SectionLabel>PICO — Passport Keeper</SectionLabel>

          <div style={{
            display: "flex",
            gap: 20,
            alignItems: "flex-start",
            background: "rgba(139,96,64,0.05)",
            border: "1px solid rgba(139,96,64,0.15)",
            borderRadius: 16,
            padding: "20px 20px",
          }}>
            {/* Sketch */}
            <div style={{ flexShrink: 0, marginTop: -4 }}>
              <PicoSketch />
            </div>

            {/* Description */}
            <div style={{ flex: 1 }}>
              <p style={{
                margin: "0 0 4px",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 20,
                fontWeight: 400,
                color: "#2A1A0E",
              }}>
                PICO
              </p>
              <p style={{ margin: "0 0 12px", fontSize: 11, color: "#8B6040", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                Small post bird · Passport Keeper
              </p>
              <p style={{ margin: "0 0 10px", fontSize: 13, color: "rgba(42,26,14,0.65)", lineHeight: 1.6 }}>
                PICO delivers memories, keeps passports, and writes annual letters to runners.
                PICO remembers every journey, but never asks for attention.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {[
                  { label: "Personality", value: "Calm, observant, warm, unhurried" },
                  { label: "Props",       value: "Messenger bag · passport notebook" },
                  { label: "Colors",      value: "Warm brown body · cream chest · gold" },
                  { label: "References",  value: "The Little Prince · Animal Crossing · Moleskine" },
                ].map((r) => (
                  <div key={r.label} style={{ display: "flex", gap: 10, fontSize: 11 }}>
                    <span style={{ color: "#8B6040", minWidth: 68, flexShrink: 0, fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
                      {r.label}
                    </span>
                    <span style={{ color: "rgba(42,26,14,0.6)" }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── REFERENCES ─────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 48 }}>
          <SectionLabel>Inspirations</SectionLabel>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { icon: "📓", name: "Moleskine",         desc: "Physical, tactile, coveted. A journal you don't want to fill too fast." },
              { icon: "✉️", name: "European post",      desc: "Wax seals, handwritten addresses, the ceremony of sending something by hand." },
              { icon: "🗺️", name: "Vintage travel",     desc: "The passport as artifact — stamps as trophies of having been somewhere." },
              { icon: "👑", name: "The Little Prince",  desc: "A quiet companion. Observant. Warm. Never loud. Always there." },
            ].map((r) => (
              <div key={r.name} style={{
                background: "rgba(42,26,14,0.04)",
                border: "1px solid rgba(42,26,14,0.08)",
                borderRadius: 12,
                padding: "14px 14px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                  <span style={{ fontSize: 16 }}>{r.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#2A1A0E" }}>{r.name}</span>
                </div>
                <p style={{ margin: 0, fontSize: 11.5, color: "rgba(42,26,14,0.55)", lineHeight: 1.55 }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── DESIGN PRINCIPLES ──────────────────────────────────────────── */}
        <div style={{ marginBottom: 52 }}>
          <SectionLabel>Design Principles</SectionLabel>

          {PRINCIPLES.map((p, i) => (
            <div key={p.num} style={{
              display: "flex",
              gap: 18,
              paddingBottom: 22,
              marginBottom: 22,
              borderBottom: i < PRINCIPLES.length - 1
                ? "1px dashed rgba(139,96,64,0.18)"
                : "none",
            }}>
              <span style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 28,
                color: "rgba(139,96,64,0.25)",
                lineHeight: 1,
                minWidth: 36,
                flexShrink: 0,
                marginTop: -2,
              }}>
                {p.num}
              </span>
              <div>
                <p style={{ margin: "0 0 5px", fontSize: 14, fontWeight: 600, color: "#2A1A0E", lineHeight: 1.2 }}>
                  {p.title}
                </p>
                <p style={{ margin: 0, fontSize: 12.5, color: "rgba(42,26,14,0.55)", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── FIFTH IMAGE — full-width closing mood ──────────────────────── */}
        <div style={{ marginBottom: 44 }}>
          <div style={{
            position: "relative",
            background: "#FEFCF8",
            padding: "10px 10px 36px",
            boxShadow: "0 4px 20px rgba(60,35,15,0.2)",
            transform: "rotate(0.5deg)",
          }}>
            {/* Tape top center */}
            <div style={{
              position: "absolute", top: -10, left: "50%",
              transform: "translateX(-50%) rotate(-0.3deg)",
              width: 120, height: 18,
              background: "rgba(212,185,120,0.55)",
            }} />
            <img
              src={IMAGES.stamp}
              alt="Postal stamp mark on paper"
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                display: "block",
                background: "#D8CFBE",
              }}
            />
            <p style={{
              margin: "10px 0 0",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 12,
              color: "rgba(42,26,14,0.45)",
              textAlign: "center",
            }}>
              Every run leaves an impression.
            </p>
          </div>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────────────── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingTop: 20,
          borderTop: "1px solid rgba(139,96,64,0.18)",
        }}>
          <div>
            <p style={{ margin: "0 0 3px", fontSize: 13, fontWeight: 600, color: "#2A1A0E", fontFamily: "var(--font-display)", fontStyle: "italic" }}>
              RunPassport
            </p>
            <p style={{ margin: 0, fontSize: 10, color: "rgba(42,26,14,0.35)", fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>
              BRAND DIRECTION V2 · JUNE 2026
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <InkStamp text="COLLECTED" size={44} />
            <InkStamp text="KEPT" size={44} />
          </div>
        </div>
      </div>
    </div>
  );
}
