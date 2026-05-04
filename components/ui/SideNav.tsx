"use client";
import NavLinks from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export default function SideNav() {
  return (
    <div className="p-4 h-full flex flex-col border-r-1 border-r-red-background">
      <div className="h-11/12">
        <NavLinks />
      </div>
      <div className="h-1/12">
          <ThemeToggle/>
      </div>
    </div>
  );
}
