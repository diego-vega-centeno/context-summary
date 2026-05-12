import Button from "@/components/ui/Button";
import { LayoutDashboard, BookOpenText } from "lucide-react";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "PR stories", href: "/stories", icon: BookOpenText },
];

export default function NavLinks() {
  return (
    <div className="flex flex-col gap-1">
      {links.map((link) => {
        return (
          <Button
            key={link.name}
            href={link.href}
            variant={'withIcon'}
            icon={link.icon}
          >
            {link.name}
          </Button>
        );
      })}
    </div>
  );
}
