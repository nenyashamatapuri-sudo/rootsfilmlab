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
      <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-paper text-ink">
        <div className="relative z-10 flex h-full min-h-full flex-col">{children}</div>
      </div>
    );
  }

  return (
    <div className="cosmos relative flex h-full min-h-full flex-col overflow-hidden text-paper">
      <div className="starfield" />
      {rocks && <HoloRocks />}
      <div className="relative z-10 flex h-full min-h-full flex-col">{children}</div>
    </div>
  );
}
