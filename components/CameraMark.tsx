type CameraMarkProps = {
  className?: string;
  style?: React.CSSProperties;
  /** Trace the silhouette in this color, for a rim-lit look on dark grounds. */
  rim?: string;
};

export function CameraMark({ className, style, rim }: CameraMarkProps) {
  const edge = rim ?? "none";
  return (
    <svg viewBox="0 0 200 140" className={className} style={style} aria-hidden>
      <path d="M76 32 L124 32 L136 50 L64 50 Z" fill="currentColor" stroke={edge} strokeWidth="2" />
      <rect x="90" y="21" width="20" height="12" fill="currentColor" stroke={edge} strokeWidth="2" />
      <rect
        x="20"
        y="50"
        width="160"
        height="74"
        rx="10"
        fill="currentColor"
        stroke={edge}
        strokeWidth="2"
      />
      <circle cx="37" cy="43" r="13" fill="currentColor" stroke={edge} strokeWidth="2" />
      <circle cx="163" cy="43" r="13" fill="currentColor" stroke={edge} strokeWidth="2" />
      <circle cx="100" cy="95" r="35" fill="none" stroke={rim ?? "currentColor"} strokeWidth="7" />
      <circle cx="100" cy="95" r="22" fill="none" stroke={rim ?? "currentColor"} strokeWidth="4" />
      <circle cx="100" cy="95" r="9" fill={rim ?? "currentColor"} />
      <rect x="26" y="58" width="14" height="10" rx="2" fill="var(--color-ink)" opacity="0.35" />
    </svg>
  );
}
