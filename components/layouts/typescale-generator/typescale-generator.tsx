"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Code,
  FileText,
  Info,
  LayoutTemplate,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SampleBlogPreview } from "./sample-blog-preview";
import { SampleLandingPreview } from "./sample-landing-preview";
import { Separator } from "@/components/ui/separator";

// Define font scale options with their descriptions
const fontScales = {
  minorSecond: {
    name: "Minor Second",
    ratio: 1.067,
    description: "Subtle increments, suitable for dense text layouts",
  },
  majorSecond: {
    name: "Major Second",
    ratio: 1.125,
    description:
      "Slightly more noticeable increments, good for compact designs",
  },
  minorThird: {
    name: "Minor Third",
    ratio: 1.2,
    description:
      "Moderate increments, helpful in differentiating text levels in UIs",
  },
  majorThird: {
    name: "Major Third",
    ratio: 1.25,
    description: "Clear increments, ideal for balanced typography hierarchies",
  },
  perfectFourth: {
    name: "Perfect Fourth",
    ratio: 1.333,
    description: "Distinct visual hierarchy, ideal for varied content types",
  },
  augmentedFourth: {
    name: "Augmented Fourth",
    ratio: 1.414,
    description: "Dramatic scale useful for making strong visual impacts",
  },
  perfectFifth: {
    name: "Perfect Fifth",
    ratio: 1.5,
    description:
      "Significant size differences, excellent for high contrast designs",
  },
  goldenRatio: {
    name: "Golden Ratio",
    ratio: 1.618,
    description: "Visually pleasing balance, often used in high-end designs",
  },
};

// Common font families to choose from
const fontFamilies = [
  {
    name: "System UI",
    value:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  { name: "Inter", value: "Inter, system-ui, sans-serif" },
  { name: "Roboto", value: "Roboto, Arial, sans-serif" },
  { name: "Playfair Display", value: "'Playfair Display', Georgia, serif" },
  { name: "Montserrat", value: "Montserrat, Helvetica, Arial, sans-serif" },
  { name: "Open Sans", value: "'Open Sans', Arial, sans-serif" },
  { name: "Source Serif Pro", value: "'Source Serif Pro', Georgia, serif" },
  { name: "Merriweather", value: "Merriweather, Georgia, serif" },
];

// Form schema for typescale settings
const typeScaleFormSchema = z.object({
  baseSize: z.coerce.number().min(12).max(24),
  scale: z.enum([
    "minorSecond",
    "majorSecond",
    "minorThird",
    "majorThird",
    "perfectFourth",
    "augmentedFourth",
    "perfectFifth",
    "goldenRatio",
  ]),
  fontFamily: z.string(),
  sampleText: z.string().min(1, "Sample text is required"),
  showCode: z.boolean(),
});

type TypeScaleFormValues = z.infer<typeof typeScaleFormSchema>;

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

  // Update state for selected preview tab (only for landing/blog)
  const [previewTab, setPreviewTab] = React.useState<"landing" | "blog">(
    "landing"
  );

  // Function to calculate font size based on scale
  const calculateSize = (
    baseSize: number,
    ratio: number,
    step: number
  ): number => {
    return parseFloat((baseSize * Math.pow(ratio, step)).toFixed(2));
  };

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

  // Generate CSS code for the current scale
  const generateCssCode = () => {
    const scale =
      fontScales[scaleConfig.scale as keyof typeof fontScales].ratio;
    const baseSize = scaleConfig.baseSize;

    return `/* Font Scale: ${
      fontScales[scaleConfig.scale as keyof typeof fontScales].name
    } (${scale}) */
/* Base size: ${baseSize}px */

:root {
  --font-family: ${scaleConfig.fontFamily};
  --font-small: ${calculateSize(baseSize, scale, -2)}px;
  --font-base: ${baseSize}px;
  --font-h5: ${calculateSize(baseSize, scale, 1)}px;
  --font-h4: ${calculateSize(baseSize, scale, 2)}px;
  --font-h3: ${calculateSize(baseSize, scale, 3)}px;
  --font-h2: ${calculateSize(baseSize, scale, 4)}px;
  --font-h1: ${calculateSize(baseSize, scale, 5)}px;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-base);
  line-height: 1.5;
}

small { font-size: var(--font-small); }
h5 { font-size: var(--font-h5); }
h4 { font-size: var(--font-h4); }
h3 { font-size: var(--font-h3); }
h2 { font-size: var(--font-h2); }
h1 { font-size: var(--font-h1); }`;
  };

  // Copy CSS code to clipboard
  const copyCssCode = () => {
    const code = generateCssCode();
    navigator.clipboard.writeText(code);
    toast("CSS copied to clipboard", {
      description: "You can paste this into your stylesheets",
      duration: 2000,
    });
  };

  // Get current scale's ratio
  const currentScale = fontScales[scaleConfig.scale as keyof typeof fontScales];
  const scaleRatio = currentScale.ratio;
  const scaleDescription = currentScale.description;

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Three-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* 1. Settings Panel - Left Column */}
            <div className="space-y-6 col-span-1 md:col-span-3">
              <h3 className="text-sm font-medium mb-4 uppercase font-mono text-muted-foreground">
                SETTINGS
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="scale"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 gap-2 items-center">
                        <FormLabel className="col-span-1">Type Scale</FormLabel>
                        <div className="col-span-2 w-full">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select scale type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(fontScales).map(
                                ([key, scale]) => (
                                  <SelectItem key={key} value={key}>
                                    {scale.name} ({scale.ratio})
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        {scaleDescription}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3 w-3 ml-1 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[220px] text-xs">
                                Each step in the scale is {scaleRatio}× the size
                                of the previous one
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="baseSize"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 gap-2 items-center">
                        <FormLabel>Base Font Size: </FormLabel>
                        <div className="col-span-2 w-full flex items-center gap-2">
                          <FormControl>
                            <Slider
                              min={12}
                              max={24}
                              step={0.5}
                              value={[field.value]}
                              onValueChange={(values) =>
                                field.onChange(values[0])
                              }
                              className="w-full"
                            />
                          </FormControl>{" "}
                          <FormLabel className="min-w-[40px] text-right">
                            {" "}
                            {field.value}px
                          </FormLabel>
                        </div>
                      </div>
                      <FormDescription>
                        Standard text size (paragraph)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />
                <FormField
                  control={form.control}
                  name="fontFamily"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 gap-2 items-center">
                        <FormLabel>Font Family</FormLabel>
                        <div className="col-span-2 w-full">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a font" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {fontFamilies.map((font) => (
                                <SelectItem key={font.value} value={font.value}>
                                  {font.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <FormDescription>
                        Choose from common web fonts
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sampleText"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 gap-2 items-center">
                        <FormLabel>Sample Text</FormLabel>
                        <div className="col-span-2 w-full">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter text to preview"
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="my-4" />
              <div className="flex flex-row gap-2  items-center justify-between">
                <Button type="button" variant="outline" onClick={handleReset}>
                  <RotateCcw className="mr-1 h-4 w-4" />
                  Reset
                </Button>

                <div className="w-full">
                  <Button
                    type="submit"
                    variant="brand"
                    disabled={
                      !form.formState.isValid || form.formState.isSubmitting
                    }
                    className="w-full"
                  >
                    <RefreshCw className="mr-1 h-4 " /> Update Preview
                  </Button>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={copyCssCode}
              >
                <Code className="mr-1 h-4 w-4" /> Copy CSS Code
              </Button>

              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="text-sm font-medium mb-2">CSS Code:</h3>
                <pre className="text-xs whitespace-pre-wrap overflow-x-auto p-2 bg-gray-100 dark:bg-gray-800 rounded border">
                  {generateCssCode()}
                </pre>
              </div>
            </div>

            {/* 2. Scale Preview Panel - Middle Column (Always Visible) */}
            <div className="col-span-1 md:col-span-4 ">
              <div>
                {" "}
                <h3 className="text-sm font-medium mb-4 uppercase font-mono text-muted-foreground">
                  Type Scale Preview
                </h3>
              </div>
              <div className="border rounded-lg shadow-sm p-6 h-full whitespace-nowrap overflow-y-hidden relative bg-muted/50">
                <div
                  className="space-y-4"
                  style={{ fontFamily: scaleConfig.fontFamily }}
                >
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      h1 ({calculateSize(scaleConfig.baseSize, scaleRatio, 5)}
                      px)
                    </div>
                    <div
                      style={{
                        fontSize: `${calculateSize(
                          scaleConfig.baseSize,
                          scaleRatio,
                          5
                        )}px`,
                        fontWeight: 800,
                      }}
                      className="whitespace-nowrap"
                    >
                      {scaleConfig.sampleText}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      h2 ({calculateSize(scaleConfig.baseSize, scaleRatio, 4)}
                      px)
                    </div>
                    <div
                      style={{
                        fontSize: `${calculateSize(
                          scaleConfig.baseSize,
                          scaleRatio,
                          4
                        )}px`,
                        fontWeight: 700,
                      }}
                    >
                      {scaleConfig.sampleText}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      h3 ({calculateSize(scaleConfig.baseSize, scaleRatio, 3)}
                      px)
                    </div>
                    <div
                      style={{
                        fontSize: `${calculateSize(
                          scaleConfig.baseSize,
                          scaleRatio,
                          3
                        )}px`,
                        fontWeight: 700,
                      }}
                    >
                      {scaleConfig.sampleText}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      h4 ({calculateSize(scaleConfig.baseSize, scaleRatio, 2)}
                      px)
                    </div>
                    <div
                      style={{
                        fontSize: `${calculateSize(
                          scaleConfig.baseSize,
                          scaleRatio,
                          2
                        )}px`,
                        fontWeight: 600,
                      }}
                    >
                      {scaleConfig.sampleText}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      h5 ({calculateSize(scaleConfig.baseSize, scaleRatio, 1)}
                      px)
                    </div>
                    <div
                      style={{
                        fontSize: `${calculateSize(
                          scaleConfig.baseSize,
                          scaleRatio,
                          1
                        )}px`,
                        fontWeight: 600,
                      }}
                    >
                      {scaleConfig.sampleText}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      paragraph ({scaleConfig.baseSize}px)
                    </div>
                    <p style={{ fontSize: `${scaleConfig.baseSize}px` }}>
                      {scaleConfig.sampleText}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      small (
                      {calculateSize(scaleConfig.baseSize, scaleRatio, -2)}
                      px)
                    </div>
                    <small
                      style={{
                        fontSize: `${calculateSize(
                          scaleConfig.baseSize,
                          scaleRatio,
                          -2
                        )}px`,
                      }}
                    >
                      {scaleConfig.sampleText}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Sample Tabs - Right Column */}
            <div className="col-span-1 md:col-span-5">
              <div>
                {" "}
                <h3 className="text-sm font-medium mb-4 uppercase font-mono text-muted-foreground">
                  Sample Pages
                </h3>
              </div>
              <div className="border rounded-lg shadow-sm h-full">
                <Tabs
                  defaultValue="landing"
                  value={previewTab}
                  onValueChange={(value) =>
                    setPreviewTab(value as "landing" | "blog")
                  }
                  className="w-full h-full"
                >
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-sm font-medium uppercase">
                      Sample Pages
                    </h3>
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
                  </div>

                  <div className="overflow-x-auto p-2 h-[calc(100%-60px)]">
                    <TabsContent value="landing" className="mt-0 h-full">
                      <div className="min-w-max">
                        <SampleLandingPreview
                          fontFamily={scaleConfig.fontFamily}
                          baseSize={scaleConfig.baseSize}
                          scale={scaleRatio}
                          sampleText={scaleConfig.sampleText}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="blog" className="mt-0 h-full">
                      <div className="min-w-max">
                        <SampleBlogPreview
                          fontFamily={scaleConfig.fontFamily}
                          baseSize={scaleConfig.baseSize}
                          scale={scaleRatio}
                          sampleText={scaleConfig.sampleText}
                        />
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
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
