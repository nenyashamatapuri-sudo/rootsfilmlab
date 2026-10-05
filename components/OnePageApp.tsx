"use client";

import { useState } from "react";
import { TabContext, type Tab } from "./TabContext";
import { TabBar } from "./TabBar";
import { HomePanel } from "./panels/HomePanel";
import { ServicesPanel } from "./panels/ServicesPanel";
import { PricingPanel } from "./panels/PricingPanel";
import { ProcessPanel } from "./panels/ProcessPanel";
import { TrackPanel } from "./panels/TrackPanel";
import { ContactPanel } from "./panels/ContactPanel";

const PANELS: Record<Tab, () => React.JSX.Element> = {
  home: HomePanel,
  services: ServicesPanel,
  pricing: PricingPanel,
  process: ProcessPanel,
  track: TrackPanel,
  contact: ContactPanel,
};

export function OnePageApp() {
  const [active, setActive] = useState<Tab>("home");
  const Panel = PANELS[active];

  return (
    <TabContext.Provider value={{ active, go: setActive }}>
      <div className="flex h-full min-h-full flex-col">
        <TabBar />
        <div key={active} className="screen-in min-h-0 flex-1">
          <Panel />
        </div>
        <footer className="shrink-0 border-t-[3px] border-ink bg-ink px-4 py-2 text-center font-mono text-[10px] uppercase tracking-wider text-paper/50 sm:px-6">
          Griot Film Lab — Amsterdam, NL. Est. 2026. All rolls handled by hand.
        </footer>
      </div>
    </TabContext.Provider>
  );
}
