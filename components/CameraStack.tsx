import { CameraMark } from "./CameraMark";

const STACK = [
  { color: "text-cyan", scale: 0.5, y: -150, opacity: 0.55 },
  { color: "text-gold", scale: 0.66, y: -104, opacity: 0.68 },
  { color: "text-red", scale: 0.82, y: -54, opacity: 0.82 },
];

export function CameraStack() {
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-xs sm:h-[360px] sm:max-w-sm" aria-hidden>
      {STACK.map((cam) => (
        <CameraMark
          key={cam.color}
          className={`absolute inset-x-0 bottom-0 mx-auto w-full ${cam.color}`}
          style={{
            transform: `translateY(${cam.y}px) scale(${cam.scale})`,
            opacity: cam.opacity,
          }}
        />
      ))}
      <CameraMark
        rim="var(--color-paper)"
        className="absolute inset-x-0 bottom-0 mx-auto w-full text-ink"
      />
      <span className="absolute right-[18%] bottom-[29%] h-3 w-3 rounded-full bg-red sm:bottom-[31%]" />
    </div>
  );
}
