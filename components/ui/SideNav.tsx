"use client";
import Button from "./Button";
import NavLinks from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";
import { Settings } from "lucide-react";

export default function SideNav() {
  return (
    <aside className="h-full flex flex-col bg-sidebar-background">
      <div className="h-12/13 p-4">
        <NavLinks />
      </div>
      <div className="flex flex-col gap-2 border-t-2 border-highlight p-2">
        <ThemeToggle showLabels className="w-full" />
        <Button variant={"ghost"} className="w-full justify-start">
          Settings
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-warning font-bold"
        >
          Sign out
        </Button>
      </div>
    </aside>
  );
}
