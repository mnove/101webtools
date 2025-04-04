import * as React from "react";
import { FileText, LayoutTemplate } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SampleBlogPreview } from "./sample-blog-preview";
import { SampleLandingPreview } from "./sample-landing-preview";

interface SamplePagesPreviewProps {
  fontFamily: string;
  baseSize: number;
  scaleRatio: number;
  sampleText: string;
}

export function SamplePagesPreview({
  fontFamily,
  baseSize,
  scaleRatio,
  sampleText,
}: SamplePagesPreviewProps) {
  const [previewTab, setPreviewTab] = React.useState<"landing" | "blog">(
    "landing"
  );

  return (
    <div className="col-span-1 md:col-span-5 max-h-[1000px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium uppercase font-mono text-muted-foreground">
          Sample Pages
        </h3>
        <Tabs
          defaultValue="landing"
          value={previewTab}
          onValueChange={(value) => setPreviewTab(value as "landing" | "blog")}
          className="w-auto"
        >
          <TabsList>
            <TabsTrigger value="landing">
              <LayoutTemplate className="h-4 w-4 mr-2" />
              Landing
            </TabsTrigger>
            <TabsTrigger value="blog">
              <FileText className="h-4 w-4 mr-2" />
              Blog
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="border rounded-lg shadow-sm h-full">
        <div className="overflow-x-auto p-2 h-full">
          {previewTab === "landing" ? (
            <div className="min-w-max">
              <SampleLandingPreview
                fontFamily={fontFamily}
                baseSize={baseSize}
                scale={scaleRatio}
                sampleText={sampleText}
              />
            </div>
          ) : (
            <div className="min-w-max">
              <SampleBlogPreview
                fontFamily={fontFamily}
                baseSize={baseSize}
                scale={scaleRatio}
                sampleText={sampleText}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
