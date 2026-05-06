"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "PR stories", href: "/pr-stories" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("w-full px-2 py-1 hover:text-white hover:bg-highlight rounded-sm", {
              "bg-white text-black": pathname === link.href,
            })}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
