export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <path
        d="M0 10 C 12 0, 25 0, 37 10 C 49 20, 62 20, 75 10 C 87 0, 100 0, 112 10 C 124 20, 137 20, 150 10 C 162 0, 175 0, 187 10 C 193 15, 197 15, 200 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
