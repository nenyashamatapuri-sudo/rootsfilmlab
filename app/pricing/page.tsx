import type { Metadata } from "next";
import { Pricing } from "@/components/Pricing";

export const metadata: Metadata = {
  title: "Pricing — Zilver Film Lab",
};

export default function PricingPage() {
  return <Pricing />;
}
