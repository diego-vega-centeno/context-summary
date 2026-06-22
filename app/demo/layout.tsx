import { Settings, LogOut } from "lucide-react";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";
import NavLinks from "../ui/NavLinksDemo";
import SlideMenu from "../ui/SlideInMenu";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-64 max-h-screen">
        <div className="md:hidden">
          <SlideMenu>
            <aside className="h-full flex flex-col bg-sidebar-background text-sm">
              <div className="h-12/13 p-2">
                <NavLinks />
              </div>
              <div className="flex flex-col gap-2 border-t-2 border-highlight p-2">
                <ThemeToggle showLabels className="w-full px-1" />
                <Button
                  href="/"
                  icon={Settings}
                  variant={"withIcon"}
                  className="w-full"
                >
                  Settings
                </Button>
                <Button
                  href="/"
                  variant={"withIcon"}
                  icon={LogOut}
                  className="w-full justify-start text-warning font-bold"
                >
                  Sign out
                </Button>
              </div>
            </aside>
          </SlideMenu>
        </div>
        <div className="hidden md:block h-full">
          <aside className="h-full flex flex-col bg-sidebar-background text-sm">
            <div className="h-12/13 p-2">
              <NavLinks />
            </div>
            <div className="flex flex-col gap-2 border-t-2 border-highlight p-2">
              <ThemeToggle showLabels className="w-full px-1" />
              <Button
                href="/"
                icon={Settings}
                variant={"withIcon"}
                className="w-full"
              >
                Settings
              </Button>
              <Button
                href="/"
                variant={"withIcon"}
                icon={LogOut}
                className="w-full justify-start text-warning font-bold"
              >
                Sign out
              </Button>
            </div>
          </aside>
        </div>
      </div>
      <div className="flex-1 max-h-screen overflow-auto">{children}</div>
    </div>
  );
}
