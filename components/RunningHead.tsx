"use client";

import { TABS, useTab } from "./TabContext";

const DROPOFF_MAPS_URL =
  "https://www.google.com/maps/place/Herengracht+258,+1016+BV+Amsterdam/@52.3715194,4.8839781,1278m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47c609c3919d0c4d:0x8b83401282f3ec1c!8m2!3d52.3715162!4d4.886553!16s%2Fg%2F11rgfzdzcv?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D";

export function RunningHead() {
  const { active } = useTab();
  const index = TABS.indexOf(active) + 1;
  const total = TABS.length;

  return (
    <div className="relative z-20 flex shrink-0 items-center justify-between border-b border-paper/10 bg-ink/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/45 backdrop-blur-sm sm:px-7">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-paper/25 text-[9px] text-paper/70">
        {String(index).padStart(2, "0")}
      </span>
      <a
        href={DROPOFF_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden truncate transition hover:text-paper/80 sm:inline"
      >
        Roots Film Lab — Amsterdam, NL · Herengracht 258
      </a>
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-paper/25 text-[9px] text-paper/70">
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
