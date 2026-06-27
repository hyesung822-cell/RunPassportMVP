import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HomeScreen } from "./screens/HomeScreen";
import { RunScreen } from "./screens/RunScreen";
import { CalendarScreen } from "./screens/CalendarScreen";
import { PassportScreen } from "./screens/PassportScreen";
import { IdentityScreen } from "./screens/IdentityScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { RunDetailScreen } from "./screens/RunDetailScreen";
import { RunCompleteScreen } from "./screens/RunCompleteScreen";
import { NewMailScreen } from "./screens/NewMailScreen";
import { OpenEnvelopeScreen } from "./screens/OpenEnvelopeScreen";
import { CardRevealScreen } from "./screens/CardRevealScreen";
import { MonthlyReviewScreen } from "./screens/MonthlyReviewScreen";
import { AnnualPassportScreen } from "./screens/AnnualPassportScreen";
import { BrandDirectionPanel } from "./components/BrandDirectionPanel";
import "../styles/fonts.css";

type Screen =
  | "home" | "run" | "calendar" | "passport" | "identity" | "profile"
  | "rundetail"
  | "runComplete" | "newMail" | "openEnvelope" | "cardReveal"
  | "monthlyReview" | "annualPassport";

// Screens that are part of immersive flows — hide bottom nav
const HIDE_NAV: Screen[] = ["runComplete", "newMail", "openEnvelope", "cardReveal"];

interface NavItem {
  key: Screen;
  label: string;
  icon: (active: boolean) => JSX.Element;
}

const NAV: NavItem[] = [
  {
    key: "home",
    label: "Home",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M2.5 9.5L11 3L19.5 9.5V19a1 1 0 0 1-1 1H14v-5h-4v5H3.5a1 1 0 0 1-1-1V9.5z"
          fill={a ? "#D4A63D" : "none"}
          stroke={a ? "#D4A63D" : "rgba(240,242,248,0.3)"}
          strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "run",
    label: "Run",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9"
          fill={a ? "#D4A63D" : "none"}
          stroke={a ? "#D4A63D" : "rgba(240,242,248,0.3)"}
          strokeWidth="1.4" />
        <path d="M8.5 7.5l6 3.5-6 3.5V7.5z"
          fill={a ? "#0B1023" : "rgba(240,242,248,0.3)"}
          stroke="none" />
      </svg>
    ),
  },
  {
    key: "calendar",
    label: "Log",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="4" width="16" height="15" rx="3"
          fill={a ? "#D4A63D" : "none"}
          stroke={a ? "#D4A63D" : "rgba(240,242,248,0.3)"}
          strokeWidth="1.4" />
        <path d="M3 8.5h16" stroke={a ? "#0B1023" : "rgba(240,242,248,0.3)"} strokeWidth="1.3" />
        <rect x="7" y="12" width="2" height="2" rx="0.5" fill={a ? "#0B1023" : "rgba(240,242,248,0.3)"} />
        <rect x="12" y="12" width="2" height="2" rx="0.5" fill={a ? "#0B1023" : "rgba(240,242,248,0.3)"} />
        <path d="M7 5V3M15 5V3" stroke={a ? "#D4A63D" : "rgba(240,242,248,0.3)"} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "passport",
    label: "Cards",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3.5" y="3.5" width="10" height="14" rx="2.5"
          fill={a ? "#D4A63D" : "none"}
          stroke={a ? "#D4A63D" : "rgba(240,242,248,0.3)"}
          strokeWidth="1.4" />
        <rect x="8.5" y="5.5" width="10" height="14" rx="2.5"
          fill={a ? "rgba(212,166,61,0.25)" : "none"}
          stroke={a ? "#D4A63D" : "rgba(240,242,248,0.2)"}
          strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    key: "identity",
    label: "Identity",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="9" r="3.5"
          fill={a ? "#D4A63D" : "none"}
          stroke={a ? "#D4A63D" : "rgba(240,242,248,0.3)"}
          strokeWidth="1.4" />
        <path d="M3.5 19.5C4.8 15.8 7.6 13.5 11 13.5s6.2 2.3 7.5 6"
          stroke={a ? "#D4A63D" : "rgba(240,242,248,0.3)"}
          strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8.5 3.5L11 2.5L13.5 3.5" stroke={a ? "#D4A63D" : "rgba(240,242,248,0.2)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "profile",
    label: "Profile",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8.5" r="3.5"
          fill={a ? "#D4A63D" : "none"}
          stroke={a ? "#D4A63D" : "rgba(240,242,248,0.3)"}
          strokeWidth="1.4" />
        <path d="M3 19c1-4 4-6.5 8-6.5s7 2.5 8 6.5"
          fill={a ? "rgba(212,166,61,0.15)" : "none"}
          stroke={a ? "#D4A63D" : "rgba(240,242,248,0.3)"}
          strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("runComplete");
  const nav = (s: Screen) => setScreen(s);
  const hideNav = HIDE_NAV.includes(screen);

  function renderScreen(): JSX.Element {
    switch (screen) {
      // ── Post-run flow ──────────────────────────────────────────────────────
      case "runComplete":    return <RunCompleteScreen   onContinue={() => nav("newMail")} />;
      case "newMail":        return <NewMailScreen        onOpen={() => nav("openEnvelope")} />;
      case "openEnvelope":   return <OpenEnvelopeScreen   onContinue={() => nav("cardReveal")} />;
      case "cardReveal":     return <CardRevealScreen     onCollect={() => nav("home")} />;
      // ── P1 review screens ─────────────────────────────────────────────────
      case "monthlyReview":  return <MonthlyReviewScreen  onBack={() => nav("home")} />;
      case "annualPassport": return <AnnualPassportScreen  onBack={() => nav("profile")} />;
      // ── Core screens ──────────────────────────────────────────────────────
      case "rundetail":      return <RunDetailScreen />;
      case "home":           return <HomeScreen />;
      case "run":            return <RunScreen />;
      case "calendar":       return <CalendarScreen />;
      case "passport":       return <PassportScreen />;
      case "identity":       return <IdentityScreen />;
      case "profile":        return <ProfileScreen onMonthlyReview={() => nav("monthlyReview")} onAnnualPassport={() => nav("annualPassport")} />;
    }
  }

  return (
    <div style={{
      minHeight: "100dvh",
      background: "#060B18",
      display: "flex",
      alignItems: "stretch",
      fontFamily: "var(--font-sans)",
    }}>
      {/* ── Brand Direction v2 — far left, standalone reference panel ── */}
      <BrandDirectionPanel />

      {/* ── App canvas — existing phone frame, centered in remaining space ── */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
      <div style={{
        width: "100%",
        maxWidth: 390,
        minHeight: "100dvh",
        position: "relative",
        background: "#0B1023",
        overflow: "hidden",
        boxShadow: "0 0 80px rgba(0,0,0,0.5)",
      }}>
        {/* Screen content */}
        <div style={{ height: "100dvh", overflowY: "auto", scrollbarWidth: "none" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: hideNav ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: hideNav ? 0 : -8 }}
              transition={{ duration: hideNav ? 0.3 : 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation — hidden during immersive flows */}
        <AnimatePresence>
        {!hideNav && (
        <motion.div
          key="bottomnav"
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ type: "spring", stiffness: 340, damping: 32 }}
          style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 390,
          background: "rgba(11,16,35,0.9)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          paddingBottom: "max(env(safe-area-inset-bottom), 8px)",
          zIndex: 100,
        }}>
          {NAV.map((item) => {
            const isActive = screen === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setScreen(item.key)}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  padding: "10px 0 6px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  position: "relative",
                }}
              >
                {item.icon(isActive)}
                <span style={{
                  fontSize: 9,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? "#D4A63D" : "rgba(240,242,248,0.3)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  transition: "color 0.15s",
                }}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 20,
                      height: 2,
                      borderRadius: "0 0 2px 2px",
                      background: "#D4A63D",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>
        )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
}
