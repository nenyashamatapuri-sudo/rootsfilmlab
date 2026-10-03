const FAQS = [
  {
    q: "I don't live in Amsterdam — how do I send film?",
    a: "Pack your rolls, write your order number on the bag, and post it to our Amsterdam address. Most orders from within the Netherlands arrive in 1–2 days.",
  },
  {
    q: "Is there a drop-off point?",
    a: "Yes — we keep a drop-off point in Amsterdam for anyone nearby who'd rather skip the post. The address is on your order confirmation.",
  },
  {
    q: "How long does developing and scanning take?",
    a: "Usually 3–5 working days from when we receive your rolls. You'll see the exact stage on your order page the whole time.",
  },
  {
    q: "Can I get my negatives back?",
    a: "Always. Negatives are returned by post on request, or held for pickup at the Amsterdam point — your choice at checkout.",
  },
  {
    q: "What film formats do you process?",
    a: "35mm and 120 as standard, with large format available on request — ask us before sending anything unusual.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-ink py-24 text-paper">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="font-mono text-[12px] uppercase tracking-wider text-red">FAQ</p>
        <h2 className="stamp-shadow mt-2 font-display text-5xl leading-none sm:text-6xl">
          BEFORE YOU ASK.
        </h2>

        <div className="mt-12 divide-y divide-line-on-dark border-t border-line-on-dark">
          {FAQS.map((item, i) => (
            <details key={item.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl leading-tight sm:text-2xl">
                <span>
                  <span className="mr-4 font-mono text-sm text-paper/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.q}
                </span>
                <span className="mt-1 shrink-0 font-mono text-red transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl pl-10 font-sans text-[15px] leading-relaxed text-paper/70">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
