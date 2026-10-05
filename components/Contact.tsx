import { TornEdge } from "./TornEdge";

export function Contact() {
  return (
    <section id="start" className="bg-paper pb-24">
      <TornEdge className="-mt-4 text-paper sm:-mt-5" />
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 pt-24 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-mono text-[12px] uppercase tracking-wider text-red">
            Questions
          </p>
          <h2 className="stamp-shadow mt-2 font-display text-5xl leading-none sm:text-6xl">
            WE ANSWER FAST.
          </h2>
          <p className="mt-4 max-w-md font-sans text-[15px] leading-relaxed text-ink/70">
            Not sure which service fits your rolls, or want to send something
            unusual? Message us before you post anything.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:hello@griotfilm.nl"
              className="border border-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wider transition hover:bg-ink hover:text-paper"
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

        <div className="border border-line p-8">
          <p className="font-mono text-[12px] uppercase tracking-wider text-ink/50">
            Amsterdam drop-off
          </p>
          <p className="mt-3 font-display text-2xl leading-snug">
            Griot Film Lab
            <br />
            c/o Drop-off Point
            <br />
            Amsterdam, NL
          </p>
          <p className="mt-4 font-sans text-[14px] text-ink/60">
            Exact address and opening hours are sent with every order confirmation.
          </p>
        </div>
      </div>
    </section>
  );
}
