"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toolsData } from "@/lib/tools-data";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Bug, Megaphone } from "lucide-react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function ToolPageHeader({
  toolName,
}: {
  toolName: keyof typeof toolsData;
}) {
  const { giveFeedbackFormUrl, reportBugFormUrl } = siteConfig.feedbackUrls;
  const toolLabel = toolsData[toolName].label;

  const toolFeedbackComposedUrl = `${giveFeedbackFormUrl}?toolName=${toolName}&toolLabel=${toolLabel}`;
  const toolFeedbackUrl = new URL(toolFeedbackComposedUrl);

  const toolReportComposedUrl = `${reportBugFormUrl}?toolName=${toolName}&toolLabel=${toolLabel}`;
  const toolReportUrl = new URL(toolReportComposedUrl);
  console.log("toolReportUrl", toolReportUrl.href);
  console.log("toolFeedbackUrl", toolFeedbackUrl.href);

  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 1, rootMargin: "-1px 0px 0px 0px" }
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
            ? "sticky top-0 left-0 right-0 bg-background/95 backdrop-blur z-50 shadow-md py-0"
            : "py-0"
        } transition-all duration-200`}
      >
        <div className="container mx-auto max-w-[100rem]">
          <div className="flex flex-row w-full items-start justify-between">
            <div
              className={`flex ${
                isSticky
                  ? "flex-row items-center justify-between gap-4"
                  : "flex-row items-center justify-between gap-4"
              } mb-4`}
            >
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-4">
                  <h1
                    className={`font-bold tracking-tight ${
                      isSticky ? "text-2xl mb-0" : "md:text-4xl text-2xl mb-1"
                    }`}
                  >
                    {toolsData[toolName].label}
                  </h1>
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
                {!isSticky && (
                  <p className="text-muted-foreground text-lg">
                    {toolsData[toolName].description}
                  </p>
                )}
              </div>

              {/* {toolsData[toolName].badges && (
                <div className="flex flex-row gap-2">
                  {toolsData[toolName].badges.map((badge) => (
                    <Badge key={badge} variant="outline">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )} */}
            </div>
            <div className="flex items-center gap-2">
              {isSticky ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {" "}
                      <Button
                        size="sm"
                        variant="outline"
                        className="group"
                        asChild
                      >
                        <Link href={toolReportComposedUrl} target="_blank">
                          <Bug className="w-4 h-4  group-hover:text-red-400 transition-colors " />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Report a bug</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger>
                      {" "}
                      <Button
                        size="sm"
                        variant="outline"
                        className="group"
                        asChild
                      >
                        <Link href={toolFeedbackComposedUrl} target="_blank">
                          <Megaphone className="w-4 h-4 group-hover:text-yellow-400 transition-colors" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Give feedback</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:text-red-400 transition-colors"
                    asChild
                  >
                    <Link href={toolReportComposedUrl} target="_blank">
                      <Bug className="w-4 h-4 mr-2" />
                      Report Bug
                    </Link>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:text-yellow-400 transition-colors"
                    asChild
                  >
                    <Link href={toolFeedbackComposedUrl} target="_blank">
                      <Megaphone className="w-4 h-4 mr-2" />
                      Feedback
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          <Separator className={`${isSticky ? "my-0" : "my-0"} w-full h-1`} />
        </div>
      </div>
      {isSticky && <div className="h-16" />}{" "}
      {/* Space filler when header is sticky */}
    </>
  );
}
