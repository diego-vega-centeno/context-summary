"use client";
import { UserAuth } from "@/types";
import { SettingsSection } from "./SettingsSection";
import { updateUserSettings } from "@/lib/actions/user";
import { useActionState, useEffect, useState } from "react";
import Button from "../Button";
import { LoaderCircle } from "lucide-react";

export default function SettingsForm({ user }: { user: UserAuth }) {
  const [state, formAction, isPending] = useActionState(updateUserSettings, {
    success: false,
    data: {},
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-5 text-sm" action={formAction}>
      <SettingsSection
        title="Account"
        description="Your profile and account details"
      >
        <div className="space-y-2">
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              id="email"
              className="border border-highlight w-full bg-sidebar-background p-2 rounded-md h-9 outline-none"
              type="text"
              placeholder={user.email! ?? "---"}
              disabled
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input
              id="name"
              name="name"
              className="border border-highlight w-full bg-sidebar-background p-2 rounded-md h-9 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-[color,box-shadow]"
              type="text"
              defaultValue={user.name ?? user.email ?? ""}
            />
            {!state?.success && state?.data?.name && (
              <p className="mt-2 text-sm text-red-500">{state.data.name[0]}</p>
            )}
          </div>
          <input name="id" hidden defaultValue={user.id} />
        </div>
      </SettingsSection>
      {/* <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how PR Context looks</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card> */}

      {/* <Card>
          <CardHeader>
            <CardTitle>Sync & Staleness</CardTitle>
            <CardDescription>
              Configure how often PRs sync and when they're considered stale
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Background sync interval
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  How often to poll GitHub for updates
                </p>
              </div>
              <Select value={syncInterval} onValueChange={setSyncInterval}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Stale threshold
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Days of inactivity before a PR is marked stale
                </p>
              </div>
              <Select value={staleDays} onValueChange={setStaleDays}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card> */}

      {/* <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure when you receive alerts</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Email on stale PR
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Get notified when a tracked PR goes stale
                </p>
              </div>
              <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
            </div>
            {emailNotifs && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/60 border border-border text-xs text-muted-foreground">
                <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                Email notifications require a connected Supabase project with
                email configured.
              </div>
            )}
          </CardContent>
        </Card> */}

      {/* <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-destructive">Danger zone</CardTitle>
            <CardDescription>
              Irreversible actions — proceed with care
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Remove all tracked PRs
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Clears your entire PR list. Cannot be undone.
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Remove all
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Delete account
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Permanently deletes your account and all data.
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete account
              </Button>
            </div>
          </CardContent>
        </Card> */}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isPending || isSuccess}
          className="gap-2 min-w-28"
        >
          {isPending && <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />}
          {/* {saved && <Check className="w-4 h-4" />} */}
          {isSuccess ? "Saved!" : isPending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
