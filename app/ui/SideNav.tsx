import Button from "./Button";
import NavLinks from "./NavLinks";
import { Settings, LogOut } from "lucide-react";
import { ThemeToggle } from "@/app/ui/ThemeToggleClient";
import { signOut } from "@/auth";

export default function SideNav() {
  return (
    <aside className="h-full flex flex-col bg-sidebar-background text-sm">
      <div className="h-12/13 p-2">
        <NavLinks />
      </div>
      <div className="flex flex-col gap-2 border-t-2 border-highlight p-2">
        {/* <ThemeToggle showLabels className="w-full px-1" /> */}
        <ThemeToggle showLabels className="w-full px-1" />
        <Button icon={Settings} variant={"withIcon"} className="w-full">
          Settings
        </Button>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button
            variant={"withIcon"}
            icon={LogOut}
            className="w-full justify-start text-warning font-bold"
          >
            Sign out
          </Button>
        </form>
      </div>
    </aside>
  );
}
