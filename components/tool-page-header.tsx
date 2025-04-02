"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toolsData } from "@/lib/tools-data";
import { useEffect, useRef, useState } from "react";

export default function ToolPageHeader({
  toolName,
}: {
  toolName: keyof typeof toolsData;
}) {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={headerRef} className="h-1 top-0 w-full" />{" "}
      {/* Observer target */}
      <div
        className={`${
          isSticky
            ? "sticky top-0 left-0 right-0 bg-background/95 backdrop-blur z-50 shadow-md py-2"
            : "py-4"
        } transition-all duration-200`}
      >
        <div className="container mx-auto max-w-4xl">
          <div
            className={`flex ${
              isSticky
                ? "flex-row items-center justify-between"
                : "flex-col gap-4"
            } mb-4`}
          >
            <div className="flex flex-col">
              <h1
                className={`font-bold tracking-tight ${
                  isSticky ? "text-2xl mb-0" : "md:text-4xl text-2xl mb-1"
                }`}
              >
                {toolsData[toolName].name}
              </h1>
              {!isSticky && (
                <p className="text-muted-foreground text-lg">
                  {toolsData[toolName].description}
                </p>
              )}
            </div>

            {toolsData[toolName].badges && (
              <div className="flex flex-row gap-2">
                {toolsData[toolName].badges.map((badge) => (
                  <Badge key={badge} variant="outline">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator className={`${isSticky ? "my-2" : "my-4"} w-full h-1`} />
        </div>
      </div>
      {isSticky && <div className="h-16" />}{" "}
      {/* Space filler when header is sticky */}
    </>
  );
}
