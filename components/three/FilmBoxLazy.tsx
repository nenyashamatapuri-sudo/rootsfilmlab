"use client";

import dynamic from "next/dynamic";

const FilmBoxScene = dynamic(() => import("./FilmBoxScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export default function FilmBoxLazy() {
  return <FilmBoxScene />;
}
