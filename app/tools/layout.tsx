import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="[--header-height:calc(--spacing(12))] ">
      <SidebarProvider className="flex flex-col w-auto">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="p-4 relative max-h-[calc(100vh-var(--header-height)-1px)] overflow-hidden">
            {/* <InsetHeader /> */}

            <ScrollAreaPrimitive.Root className="overflow-hidden h-full">
              <ScrollAreaPrimitive.Viewport className="w-full h-full rounded-[inherit]">
                {children}
              </ScrollAreaPrimitive.Viewport>
              <ScrollAreaPrimitive.Scrollbar
                className="flex select-none touch-none p-0.5  transition-colors duration-150 ease-out hover:bg-border/20 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical"
              >
                <ScrollAreaPrimitive.Thumb className="flex-1 bg-border rounded-[10px] relative" />
              </ScrollAreaPrimitive.Scrollbar>
            </ScrollAreaPrimitive.Root>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
