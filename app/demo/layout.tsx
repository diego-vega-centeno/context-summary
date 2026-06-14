import { Settings, LogOut } from "lucide-react";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";
import NavLinks from "../ui/NavLinksDemo";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="md:w-64 max-h-screen">
        <aside className="h-full flex flex-col bg-sidebar-background text-sm">
          <div className="h-12/13 p-2">
            <NavLinks />
          </div>
          <div className="flex flex-col gap-2 border-t-2 border-highlight p-2">
            <ThemeToggle showLabels className="w-full px-1" />
            <Button icon={Settings} variant={"withIcon"} className="w-full">
              Settings
            </Button>
              <Button
                type="submit"
                variant={"withIcon"}
                icon={LogOut}
                className="w-full justify-start text-warning font-bold"
              >
                Sign out
              </Button>
          </div>
        </aside>
      </div>
      <div className="flex-1 max-h-screen min-w-xs overflow-auto">
        {children}
      </div>
    </div>
  );
}
