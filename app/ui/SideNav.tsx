import Button from "./Button";
import NavLinks from "./NavLinks";
import { Settings, LogOut } from "lucide-react";
import ThemeToggle from "@/app/ui/ThemeToggle";
import { logout } from "@/lib/actions/pr";
import { auth } from "@/auth";

export default async function SideNav() {
  const session = await auth();
  return (
    <aside className="h-full flex flex-col bg-sidebar-background text-sm">
      <div className="hidden md:block px-4 py-3 border-b bg-sidebar-background text-sm">
        <div>Summary Context</div>
      </div>
      <div className="h-full p-2">
        <NavLinks />
      </div>
      <div className="flex flex-col gap-2 border-t-2 border-highlight p-2">
        <ThemeToggle showLabels className="w-full px-1" />
        <Button
          href="/settings"
          icon={Settings}
          variant={"withIcon"}
          className="w-full"
        >
          Settings
        </Button>
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
