"use client";
import dynamic from "next/dynamic";

export const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => <div className="h-7 w-7" />,
});
