import { Squiggle } from "../Squiggle";

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

export function TrackPanel() {
  return (
    <div className="relative flex h-full min-h-full flex-col justify-center overflow-y-auto bg-paper-dim p-5 sm:p-10">
      <div className="mx-auto w-full max-w-5xl">
        <p className="font-mono text-[12px] uppercase tracking-wider text-red">
          Real-time roll tracking
        </p>
        <h2 className="stamp-shadow mt-2 font-display text-4xl leading-none sm:text-6xl">
          KNOW WHERE YOUR ROLL IS.
        </h2>
        <Squiggle className="mt-2 h-3 w-32 text-pink" />

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="border-[3px] border-ink bg-paper p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 font-mono text-[11px] uppercase tracking-wider text-ink/50">
              <span>Order GRT-000482</span>
              <span>Placed 28 Sep 2026</span>
            </div>

            <div className="mt-6 flex items-center justify-between">
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
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink/60">
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

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-4">
              {[
                ["Rolls in order", "6"],
                ["Developed to date", "24"],
                ["Active orders", "1"],
                ["Member since", "2026"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="font-display text-2xl leading-none">{value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-ink/50">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col border-[3px] border-dashed border-ink bg-paper p-5 sm:p-6">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-ink/50">
              <span>Griot — Amsterdam</span>
              <span>Keep this ticket</span>
            </div>
            <p className="mt-4 font-display text-3xl leading-none">GRT-000482</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink/60">
              6 rolls — Develop + Scan
            </p>

            <ul className="mt-4 flex flex-1 flex-col gap-1.5 font-sans text-[13px] text-ink/80">
              {TICKET_ITEMS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-red">◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
