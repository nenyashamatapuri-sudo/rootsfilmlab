"use client";

import { useState } from "react";
import { TabContext, type Tab } from "./TabContext";
import { TabBar } from "./TabBar";
import { RunningHead } from "./RunningHead";
import { HomePanel } from "./panels/HomePanel";
import { PricingPanel } from "./panels/PricingPanel";
import { OrderPanel } from "./panels/OrderPanel";
import { ContactPanel } from "./panels/ContactPanel";

const PANELS: Record<Tab, () => React.JSX.Element> = {
  home: HomePanel,
  pricing: PricingPanel,
  order: OrderPanel,
  contact: ContactPanel,
};

export function OnePageApp() {
  const [active, setActive] = useState<Tab>("home");
  const [preselect, setPreselect] = useState<string | null>(null);
  const Panel = PANELS[active];

  return (
    <TabContext.Provider value={{ active, go: setActive, preselect, setPreselect }}>
      <div className="flex h-full min-h-full flex-col">
        <div className="grain-overlay" aria-hidden />
        <TabBar />
        <RunningHead />
        <div key={active} className="screen-in min-h-0 flex-1">
          <Panel />
        </div>
        <footer className="shrink-0 border-t border-paper/10 bg-ink px-4 py-2 text-center font-mono text-[9px] uppercase tracking-[0.15em] text-paper/35 sm:px-6">
          Roots Film Lab — Amsterdam, NL. Est. 2026.
        </footer>
      </div>
    </TabContext.Provider>
  );
}
