"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SlideMenu({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Dialog.Root>
      <div className="flex items-center justify-between p-1 px-3 bg-sidebar-foreground text-white">
        <Dialog.Trigger asChild>
          <button
            aria-label="Open menu"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
        </Dialog.Trigger>
        <div>{pathname.replace("/", "")}</div>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/45 animate-overlayShow" />
        <Dialog.Content
          className="fixed left-0 top-0 z-50 h-full w-72 max-w-[80vw] 
            shadow-lg outline-none flex flex-col animate-slideInLeft"
        >
          <div className="flex items-center justify-between px-2 py-1 border-b bg-sidebar-background text-sm">
            <Dialog.Title>Summary Context</Dialog.Title>
            <Dialog.Close asChild>
              <button
                aria-label="Close menu"
                className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
