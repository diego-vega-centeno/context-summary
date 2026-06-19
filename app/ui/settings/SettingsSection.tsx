import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SettingsSection({
  title,
  description,
  children,
  classNameTitle,
}: {
  title: string;
  description: string;
  children?: ReactNode;
  classNameTitle?: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border-1 border-border p-4 text-sm">
      <div className={cn("dark:text-white text-lg", classNameTitle)}>
        {title}
      </div>
      <div className="text-muted-foreground">{description}</div>
      {children}
    </div>
  );
}
