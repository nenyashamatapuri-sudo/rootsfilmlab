import { Squiggle } from "../Squiggle";

const FAQS = [
  {
    q: "I don't live in Amsterdam?",
    a: "Post your rolls with the order number on the bag. 1–2 days within NL.",
  },
  {
    q: "How long does it take?",
    a: "Usually 3–5 working days. Watch the stage on your order page.",
  },
  {
    q: "Can I get negatives back?",
    a: "Always — by post, or pickup at the Amsterdam point.",
  },
];

export function ContactPanel() {
  return (
    <div className="relative flex h-full min-h-full flex-col justify-center overflow-y-auto bg-ink p-5 text-paper sm:p-10">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[12px] uppercase tracking-wider text-red">
            Questions
          </p>
          <h2 className="stamp-shadow mt-2 font-display text-4xl leading-none sm:text-6xl">
            WE ANSWER FAST.
          </h2>
          <Squiggle className="mt-2 h-3 w-32 text-red" />

          <div className="mt-5 flex flex-col gap-4">
            {FAQS.map((item) => (
              <div key={item.q} className="border-l-[3px] border-gold pl-4">
                <p className="font-display text-lg leading-tight">{item.q}</p>
                <p className="mt-1 font-sans text-[13px] leading-relaxed text-paper/70">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border-[3px] border-paper p-6">
            <p className="font-mono text-[11px] uppercase tracking-wider text-paper/60">
              Amsterdam drop-off
            </p>
            <p className="mt-3 font-display text-2xl leading-snug">
              Griot Film Lab
              <br />
              c/o Drop-off Point
              <br />
              Amsterdam, NL
            </p>
            <p className="mt-3 font-sans text-[13px] text-paper/60">
              Exact address and opening hours are sent with every order
              confirmation.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:hello@griotfilm.nl"
              className="border-2 border-paper px-6 py-3 font-mono text-[12px] uppercase tracking-wider transition hover:bg-paper hover:text-ink"
            >
              hello@griotfilm.nl
            </a>
            <a
              href="#"
              className="bg-red px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-paper transition hover:brightness-110"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
