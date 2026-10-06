type Rock = {
  top: string;
  left?: string;
  right?: string;
  size: number;
  rotate: number;
  duration: number;
  delay: number;
  flip?: boolean;
};

const ROCKS: Rock[] = [
  { top: "14%", left: "4%", size: 120, rotate: -8, duration: 8, delay: 0 },
  { top: "48%", right: "5%", size: 150, rotate: 10, duration: 9, delay: 1.2, flip: true },
  { top: "72%", left: "14%", size: 80, rotate: 14, duration: 6.5, delay: 0.6 },
];

function RockShape({ size, flip }: { size: number; flip?: boolean }) {
  const gradId = `holoGrad${flip ? "B" : "A"}`;
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-cyan)" />
          <stop offset="45%" stopColor="var(--color-blue)" />
          <stop offset="75%" stopColor="var(--color-red)" />
          <stop offset="100%" stopColor="var(--color-gold)" />
        </linearGradient>
      </defs>
      <polygon
        points="30,5 70,12 95,38 88,68 60,95 28,90 5,62 10,30"
        fill={`url(#${gradId})`}
        opacity="0.55"
      />
      <polygon
        points="30,5 70,12 95,38 88,68 60,95 28,90 5,62 10,30"
        fill="none"
        stroke="var(--color-paper)"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
    </svg>
  );
}

export function HoloRocks() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
      {ROCKS.map((rock, i) => (
        <div
          key={i}
          className="float-shape absolute"
          style={{
            top: rock.top,
            left: rock.left,
            right: rock.right,
            animationDuration: `${rock.duration}s`,
            animationDelay: `${rock.delay}s`,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ["--r" as any]: `${rock.rotate}deg`,
            filter: "drop-shadow(0 0 18px rgba(70,194,200,0.25))",
          }}
        >
          <RockShape size={rock.size} flip={rock.flip} />
        </div>
      ))}
    </div>
  );
}
