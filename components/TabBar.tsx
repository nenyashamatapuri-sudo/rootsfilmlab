"use client";

import { TABS, TAB_LABELS, useTab, type Tab } from "./TabContext";

const TAB_ACCENT: Record<Tab, string> = {
  home: "text-gold",
  services: "text-moss",
  pricing: "text-gold",
  order: "text-red",
};

export function TabBar() {
  const { active, go } = useTab();

  return (
    <header className="relative z-20 shrink-0 border-b border-paper/10 bg-ink/60 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-7">
        <button onClick={() => go("home")} className="flex shrink-0 items-center gap-2" aria-label="Home">
          <span className="relative block h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_var(--color-gold)]" />
          <span className="font-display text-sm tracking-[0.2em] text-paper">ROOTS</span>
        </button>

        <nav className="flex shrink-0 items-center gap-5 overflow-x-auto font-mono text-[10px] uppercase tracking-[0.18em] sm:gap-7 sm:text-[11px]">
          {TABS.map((tab) => {
            const isActive = tab === active;
            return (
              <button
                key={tab}
                onClick={() => go(tab)}
                className={
                  "shrink-0 whitespace-nowrap pb-0.5 transition " +
                  (isActive
                    ? `${TAB_ACCENT[tab]} border-b border-current`
                    : "border-b border-transparent text-paper/55 hover:text-paper")
                }
              >
                {TAB_LABELS[tab]}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
