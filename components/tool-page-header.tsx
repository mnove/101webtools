"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { toolsData } from "@/lib/tools-data";
import { Bug, Megaphone } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
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

  // const [isSticky, setIsSticky] = useState(false);
  // const headerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const header = headerRef.current;
  //   if (!header) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       setIsSticky(!entry.isIntersecting);
  //     },
  //     { threshold: 1, rootMargin: "-1px 0px 0px 0px" }
  //   );

  //   observer.observe(header);
  //   return () => observer.disconnect();
  // }, []);

  return (
    <>
      <div className="h-1 top-0 w-full" /> {/* Observer target */}
      <div
        className={`sticky top-0 left-0 right-0 bg-background/95 backdrop-blur z-50 shadow-md py-0transition-all duration-200`}
      >
        <div className="container mx-auto max-w-[100rem]">
          <div className="flex flex-row w-full items-start justify-between flex-wrap">
            <div
              className={`flex flex-row items-center justify-between gap-4 mb-4 flex-wrap`}
            >
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-4 flex-wrap">
                  <h1 className={`font-bold tracking-tight text-2xl mb-0`}>
                    {toolsData[toolName].label}
                  </h1>
                  {toolsData[toolName].badges && (
                    <div className="flex flex-row gap-2 flex-wrap">
                      {toolsData[toolName].badges.map((badge) => (
                        <Badge key={badge} variant="outline">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground text-lg">
                  {toolsData[toolName].description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
            </div>
          </div>

          <Separator className={`my-0 w-full h-1`} />
        </div>
      </div>
      <div className="h-4" />
      {/* Space filler when header is sticky */}
    </>
  );
}
