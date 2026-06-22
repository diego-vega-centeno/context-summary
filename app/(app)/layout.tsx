import SideNav from "@/app/ui/SideNav";
import SlideMenu from "../ui/SlideInMenu";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-64 max-h-screen">
        <div className="md:hidden">
          <SlideMenu>
            <SideNav />
          </SlideMenu>
        </div>
        <div className="hidden md:block h-full">
          <SideNav />
        </div>
      </div>
      <div className="flex-1 max-h-screen overflow-auto">{children}</div>
    </div>
  );
}
