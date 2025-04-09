"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { TypeScaleForm } from "./typescale-form";
import { ScalePreview } from "./scale-preview";
import { SamplePagesPreview } from "./sample-pages-preview";
import { TypeScaleFormValues, fontScales, typeScaleFormSchema } from "./utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function TypeScaleGenerator() {
  // Initialize form with default values
  const form = useForm<TypeScaleFormValues>({
    resolver: zodResolver(typeScaleFormSchema),
    defaultValues: {
      baseSize: 16,
      scale: "perfectFourth",
      fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      sampleText: "How vexingly quick daft zebras jump!",
      showCode: false,
    },
  });

  // Get scale config
  const [scaleConfig, setScaleConfig] = React.useState<TypeScaleFormValues>(
    form.getValues()
  );

  // Handle form submission
  const onSubmit = (values: TypeScaleFormValues) => {
    setScaleConfig(values);
    toast("Type scale updated", {
      description: `Base size: ${values.baseSize}px, Scale: ${
        fontScales[values.scale as keyof typeof fontScales].name
      }`,
      duration: 2000,
    });
  };

  // Handle form reset
  const handleReset = () => {
    form.reset();
    setScaleConfig(form.getValues());
  };

  // Get current scale's ratio
  const currentScale = fontScales[scaleConfig.scale as keyof typeof fontScales];
  const scaleRatio = currentScale.ratio;

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Three-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* 1. Settings Panel - Left Column */}
            <TypeScaleForm
              form={form}
              onReset={handleReset}
              onSubmit={onSubmit}
              scaleConfig={scaleConfig}
            />

            {/* <div className="col-span-10 flex w-full ">
              <ScalePreview
                fontFamily={scaleConfig.fontFamily}
                baseSize={scaleConfig.baseSize}
                scaleRatio={scaleRatio}
                sampleText={scaleConfig.sampleText}
              />
              <SamplePagesPreview
                fontFamily={scaleConfig.fontFamily}
                baseSize={scaleConfig.baseSize}
                scaleRatio={scaleRatio}
                sampleText={scaleConfig.sampleText}
              />
            </div> */}
            <ResizablePanelGroup
              direction="vertical"
              className="col-span-10 min-h-[200px] w-full  "
            >
              <ResizablePanel defaultSize={50}>
                <ScalePreview
                  fontFamily={scaleConfig.fontFamily}
                  baseSize={scaleConfig.baseSize}
                  scaleRatio={scaleRatio}
                  sampleText={scaleConfig.sampleText}
                />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <SamplePagesPreview
                  fontFamily={scaleConfig.fontFamily}
                  baseSize={scaleConfig.baseSize}
                  scaleRatio={scaleRatio}
                  sampleText={scaleConfig.sampleText}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </form>
      </Form>

      <div className="mt-6 text-xs text-muted-foreground">
        <p>
          Type scales create a consistent visual hierarchy through proportional
          relationships between font sizes. Different scales offer varying
          degrees of contrast between text elements, helping establish emphasis
          and flow.
        </p>
        <p className="mt-1">
          Modular scales like the Golden Ratio (1.618) or Perfect Fourth (1.333)
          are based on musical intervals, creating harmonious visual
          relationships that guide users through your content.
        </p>
      </div>
    </div>
  );
}
