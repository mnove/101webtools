import { Footer } from "@/components/footer";
import { HomepageSidebar } from "@/components/homepage-sidebar";
import { SiteHeaderHome } from "@/components/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Spotlight } from "@/components/ui/spotlight";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="[--header-height:calc(--spacing(12))] ">
      <SidebarProvider className="flex flex-col w-auto" defaultOpen={false}>
        {/* <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-solid border-black/[.08] dark:border-white/[.145] [--header-height:calc(--spacing(12))]">
          <SiteHeaderHome />
        </header> */}
        <SiteHeaderHome />
        <HomepageSidebar />
        <div className="relative overflow-hidden">
          <Spotlight
            gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .15) 0, hsla(210, 100%, 55%, .06) 50%, hsla(210, 100%, 45%, 0) 80%)"
            gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .1) 0, hsla(210, 100%, 55%, .06) 80%, transparent 100%)"
            gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 45%, .06) 80%, transparent 100%)"
          />
          <main className="flex flex-col items-center justify-between mx-auto max-w-6xl relative">
            <>{children}</>
          </main>
          <Footer className="max-w-6xl mx-auto" />
        </div>
      </SidebarProvider>
    </div>
  );
}
// This is the layout component for your Next.js application.
