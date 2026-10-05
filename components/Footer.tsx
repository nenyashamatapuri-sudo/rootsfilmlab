export function Footer() {
  return (
    <footer className="grain border-t border-line-on-dark bg-ink py-10 text-paper">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="relative block h-5 w-5 rounded-full border border-paper/70">
            <span className="absolute inset-1 rounded-full bg-red" />
          </span>
          <span className="font-display text-lg tracking-wide">GRIOT</span>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-wider text-paper/50">
          Film Lab — Amsterdam, NL. Est. 2026. All rolls handled by hand.
        </p>

        <div className="flex gap-5 font-mono text-[12px] uppercase tracking-wider text-paper/60">
          <a href="#" className="hover:text-paper">
            Instagram
          </a>
          <a href="#" className="hover:text-paper">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
