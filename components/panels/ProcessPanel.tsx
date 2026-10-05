import { ApertureIris } from "../ApertureIris";
import { Squiggle } from "../Squiggle";

const STEPS = [
  {
    code: "01",
    title: "Order online",
    copy: "Choose your service, tell us what's in the bag.",
    aperture: 0.08,
  },
  {
    code: "02",
    title: "Send or drop it",
    copy: "Mail it to Amsterdam, or use our drop-off point.",
    aperture: 0.32,
  },
  {
    code: "03",
    title: "We develop it",
    copy: "Hand-processed in small batches, frame by frame.",
    aperture: 0.64,
  },
  {
    code: "04",
    title: "Scan, archive, deliver",
    copy: "High-res scans land in your library within days.",
    aperture: 1,
  },
];

export function ProcessPanel() {
  return (
    <div className="relative flex h-full min-h-full flex-col justify-center overflow-y-auto bg-ink p-5 text-paper sm:p-10">
      <div className="mx-auto w-full max-w-5xl">
        <p className="font-mono text-[12px] uppercase tracking-wider text-red">
          How it works
        </p>
        <h2 className="stamp-shadow mt-2 font-display text-4xl leading-none sm:text-6xl">
          ONE BOX, FOUR STEPS.
        </h2>
        <Squiggle className="mt-2 h-3 w-32 text-cyan" />

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.code} className="flex flex-col items-start gap-3">
              <ApertureIris size={72} tone="paper" value={step.aperture} />
              <div className="font-mono text-[11px] uppercase tracking-wider text-paper/50">
                {step.code}
              </div>
              <h3 className="font-display text-xl leading-tight">{step.title}</h3>
              <p className="font-sans text-[13px] leading-relaxed text-paper/70">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
