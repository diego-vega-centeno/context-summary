"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import clsx from "clsx";

export function ThemeToggle({
  showLabels = false,
  className,
}: {
  showLabels?: boolean;
  className?: string;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className={clsx(
        "flex items-center justify-left whitespace-nowrap",
        className,
      )}
    >
      {theme === "dark" ? (
        <Moon
          className="h-7 w-7 p-1 rounded-full hover:bg-foreground hover:text-background hover:cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      ) : (
        <Sun
          className="h-7 w-7 p-1 rounded-full hover:bg-foreground hover:text-background hover:cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      )}
      {showLabels && (
        <span className="ml-1">
          {theme === "dark" ? "dark mode" : "light mode"}
        </span>
      )}
    </button>
  );
}
