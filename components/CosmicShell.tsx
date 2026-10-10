import { HoloRocks } from "./HoloRocks";

export function CosmicShell({
  children,
  rocks = false,
  light = false,
  below,
  backdrop,
}: {
  children: React.ReactNode;
  rocks?: boolean;
  light?: boolean;
  /** Rendered outside/under the white card, still on the duotone background. */
  below?: React.ReactNode;
  /** Rendered full-bleed behind everything, including the white card itself. */
  backdrop?: React.ReactNode;
}) {
  if (light) {
    return (
      <div className="duotone-red relative flex h-full min-h-full flex-col overflow-hidden">
        {rocks && <HoloRocks />}
        {backdrop}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-4 p-4 sm:p-6 lg:flex-row lg:gap-8 lg:p-10">
          {below && <div className="order-2 shrink-0 lg:order-1">{below}</div>}
          <div className="order-1 flex min-h-0 w-full max-w-4xl flex-col overflow-y-auto rounded-2xl border border-ink/10 bg-paper text-ink shadow-[0_30px_80px_rgba(0,0,0,0.5)] lg:order-2">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="duotone relative flex h-full min-h-full flex-col overflow-hidden text-paper">
      {rocks && <HoloRocks />}
      <div className="relative z-10 flex h-full min-h-full flex-col">{children}</div>
    </div>
  );
}
