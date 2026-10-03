/**
 * A jagged, hand-torn paper edge used as a section-to-section divider.
 * Fill it with the color of the section it belongs to (via a text-* class)
 * and pull it up over the seam with `-mt-4 sm:-mt-5` so the torn points
 * bite into the section above.
 */
export function TornEdge({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 20"
      preserveAspectRatio="none"
      className={`block h-4 w-full sm:h-5 ${className}`}
      aria-hidden
    >
      <path
        d="M0,20 L0,8 L25,14 L50,3 L75,11 L100,6 L125,16 L150,2 L175,10 L200,7 L225,17 L250,4 L275,12 L300,2 L325,14 L350,8 L375,18 L400,5 L400,20 Z"
        fill="currentColor"
      />
    </svg>
  );
}
