"use client";

import { TABS, TAB_LABELS, useTab, type Tab } from "./TabContext";

const TAB_ACCENT: Record<Tab, string> = {
  home: "text-gold",
  pricing: "text-gold",
  order: "text-red",
};

export function TabBar() {
  const { active, go } = useTab();

  return (
    <header className="relative z-20 shrink-0 border-b border-paper/10 bg-ink/60 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-7">
        <button onClick={() => go("home")} className="flex shrink-0 items-center" aria-label="Home">
          <span
            className="font-display text-xl uppercase leading-none tracking-tight"
            style={{
              backgroundImage:
                "linear-gradient(180deg, var(--color-paper) 0%, var(--color-paper) 32%, var(--color-red) 82%, var(--color-red) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Roots
          </span>
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
