// PICO — Passport Keeper
// Three-variant mascot character system for RunPassport
// Full body · UI avatar · App icon

// ─── Full Body Illustration ───────────────────────────────────────────────────
// ViewBox 0 0 280 390 — warm storybook post-bird, standing, slight 3/4 turn

function PicoFullBody() {
  return (
    <svg
      viewBox="0 0 280 390"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      {/* ── TAIL FEATHERS (behind body) ───────────────────────── */}
      <path
        d="M 112 338 C 102 358 114 376 130 364 L 140 356 L 150 364 C 166 376 178 358 168 338 Q 154 348 140 350 Q 126 348 112 338 Z"
        fill="#6B4226"
      />
      {/* Tail feather splits — subtle, storybook hatching */}
      <path d="M 128 350 L 119 372" stroke="#5C3A1E" strokeWidth="1.1" strokeLinecap="round" opacity="0.55"/>
      <path d="M 140 353 L 140 375" stroke="#5C3A1E" strokeWidth="1.1" strokeLinecap="round" opacity="0.55"/>
      <path d="M 152 350 L 161 372" stroke="#5C3A1E" strokeWidth="1.1" strokeLinecap="round" opacity="0.55"/>

      {/* ── RIGHT WING — far side, darker ─────────────────────── */}
      <path
        d="M 208 238 C 226 256 230 284 222 310 C 216 328 202 336 190 328 C 198 306 212 276 210 252 Z"
        fill="#6B4226"
      />
      {/* Far wing feather lines */}
      <path d="M 224 262 C 225 280 222 300 218 314" stroke="#5C3A1E" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M 215 258 C 216 276 214 295 210 309" stroke="#5C3A1E" strokeWidth="1" fill="none" opacity="0.4"/>

      {/* ── BODY (organic egg form) ───────────────────────────── */}
      <path
        d="M 140 168
           C 116 168 94 181 80 202
           C 66 222 62 250 64 276
           C 64 302 74 328 90 344
           C 106 358 124 364 140 364
           C 156 364 174 358 190 344
           C 206 328 216 302 216 276
           C 218 250 214 222 200 202
           C 186 181 164 168 140 168 Z"
        fill="#7D5234"
      />

      {/* ── LEFT WING — near side, behind bag ────────────────── */}
      <path
        d="M 66 240 C 52 260 48 288 58 314 C 66 332 80 340 94 332 C 84 308 70 276 70 252 Z"
        fill="#6B4226"
      />
      {/* Near wing feather lines */}
      <path d="M 54 268 C 56 286 58 306 62 318" stroke="#5C3A1E" strokeWidth="1.3" fill="none" opacity="0.5"/>
      <path d="M 62 264 C 64 282 66 301 68 314" stroke="#5C3A1E" strokeWidth="1.1" fill="none" opacity="0.4"/>

      {/* ── CHEST (warm cream) ───────────────────────────────── */}
      <ellipse cx="143" cy="280" rx="52" ry="66" fill="#EFE2C0"/>

      {/* Chest feather texture — subtle curved hatching */}
      <path d="M 132 254 C 133 270 134 288 132 304" stroke="#D9CBA8" strokeWidth="1.3" fill="none" opacity="0.55"/>
      <path d="M 143 251 C 144 268 144 286 143 302" stroke="#D9CBA8" strokeWidth="1.1" fill="none" opacity="0.45"/>
      <path d="M 154 254 C 155 270 155 288 153 303" stroke="#D9CBA8" strokeWidth="1.3" fill="none" opacity="0.55"/>

      {/* ── HEAD ─────────────────────────────────────────────── */}
      <circle cx="140" cy="100" r="68" fill="#7D5234"/>

      {/* Crown shadow — darker cap on top of head */}
      <path
        d="M 84 76 C 90 46 112 28 140 26 C 168 28 190 46 196 76
           C 180 63 162 57 140 56 C 118 57 100 63 84 76 Z"
        fill="#6B4226"
      />

      {/* ── CROWN FEATHERS — three delicate wisps ────────────── */}
      <path d="M 130 44 C 127 30 131 19 133 33" fill="#7D5234" stroke="#5C3A1E" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M 140 39 C 138 24 142 13 144 27" fill="#7D5234" stroke="#5C3A1E" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M 150 44 C 148 30 153 20 154 34" fill="#7D5234" stroke="#5C3A1E" strokeWidth="1.4" strokeLinecap="round"/>

      {/* ── EYES ─────────────────────────────────────────────── */}
      {/* Right eye — slightly far, a touch smaller and higher */}
      <ellipse cx="164" cy="103" rx="11" ry="10" transform="rotate(-5 164 103)" fill="#1A0E06"/>
      <circle cx="161" cy="100" r="3.8" fill="white"/>
      {/* Left eye — near, slightly larger, calm almond */}
      <ellipse cx="118" cy="100" rx="12.5" ry="11" transform="rotate(-8 118 100)" fill="#1A0E06"/>
      <circle cx="115" cy="97" r="4.4" fill="white"/>

      {/* ── BEAK — small, neat, gold wedge, slight 3/4 angle ── */}
      {/* Upper beak */}
      <path d="M 142 124 L 124 141 L 164 139 Z" fill="#D4A63D"/>
      {/* Lower mandible — darker gold, suggests the mouth line */}
      <path d="M 142 128 L 124 141 L 164 139 Z" fill="#B07818"/>
      {/* Beak dividing line */}
      <path d="M 124 141 L 164 139" stroke="#8A5A10" strokeWidth="0.9"/>

      {/* ── MESSENGER BAG STRAP ──────────────────────────────── */}
      {/* Outer strap (thicker, lighter) */}
      <path
        d="M 172 172 C 162 190 144 208 124 224 C 110 236 96 246 88 262"
        stroke="#8B6040"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      {/* Inner strap (leather color) */}
      <path
        d="M 172 172 C 162 190 144 208 124 224 C 110 236 96 246 88 262"
        stroke="#6B4726"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      {/* Strap edge shadow */}
      <path
        d="M 172 172 C 162 190 144 208 124 224 C 110 236 96 246 88 262"
        stroke="#3E2210"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Strap buckle (small gold rectangle) */}
      <rect x="130" y="220" width="13" height="9" rx="2.5" fill="#D4A63D"/>
      <rect x="130" y="220" width="13" height="9" rx="2.5" stroke="#B07818" strokeWidth="0.8" fill="none"/>
      <line x1="136" y1="220" x2="136" y2="229" stroke="#B07818" strokeWidth="1.2"/>

      {/* ── MESSENGER BAG BODY ───────────────────────────────── */}
      {/* Bag body */}
      <rect x="72" y="264" width="66" height="58" rx="8" fill="#3E2712"/>
      {/* Bag side depth shadow */}
      <rect x="72" y="264" width="10" height="58" rx="8" fill="#2D1C0A" opacity="0.6"/>
      {/* Bag bottom edge highlight */}
      <path d="M 80 320 Q 105 324 136 320" stroke="#5C3A1E" strokeWidth="0.7" fill="none" opacity="0.5"/>

      {/* ── BAG FLAP ─────────────────────────────────────────── */}
      <path
        d="M 72 264 L 138 264
           C 136 280 132 294 122 300
           C 108 308 88 306 78 299
           C 72 293 72 280 72 264 Z"
        fill="#4A2E14"
      />
      {/* Flap stitching — subtle dashed line */}
      <path
        d="M 74 290 C 86 298 106 300 134 295"
        stroke="#2D1C0A"
        strokeWidth="0.9"
        fill="none"
        strokeDasharray="2.5 2.5"
        opacity="0.55"
      />

      {/* ── BAG CLASP (gold) ─────────────────────────────────── */}
      <circle cx="105" cy="294" r="7" fill="#D4A63D"/>
      <circle cx="105" cy="294" r="5" fill="#C08818"/>
      <circle cx="103.5" cy="292.5" r="2" fill="#F0C850" opacity="0.75"/>

      {/* ── PASSPORT NOTEBOOK — peeking from bag top ─────────── */}
      {/* Book body */}
      <rect x="82" y="250" width="38" height="24" rx="4" fill="#2D4B35"/>
      {/* Binding spine */}
      <rect x="82" y="250" width="6" height="24" rx="3" fill="#1E3225"/>
      {/* Cover ruled lines */}
      <path d="M 92 257 L 116 257" stroke="#3D6645" strokeWidth="0.9" opacity="0.7"/>
      <path d="M 92 262 L 110 262" stroke="#3D6645" strokeWidth="0.8" opacity="0.5"/>
      {/* Small gold emblem */}
      <circle cx="104" cy="268" r="5" fill="#D4A63D" opacity="0.62"/>
      {/* Emblem crosshair */}
      <path d="M 101 268 L 107 268 M 104 265 L 104 271" stroke="#8A5A10" strokeWidth="0.9" opacity="0.8"/>

      {/* ── FEET + LEGS ──────────────────────────────────────── */}
      {/* Left leg */}
      <path d="M 130 356 L 128 374" stroke="#7A5230" strokeWidth="6" strokeLinecap="round"/>
      {/* Left toes */}
      <path d="M 128 374 L 115 385" stroke="#7A5230" strokeWidth="4.5" strokeLinecap="round"/>
      <path d="M 128 374 L 131 386" stroke="#7A5230" strokeWidth="4.5" strokeLinecap="round"/>
      <path d="M 128 374 L 141 383" stroke="#7A5230" strokeWidth="4.5" strokeLinecap="round"/>
      {/* Right leg */}
      <path d="M 152 356 L 154 374" stroke="#7A5230" strokeWidth="6" strokeLinecap="round"/>
      {/* Right toes */}
      <path d="M 154 374 L 141 385" stroke="#7A5230" strokeWidth="4.5" strokeLinecap="round"/>
      <path d="M 154 374 L 157 386" stroke="#7A5230" strokeWidth="4.5" strokeLinecap="round"/>
      <path d="M 154 374 L 167 383" stroke="#7A5230" strokeWidth="4.5" strokeLinecap="round"/>
    </svg>
  );
}

// ─── UI Avatar ────────────────────────────────────────────────────────────────
// ViewBox 0 0 80 80 — head bust, recognizable at 32–80px

function PicoAvatarSVG() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      {/* Outer ring — subtle gold halo, shows context against dark bg */}
      <circle cx="40" cy="40" r="38" fill="rgba(212,166,61,0.07)" stroke="rgba(212,166,61,0.25)" strokeWidth="1.2"/>

      {/* Body stub — shows bag strap, anchors character */}
      <path
        d="M 20 68 C 18 76 40 80 40 80 C 40 80 62 76 60 68
           C 58 62 50 58 40 58 C 30 58 22 62 20 68 Z"
        fill="#7D5234"
      />
      {/* Chest */}
      <ellipse cx="40" cy="72" rx="16" ry="11" fill="#EFE2C0"/>

      {/* Bag strap hint crossing body */}
      <path d="M 52 57 C 48 62 44 66 38 70" stroke="#6B4726" strokeWidth="3.5" strokeLinecap="round" opacity="0.9"/>

      {/* Head */}
      <circle cx="40" cy="33" r="24" fill="#7D5234"/>
      {/* Crown shadow */}
      <path d="M 20 22 C 23 12 31 8 40 8 C 49 8 57 12 60 22 C 54 17 47 15 40 15 C 33 15 26 17 20 22 Z" fill="#6B4226"/>

      {/* Crown feathers — two tiny wisps */}
      <path d="M 37 12 C 36 7 38 4 39 9" stroke="#5C3A1E" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M 43 12 C 42 7 44 4 45 9" stroke="#5C3A1E" strokeWidth="1.1" strokeLinecap="round"/>

      {/* Eyes — bold enough to read at 32px */}
      <circle cx="32" cy="31" r="4.8" fill="#1A0E06"/>
      <circle cx="30.5" cy="29.5" r="1.7" fill="white"/>
      <circle cx="48" cy="32" r="4.2" fill="#1A0E06"/>
      <circle cx="46.5" cy="30.5" r="1.4" fill="white"/>

      {/* Beak */}
      <path d="M 39 40 L 30 48 L 51 47 Z" fill="#D4A63D"/>
      <path d="M 39 43 L 30 48 L 51 47 Z" fill="#B07818"/>
      <path d="M 30 48 L 51 47" stroke="#8A5A10" strokeWidth="0.7"/>
    </svg>
  );
}

// ─── App Icon ─────────────────────────────────────────────────────────────────
// ViewBox 0 0 512 512 — dark navy tile, PICO fills 70% of canvas

function PicoAppIconSVG() {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      {/* Tile background */}
      <rect width="512" height="512" rx="112" fill="#0B1023"/>
      {/* Subtle warm bloom behind PICO */}
      <ellipse cx="256" cy="280" rx="180" ry="170" fill="rgba(212,166,61,0.04)"/>

      {/* ── PICO at icon scale — scaled 1.68× and centered ──── */}
      {/* Using g transform to scale from 280×390 → fits in ~470×390 crop of 512×512 */}
      <g transform="translate(88, 38) scale(1.68)">

        {/* Tail */}
        <path d="M 112 338 C 102 358 114 376 130 364 L 140 356 L 150 364 C 166 376 178 358 168 338 Q 154 348 140 350 Q 126 348 112 338 Z" fill="#6B4226"/>
        <path d="M 128 350 L 119 372" stroke="#5C3A1E" strokeWidth="1.1" strokeLinecap="round" opacity="0.5"/>
        <path d="M 140 353 L 140 375" stroke="#5C3A1E" strokeWidth="1.1" strokeLinecap="round" opacity="0.5"/>
        <path d="M 152 350 L 161 372" stroke="#5C3A1E" strokeWidth="1.1" strokeLinecap="round" opacity="0.5"/>

        {/* Right wing */}
        <path d="M 208 238 C 226 256 230 284 222 310 C 216 328 202 336 190 328 C 198 306 212 276 210 252 Z" fill="#6B4226"/>
        <path d="M 224 262 C 225 280 222 300 218 314" stroke="#5C3A1E" strokeWidth="1.2" fill="none" opacity="0.45"/>

        {/* Body */}
        <path d="M 140 168 C 116 168 94 181 80 202 C 66 222 62 250 64 276 C 64 302 74 328 90 344 C 106 358 124 364 140 364 C 156 364 174 358 190 344 C 206 328 216 302 216 276 C 218 250 214 222 200 202 C 186 181 164 168 140 168 Z" fill="#7D5234"/>

        {/* Left wing */}
        <path d="M 66 240 C 52 260 48 288 58 314 C 66 332 80 340 94 332 C 84 308 70 276 70 252 Z" fill="#6B4226"/>
        <path d="M 54 268 C 56 286 58 306 62 318" stroke="#5C3A1E" strokeWidth="1.3" fill="none" opacity="0.45"/>

        {/* Chest */}
        <ellipse cx="143" cy="280" rx="52" ry="66" fill="#EFE2C0"/>
        <path d="M 132 254 C 133 270 134 288 132 304" stroke="#D9CBA8" strokeWidth="1.3" fill="none" opacity="0.5"/>
        <path d="M 143 251 C 144 268 144 286 143 302" stroke="#D9CBA8" strokeWidth="1.1" fill="none" opacity="0.4"/>
        <path d="M 154 254 C 155 270 155 288 153 303" stroke="#D9CBA8" strokeWidth="1.3" fill="none" opacity="0.5"/>

        {/* Head */}
        <circle cx="140" cy="100" r="68" fill="#7D5234"/>
        <path d="M 84 76 C 90 46 112 28 140 26 C 168 28 190 46 196 76 C 180 63 162 57 140 56 C 118 57 100 63 84 76 Z" fill="#6B4226"/>

        {/* Crown feathers */}
        <path d="M 130 44 C 127 30 131 19 133 33" fill="#7D5234" stroke="#5C3A1E" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 140 39 C 138 24 142 13 144 27" fill="#7D5234" stroke="#5C3A1E" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M 150 44 C 148 30 153 20 154 34" fill="#7D5234" stroke="#5C3A1E" strokeWidth="1.4" strokeLinecap="round"/>

        {/* Eyes */}
        <ellipse cx="164" cy="103" rx="11" ry="10" transform="rotate(-5 164 103)" fill="#1A0E06"/>
        <circle cx="161" cy="100" r="3.8" fill="white"/>
        <ellipse cx="118" cy="100" rx="12.5" ry="11" transform="rotate(-8 118 100)" fill="#1A0E06"/>
        <circle cx="115" cy="97" r="4.4" fill="white"/>

        {/* Beak */}
        <path d="M 142 124 L 124 141 L 164 139 Z" fill="#D4A63D"/>
        <path d="M 142 128 L 124 141 L 164 139 Z" fill="#B07818"/>
        <path d="M 124 141 L 164 139" stroke="#8A5A10" strokeWidth="0.9"/>

        {/* Bag strap */}
        <path d="M 172 172 C 162 190 144 208 124 224 C 110 236 96 246 88 262" stroke="#8B6040" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d="M 172 172 C 162 190 144 208 124 224 C 110 236 96 246 88 262" stroke="#6B4726" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <rect x="130" y="220" width="13" height="9" rx="2.5" fill="#D4A63D"/>

        {/* Bag */}
        <rect x="72" y="264" width="66" height="58" rx="8" fill="#3E2712"/>
        <rect x="72" y="264" width="10" height="58" rx="8" fill="#2D1C0A" opacity="0.6"/>
        <path d="M 72 264 L 138 264 C 136 280 132 294 122 300 C 108 308 88 306 78 299 C 72 293 72 280 72 264 Z" fill="#4A2E14"/>
        <path d="M 74 290 C 86 298 106 300 134 295" stroke="#2D1C0A" strokeWidth="0.9" fill="none" strokeDasharray="2.5 2.5" opacity="0.5"/>

        {/* Clasp */}
        <circle cx="105" cy="294" r="7" fill="#D4A63D"/>
        <circle cx="105" cy="294" r="5" fill="#C08818"/>
        <circle cx="103.5" cy="292.5" r="2" fill="#F0C850" opacity="0.75"/>

        {/* Passport */}
        <rect x="82" y="250" width="38" height="24" rx="4" fill="#2D4B35"/>
        <rect x="82" y="250" width="6" height="24" rx="3" fill="#1E3225"/>
        <circle cx="104" cy="268" r="5" fill="#D4A63D" opacity="0.62"/>
        <path d="M 101 268 L 107 268 M 104 265 L 104 271" stroke="#8A5A10" strokeWidth="0.9" opacity="0.8"/>

        {/* Feet */}
        <path d="M 130 356 L 128 374" stroke="#7A5230" strokeWidth="6" strokeLinecap="round"/>
        <path d="M 128 374 L 115 385" stroke="#7A5230" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M 128 374 L 131 386" stroke="#7A5230" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M 128 374 L 141 383" stroke="#7A5230" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M 152 356 L 154 374" stroke="#7A5230" strokeWidth="6" strokeLinecap="round"/>
        <path d="M 154 374 L 141 385" stroke="#7A5230" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M 154 374 L 157 386" stroke="#7A5230" strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M 154 374 L 167 383" stroke="#7A5230" strokeWidth="4.5" strokeLinecap="round"/>
      </g>

      {/* "RP" monogram — gold, small, lower right corner */}
      <text
        x="448"
        y="476"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="22"
        fontWeight="700"
        fill="#D4A63D"
        opacity="0.45"
      >
        RP
      </text>
    </svg>
  );
}

// ─── Showcase Screen ──────────────────────────────────────────────────────────

export function PicoCharacterScreen() {
  return (
    <div style={{
      minHeight: "100dvh",
      background: "#0B1023",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "64px 28px 80px",
      fontFamily: "var(--font-sans)",
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <p style={{
          margin: "0 0 10px",
          fontSize: 10,
          fontWeight: 700,
          color: "rgba(212,166,61,0.45)",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}>
          RunPassport · Character System
        </p>
        <h1 style={{
          margin: "0 0 10px",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 38,
          fontWeight: 400,
          color: "#F0F2F8",
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}>
          PICO
        </h1>
        <p style={{
          margin: "0 0 6px",
          fontSize: 14,
          color: "rgba(240,242,248,0.38)",
          letterSpacing: "0.03em",
        }}>
          Passport Keeper · Memory Companion
        </p>
        <p style={{
          margin: 0,
          fontSize: 12,
          color: "rgba(240,242,248,0.2)",
          fontStyle: "italic",
          fontFamily: "var(--font-display)",
        }}>
          A small post bird who remembers every journey.
        </p>
      </div>

      {/* ── Full Body Illustration ── */}
      <div style={{ marginBottom: 52 }}>
        <div style={{
          width: 240,
          height: 326,
          margin: "0 auto",
        }}>
          <PicoFullBody />
        </div>
        <p style={{
          textAlign: "center",
          margin: "18px 0 0",
          fontSize: 9,
          color: "rgba(240,242,248,0.2)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
          Full Illustration
        </p>
      </div>

      {/* ── Divider ── */}
      <div style={{
        width: "100%",
        height: 1,
        background: "rgba(255,255,255,0.06)",
        marginBottom: 40,
      }} />

      {/* ── Small variants in one row ── */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 36,
        marginBottom: 44,
        justifyContent: "center",
      }}>

        {/* UI Avatar — 80px */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 80, height: 80 }}>
            <PicoAvatarSVG />
          </div>
          <p style={{ margin: 0, fontSize: 9, color: "rgba(240,242,248,0.22)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Avatar · 80
          </p>
        </div>

        {/* Avatar — 48px */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 48, height: 48 }}>
            <PicoAvatarSVG />
          </div>
          <p style={{ margin: 0, fontSize: 9, color: "rgba(240,242,248,0.22)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            48
          </p>
        </div>

        {/* Avatar — 32px (scale floor test) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32 }}>
            <PicoAvatarSVG />
          </div>
          <p style={{ margin: 0, fontSize: 9, color: "rgba(240,242,248,0.22)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            32
          </p>
        </div>

        {/* Separator */}
        <div style={{ width: 1, height: 64, background: "rgba(255,255,255,0.06)" }} />

        {/* App Icon — 100px display */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 100, height: 100, borderRadius: 22, overflow: "hidden" }}>
            <PicoAppIconSVG />
          </div>
          <p style={{ margin: 0, fontSize: 9, color: "rgba(240,242,248,0.22)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            App Icon
          </p>
        </div>

        {/* App Icon — 60px (homescreen) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 60, height: 60, borderRadius: 14, overflow: "hidden" }}>
            <PicoAppIconSVG />
          </div>
          <p style={{ margin: 0, fontSize: 9, color: "rgba(240,242,248,0.22)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            60
          </p>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{
        width: "100%",
        height: 1,
        background: "rgba(255,255,255,0.06)",
        marginBottom: 40,
      }} />

      {/* ── Color palette ── */}
      <div style={{ width: "100%", marginBottom: 44 }}>
        <p style={{
          margin: "0 0 16px",
          fontSize: 9,
          fontWeight: 700,
          color: "rgba(240,242,248,0.25)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}>
          Palette
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { color: "#7D5234", label: "Body" },
            { color: "#6B4226", label: "Shadow" },
            { color: "#EFE2C0", label: "Chest" },
            { color: "#D4A63D", label: "Gold" },
            { color: "#3E2712", label: "Bag" },
            { color: "#2D4B35", label: "Passport" },
            { color: "#1A0E06", label: "Eye" },
            { color: "#7A5230", label: "Feet" },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: s.color,
                border: "1px solid rgba(255,255,255,0.08)",
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 10, color: "rgba(240,242,248,0.3)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Character notes ── */}
      <div style={{
        width: "100%",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20,
        padding: "20px 18px",
      }}>
        <p style={{
          margin: "0 0 12px",
          fontSize: 9,
          fontWeight: 700,
          color: "rgba(240,242,248,0.25)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}>
          Character Notes
        </p>
        {[
          ["Role", "Passport Keeper and memory companion"],
          ["Props", "Messenger bag · passport notebook · strap buckle"],
          ["Expression", "Calm, quiet, observant — never overly cheerful"],
          ["Palette", "Warm brown body · cream chest · gold accents"],
          ["References", "Moleskine travel journals · The Little Prince · vintage postal"],
          ["Scale floor", "Readable at 32px — silhouette + eyes + beak all survive"],
        ].map(([label, value]) => (
          <div key={label} style={{ display: "flex", gap: 16, marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "rgba(240,242,248,0.25)", minWidth: 80, flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 12, color: "rgba(240,242,248,0.55)", lineHeight: 1.4 }}>{value}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
