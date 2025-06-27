"use client";
import InstallButton from "@/components/install-pwa";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  const isMobile = useIsMobile();
  return (
    <section className="py-16 text-center ">
      <div className="flex flex-col items-center mb-8 gap-3">
        <div className="">
          <Button
            className="border p-2 px-4 rounded-lg w-fit mb-4"
            variant="outline"
            asChild
          >
            <Link href="https://github.com/mnove/101webtools" target="_blank">
              Give us a <Star className="inline h-5 w-5 stroke-yellow-500" /> on
              Github!{" "}
            </Link>
          </Button>
        </div>

        {isMobile ? (
          <h1 className="text-5xl text-balance tracking-tight md:text-5xl lg:text-6xl font-extrabold mb-4">
            Free web tools. <br />
            <span> One App</span>
          </h1>
        ) : (
          <h1 className="text-5xl text-balance tracking-tight md:text-5xl lg:text-6xl font-extrabold mb-4">
            Free, open source web tools. <br />
            <span> Just one App</span>
          </h1>
        )}

        {isMobile ? (
          <p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 tracking-tight"
            style={{
              wordSpacing: "0.2rem",
            }}
          >
            Access 20+ developer tools - all free and 100% open source.
          </p>
        ) : (
          <p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 tracking-tight"
            style={{
              wordSpacing: "0.2rem",
            }}
          >
            Access 20+ essential developer tools instantly without context
            switching or multiple bookmarks - all free and 100% open source.
          </p>
        )}

        <div className="flex flex-row sm:flex-row gap-4 items-center justify-center mb-8">
          <div className="border p-2 px-4 rounded-lg">100% Free</div>
          <div className="border p-2 px-4 rounded-lg">Zero Ads</div>
          <div className="border p-2 px-4 rounded-lg">App + Offline</div>
        </div>
      </div>

      <div className="flex flex-row gap-4 items-center w-full justify-center">
        {/* <Button size="lg" asChild variant="outline">
            <Link href="#tools-section">
              Get the App <Smartphone className="ml-2 h-5 w-5" />
            </Link>
          </Button> */}
        <InstallButton />
        <Button size={isMobile ? "xxl" : "xl"} asChild>
          <Link href="#tools-section">
            Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
