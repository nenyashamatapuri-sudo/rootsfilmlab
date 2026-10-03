function RegMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`reg-mark ${className}`} aria-hidden>
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function PosterFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="poster-stage">
      <div className="poster-shell">
        <RegMark className="reg-mark--tl" />
        <RegMark className="reg-mark--tr" />
        <RegMark className="reg-mark--bl" />
        <RegMark className="reg-mark--br" />
        <p className="spine-text hidden font-mono text-[10px] uppercase lg:block">
          Zilver Film Lab — Amsterdam — No. 001
        </p>
        <div className="poster-scroll">{children}</div>
      </div>
    </div>
  );
}
