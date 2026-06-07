"use client";

import Button from "@/app/ui/Button";
import { useActionState } from "react";
import { LoaderCircle, CircleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { authenticate } from "@/lib/actions/pr";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  const GoogleIcon = () => (
    <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-sm border border-border rounded-xl p-6">
        <div className="text-lg text-center font-semibold">Welcome back</div>
        <div className="text-muted-foreground text-center">
          Sign in to your account
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
              />
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
              />
            </div>
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending && (
                <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
              )}
              Sign in
            </Button>
            {state && (
              <div className="flex items-center h-8 space-x-1">
                <CircleAlert className="h-4 w-4 text-red-500" />
                <div className="text-sm text-red-500">{state}</div>
              </div>
            )}
          </form>
        </div>
        <div className="text-muted-foreground text-sm text-center p-3">
          Don&apos;t have an account?{" "}
          <Link href="/" className="text-white underline">
            Sign up
          </Link>
        </div>
        <div className="relative">
          <hr className="/border-border h-6" />
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-8 bg-background">
            or
          </div>
        </div>
        <div>
          <Button
            variant={"withIcon"}
            icon={GoogleIcon}
            href={"/oauth/google"}
            className="w-full flex items-center justify-center bg-muted-background p-2"
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
