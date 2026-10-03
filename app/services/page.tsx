import type { Metadata } from "next";
import { Services } from "@/components/Services";

export const metadata: Metadata = {
  title: "Services — Zilver Film Lab",
};

export default function ServicesPage() {
  return <Services />;
}
