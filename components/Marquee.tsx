const ITEMS = [
  "C-41 · B&W · E-6",
  "MAIL-IN OR AMSTERDAM DROP-OFF",
  "HIGH-RESOLUTION SCANS",
  "35MM · 120 · LARGE FORMAT",
  "ORDER TRACKING, ROLL BY ROLL",
  "HAND PROCESSED, FRAME BY FRAME",
];

export function Marquee() {
  const line = ITEMS.join("   ◆   ");

  return (
    <div className="grain overflow-hidden border-y border-line-on-dark bg-ink py-3 text-paper">
      <div className="marquee-track font-mono text-[13px] uppercase tracking-wider">
        <span className="px-4">{line}   ◆   </span>
        <span className="px-4">{line}   ◆   </span>
      </div>
    </div>
  );
}
