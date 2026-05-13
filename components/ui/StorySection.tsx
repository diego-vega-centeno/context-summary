"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface CollapsibleProps {
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  accent?: string;
}

export default function StorySection({
  title,
  content,
  icon,
  defaultOpen,
  accent,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);
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
      <Collapsible.Content>
        <div
          className={`px-5 py-4 border border-border rounded-lg ${isOpen ? "border-t-0 rounded-t-none" : ""}`}
        >
          {content}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
