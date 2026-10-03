"use client";

import { motion } from "framer-motion";

type ApertureIrisProps = {
  /** 0 = fully closed, 1 = fully open. Ignored when `breathe` is true. */
  value?: number;
  /** Loop a slow open/close cycle, for ambient hero motion. */
  breathe?: boolean;
  blades?: number;
  size?: number;
  tone?: "ink" | "paper";
  className?: string;
};

export function ApertureIris({
  value = 0.5,
  breathe = false,
  blades = 10,
  size = 240,
  tone = "ink",
  className = "",
}: ApertureIrisProps) {
  const center = 100;
  const outerR = 94;
  const minHole = 14;
  const maxHole = 70;

  const bladeColor = tone === "ink" ? "var(--color-ink)" : "var(--color-paper)";
  const ringColor = tone === "ink" ? "var(--color-ink)" : "var(--color-paper)";

  const round = (n: number) => Math.round(n * 100) / 100;

  const seams = Array.from({ length: blades }, (_, i) => {
    const angle = (i * 360) / blades;
    const rad = (angle * Math.PI) / 180;
    const x = round(center + outerR * Math.cos(rad));
    const y = round(center + outerR * Math.sin(rad));
    return { x, y };
  });

  const holeAnimate = breathe
    ? { r: [minHole + 6, maxHole - 4, minHole + 6] }
    : { r: minHole + (maxHole - minHole) * value };

  const holeTransition = breathe
    ? { duration: 7, repeat: Infinity, ease: "easeInOut" as const }
    : { duration: 0.6, ease: "easeInOut" as const };

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Aperture diagram"
    >
      <circle
        cx={center}
        cy={center}
        r={outerR}
        fill="none"
        stroke={ringColor}
        strokeWidth={1.5}
        opacity={0.35}
      />
      <circle cx={center} cy={center} r={outerR - 10} fill={bladeColor} opacity={0.92} />
      {seams.map((p, i) => (
        <line
          key={i}
          x1={center}
          y1={center}
          x2={p.x}
          y2={p.y}
          stroke={tone === "ink" ? "var(--color-paper)" : "var(--color-ink)"}
          strokeWidth={0.75}
          opacity={0.25}
        />
      ))}
      <motion.circle
        cx={center}
        cy={center}
        fill={tone === "ink" ? "var(--color-paper)" : "var(--color-ink)"}
        initial={false}
        animate={holeAnimate}
        transition={holeTransition}
      />
      <circle
        cx={center}
        cy={center}
        r={outerR + 4}
        fill="none"
        stroke={ringColor}
        strokeWidth={0.75}
        opacity={0.5}
        strokeDasharray="1 5"
      />
    </svg>
  );
}
