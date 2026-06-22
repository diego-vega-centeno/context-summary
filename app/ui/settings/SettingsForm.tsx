"use client";
import { UserAuth } from "@/types";
import { SettingsSection } from "./SettingsSection";
import { updateUserSettings } from "@/lib/actions/user";
import { useActionState, useEffect, useState } from "react";
import Button from "../Button";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LoaderCircle,
} from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { useTheme } from "next-themes";
import { deleteAllPRs, deleteUser } from "@/lib/actions/pr";
import { toast } from "sonner";
import { logout } from "@/lib/actions/pr";

const SelectItem = function SelectItem({
  children,
  ...props
}: Select.SelectItemProps) {
  return (
    <Select.Item
      className="cursor-pointer hover:bg-hover text-sm px-2 py-1 rounded-md focus:outline-none"
      {...props}
    >
      <span className="flex items-center justify-between">
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator>
          <CheckIcon />
        </Select.ItemIndicator>
      </span>
    </Select.Item>
  );
};

async function deleteAllPRsOnClick(id: string) {
  if (window.confirm("Delete all tracked PRs? This cannot be undone.")) {
    const result = await deleteAllPRs(id);
    if (result?.success) {
      toast.success("Entire PR list deleted", {
        duration: 3000,
        style: {
          background: "#ef4444",
          color: "white",
          border: "1px solid black",
        },
      });
    } else {
      toast(result.error, {
        duration: 3000,
        action: {
          label: "Close",
          onClick: () => null,
        },
        style: {
          background: "#ef4444",
          color: "white",
          border: "1px solid black",
        },
      });
    }
  }
}

async function deleteUserOnClick(userId: string) {
  if (window.confirm("Delete your account and all data?. Cannot be undone")) {
    const result = await deleteUser(userId);
    if (result?.success) {
      await logout();
    } else {
      toast(result.error, {
        duration: 3000,
        action: {
          label: "Close",
          onClick: () => null,
        },
        style: {
          background: "#ef4444",
          color: "white",
          border: "1px solid black",
        },
      });
    }
  }
}

export default function SettingsForm({ user }: { user: UserAuth }) {
  const [state, formAction, isPending] = useActionState(updateUserSettings, {
    success: false,
    data: {},
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [staleDays, setStaleDays] = useState(String(user.stale_days ?? 7));

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (state?.success) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    }
  }, [state]);

  if (!mounted) {
    return <div className="h-8 w-32" />;
  }
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
      <SettingsSection title="Appearance" description="Theme selection">
        <Select.Root value={theme} onValueChange={setTheme}>
          <Select.Trigger
            className="text-sm self-start inline-flex border 
          border-border rounded-md px-2 py-1 gap-2 items-center
          outline-none focus:shadow-[0_0_8px_2px_rgba(107,114,128,0.5)]
          transition-shadow"
          >
            <Select.Value placeholder="Change theme" />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              className="min-w-[8rem] bg-background border border-border rounded-md px-2 py-2"
              position="popper"
              sideOffset={4}
            >
              <Select.Viewport>
                <Select.Group>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </SettingsSection>
      <SettingsSection
        title="Sync & Staleness"
        description="Configure how often PRs sync and when they're considered stale"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="">
            <div className="">Stale threshold</div>
            <div className="text-muted-foreground">
              Days of inactivity before a PR is marked stale
            </div>
          </div>
          <Select.Root value={staleDays} onValueChange={setStaleDays}>
            <Select.Trigger
              className="text-sm self-start inline-flex border 
          border-border rounded-md px-2 py-1 gap-2 items-center
          outline-none focus:shadow-[0_0_8px_2px_rgba(107,114,128,0.5)]
          transition-shadow min-w-[91px]"
            >
              <Select.Value placeholder="Change staleness" />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="min-w-[8rem] bg-background border border-border rounded-md px-2 py-2"
                position="popper"
                sideOffset={4}
              >
                <Select.Viewport>
                  <Select.Group>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          <input type="hidden" name="staleDays" value={staleDays} />
        </div>
      </SettingsSection>
      <SettingsSection
        title="Danger zone"
        description="Irreversible actions — proceed with care"
        classNameTitle="dark:text-red-500/80"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="">
            <div>Delete all tracked PRs</div>
            <div className="text-muted-foreground">
              Clears your entire PR list. Cannot be undone.
            </div>
          </div>
          <Button
            type="button"
            onClick={() => deleteAllPRsOnClick(user.id)}
            className="bg-red-500/50 dark:text-white min-w-[77px]"
          >
            Delete all
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="">Delete account</div>
            <div className="text-muted-foreground">
              Permanently deletes your account and all data.
            </div>
          </div>
          <Button
            type="button"
            onClick={() => deleteUserOnClick(user.id)}
            className="bg-red-500/50 dark:text-white min-w-[114px]"
          >
            Delete account
          </Button>
        </div>
      </SettingsSection>
      <div className="flex justify-start">
        <Button
          type="submit"
          disabled={isPending || isSuccess}
          className="gap-2 min-w-28"
        >
          {isPending && <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />}
          {isSuccess ? "Saved!" : isPending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
