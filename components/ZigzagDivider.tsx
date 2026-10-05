/**
 * A sharp Memphis-style zigzag divider between sections. Fill it with the
 * color of the section it belongs to (via a text-* class) and pull it up
 * over the seam with `-mt-4 sm:-mt-5` so the teeth bite into the section
 * above.
 */
export function ZigzagDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      className={`block h-4 w-full sm:h-5 ${className}`}
      aria-hidden
    >
      <path
        d="M0,24 L0,12 L25,0 L50,12 L75,0 L100,12 L125,0 L150,12 L175,0 L200,12 L225,0 L250,12 L275,0 L300,12 L325,0 L350,12 L375,0 L400,12 L400,24 Z"
        fill="currentColor"
      />
    </svg>
  );
}
