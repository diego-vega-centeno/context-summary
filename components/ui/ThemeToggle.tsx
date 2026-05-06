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
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={clsx(
        "flex items-center justify-left whitespace-nowrap",
        className,
      )}
    >
      {theme === "dark" ? (
        <Moon className="h-8 w-8 p-1 rounded-full hover:bg-foreground hover:text-background hover:cursor-pointer" />
      ) : (
        <Sun className="h-8 w-8 p-1 rounded-full hover:bg-foreground hover:text-background hover:cursor-pointer" />
      )}
      {showLabels && (
        <span className="ml-2">
          {theme === "dark" ? "dark mode" : "light mode"}
        </span>
      )}
    </button>
  );
}
