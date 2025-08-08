import React from "react";

export type StudioHeaderPatternProps = {
  className?: string;
  baseColor?: string;
  gridColor?: string;
  glowA?: string;
  glowB?: string;
  glowC?: string;
  gridOpacity?: number;
};

export default function StudioHeaderPattern({
  className,
  baseColor = "#0b1120", // dark navy from screenshot background
  gridColor = "#38bdf8", // cyan-like blue for lines
  glowA = "#38bdf8", // cyan blue
  glowB = "#0ea5e9", // brighter blue
  glowC = "#38bdf8", // cyan blue again for consistency
  gridOpacity = 0.06,
}: StudioHeaderPatternProps) {
  const go = Math.max(0, Math.min(1, gridOpacity));

  return (
    <svg
      viewBox="0 0 1200 600"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M48 0H0V48"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            opacity={go}
          />
        </pattern>

        <radialGradient id="fade" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity={1} />
          <stop offset="50%" stopColor="#fff" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#fff" stopOpacity={0} />
        </radialGradient>
        <mask id="vignette">
          <rect width="1200" height="600" fill="url(#fade)" />
        </mask>

        <radialGradient
          id="glowA"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(950 50) scale(300 200)"
        >
          <stop offset="0%" stopColor={glowA} stopOpacity={0.4} />
          <stop offset="100%" stopColor={glowA} stopOpacity={0} />
        </radialGradient>

        <radialGradient
          id="glowB"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(250 120) scale(320 200)"
        >
          <stop offset="0%" stopColor={glowB} stopOpacity={0.35} />
          <stop offset="100%" stopColor={glowB} stopOpacity={0} />
        </radialGradient>

        <radialGradient
          id="glowC"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(600 500) scale(400 240)"
        >
          <stop offset="0%" stopColor={glowC} stopOpacity={0.3} />
          <stop offset="100%" stopColor={glowC} stopOpacity={0} />
        </radialGradient>

        <filter id="blur-40" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="40" />
        </filter>
      </defs>

      <rect width="1200" height="600" fill={baseColor} />

      <g filter="url(#blur-40)">
        <rect x="600" y="-80" width="600" height="400" fill="url(#glowA)" />
        <rect x="-100" y="-20" width="600" height="420" fill="url(#glowB)" />
        <rect x="200" y="300" width="800" height="400" fill="url(#glowC)" />
      </g>

      <g style={{ color: gridColor }}>
        <rect
          width="1200"
          height="600"
          fill="url(#grid)"
          mask="url(#vignette)"
        />
      </g>
    </svg>
  );
}
