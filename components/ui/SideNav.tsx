"use client";
import NavLinks from "./NavLinks";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SideNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-4 h-full flex flex-col border-r-1 border-r-red-background">
      <div className="h-11/12">
        <NavLinks />
      </div>
      <div className="h-1/12">
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? (
            <Sun className="h-8 w-8 p-1 rounded-full hover:cursor-pointer hover:bg-foreground hover:text-background" />
          ) : (
            <Moon className="h-8 w-8 p-1 rounded-full hover:cursor-pointer hover:bg-foreground hover:text-background" />
          )}
        </button>
      </div>
    </div>
  );
}
