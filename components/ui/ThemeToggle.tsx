"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <Sun className="h-8 w-8 p-1 rounded-full hover:bg-foreground hover:text-background" />
      ) : (
        <Moon className="h-8 w-8 p-1 rounded-full hover:bg-foreground hover:text-background" />
      )}
    </button>
  );
}