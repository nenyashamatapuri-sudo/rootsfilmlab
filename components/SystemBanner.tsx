import { CameraStack } from "./CameraStack";
import { TornEdge } from "./TornEdge";

export function SystemBanner() {
  return (
    <section className="grain bg-ink pb-20 text-paper">
      <TornEdge className="-mt-4 text-ink sm:-mt-5" />
      <div className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-8">
        <CameraStack />

        <h2 className="stamp-shadow mt-12 text-center font-display text-4xl leading-none sm:text-6xl">
          THE ZILVER SYSTEM
        </h2>
        <p className="mt-3 text-center font-serif-italic text-xl text-paper/70 sm:text-2xl">
          one lab, five ways to get your film back.
        </p>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-6 text-left font-sans text-[14px] leading-relaxed text-paper/75 sm:grid-cols-2">
          <p>
            Every roll that reaches Zilver moves through the same hand-run
            process, whatever you send: develop only, develop and scan, scan
            only, prints, or fresh stock by post. One account, one order
            number, one place to watch it move.
          </p>
          <p>
            We built it around the part people actually worry about — not
            knowing where their film is. So every stage gets logged the
            moment it happens, and shows up on your order page in real time,
            roll by roll.
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-xs flex-col items-center border border-paper/40 px-8 py-6 text-center">
          <p className="font-display text-3xl tracking-wide">ZILVER</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.3em] text-paper/60">
            Film System
          </p>
          <div className="my-4 h-px w-16 bg-paper/30" />
          <p className="font-mono text-[11px] uppercase tracking-wider text-gold">
            Real-time roll tracking
          </p>
        </div>
      </div>
    </section>
  );
}
