"use client";

import { TABS, TAB_LABELS, useTab, type Tab } from "./TabContext";

const TAB_ACCENT: Record<Tab, string> = {
  home: "text-gold",
  pricing: "text-gold",
  order: "text-red",
  contact: "text-moss",
};

const DROPOFF_MAPS_URL =
  "https://www.google.com/maps/place/Herengracht+258,+1016+BV+Amsterdam/@52.3715194,4.8839781,1278m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47c609c3919d0c4d:0x8b83401282f3ec1c!8m2!3d52.3715162!4d4.886553!16s%2Fg%2F11rgfzdzcv?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D";

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

        <a
          href={DROPOFF_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55 transition hover:text-paper md:block"
        >
          Herengracht 258, Amsterdam
        </a>

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
