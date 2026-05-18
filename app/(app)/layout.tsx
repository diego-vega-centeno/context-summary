import SideNav from "@/app/ui/SideNav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="md:w-64 max-h-screen">
        <SideNav />
      </div>
      <div className="flex-1 max-h-screen min-w-xs overflow-auto">
        {children}
      </div>
    </div>
  );
}
