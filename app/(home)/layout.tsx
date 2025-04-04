import { HomepageSidebar } from "@/components/homepage-sidebar";
import { SiteHeaderHome } from "@/components/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="[--header-height:calc(--spacing(12))] ">
      <SidebarProvider className="flex flex-col w-auto" defaultOpen={false}>
        {/* <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-solid border-black/[.08] dark:border-white/[.145] [--header-height:calc(--spacing(12))]">
          <SiteHeaderHome />
        </header> */}
        <SiteHeaderHome />
        <HomepageSidebar />
        <main className="flex flex-col items-center justify-between mx-auto max-w-6xl">
          <>{children}</>
        </main>
      </SidebarProvider>
    </div>
  );
}
// This is the layout component for your Next.js application.
