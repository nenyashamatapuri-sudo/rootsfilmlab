import { HoloRocks } from "./HoloRocks";

export function CosmicShell({
  children,
  rocks = false,
  light = false,
  below,
}: {
  children: React.ReactNode;
  rocks?: boolean;
  light?: boolean;
  /** Rendered outside/under the white card, still on the duotone background. */
  below?: React.ReactNode;
}) {
  if (light) {
    return (
      <div className="duotone-red relative flex h-full min-h-full flex-col overflow-hidden">
        {rocks && <HoloRocks />}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-6 p-5 sm:p-10">
          <div className="flex w-full max-w-4xl flex-col overflow-y-auto rounded-2xl border border-ink/10 bg-paper text-ink shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            {children}
          </div>
          {below}
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
