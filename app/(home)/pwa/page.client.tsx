"use client";

import { useEffect } from "react";

import InstallButton from "@/components/install-pwa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import confetti from "canvas-confetti";
import { Download, Zap } from "lucide-react";
import Link from "next/link";

export function PWAHero() {
  const handleClick = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  // trigger handleClick after 1 second on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClick();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const isMobile = useIsMobile();
  return (
    <div className="relative">
      {/* <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Confetti
      </span> */}

      <div className="text-center mb-12 ">
        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
          Beta
        </Badge>{" "}
        <Button asChild variant="link">
          <Link href="https://tally.so/r/3ybDZd" target="_blank">
            Let us know what you think!
          </Link>
        </Button>
        <h1 className="text-6xl font-bold mb-4 tracking-tight mt-6">
          101webtools App is Here!
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          All the 101webtools you love, directly on your{" "}
          <span className="font-bold">desktop or mobile</span> device.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="" asChild>
            <Link href="#installation-guide">
              <Download className="w-5 h-5 mr-2" />
              Install PWA Now
            </Link>
          </Button>
          <InstallButton isMobile={isMobile} />
          <Button variant="outline" size="lg" asChild>
            <Link href="/tools">
              <Zap className="w-5 h-5 mr-2" />
              Try Tools Online
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
