type FilmRollMarkProps = {
  className?: string;
  style?: React.CSSProperties;
  /** Trace the silhouette in this color, for a rim-lit look on dark grounds. */
  rim?: string;
};

export function FilmRollMark({ className, style, rim }: FilmRollMarkProps) {
  const edge = rim ?? "none";
  return (
    <svg viewBox="0 0 120 170" className={className} style={style} aria-hidden>
      <rect x="32" y="4" width="56" height="20" rx="7" fill="currentColor" stroke={edge} strokeWidth="2" />
      <rect
        x="8"
        y="18"
        width="104"
        height="146"
        rx="16"
        fill="currentColor"
        stroke={edge}
        strokeWidth="2"
      />
      <rect x="8" y="76" width="104" height="30" fill={rim ?? "var(--color-ink)"} opacity={rim ? 1 : 0.3} />
      <circle cx="60" cy="91" r="9" fill="none" stroke={rim ?? "currentColor"} strokeWidth="3" />
      <circle cx="60" cy="91" r="2.5" fill={rim ?? "currentColor"} />
    </svg>
  );
}
