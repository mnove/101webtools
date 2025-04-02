import { AppSidebar } from "@/components/app-sidebar";
import { InsetHeader } from "@/components/inset-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="[--header-height:calc(--spacing(14))] ">
      <SidebarProvider className="flex flex-col w-auto">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="p-4 relative">
            {/* <InsetHeader /> */}

            <ScrollArea className="h-[500px]">{children}</ScrollArea>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
