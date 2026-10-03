import Link from "next/link";
import { TornEdge } from "./TornEdge";

const PAGES = [
  {
    code: "01",
    title: "Services",
    copy: "Develop, scan, print, or just send us your undeveloped rolls.",
    href: "/services",
  },
  {
    code: "02",
    title: "How it works",
    copy: "One box, four steps — from your postbox to your library.",
    href: "/how-it-works",
  },
  {
    code: "03",
    title: "Pricing",
    copy: "Simple, per roll. No subscriptions, no minimum order.",
    href: "/pricing",
  },
  {
    code: "04",
    title: "Track an order",
    copy: "See exactly where your film is, from received to ready.",
    href: "/orders",
  },
  {
    code: "05",
    title: "FAQ & Contact",
    copy: "Questions before you post anything? We answer fast.",
    href: "/faq",
  },
];

export function Explore() {
  return (
    <section className="bg-paper pb-20">
      <TornEdge className="-mt-4 text-paper sm:-mt-5" />
      <div className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-8">
        <p className="font-mono text-[12px] uppercase tracking-wider text-red">
          Find your way around
        </p>
        <h2 className="stamp-shadow mt-2 font-display text-4xl leading-none sm:text-5xl">
          THE REST OF THE LAB
        </h2>

        <div className="mt-10 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex flex-col gap-3 border-b border-r border-line p-7 transition hover:bg-paper-dim"
            >
              <div className="flex items-center justify-between font-mono text-[12px] uppercase tracking-wider text-ink/50">
                <span>{page.code}</span>
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
              <h3 className="font-display text-2xl leading-tight">{page.title}</h3>
              <p className="font-sans text-[14px] leading-relaxed text-ink/70">{page.copy}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
