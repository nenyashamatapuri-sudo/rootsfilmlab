type Shape =
  | { type: "triangle"; cx: number; cy: number; size: number; rotate: number; color: string }
  | { type: "ring"; cx: number; cy: number; r: number; color: string }
  | { type: "dot"; cx: number; cy: number; r: number; color: string }
  | { type: "plus"; cx: number; cy: number; size: number; color: string }
  | { type: "square"; cx: number; cy: number; size: number; rotate: number; color: string };

const SHAPES: Shape[] = [
  { type: "triangle", cx: 7, cy: 11, size: 5, rotate: 10, color: "var(--color-red)" },
  { type: "ring", cx: 93, cy: 9, r: 3.2, color: "var(--color-blue)" },
  { type: "plus", cx: 90, cy: 87, size: 4.5, color: "var(--color-gold)" },
  { type: "triangle", cx: 9, cy: 89, size: 4, rotate: -25, color: "var(--color-cyan)" },
  { type: "dot", cx: 48, cy: 5, r: 1.6, color: "var(--color-pink)" },
  { type: "square", cx: 95, cy: 48, size: 3.6, rotate: 18, color: "var(--color-red)" },
  { type: "triangle", cx: 66, cy: 6, size: 3.6, rotate: 50, color: "var(--color-pink)" },
  { type: "ring", cx: 4, cy: 52, r: 2.6, color: "var(--color-gold)" },
  { type: "dot", cx: 97, cy: 70, r: 1.4, color: "var(--color-cyan)" },
];

function ShapeNode({ shape }: { shape: Shape }) {
  switch (shape.type) {
    case "triangle": {
      const { cx, cy, size, rotate, color } = shape;
      const points = `${cx},${cy - size} ${cx - size},${cy + size * 0.7} ${cx + size},${cy + size * 0.7}`;
      return <polygon points={points} fill={color} transform={`rotate(${rotate} ${cx} ${cy})`} />;
    }
    case "ring":
      return (
        <circle cx={shape.cx} cy={shape.cy} r={shape.r} fill="none" stroke={shape.color} strokeWidth={1.4} />
      );
    case "dot":
      return <circle cx={shape.cx} cy={shape.cy} r={shape.r} fill={shape.color} />;
    case "plus": {
      const { cx, cy, size, color } = shape;
      const w = size * 0.3;
      return (
        <g fill={color}>
          <rect x={cx - w / 2} y={cy - size / 2} width={w} height={size} />
          <rect x={cx - size / 2} y={cy - w / 2} width={size} height={w} />
        </g>
      );
    }
    case "square": {
      const { cx, cy, size, rotate, color } = shape;
      return (
        <rect
          x={cx - size / 2}
          y={cy - size / 2}
          width={size}
          height={size}
          fill="none"
          stroke={color}
          strokeWidth={1.4}
          transform={`rotate(${rotate} ${cx} ${cy})`}
        />
      );
    }
  }
}

export function Confetti({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    >
      {SHAPES.map((s, i) => (
        <ShapeNode key={i} shape={s} />
      ))}
    </svg>
  );
}
