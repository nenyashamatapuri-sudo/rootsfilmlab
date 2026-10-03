import { ApertureIris } from "./ApertureIris";

const STEPS = [
  {
    code: "01",
    title: "Order online",
    copy: "Choose your service and tell us what's in the bag — how many rolls, which stock, what you want back.",
    aperture: 0.08,
  },
  {
    code: "02",
    title: "Send or drop it",
    copy: "Mail it to our Amsterdam address with the order number on the bag, or leave it at our drop-off point.",
    aperture: 0.32,
  },
  {
    code: "03",
    title: "We develop it",
    copy: "Hand-processed in small batches, checked frame by frame before anything gets scanned.",
    aperture: 0.64,
  },
  {
    code: "04",
    title: "Scan, archive, deliver",
    copy: "High-res scans land in your online roll library within days, negatives posted back on request.",
    aperture: 1,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ink py-24 text-paper">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="font-mono text-[12px] uppercase tracking-wider text-red">
          How it works
        </p>
        <h2 className="stamp-shadow mt-2 font-display text-5xl leading-none sm:text-6xl">
          ONE BOX, FOUR STEPS.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.code} className="flex flex-col items-start gap-5">
              <ApertureIris size={96} tone="paper" value={step.aperture} />
              <div className="font-mono text-[12px] uppercase tracking-wider text-paper/50">
                {step.code}
              </div>
              <h3 className="font-display text-2xl leading-tight">{step.title}</h3>
              <p className="font-sans text-[14px] leading-relaxed text-paper/70">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
