import Link from "next/link";
import { ZigzagDivider } from "./ZigzagDivider";

type Service = {
  code: string;
  name: string;
  description: string;
  specs: string[];
  price: string;
  accent: string;
  tilt: number;
};

const SERVICES: Service[] = [
  {
    code: "01",
    name: "Develop + Scan",
    description: "The one most people want. In the bag, out the other side as files.",
    specs: ["C-41, B&W or E-6", "Scanned at 2000dpi", "Delivered online + archived"],
    price: "from €9.50 / roll",
    accent: "bg-red",
    tilt: -1.5,
  },
  {
    code: "02",
    name: "Develop Only",
    description: "For the darkroom printers. Negatives, cut and sleeved, nothing else.",
    specs: ["Hand processed", "Cut & sleeved", "Returned by post or pickup"],
    price: "from €6.00 / roll",
    accent: "bg-blue",
    tilt: 1,
  },
  {
    code: "03",
    name: "Scan Only",
    description: "Already developed your own rolls? Send the negatives, get the files.",
    specs: ["Your negatives, our scanner", "High-res TIFF or JPEG", "Dust & scratch pass"],
    price: "from €7.50 / roll",
    accent: "bg-gold",
    tilt: -1,
  },
  {
    code: "04",
    name: "Prints",
    description: "From any scan in your library, or straight off a fresh negative.",
    specs: ["4×6 standard, larger on request", "Optical or digital", "Matte or gloss"],
    price: "from €0.35 / print",
    accent: "bg-cyan",
    tilt: 1.5,
  },
  {
    code: "05",
    name: "Film, by Post",
    description: "Kodak, Fuji, Ilford — stocked and shipped same day from Amsterdam.",
    specs: ["35mm & 120 formats", "Fridge-kept stock", "Add to any order"],
    price: "from €8.00 / roll",
    accent: "bg-pink",
    tilt: -0.5,
  },
];

export function Services() {
  return (
    <section id="services" className="bg-paper pb-24">
      <ZigzagDivider className="-mt-4 text-paper sm:-mt-5" />
      <div className="mx-auto max-w-[1400px] px-5 pt-24 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-wider text-red">
              Pick an option — click to start it
            </p>
            <h2 className="stamp-shadow mt-2 font-display text-5xl leading-none sm:text-6xl">
              WHAT WE DEVELOP
            </h2>
          </div>
          <p className="max-w-sm font-sans text-[15px] leading-relaxed text-ink/70">
            Mix and match per order — develop a few rolls, scan the rest, add some
            fresh film to the same box.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.code}
              href="#start"
              style={{ transform: `rotate(${service.tilt}deg)` }}
              className="group flex flex-col gap-4 border-[3px] border-ink bg-paper p-7 transition hover:-translate-y-1 hover:rotate-0 hover:shadow-[7px_7px_0_var(--color-ink)]"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-[12px] font-bold text-ink ${service.accent}`}
                >
                  {service.code}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink/40">
                  Griot
                </span>
              </div>
              <h3 className="font-display text-2xl leading-tight">{service.name}</h3>
              <p className="font-sans text-[14px] leading-relaxed text-ink/70">
                {service.description}
              </p>
              <ul className="flex flex-col gap-1.5 font-mono text-[12px] uppercase tracking-wide text-ink/60">
                {service.specs.map((spec) => (
                  <li key={spec}>◆ {spec}</li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between pt-4">
                <p className="font-mono text-[13px] uppercase tracking-wider text-red">
                  {service.price}
                </p>
                <span className="font-display text-lg transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
