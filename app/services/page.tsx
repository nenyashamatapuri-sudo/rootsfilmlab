import type { Metadata } from "next";
import { Services } from "@/components/Services";

export const metadata: Metadata = {
  title: "Services — Griot Film Lab",
};

export default function ServicesPage() {
  return <Services />;
}
