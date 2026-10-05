import { FilmRollMark } from "./FilmRollMark";

const STACK = [
  { color: "text-cyan", scale: 0.52, y: -128, x: -70, opacity: 0.55, rotate: -8 },
  { color: "text-gold", scale: 0.64, y: -92, x: -34, opacity: 0.68, rotate: -4 },
  { color: "text-red", scale: 0.78, y: -52, x: 34, opacity: 0.8, rotate: 5 },
  { color: "text-ink", scale: 0.66, y: -100, x: 72, opacity: 0.5, rotate: 9 },
];

export function FilmRollStack() {
  return (
    <div className="relative mx-auto h-[280px] w-full max-w-xs sm:h-[320px] sm:max-w-sm" aria-hidden>
      {STACK.map((roll) => (
        <FilmRollMark
          key={roll.x}
          className={`absolute bottom-0 left-1/2 w-28 ${roll.color}`}
          style={{
            transform: `translateX(calc(-50% + ${roll.x}px)) translateY(${roll.y}px) scale(${roll.scale}) rotate(${roll.rotate}deg)`,
            opacity: roll.opacity,
          }}
        />
      ))}
      <FilmRollMark
        rim="var(--color-paper)"
        className="absolute bottom-0 left-1/2 w-32 -translate-x-1/2 text-ink"
      />
    </div>
  );
}
