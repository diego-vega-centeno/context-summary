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
      <DropdownMenu.Trigger className="outline-none text-sm">
        <div
          className={`
            flex justify-between items-center font-semibold px-2 py-1 border 
            border-border rounded-lg hover:bg-hover hover:cursor-pointer
            ${isOpen ? "bg-hover text-white" : "hover:bg-hover hover:text-white text-muted-foreground"}`}
        >
          <div className="pr-1">{field}</div>
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
          className={`min-w-[200px] border border-border rounded-lg 
            bg-sidebar-background overflow-hidden mt-2
            `}
        >
          <div>{content}</div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
