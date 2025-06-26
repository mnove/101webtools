import { Code, Info, RefreshCw, RotateCcw } from "lucide-react";
import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
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
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  TypeScaleFormValues,
  fontFamilies,
  fontScales,
  generateCssCode,
} from "./utils";

interface TypeScaleFormProps {
  form: UseFormReturn<TypeScaleFormValues>;
  onReset: () => void;
  onSubmit: (values: TypeScaleFormValues) => void;
  scaleConfig: TypeScaleFormValues;
}

export function TypeScaleForm({
  form,
  onReset,
  scaleConfig,
}: TypeScaleFormProps) {
  // Get current scale's ratio
  const currentScale = fontScales[scaleConfig.scale as keyof typeof fontScales];
  const scaleRatio = currentScale.ratio;
  const scaleDescription = currentScale.description;

  // Copy CSS code to clipboard
  const copyCssCode = () => {
    const code = generateCssCode(
      scaleConfig.scale as keyof typeof fontScales,
      scaleConfig.baseSize,
      scaleConfig.fontFamily
    );
    navigator.clipboard.writeText(code);
    toast("CSS copied to clipboard", {
      description: "You can paste this into your stylesheets",
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6 col-span-1 md:col-span-2 px-2">
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
                      {Object.entries(fontScales).map(([key, scale]) => (
                        <SelectItem key={key} value={key}>
                          {scale.name} ({scale.ratio})
                        </SelectItem>
                      ))}
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
                        Each step in the scale is {scaleRatio}× the size of the
                        previous one
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
                      onValueChange={(values) => field.onChange(values[0])}
                      className="w-full"
                    />
                  </FormControl>{" "}
                  <FormLabel className="min-w-[40px] text-right">
                    {" "}
                    {field.value}px
                  </FormLabel>
                </div>
              </div>
              <FormDescription>Standard text size (paragraph)</FormDescription>
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
              <FormDescription>Choose from common web fonts</FormDescription>
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
                    <Input {...field} placeholder="Enter text to preview" />
                  </FormControl>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Separator className="my-4" />
      <div className="flex flex-row gap-2 items-center justify-between">
        <Button type="button" variant="outline" onClick={onReset}>
          <RotateCcw className="mr-1 h-4 w-4" />
        </Button>

        <div className="w-full">
          <Button
            type="submit"
            variant="default"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
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
          {generateCssCode(
            scaleConfig.scale as keyof typeof fontScales,
            scaleConfig.baseSize,
            scaleConfig.fontFamily
          )}
        </pre>
      </div>
    </div>
  );
}
