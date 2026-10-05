import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { SystemBanner } from "@/components/SystemBanner";
import { HowItWorks } from "@/components/HowItWorks";
import { OrderConsole } from "@/components/OrderConsole";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <SystemBanner />
      <HowItWorks />
      <OrderConsole />
      <Pricing />
      <Faq />
      <Contact />
    </>
  );
}
