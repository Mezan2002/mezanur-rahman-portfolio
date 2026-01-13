// components/SectionNoise.jsx
"use client";

export function SectionNoise({
  opacity = 0.05,
  color = "white",
  blendMode = "overlay",
  className = "",
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{
        opacity: opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        mixBlendMode: blendMode,
        backgroundColor:
          color === "primary"
            ? "rgba(102, 126, 234, 0.1)"
            : color === "secondary"
            ? "rgba(118, 75, 162, 0.1)"
            : "transparent",
      }}
    />
  );
}

// Grain texture overlay
export function GrainOverlay({ opacity = 0.08, className = "" }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{
        opacity: opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='6.29' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        mixBlendMode: "overlay",
      }}
    />
  );
}

// Animated grain effect
export function AnimatedGrain({ opacity = 0.06, className = "" }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 animate-grain ${className}`}
      style={{
        opacity: opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        mixBlendMode: "soft-light",
      }}
    />
  );
}

// Dotted noise pattern
export function DottedNoise({ opacity = 0.1, className = "" }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{
        opacity: opacity,
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        mixBlendMode: "overlay",
      }}
    />
  );
}
