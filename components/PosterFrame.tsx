const FRAME_PATH =
  "M 30 55 C 220 15, 480 60, 650 35 C 800 15, 950 45, 975 70 C 990 260, 955 520, 985 760 C 992 860, 960 945, 930 965 C 700 990, 430 955, 210 975 C 80 990, 15 930, 25 820 C 45 600, 10 360, 30 55 Z";

function FrameBorder() {
  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-40 h-full w-full"
      aria-hidden
    >
      <path
        d={FRAME_PATH}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3"
        opacity="0.5"
        transform="translate(7,7)"
      />
      <path d={FRAME_PATH} fill="none" stroke="var(--color-paper)" strokeWidth="2.5" />
    </svg>
  );
}

function RegMark({ className, rotate }: { className: string; rotate: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`reg-mark ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <ellipse cx="12" cy="12.4" rx="7" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="0.5" x2="11.5" y2="23.5" stroke="currentColor" strokeWidth="1" />
      <line x1="0.5" y1="12" x2="23.5" y2="12.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function PosterFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="poster-stage">
      <div className="poster-shell">
        <FrameBorder />
        <RegMark className="reg-mark--tl" rotate={-3} />
        <RegMark className="reg-mark--tr" rotate={4} />
        <RegMark className="reg-mark--bl" rotate={2} />
        <RegMark className="reg-mark--br" rotate={-4} />
        <p className="spine-text hidden font-mono text-[10px] uppercase lg:block">
          Zilver Film Lab — Amsterdam — No. 001
        </p>
        <div className="poster-scroll">{children}</div>
      </div>
    </div>
  );
}
