"use client";

import Button from "@/components/ui/Button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
  }

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
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5 text-sm">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                id="email"
                className="border border-highlight w-full bg-sidebar-background p-2 rounded-md h-9 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-[color,box-shadow] "
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                id="password"
                className="border border-highlight w-full bg-sidebar-background p-2 rounded-md h-9 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-[color,box-shadow]"
                type="password"
                placeholder="*********"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading && (
                <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
              )}
              Sign in
            </Button>
          </form>
        </div>
        <div className="text-muted-foreground text-sm text-center p-3">
          Don't have an account?{" "}
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
