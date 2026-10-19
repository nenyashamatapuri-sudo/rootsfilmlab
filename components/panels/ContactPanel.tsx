"use client";

import { CosmicShell } from "../CosmicShell";

const DROPOFF_MAPS_URL =
  "https://www.google.com/maps/place/Herengracht+258,+1016+BV+Amsterdam/@52.3715194,4.8839781,1278m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47c609c3919d0c4d:0x8b83401282f3ec1c!8m2!3d52.3715162!4d4.886553!16s%2Fg%2F11rgfzdzcv?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D";

function RootsBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <span
        className="rotate-90 select-none whitespace-nowrap font-display uppercase leading-none tracking-tight sm:rotate-0"
        style={{
          fontSize: "clamp(8rem, 45vw, 32rem)",
          backgroundImage:
            "linear-gradient(180deg, var(--color-paper) 0%, var(--color-paper) 30%, var(--color-red) 85%, var(--color-red) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Roots
      </span>
    </div>
  );
}

export function ContactPanel() {
  return (
    <CosmicShell light backdrop={<RootsBackdrop />}>
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 py-10 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-red">Get in touch</p>
        <p className="mt-4 max-w-sm font-sans text-base text-ink/80">
          Questions about an order, a roll gone astray, or just want to say hello — we&apos;re a quick
          message away.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:hello@rootsfilmlab.nl"
            className="bg-gold px-7 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-ink transition hover:brightness-110"
          >
            hello@rootsfilmlab.nl
          </a>
          <a
            href="https://wa.me/31652061168"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ink/30 px-7 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-ink/80 transition hover:border-ink hover:text-ink"
          >
            WhatsApp us
          </a>
        </div>

        <div className="mt-8 flex flex-col items-center gap-1">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-red">Drop-off</p>
          <a
            href={DROPOFF_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-base text-ink/80 underline hover:text-ink"
          >
            Herengracht 258, Amsterdam
          </a>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-red">Monday–Friday</p>
          <p className="mt-2 font-sans text-sm text-ink/60">
            Text us before you come:{" "}
            <a href="tel:+31652061168" className="underline hover:text-ink">
              +31 6 52061168
            </a>
          </p>
        </div>

        <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-wider text-red">
          Amsterdam, NL — we reply within a day.
        </p>
      </div>
    </CosmicShell>
  );
}
