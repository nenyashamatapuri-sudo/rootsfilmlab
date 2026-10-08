"use client";

import { TABS, useTab } from "./TabContext";

export function RunningHead() {
  const { active } = useTab();
  const index = TABS.indexOf(active) + 1;
  const total = TABS.length;

  return (
    <div className="relative z-20 flex shrink-0 items-center justify-between border-b border-paper/10 bg-ink/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/45 backdrop-blur-sm sm:px-7">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-paper/25 text-[9px] text-paper/70">
        {String(index).padStart(2, "0")}
      </span>
      <span className="hidden truncate sm:inline">Roots Film Lab — Amsterdam, NL</span>
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-paper/25 text-[9px] text-paper/70">
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
