import { HoloRocks } from "./HoloRocks";

export function CosmicShell({
  children,
  rocks = false,
  light = false,
}: {
  children: React.ReactNode;
  rocks?: boolean;
  light?: boolean;
}) {
  if (light) {
    return (
      <div className="duotone-red relative flex h-full min-h-full flex-col overflow-hidden">
        {rocks && <HoloRocks />}
        <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center p-5 sm:p-10">
          <div className="flex w-full max-w-4xl flex-col overflow-y-auto rounded-2xl border border-ink/10 bg-paper text-ink shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
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
