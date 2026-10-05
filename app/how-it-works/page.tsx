import type { Metadata } from "next";
import { HowItWorks } from "@/components/HowItWorks";

export const metadata: Metadata = {
  title: "How it works — Griot Film Lab",
};

export default function HowItWorksPage() {
  return <HowItWorks />;
}
