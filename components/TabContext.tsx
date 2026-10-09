"use client";

import { createContext, useContext } from "react";

export const TABS = ["home", "pricing", "order", "contact"] as const;
export type Tab = (typeof TABS)[number];

export const TAB_LABELS: Record<Tab, string> = {
  home: "Home",
  pricing: "Pricing",
  order: "Order",
  contact: "Contact",
};

type TabContextValue = {
  active: Tab;
  go: (tab: Tab) => void;
  /** Set when a Services/Pricing card is clicked, so the Order panel can
   *  arrive with that option already picked. */
  preselect: string | null;
  setPreselect: (id: string | null) => void;
};

export const TabContext = createContext<TabContextValue | null>(null);

export function useTab() {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("useTab must be used within TabContext.Provider");
  return ctx;
}
