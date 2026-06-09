"use client";

import Button from "@/app/ui/Button";
import { useActionState } from "react";
import { LoaderCircle, CircleAlert } from "lucide-react";
import { register } from "@/lib/actions/pr";
import { ActionReturn } from "@/types";

export default function RegisterPage() {
  const initialState: ActionReturn = { success: false };
  const [state, formAction, isPending] = useActionState(register, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-sm border border-border rounded-xl p-6">
        <div className="text-muted-foreground text-center">
          Insert your info
        </div>
        <div className="pt-3">
          <form className="space-y-3" action={formAction}>
            <div className="flex flex-col gap-1.5 text-sm">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                id="email"
                name="email"
                className="border border-highlight w-full bg-sidebar-background p-2 rounded-md h-9 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-[color,box-shadow] "
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                defaultValue={state?.data?.formValues?.email}
              />
            </div>
            {state?.data?.email && (
              <p className="mt-2 text-sm text-red-500">{state.data.email[0]}</p>
            )}
            <div className="flex flex-col gap-1.5 text-sm">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                id="name"
                name="name"
                className="border border-highlight w-full bg-sidebar-background p-2 rounded-md h-9 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-[color,box-shadow] "
                type="text"
                placeholder="your name"
                autoComplete="name"
                defaultValue={state?.data?.formValues?.name}
              />
              {state?.data?.name && (
                <p className="mt-2 text-sm text-red-500">
                  {state.data.name[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                id="password"
                name="password"
                className="border border-highlight w-full bg-sidebar-background p-2 rounded-md h-9 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-[color,box-shadow]"
                type="password"
                placeholder="*********"
                autoComplete="current-password"
                defaultValue={state?.data?.formValues?.password}
              />
              {state?.data?.password && (
                <p className="mt-2 text-sm text-red-500">
                  {state.data.password[0]}
                </p>
              )}
            </div>
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending && (
                <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
              )}
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
