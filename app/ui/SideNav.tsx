import Button from "./Button";
import NavLinks from "./NavLinks";
import { LogOut, Timeline } from "lucide-react";
import ThemeToggle from "@/app/ui/ThemeToggle";
import { logout } from "@/lib/actions/pr";
import { auth } from "@/auth";

export default async function SideNav() {
  const session = await auth();
  return (
    <aside className="h-full flex flex-col bg-sidebar-background text-sm">
      <div className="hidden md:flex items-center px-2 py-2 border-b bg-sidebar-background text-sm">
        <Button
          href="/"
          variant={"withIcon"}
          icon={() => <Timeline className="w-4 h-4" />}
        >
          Summary Context
        </Button>
      </div>
      <div className="h-full p-2">
        <NavLinks />
      </div>
      <div className="flex flex-col gap-2 border-t-2 border-highlight p-2">
        <ThemeToggle showLabels className="w-full px-1" />
        <div className="px-2 text-gray-500/80 dark:text-white/50">
          {session?.user && session.user?.email}
        </div>
        <form action={logout}>
          <Button
            type="submit"
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
