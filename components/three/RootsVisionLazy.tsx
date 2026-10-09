"use client";

import dynamic from "next/dynamic";

const RootsVisionScene = dynamic(() => import("./RootsVisionScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export default function RootsVisionLazy() {
  return <RootsVisionScene />;
}
