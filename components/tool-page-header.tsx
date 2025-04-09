"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { toolsData } from "@/lib/tools-data";
import { Bug, Info, Megaphone, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

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

  const isMobile = useIsMobile();
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

  const toolDescription = (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div>
            <p className="text-muted-foreground text-lg leading-none hidden xl:block">
              {toolsData[toolName].description}
            </p>
            <div className="block xl:hidden">
              <Button size="sm" variant="outline" className="group">
                <Info className="w-4 h-4 " />
              </Button>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>{toolsData[toolName].description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const mobileMenu = (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <MoreHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="grid gap-0 p-0">
          <div className="space-y-2  rounded-md p-4 ">
            <p className="text-xs text-muted-foreground uppercase tracking-wider leading-none">
              Info
            </p>
            <p className="text-sm">{toolsData[toolName].description}</p>

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

          <Separator className="my-0" />
          <Link
            href={toolFeedbackComposedUrl}
            target="_blank"
            className="flex items-center gap-4 hover:bg-muted/50 p-4 cursor-pointer text-yellow-400"
          >
            <Megaphone className="w-4 h-4 group-hover:text-yellow-400 transition-colors" />
            <h4 className="font-medium leading-none">Give Feedback</h4>
          </Link>

          <Link
            href={toolReportComposedUrl}
            target="_blank"
            className="flex items-center gap-4 hover:bg-muted/50 p-4 cursor-pointer text-red-400"
          >
            <Bug className="w-4 h-4  group-hover:text-red-400 transition-colors " />
            <h4 className="font-medium leading-none">Report a Bug</h4>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );

  const feedbackButtons = (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <Button size="sm" variant="outline" className="group" asChild>
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
            <Button size="sm" variant="outline" className="group" asChild>
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
  );
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
                  <h1
                    className={`font-bold tracking-tight text-2xl mb-0 leading-none`}
                  >
                    {toolsData[toolName].label}
                  </h1>
                  {isMobile ? (
                    <>{mobileMenu}</>
                  ) : (
                    <>
                      <div className="[@media(max-height:980px)]:block hidden  ">
                        {toolDescription}
                      </div>
                      {toolsData[toolName].badges && (
                        <div className="flex flex-row gap-2 flex-wrap">
                          {toolsData[toolName].badges.map((badge) => (
                            <Badge key={badge} variant="outline">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="[@media(max-height:980px)]:hidden block">
                  {toolDescription}
                </div>
              </div>
            </div>

            {!isMobile && <>{feedbackButtons}</>}
          </div>

          <Separator className={`my-0 w-full h-1`} />
        </div>
      </div>
      <div className="h-4" />
      {/* Space filler when header is sticky */}
    </>
  );
}
