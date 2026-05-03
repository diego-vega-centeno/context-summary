import SideNav from "@/components/ui/SideNav";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="md:w-64"><SideNav/></div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
