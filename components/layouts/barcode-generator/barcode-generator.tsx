"use client";

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
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronDown,
  ChevronDownIcon,
  Clipboard,
  Download,
  Image as ImageIcon,
  Info,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import * as React from "react";
import Barcode from "react-barcode";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ColorPicker } from "../../ui/color-picker";
import { Slider } from "../../ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

// Barcode formats and their descriptions
const barcodeFormats = {
  CODE128: {
    name: "CODE128",
    description: "General purpose format",
    pattern: /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{}|;':",./<>?~ ]+$/,
    example: "ABC-1234567890",
    validator: (value: string) => true, // CODE128 accepts most characters
  },
  EAN13: {
    name: "EAN13",
    description: "European Article Number, 13 digits",
    pattern: /^\d{13}$/,
    example: "5901234123457",
    validator: (value: string) =>
      /^\d{13}$/.test(value) ? true : "EAN13 requires exactly 13 digits",
  },
  EAN8: {
    name: "EAN8",
    description: "European Article Number, 8 digits",
    pattern: /^\d{8}$/,
    example: "12345670",
    validator: (value: string) =>
      /^\d{8}$/.test(value) ? true : "EAN8 requires exactly 8 digits",
  },
  UPC: {
    name: "UPC",
    description: "Universal Product Code, 12 digits",
    pattern: /^\d{12}$/,
    example: "123456789012",
    validator: (value: string) =>
      /^\d{12}$/.test(value) ? true : "UPC requires exactly 12 digits",
  },
  CODE39: {
    name: "CODE39",
    description: "Variable length code, alphanumeric",
    pattern: /^[A-Z0-9\-\.\ \$\/\+\%]+$/,
    example: "CODE-39",
    validator: (value: string) =>
      /^[A-Z0-9\-\.\ \$\/\+\%]+$/.test(value)
        ? true
        : "CODE39 only accepts uppercase letters, numbers, and symbols: - . $ / + % space",
  },
};

type BarcodeFormat = keyof typeof barcodeFormats;

// Zod schema for barcode form
const barcodeFormSchema = z
  .object({
    value: z.string().min(1, { message: "Barcode value is required" }),
    format: z.enum(["CODE128", "EAN13", "EAN8", "UPC", "CODE39"] as const),
    width: z.coerce.number().min(1).max(10),
    height: z.coerce.number().min(30).max(200),
    displayValue: z.boolean(),
    background: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
      message: "Valid hex color required (e.g., #ffffff)",
    }),
    lineColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
      message: "Valid hex color required (e.g., #000000)",
    }),
    margin: z.coerce.number().min(0).max(50),
    fontSize: z.coerce.number().min(10).max(30),
    textPosition: z.enum(["top", "bottom"]),
    textMargin: z.coerce.number().min(1).max(20),
  })
  .refine(
    (data) => {
      // Format-specific validation using the validator functions
      const validator = barcodeFormats[data.format].validator;
      return validator(data.value);
    },
    {
      message: "Invalid barcode value for the selected format",
      path: ["value"], // This tells Zod to attach the error to the value field
    }
  );

type BarcodeFormValues = z.infer<typeof barcodeFormSchema>;

export default function BarcodeGenerator() {
  // Initialize form with default values
  const form = useForm<BarcodeFormValues>({
    mode: "onChange",
    reValidateMode: "onBlur",

    resolver: zodResolver(barcodeFormSchema),
    defaultValues: {
      value: "123456789012",
      format: "CODE128",
      width: 2,
      height: 100,
      displayValue: true,
      background: "#ffffff",
      lineColor: "#000000",
      margin: 10,
      fontSize: 20,
      textPosition: "bottom",
      textMargin: 5,
    },
  });

  const [barcodeConfig, setBarcodeConfig] = React.useState<BarcodeFormValues>(
    form.getValues()
  );

  const [barcodeImageUrl, setBarcodeImageUrl] = React.useState<string | null>(
    null
  );
  const [isGeneratingImage, setIsGeneratingImage] =
    React.useState<boolean>(false);

  const handleReset = () => {
    form.reset();
  };

  // Generate example value when format changes
  React.useEffect(() => {
    const format = form.watch("format");
    form.setValue("value", barcodeFormats[format as BarcodeFormat].example);
    // Trigger revalidation after changing the value
    form.trigger("value");
  }, [form.watch("format")]);

  const onSubmit = (values: BarcodeFormValues) => {
    // Additional validation before generating the barcode
    const format = values.format;
    const validator = barcodeFormats[format].validator;
    const validationResult = validator(values.value);

    if (validationResult !== true) {
      form.setError("value", {
        type: "manual",
        message: validationResult as string,
      });
      return;
    }

    setBarcodeConfig(values);
    toast("Barcode generated", {
      description: `Format: ${values.format}, Value: ${values.value}`,
      duration: 2000,
    });
  };

  const copyBarcodeAsSVG = () => {
    // Get the SVG element
    const svg = document.querySelector(".barcode-container svg");
    if (svg) {
      const svgString = new XMLSerializer().serializeToString(svg);
      navigator.clipboard.writeText(svgString);
      toast("SVG copied to clipboard", {
        description: "You can paste this in image editors or documents",
        duration: 2000,
      });
    }
  };

  // Function to convert SVG to image
  const generateBarcodeImage = React.useCallback(() => {
    const svg = document.querySelector(".barcode-container svg");
    if (!svg) {
      toast.error("Could not find barcode SVG");
      return;
    }

    setIsGeneratingImage(true);

    try {
      // Create an SVG string
      const svgString = new XMLSerializer().serializeToString(svg);

      // Create a Blob from the SVG string
      const svgBlob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });

      // Create a URL from the Blob
      const DOMURL = window.URL || window.webkitURL || window;
      const blobUrl = DOMURL.createObjectURL(svgBlob);

      // Create an image to draw on canvas
      const img = new Image();
      img.src = blobUrl;

      img.onload = () => {
        // Create canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          toast.error("Could not create canvas context");
          setIsGeneratingImage(false);
          return;
        }

        // Set canvas dimensions with a bit of padding
        canvas.width = img.width;
        canvas.height = img.height;

        // Fill with background color
        ctx.fillStyle = barcodeConfig.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw image
        ctx.drawImage(img, 0, 0);

        // Convert to PNG
        try {
          const pngUrl = canvas.toDataURL("image/png");
          setBarcodeImageUrl(pngUrl);
          setIsGeneratingImage(false);

          // Revoke the blob URL to free memory
          DOMURL.revokeObjectURL(blobUrl);
        } catch (error) {
          console.error("Error generating PNG:", error);
          toast.error("Failed to generate PNG image");
          setIsGeneratingImage(false);
        }
      };

      img.onerror = () => {
        toast.error("Error loading SVG for conversion");
        setIsGeneratingImage(false);
      };
    } catch (error) {
      console.error("Error in SVG to PNG conversion:", error);
      toast.error("Failed to convert barcode to image");
      setIsGeneratingImage(false);
    }
  }, [barcodeConfig]);

  // Generate the barcode image whenever the barcode config changes
  React.useEffect(() => {
    // Only generate if form is valid
    if (form.formState.isValid && !form.formState.isSubmitting) {
      // Add a small delay to ensure the SVG has been rendered
      const timer = setTimeout(generateBarcodeImage, 300);
      return () => clearTimeout(timer);
    }
  }, [
    barcodeConfig,
    generateBarcodeImage,
    form.formState.isValid,
    form.formState.isSubmitting,
  ]);

  // Function to download the barcode image
  const downloadBarcodeImage = () => {
    if (!barcodeImageUrl) {
      toast.error("No barcode image available");
      return;
    }

    const link = document.createElement("a");
    link.download = `barcode-${barcodeConfig.format}-${barcodeConfig.value}.png`;
    link.href = barcodeImageUrl;
    link.click();

    toast("Image downloaded", {
      description: "Barcode image saved to your device",
      duration: 2000,
    });
  };

  // Get the current format's validation pattern for display
  const currentFormat = form.watch("format") as BarcodeFormat;
  const currentPattern = barcodeFormats[currentFormat].pattern
    ?.toString()
    .replace(/[\/^$]/g, "");
  const formatDescription = barcodeFormats[currentFormat].description;

  return (
    <div className="">
      <div>
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-8 items-start w-full gap-6 mb-4">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem className="col-span-8 md:col-span-6">
                      <FormLabel>Barcode Value</FormLabel>
                      <FormControl>
                        <Input
                          size="lg"
                          {...field}
                          placeholder="Enter barcode value"
                          className={
                            form.formState.errors.value ? "border-red-500" : ""
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        {currentFormat === "EAN13" &&
                          "Must be exactly 13 digits"}
                        {currentFormat === "EAN8" && "Must be exactly 8 digits"}
                        {currentFormat === "UPC" && "Must be exactly 12 digits"}
                        {currentFormat === "CODE39" &&
                          "Only uppercase letters, numbers, and symbols: - . $ / + % space"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-8 md:col-span-2">
                      <FormLabel>Barcode Format</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          // Clear any existing errors when format changes
                          form.clearErrors("value");
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger size="lg">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(barcodeFormats).map(
                            ([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground flex items-center">
                        {formatDescription}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3 w-3 ml-1 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[220px] text-xs">
                                Example: {barcodeFormats[currentFormat].example}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Collapsible defaultOpen={true} className="mb-8">
                <CollapsibleTrigger className="text-muted-foreground uppercase text-xs flex w-full items-center gap-2 mb-4 group cursor-pointer">
                  Styling
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:-rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <FormField
                      control={form.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Line Width</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              max={10}
                              step={0.5}
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={30}
                              max={200}
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="background"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Background Color</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>

                            <ColorPicker
                              value={field.value}
                              onChange={field.onChange}
                              className="w-10 h-10 rounded-md border cursor-pointer"
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lineColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Line Color</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>

                            <ColorPicker
                              value={field.value}
                              onChange={field.onChange}
                              className="w-10 h-10 rounded-md border cursor-pointer"
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="margin"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Margin: {field.value}px</FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={50}
                              step={1}
                              {...field}
                              value={[field.value]}
                              onValueChange={(e) =>
                                field.onChange(Number(e[0]))
                              }
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible open={form.watch("displayValue")}>
                <CollapsibleTrigger className="text-muted-foreground uppercase text-xs flex w-full items-center gap-2 mb-4 group cursor-pointer">
                  <FormField
                    control={form.control}
                    name="displayValue"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between ">
                        <div className="space-y-0.5">
                          <FormLabel className="text-xs">
                            Display Text
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:-rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {" "}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      {form.watch("displayValue") && (
                        <>
                          <FormField
                            control={form.control}
                            name="fontSize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Font Size: {field.value}px
                                </FormLabel>
                                <FormControl>
                                  <Slider
                                    min={10}
                                    max={30}
                                    step={1}
                                    {...field}
                                    value={[field.value]}
                                    onValueChange={(e) =>
                                      field.onChange(Number(e[0]))
                                    }
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="textPosition"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Text Position</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Text position" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="top">Top</SelectItem>
                                    <SelectItem value="bottom">
                                      Bottom
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="textMargin"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Text Margin: {field.value}px
                                </FormLabel>
                                <FormControl>
                                  <Slider
                                    min={1}
                                    max={20}
                                    step={1}
                                    {...field}
                                    value={[field.value]}
                                    onValueChange={(e) =>
                                      field.onChange(Number(e[0]))
                                    }
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="flex flex-row gap-2 w-full">
                <Button type="button" variant="outline" onClick={handleReset}>
                  <RotateCcw className="mr-1 h-4 w-4" />
                  Reset
                </Button>

                <div className="w-full">
                  <Button
                    variant="brand"
                    type="submit"
                    className="w-full"
                    disabled={
                      !form.formState.isValid || form.formState.isSubmitting
                    }
                  >
                    <RefreshCw className="mr-1 h-4 w-4" /> Generate Barcode
                  </Button>
                </div>
              </div>
            </form>
          </Form>

          <div className="pt-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Generated Barcode:</h3>
              <Button variant="outline" size="sm" onClick={copyBarcodeAsSVG}>
                <Clipboard className="h-3 w-3 mr-1" /> Copy as SVG
              </Button>
            </div>
            <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg barcode-container">
              {form.formState.isValid ? (
                <Barcode
                  value={barcodeConfig.value}
                  format={barcodeConfig.format}
                  width={barcodeConfig.width}
                  height={barcodeConfig.height}
                  displayValue={barcodeConfig.displayValue}
                  background={barcodeConfig.background}
                  lineColor={barcodeConfig.lineColor}
                  margin={barcodeConfig.margin}
                  fontSize={barcodeConfig.fontSize}
                  textPosition={barcodeConfig.textPosition}
                  textMargin={barcodeConfig.textMargin}
                />
              ) : (
                <div className="text-center text-muted-foreground p-12">
                  Please provide a valid barcode value
                </div>
              )}
            </div>

            {/* Rendered barcode image section */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Downloadable Image:</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadBarcodeImage}
                  disabled={!barcodeImageUrl || isGeneratingImage}
                >
                  <Download className="h-3 w-3 mr-1" /> Download PNG
                </Button>
              </div>
              <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                {isGeneratingImage ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mb-2"></div>
                    <p className="text-sm text-muted-foreground">
                      Generating image...
                    </p>
                  </div>
                ) : barcodeImageUrl ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={barcodeImageUrl}
                      alt="Barcode as PNG"
                      className="max-w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Right-click on the image to save it, or use the download
                      button above
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {form.formState.isValid
                        ? "Generate a barcode to create a downloadable image"
                        : "Please provide valid barcode data first"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4 text-xs text-muted-foreground mt-4">
          <div className="w-full">
            <p>
              Barcodes are machine-readable representations of data, commonly
              used for product identification in retail and inventory
              management.
            </p>
            <p className="mt-1">
              Different formats have specific requirements for the input data
              format. For example, EAN-13 requires 13 digits, while Code 128 can
              encode alphanumeric data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
