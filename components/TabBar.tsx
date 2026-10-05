"use client";

import { TABS, TAB_LABELS, useTab, type Tab } from "./TabContext";
import { ZigzagDivider } from "./ZigzagDivider";

const TAB_COLORS: Record<Tab, string> = {
  home: "bg-red",
  services: "bg-blue",
  pricing: "bg-gold",
  process: "bg-cyan",
  track: "bg-pink",
  contact: "bg-paper",
};

export function TabBar() {
  const { active, go } = useTab();

  return (
    <header className="relative z-10 shrink-0 bg-ink text-paper">
      <div className="flex items-center gap-3 overflow-x-auto px-4 py-3 sm:px-6">
        <button
          onClick={() => go("home")}
          className="flex shrink-0 items-center gap-2 pr-3"
          aria-label="Home"
        >
          <span className="relative block h-6 w-6 rounded-full border border-paper/70">
            <span className="absolute inset-1 rounded-full bg-red" />
          </span>
          <span className="font-display text-lg tracking-wide sm:text-xl">GRIOT</span>
        </button>

        <nav className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          {TABS.map((tab) => {
            const isActive = tab === active;
            return (
              <button
                key={tab}
                onClick={() => go(tab)}
                className={
                  "shrink-0 border-2 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition sm:text-[12px] " +
                  (isActive
                    ? `border-ink text-ink ${TAB_COLORS[tab]}`
                    : "border-paper/30 text-paper/70 hover:border-paper hover:text-paper")
                }
              >
                {TAB_LABELS[tab]}
              </button>
            );
          })}
        </nav>
      </div>
      <ZigzagDivider className="text-ink" />
    </header>
  );
}
