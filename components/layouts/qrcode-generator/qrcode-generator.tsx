"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Clipboard, Download, RotateCcw } from "lucide-react";
import QRCodeStyling from "qr-code-styling";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ColorPicker } from "../../ui/color-picker";
import { Slider } from "../../ui/slider";

// QR Code dot types
const dotTypes = {
  square: "Square",
  dots: "Dots",
  rounded: "Rounded",
  classy: "Classy",
  "classy-rounded": "Classy Rounded",
  "extra-rounded": "Extra Rounded",
};

// QR Code schema for form validation
const qrCodeFormSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
  width: z.coerce.number().min(100).max(500),
  height: z.coerce.number().min(100).max(500),
  dotsType: z.enum([
    "square",
    "dots",
    "rounded",
    "classy",
    "classy-rounded",
    "extra-rounded",
  ]),
  dotsColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
    message: "Valid hex color required (e.g., #000000)",
  }),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
    message: "Valid hex color required (e.g., #ffffff)",
  }),
  margin: z.coerce.number().min(0).max(50),
  includeImage: z.boolean(),
  imageUrl: z.string().optional(),
  imageSize: z.coerce.number().min(10).max(50),
  fileExtension: z.enum(["png", "jpeg", "webp"]),
});

type QRCodeFormValues = z.infer<typeof qrCodeFormSchema>;

export default function QrcodeGenerator() {
  const qrRef = useRef<HTMLDivElement | null>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  //   const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  //   const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const shouldGenerateImage = useRef<boolean>(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const lastFormValues = useRef<QRCodeFormValues | null>(null);

  // Initialize form with default values
  const form = useForm<QRCodeFormValues>({
    resolver: zodResolver(qrCodeFormSchema),
    defaultValues: {
      url: "https://101webtools.com",
      width: 300,
      height: 300,
      dotsType: "square",
      dotsColor: "#000000",
      backgroundColor: "#ffffff",
      margin: 10,
      includeImage: false,
      imageUrl: "",
      imageSize: 20,
      fileExtension: "png",
    },
    mode: "onChange", // Enable onChange validation mode
  });

  // Watch all form values for real-time updates
  const formValues = form.watch();

  // Initialize QR code on first render
  useEffect(() => {
    const initialQrCode = new QRCodeStyling({
      width: form.getValues("width"),
      height: form.getValues("height"),
      data: form.getValues("url"),
      dotsOptions: {
        color: form.getValues("dotsColor"),
        type: form.getValues("dotsType"),
      },
      backgroundOptions: {
        color: form.getValues("backgroundColor"),
      },
      cornersSquareOptions: {
        type: "square",
      },
      cornersDotOptions: {
        type: "square",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: form.getValues("margin"),
      },
    });

    setQrCode(initialQrCode);
    shouldGenerateImage.current = true;
    lastFormValues.current = form.getValues();
  }, []);

  // Append QR code to ref when available
  useEffect(() => {
    if (qrCode && qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);

      if (shouldGenerateImage.current) {
        setTimeout(() => {
          shouldGenerateImage.current = false;
        }, 300);
      }
    }
  }, [qrCode]);

  const isEqual = (obj1: any, obj2: any): boolean => {
    if (!obj1 || !obj2) return false;
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  // Update QR code when form values change
  useEffect(() => {
    if (!qrCode || !form.formState.isValid) return;

    if (lastFormValues.current && isEqual(formValues, lastFormValues.current)) {
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const options: any = {
        width: formValues.width,
        height: formValues.height,
        data: formValues.url,
        dotsOptions: {
          color: formValues.dotsColor,
          type: formValues.dotsType,
        },
        backgroundOptions: {
          color: formValues.backgroundColor,
        },
        cornersSquareOptions: {
          type: "square",
        },
        cornersDotOptions: {
          type: "square",
        },
      };

      if (formValues.includeImage && (formValues.imageUrl || uploadedImage)) {
        options.image = formValues.imageUrl || uploadedImage;
        options.imageOptions = {
          crossOrigin: "anonymous",
          margin: formValues.margin,
          imageSize: formValues.imageSize / 100,
        };
      } else {
        options.image = undefined;
      }

      qrCode.update(options);
      lastFormValues.current = { ...formValues };
      debounceTimer.current = null;
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [formValues, qrCode, uploadedImage, form.formState.isValid]);

  const handleImageUpload = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          setUploadedImage(imageUrl);
          form.setValue("imageUrl", imageUrl, { shouldValidate: true });
        };
        reader.readAsDataURL(file);
      }
    },
    [form]
  );

  const handleReset = React.useCallback(() => {
    form.reset();
    setUploadedImage(null);

    const defaultValues: QRCodeFormValues = {
      url: "https://101webtools.com",
      width: 300,
      height: 300,
      dotsType: "square",
      dotsColor: "#000000",
      backgroundColor: "#ffffff",
      margin: 10,
      includeImage: false,
      imageUrl: "",
      imageSize: 20,
      fileExtension: "png",
    };

    lastFormValues.current = defaultValues;

    if (qrCode) {
      qrCode.update({
        data: defaultValues.url,
        dotsOptions: {
          color: defaultValues.dotsColor,
          type: defaultValues.dotsType,
        },
        backgroundOptions: {
          color: defaultValues.backgroundColor,
        },
        width: defaultValues.width,
        height: defaultValues.height,
      });
    }
  }, [form, qrCode]);

  const downloadQrCode = React.useCallback(() => {
    if (qrCode) {
      qrCode.download({
        extension: form.getValues("fileExtension"),
        name: `qrcode-${Date.now()}`,
      });

      toast("QR Code downloaded", {
        description: `Format: ${form.getValues("fileExtension").toUpperCase()}`,
        duration: 2000,
      });
    }
  }, [qrCode, form]);

  const copyQrCodeAsSVG = React.useCallback(() => {
    const svg = qrRef.current?.querySelector("svg");
    if (svg) {
      const svgString = new XMLSerializer().serializeToString(svg);
      navigator.clipboard.writeText(svgString);
      toast("SVG copied to clipboard", {
        description: "You can paste this in image editors or documents",
        duration: 2000,
      });
    }
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <div className="space-y-6">
            <Form {...form}>
              <form className="space-y-6">
                <div className="grid grid-cols-1 items-start w-full gap-6 mb-4">
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input
                            size="lg"
                            {...field}
                            placeholder="Enter URL (e.g., https://example.com)"
                            className={
                              form.formState.errors.url ? "border-red-500" : ""
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the URL you want to encode in the QR Code
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Collapsible defaultOpen={true} className="mb-8">
                  <CollapsibleTrigger className="text-muted-foreground uppercase text-xs flex w-full items-center gap-2 mb-4 group cursor-pointer tracking-wider">
                    QR Code Styling
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:-rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="width"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Width: {field.value}px</FormLabel>
                            <FormControl>
                              <Slider
                                min={100}
                                max={500}
                                step={10}
                                value={[field.value]}
                                onValueChange={(vals) =>
                                  field.onChange(vals[0])
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
                            <FormLabel>Height: {field.value}px</FormLabel>
                            <FormControl>
                              <Slider
                                min={100}
                                max={500}
                                step={10}
                                value={[field.value]}
                                onValueChange={(vals) =>
                                  field.onChange(vals[0])
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dotsType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dots Style</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select style" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(dotTypes).map(
                                  ([key, value]) => (
                                    <SelectItem key={key} value={key}>
                                      {value}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dotsColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dots Color</FormLabel>
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
                        name="backgroundColor"
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
                        name="fileExtension"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>File Format</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select format" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="png">PNG</SelectItem>
                                <SelectItem value="jpeg">JPEG</SelectItem>
                                <SelectItem value="webp">WEBP</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible open={form.watch("includeImage")}>
                  <CollapsibleTrigger className="text-muted-foreground uppercase text-xs flex w-full items-center gap-2 mb-4 group cursor-pointer tracking-wider">
                    <FormField
                      control={form.control}
                      name="includeImage"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel className="text-xs">
                              Include Logo/Image
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
                    {form.watch("includeImage") && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="imageUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Image URL</FormLabel>
                              <div className="flex gap-2">
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Or upload an image below"
                                  />
                                </FormControl>
                              </div>
                              <div className="mt-2">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="text-sm"
                                />
                              </div>
                              <FormDescription>
                                Provide an image URL or upload a small logo
                                (recommended: 64x64px)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="imageSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Image Size: {field.value}%</FormLabel>
                              <FormControl>
                                <Slider
                                  min={10}
                                  max={50}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={(vals) =>
                                    field.onChange(vals[0])
                                  }
                                />
                              </FormControl>
                              <FormDescription>
                                Percentage of QR code that the image will occupy
                                (10-50%)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="margin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Image Margin: {field.value}px
                              </FormLabel>
                              <FormControl>
                                <Slider
                                  min={0}
                                  max={50}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={(vals) =>
                                    field.onChange(vals[0])
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {uploadedImage && (
                          <div className="flex items-center justify-center border rounded-md p-2 h-32">
                            <img
                              src={uploadedImage}
                              alt="Uploaded logo"
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>

                <div className="flex flex-row gap-2 w-full">
                  <Button type="button" variant="outline" onClick={handleReset}>
                    <RotateCcw className="mr-1 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <div className="pt-6 border-t lg:border-t-0 lg:pt-0">
            <div className="flex justify-between items-start lg:items-center mb-4">
              <h3 className="font-medium">Generated QR Code:</h3>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={copyQrCodeAsSVG}>
                  <Clipboard className="h-3 w-3 mr-1" /> Copy as SVG
                </Button>
                <Button
                  variant="brand"
                  size="sm"
                  onClick={downloadQrCode}
                  disabled={!qrCode}
                >
                  <Download className="h-3 w-3 mr-1" /> Download{" "}
                  {form.watch("fileExtension").toUpperCase()}
                </Button>
              </div>
            </div>
            <div className="flex justify-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
              {!qrCode ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mb-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Initializing QR code...
                  </p>
                </div>
              ) : (
                <div ref={qrRef} className="qr-code-container"></div>
              )}
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                Scan this QR code with a smartphone camera or QR code reader app
                to visit the URL.
              </p>
              <p className="mt-1">
                Click the download button to save as{" "}
                {form.watch("fileExtension").toUpperCase()}, or copy as SVG for
                use in digital documents.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 text-xs text-muted-foreground mt-4">
        <div className="w-full">
          <p>
            QR codes (Quick Response codes) are two-dimensional barcodes that
            can be scanned by smartphones to quickly access websites or
            information.
          </p>
          <p className="mt-1">
            They are commonly used for contactless payments, ticketing, website
            URLs, Wi-Fi passwords, and contact information sharing.
          </p>
        </div>
      </div>
    </div>
  );
}
