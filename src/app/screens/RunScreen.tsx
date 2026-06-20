import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { formatDuration } from "../data";

type RunState = "idle" | "running" | "paused" | "finished";

function formatPaceDisplay(secPerKm: number): string {
  if (!isFinite(secPerKm) || secPerKm > 9999) return "--:--";
  const m = Math.floor(secPerKm / 60);
  const s = Math.floor(secPerKm % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function RunScreen() {
  const [runState, setRunState] = useState<RunState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [distance, setDistance] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const distRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (runState === "running") {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
      distRef.current = setInterval(() => setDistance((d) => +(d + 0.009).toFixed(3)), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (distRef.current) clearInterval(distRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (distRef.current) clearInterval(distRef.current);
    };
  }, [runState]);

  const pace = elapsed > 2 ? elapsed / distance : 0;
  const isActive = runState === "running" || runState === "paused";

  function handleStart() { setRunState("running"); }
  function handlePause() { setRunState("paused"); }
  function handleResume() { setRunState("running"); }
  function handleFinish() { setRunState("finished"); }
  function handleReset() {
    setRunState("idle");
    setElapsed(0);
    setDistance(0);
  }

  return (
    <div style={{
      minHeight: "100dvh",
      background: "#0B1023",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: 96,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Abstract map gradient background */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 50% 30%, rgba(26,70,140,0.3) 0%, rgba(11,16,35,0) 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "15%",
        left: "10%",
        right: "10%",
        height: "35%",
        background: "rgba(255,255,255,0.015)",
        borderRadius: "50%",
        filter: "blur(40px)",
        pointerEvents: "none",
      }} />

      {/* Subtle grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ width: "100%", padding: "60px 22px 0", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#F0F2F8", letterSpacing: "-0.01em" }}>
            Run
          </h1>
          <div style={{
            background: runState === "running" ? "rgba(46,200,122,0.15)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${runState === "running" ? "rgba(46,200,122,0.35)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: 20,
            padding: "5px 12px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: runState === "running" ? "#2EC87A" : "rgba(255,255,255,0.2)",
            }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: runState === "running" ? "#2EC87A" : "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>
              {runState === "idle" ? "READY" : runState === "running" ? "LIVE" : runState === "paused" ? "PAUSED" : "DONE"}
            </span>
          </div>
        </div>
      </div>

      {/* Main stats display */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0, position: "relative", zIndex: 1, width: "100%", padding: "0 22px" }}>

        {/* Distance — hero number */}
        <motion.div
          key={runState}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: "center", marginBottom: 8 }}
        >
          <p style={{ margin: "0 0 2px", fontSize: 11, color: "rgba(240,242,248,0.35)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Distance
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 6 }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 80,
              fontWeight: 500,
              color: "#F0F2F8",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}>
              {distance.toFixed(2)}
            </span>
            <span style={{ fontSize: 20, color: "rgba(240,242,248,0.4)", marginBottom: 12 }}>km</span>
          </div>
        </motion.div>

        {/* Secondary stats row */}
        <div style={{ display: "flex", gap: 0, width: "100%", marginBottom: 48 }}>
          {[
            { label: "Duration", value: formatDuration(elapsed) },
            { label: "Pace", value: formatPaceDisplay(pace), unit: "/km" },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              flex: 1,
              textAlign: "center",
              padding: "18px 12px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              borderRight: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <p style={{ margin: "0 0 6px", fontSize: 10, color: "rgba(240,242,248,0.35)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {stat.label}
              </p>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 500, color: "#F0F2F8", lineHeight: 1, letterSpacing: "-0.02em" }}>
                {stat.value}
                {stat.unit && <span style={{ fontSize: 12, color: "rgba(240,242,248,0.4)", marginLeft: 2 }}>{stat.unit}</span>}
              </p>
            </div>
          ))}
        </div>

        {/* ── CONTROL BUTTONS ── */}
        <AnimatePresence mode="wait">
          {runState === "idle" && (
            <motion.div key="start" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              {/* Pulse ring */}
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "rgba(212,166,61,0.15)",
                  }}
                />
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={handleStart}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(145deg, #C89020, #D4A63D, #F0C850)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 40px rgba(212,166,61,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M10 7l14 7-14 7V7z" fill="#0B1023" />
                  </svg>
                </motion.button>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(240,242,248,0.35)" }}>Tap to start running</p>
            </motion.div>
          )}

          {(runState === "running" || runState === "paused") && (
            <motion.div key="controls" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: "flex", gap: 20, alignItems: "center" }}>
              {/* Pause / Resume */}
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={runState === "running" ? handlePause : handleResume}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {runState === "running" ? (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="4" y="3" width="5" height="16" rx="2" fill="rgba(240,242,248,0.8)" />
                    <rect x="13" y="3" width="5" height="16" rx="2" fill="rgba(240,242,248,0.8)" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M7 4l14 7-14 7V4z" fill="rgba(240,242,248,0.8)" />
                  </svg>
                )}
              </motion.button>

              {/* Finish — large center */}
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={handleFinish}
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  background: "linear-gradient(145deg, #C89020, #D4A63D, #F0C850)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 40px rgba(212,166,61,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="4" fill="#0B1023" />
                </svg>
                <span style={{ fontSize: 8, fontWeight: 700, color: "#0B1023", letterSpacing: "0.08em" }}>FINISH</span>
              </motion.button>

              {/* Discard */}
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={handleReset}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "rgba(229,83,75,0.08)",
                  border: "1px solid rgba(229,83,75,0.2)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="rgba(229,83,75,0.7)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.button>
            </motion.div>
          )}

          {runState === "finished" && (
            <motion.div key="finished" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <div style={{
                background: "rgba(46,200,122,0.1)",
                border: "1px solid rgba(46,200,122,0.3)",
                borderRadius: 24,
                padding: "20px 28px",
                textAlign: "center",
                width: "100%",
              }}>
                <div style={{ fontSize: 44, marginBottom: 8 }}>🎉</div>
                <p style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700, color: "#F0F2F8" }}>Run Complete!</p>
                <p style={{ margin: 0, fontSize: 14, color: "rgba(240,242,248,0.5)" }}>
                  {distance.toFixed(2)} km · {formatDuration(elapsed)}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleReset}
                style={{
                  padding: "14px 40px",
                  background: "linear-gradient(135deg, #C89020, #D4A63D)",
                  border: "none",
                  borderRadius: 50,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0B1023",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.01em",
                }}
              >
                Done
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
