"use client";
import Button from "@/app/ui/Button";
import { LayoutDashboard, BookOpenText } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "PR stories", href: "/stories", icon: BookOpenText },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-1">
      {links.map((link) => {
        return (
          <Button
            key={link.name}
            href={link.href}
            variant={"withIcon"}
            icon={link.icon}
            className={pathname === link.href ? "bg-highlight/50" : ""}
          >
            {link.name}
          </Button>
        );
      })}
    </div>
  );
}
