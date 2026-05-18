"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  accent?: string;
}

export default function StorySection({
  title,
  children,
  icon,
  defaultOpen = false,
  accent,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className="text-sm"
    >
      <Collapsible.Trigger className="w-full">
        <div
          className={`flex justify-between items-center font-semibold p-5 border border-border rounded-lg hover:bg-hover ${isOpen ? "border-b-0 rounded-b-none" : ""}`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent || "bg-accent text-accent-foreground"}`}
            >
              {icon}
            </div>
            <div>{title}</div>
          </div>
          <div>{isOpen ? <ChevronDown /> : <ChevronRight />}</div>
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content
        className={`overflow-hidden ${isOpen ? "animate-collapsible-down" : "animate-collapsible-up"}`}
      >
        <div
          className={`px-5 py-4 border border-border rounded-lg ${isOpen ? "border-t-0 rounded-t-none" : ""}`}
        >
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
