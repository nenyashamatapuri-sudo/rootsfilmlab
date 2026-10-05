"use client";

import { createContext, useContext } from "react";

export const TABS = ["home", "services", "pricing", "process", "track", "contact"] as const;
export type Tab = (typeof TABS)[number];

export const TAB_LABELS: Record<Tab, string> = {
  home: "Home",
  services: "Services",
  pricing: "Pricing",
  process: "How it works",
  track: "Track order",
  contact: "FAQ & Contact",
};

type TabContextValue = {
  active: Tab;
  go: (tab: Tab) => void;
};

export const TabContext = createContext<TabContextValue | null>(null);

export function useTab() {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("useTab must be used within TabContext.Provider");
  return ctx;
}
