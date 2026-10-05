import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "FAQ — Griot Film Lab",
};

export default function FaqPage() {
  return (
    <>
      <Faq />
      <Contact />
    </>
  );
}
