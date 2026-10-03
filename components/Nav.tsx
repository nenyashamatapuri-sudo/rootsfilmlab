import Link from "next/link";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/orders", label: "Track order" },
  { href: "/faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-on-dark bg-ink/95 text-paper">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative block h-6 w-6 rounded-full border border-paper/70">
            <span className="absolute inset-1 rounded-full bg-red" />
          </span>
          <span className="font-display text-xl tracking-wide">ZILVER</span>
        </Link>

        <nav className="hidden items-center gap-7 font-mono text-[12px] uppercase tracking-wider text-paper/70 lg:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-paper">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="border border-paper px-4 py-2 font-mono text-[12px] uppercase tracking-wider transition hover:bg-paper hover:text-ink"
        >
          Start an order
        </Link>
      </div>
    </header>
  );
}
