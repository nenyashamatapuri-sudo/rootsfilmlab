import { TornEdge } from "./TornEdge";

type Service = {
  code: string;
  name: string;
  description: string;
  specs: string[];
  price: string;
};

const SERVICES: Service[] = [
  {
    code: "01",
    name: "Develop + Scan",
    description: "The one most people want. In the bag, out the other side as files.",
    specs: ["C-41, B&W or E-6", "Scanned at 2000dpi", "Delivered online + archived"],
    price: "from €9.50 / roll",
  },
  {
    code: "02",
    name: "Develop Only",
    description: "For the darkroom printers. Negatives, cut and sleeved, nothing else.",
    specs: ["Hand processed", "Cut & sleeved", "Returned by post or pickup"],
    price: "from €6.00 / roll",
  },
  {
    code: "03",
    name: "Scan Only",
    description: "Already developed your own rolls? Send the negatives, get the files.",
    specs: ["Your negatives, our scanner", "High-res TIFF or JPEG", "Dust & scratch pass"],
    price: "from €7.50 / roll",
  },
  {
    code: "04",
    name: "Prints",
    description: "From any scan in your library, or straight off a fresh negative.",
    specs: ["4×6 standard, larger on request", "Optical or digital", "Matte or gloss"],
    price: "from €0.35 / print",
  },
  {
    code: "05",
    name: "Film, by Post",
    description: "Kodak, Fuji, Ilford — stocked and shipped same day from Amsterdam.",
    specs: ["35mm & 120 formats", "Fridge-kept stock", "Add to any order"],
    price: "from €8.00 / roll",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-paper pb-24">
      <TornEdge className="-mt-4 text-paper sm:-mt-5" />
      <div className="mx-auto max-w-[1400px] px-5 pt-24 sm:px-8">
        <div className="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-wider text-red">
              Services
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

        <div className="grid grid-cols-1 border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.code}
              className="flex flex-col gap-4 border-b border-r border-line p-7"
            >
              <div className="flex items-start justify-between font-mono text-[12px] uppercase tracking-wider text-ink/50">
                <span>{service.code}</span>
                <span>Zilver</span>
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
              <p className="mt-auto pt-4 font-mono text-[13px] uppercase tracking-wider text-red">
                {service.price}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
