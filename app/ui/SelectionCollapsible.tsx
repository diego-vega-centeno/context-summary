import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SelectionCollapsibleProps {
  isOpen: boolean;
  setCurrentOpen: React.Dispatch<React.SetStateAction<string | null>>;
  field: string;
  content: [] | React.ReactNode;
}

export default function SelectionCollapsible({
  isOpen,
  setCurrentOpen,
  field,
  content,
}: SelectionCollapsibleProps) {
  return (
    <DropdownMenu.Root
      open={isOpen}
      onOpenChange={(open: boolean) => setCurrentOpen(open ? field : null)}
    >
      <DropdownMenu.Trigger className="outline-none">
        <div
          className={`
            flex justify-between items-center font-semibold px-2 py-1 border 
            border-border rounded-lg hover:bg-hover
            ${isOpen ? "bg-hover text-white" : "hover:bg-hover hover:text-white text-muted-foreground"}`}
        >
          <div>{field}</div>
          <div>
            {isOpen ? (
              <ChevronDown className="size-5" />
            ) : (
              <ChevronRight className="size-5" />
            )}
          </div>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`w-[200px] bg-sidebar-background overflow-hidden ${isOpen ? "animate-collapsible-down" : "animate-collapsible-up"}`}
        >
          <div>{content}</div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
