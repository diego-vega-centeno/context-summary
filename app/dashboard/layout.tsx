import SideNav from "@/components/ui/SideNav";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="md:w-64 max-h-screen"><SideNav/></div>
      <div className="flex-1 max-h-screen min-w-sm overflow-auto">{children}</div>
    </div>
  );
}
