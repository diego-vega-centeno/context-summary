import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Dispatch } from "react";

interface SelectionCollapsibleProps {
  isOpen: boolean;
  setCurrentOpen: React.Dispatch<React.SetStateAction<string | null>>;
  title: string;
}

export default function SelectionCollapsible({
  isOpen,
  setCurrentOpen,
  title,
}: SelectionCollapsibleProps) {
  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={(open) => setCurrentOpen(open ? title : null)}
      className="text-sm"
    >
      <Collapsible.Trigger className="w-full">
        <div
          className={`flex justify-between items-center font-semibold px-2 py-1 border border-border rounded-lg hover:bg-hover ${isOpen ? "border-b-0 rounded-b-none" : ""}`}
        >
          <div>{title}</div>
          <div>{isOpen ? <ChevronDown /> : <ChevronRight />}</div>
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content
        className={`overflow-hidden ${isOpen ? "animate-collapsible-down" : "animate-collapsible-up"}`}
      >
        <div>content</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
