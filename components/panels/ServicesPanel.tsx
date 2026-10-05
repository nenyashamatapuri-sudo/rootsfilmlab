"use client";

import { useTab } from "../TabContext";
import { Squiggle } from "../Squiggle";

type Service = {
  code: string;
  name: string;
  description: string;
  price: string;
  accent: string;
  tilt: number;
};

const SERVICES: Service[] = [
  {
    code: "01",
    name: "Develop + Scan",
    description: "In the bag, out as files.",
    price: "from €9.50 / roll",
    accent: "bg-red",
    tilt: -1.5,
  },
  {
    code: "02",
    name: "Develop Only",
    description: "Cut & sleeved, nothing else.",
    price: "from €6.00 / roll",
    accent: "bg-blue",
    tilt: 1,
  },
  {
    code: "03",
    name: "Scan Only",
    description: "Send negatives, get files.",
    price: "from €7.50 / roll",
    accent: "bg-gold",
    tilt: -1,
  },
  {
    code: "04",
    name: "Prints",
    description: "From any scan or negative.",
    price: "from €0.35 / print",
    accent: "bg-cyan",
    tilt: 1.5,
  },
  {
    code: "05",
    name: "Film, by Post",
    description: "Stocked, shipped same day.",
    price: "from €8.00 / roll",
    accent: "bg-pink",
    tilt: -0.5,
  },
];

export function ServicesPanel() {
  const { go } = useTab();

  return (
    <div className="relative flex h-full min-h-full flex-col justify-center overflow-y-auto bg-paper p-5 sm:p-10">
      <div className="terrazzo pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl">
        <p className="font-mono text-[12px] uppercase tracking-wider text-red">
          Pick an option — click to start it
        </p>
        <h2 className="stamp-shadow mt-2 font-display text-4xl leading-none sm:text-6xl">
          WHAT WE DEVELOP
        </h2>
        <Squiggle className="mt-2 h-3 w-32 text-blue" />

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SERVICES.map((service) => (
            <button
              key={service.code}
              onClick={() => go("contact")}
              style={{ transform: `rotate(${service.tilt}deg)` }}
              className="group flex flex-col gap-2 border-[3px] border-ink bg-paper p-4 text-left transition hover:-translate-y-1 hover:rotate-0 hover:shadow-[6px_6px_0_var(--color-ink)]"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-[11px] font-bold text-ink ${service.accent}`}
              >
                {service.code}
              </span>
              <h3 className="font-display text-lg leading-tight">{service.name}</h3>
              <p className="font-sans text-[13px] leading-snug text-ink/70">
                {service.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <p className="font-mono text-[11px] uppercase tracking-wider text-red">
                  {service.price}
                </p>
                <span className="font-display text-base transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 max-w-xl font-sans text-[14px] leading-relaxed text-ink/70">
          Mix and match per order — develop a few rolls, scan the rest, add
          some fresh film to the same box.
        </p>
      </div>
    </div>
  );
}
