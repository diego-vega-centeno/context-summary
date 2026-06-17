import { auth } from "@/auth";
import SettingsForm from "@/app/ui/settings/SettingsForm";
import { getUserById } from "@/lib/data/prs";
import { UserAuth } from "@/types";

export default async function SettingsPage() {
  const session = await auth();
  const user: UserAuth = await getUserById(session?.user?.id!);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-foreground text-lg">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your account and preferences
        </p>
      </div>
      <SettingsForm user={user} />
    </div>
  );
}
