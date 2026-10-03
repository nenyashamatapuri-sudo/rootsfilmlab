import { Hero } from "@/components/Hero";
import { SystemBanner } from "@/components/SystemBanner";
import { Marquee } from "@/components/Marquee";
import { Explore } from "@/components/Explore";

export default function Home() {
  return (
    <>
      <Hero />
      <SystemBanner />
      <Marquee />
      <Explore />
    </>
  );
}
