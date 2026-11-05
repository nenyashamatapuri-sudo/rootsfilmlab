export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1600896047966901";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function pixelEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (params) window.fbq("track", name, params);
  else window.fbq("track", name);
}
