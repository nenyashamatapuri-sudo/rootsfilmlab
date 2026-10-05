import { ZigzagDivider } from "./ZigzagDivider";

const TIMELINE = [
  { label: "Received", state: "done" as const },
  { label: "Developing", state: "done" as const },
  { label: "Scanning", state: "current" as const },
  { label: "Ready", state: "pending" as const },
];

const TICKET_ITEMS = [
  "3× Kodak Portra 400 — 35mm",
  "2× Ilford HP5 Plus — 120",
  "1× Fuji Velvia 50 — 35mm, E-6",
];

export function OrderConsole() {
  return (
    <section id="orders" className="bg-paper-dim pb-24">
      <ZigzagDivider className="-mt-4 text-paper-dim sm:-mt-5" />
      <div className="mx-auto max-w-[1400px] px-5 pt-24 sm:px-8">
        <p className="font-mono text-[12px] uppercase tracking-wider text-red">
          Your account
        </p>
        <h2 className="stamp-shadow mt-2 font-display text-5xl leading-none sm:text-6xl">
          KNOW WHERE YOUR ROLL IS.
        </h2>
        <p className="mt-4 max-w-xl font-sans text-[15px] leading-relaxed text-ink/70">
          Every order gets a number the moment you check out, and a page where you can
          watch it move — from the postbox to your library.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Dashboard mock */}
          <div className="border border-line bg-paper p-7 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6 font-mono text-[12px] uppercase tracking-wider text-ink/50">
              <span>Order GRT-000482</span>
              <span>Placed 28 Sep 2026</span>
            </div>

            <div className="mt-8 flex items-center justify-between">
              {TIMELINE.map((step, i) => (
                <div key={step.label} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={
                        "h-3 w-3 rounded-full border " +
                        (step.state === "pending"
                          ? "border-ink/30 bg-transparent"
                          : "border-red bg-red") +
                        (step.state === "current" ? " animate-pulse" : "")
                      }
                    />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60">
                      {step.label}
                    </span>
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <span
                      className={
                        "mx-2 h-px flex-1 " +
                        (step.state === "done" ? "bg-red" : "bg-line")
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4">
              {[
                ["Rolls in this order", "6"],
                ["Rolls developed to date", "24"],
                ["Active orders", "1"],
                ["Member since", "2026"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="font-display text-3xl leading-none">{value}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-ink/50">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Printable ticket mock */}
          <div className="flex flex-col border border-dashed border-ink/40 bg-paper p-7">
            <div className="sprockets text-ink" />
            <div className="flex items-center justify-between pt-6 font-mono text-[11px] uppercase tracking-wider text-ink/50">
              <span>Griot — Amsterdam</span>
              <span>Keep this ticket</span>
            </div>
            <p className="mt-6 font-display text-4xl leading-none">GRT-000482</p>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-wide text-ink/60">
              6 rolls — Develop + Scan
            </p>

            <ul className="mt-6 flex flex-1 flex-col gap-2 font-sans text-[14px] text-ink/80">
              {TICKET_ITEMS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-red">◆</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-end justify-between border-t border-line pt-6">
              <p className="max-w-[14rem] font-mono text-[11px] uppercase tracking-wide text-ink/50">
                Write this number on your bag, or print this ticket and drop it in
                with your rolls.
              </p>
              <div
                aria-hidden
                className="grid h-16 w-16 shrink-0 grid-cols-5 grid-rows-5 gap-[2px] bg-ink p-1"
              >
                {Array.from({ length: 25 }).map((_, i) => (
                  <span
                    key={i}
                    className={(i * 7) % 3 === 0 ? "bg-paper" : "bg-ink"}
                  />
                ))}
              </div>
            </div>
            <div className="sprockets mt-6 text-ink" />
          </div>
        </div>
      </div>
    </section>
  );
}
