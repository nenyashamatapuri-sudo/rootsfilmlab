import type { Metadata } from "next";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Start an order — Griot Film Lab",
};

export default function ContactPage() {
  return <Contact />;
}
