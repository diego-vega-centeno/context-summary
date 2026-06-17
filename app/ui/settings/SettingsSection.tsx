import { ReactNode } from "react";

export function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border-1 border-border p-4 text-sm">
      <div className="dark:text-white text-lg">{title}</div>
      <div className="text-muted-foreground">{description}</div>
      {children}
    </div>
  );
}