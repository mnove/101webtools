"use client";

import * as React from "react";
import { ulid, decodeTime } from "ulid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clipboard, RefreshCw, Info } from "lucide-react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ULIDGenerator() {
  const [quantity, setQuantity] = React.useState<number>(5);
  const [generatedULIDs, setGeneratedULIDs] = React.useState<string[]>([]);
  const [useCurrentTime, setUseCurrentTime] = React.useState<boolean>(true);
  const [customTime, setCustomTime] = React.useState<string>(
    new Date().toISOString().slice(0, 16)
  );
  const [monotonicGeneration, setMonotonicGeneration] =
    React.useState<boolean>(true);
  const [lastULIDTime, setLastULIDTime] = React.useState<number>(0);

  // Generate ULIDs on initial load
  React.useEffect(() => {
    generateULIDs();
  }, []);

  const generateULIDs = () => {
    try {
      let lastULID = "";
      let timestamp = useCurrentTime
        ? Date.now()
        : new Date(customTime).getTime();

      // Update the last ULID time for monotonic generation
      setLastULIDTime(timestamp);

      // Generate the requested number of ULIDs
      const newULIDs = Array(quantity)
        .fill(0)
        .map((_, index) => {
          // For monotonic generation, ensure each subsequent ULID
          // is greater than the previous one even with the same timestamp
          if (monotonicGeneration && lastULID) {
            const nextULID = ulid(timestamp);
            // If the new ULID is less than the previous (due to same timestamp but random part is lower),
            // increment the last character of the previous ULID
            if (nextULID <= lastULID) {
              let incrementedULID = incrementULID(lastULID);
              lastULID = incrementedULID;
              return incrementedULID;
            } else {
              lastULID = nextULID;
              return nextULID;
            }
          } else {
            const newULID = ulid(timestamp);
            lastULID = newULID;
            return newULID;
          }
        });

      setGeneratedULIDs(newULIDs);
    } catch (error) {
      toast.error("Error generating ULID", {
        description: (error as Error).message,
      });
    }
  };

  // Helper function to increment a ULID (for monotonic generation)
  const incrementULID = (id: string): string => {
    // Ensure we maintain the timestamp part (first 10 chars)
    const timestampPart = id.substring(0, 10);
    const randomPart = id.substring(10);

    // Convert the last character to make it bigger
    let chars = randomPart.split("");
    const crementalChar = chars[chars.length - 1];

    // Increment last character
    const Crementals = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
    const index = Crementals.indexOf(crementalChar);

    if (index < Crementals.length - 1) {
      chars[chars.length - 1] = Crementals[index + 1];
    } else {
      // If we're at the end of the crementals, set to first and handle carry
      chars[chars.length - 1] = Crementals[0];

      // Carry the increment to the next digit
      for (let i = chars.length - 2; i >= 0; i--) {
        const currentIndex = Crementals.indexOf(chars[i]);
        if (currentIndex < Crementals.length - 1) {
          chars[i] = Crementals[currentIndex + 1];
          break;
        } else {
          chars[i] = Crementals[0];
          // Continue loop to carry to next digit
        }
      }
    }

    return timestampPart + chars.join("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      description: "ULID copied to clipboard",
      duration: 2000,
    });
  };

  // Copy all ULIDs at once
  const copyAllULIDs = () => {
    navigator.clipboard.writeText(generatedULIDs.join("\n"));
    toast("All ULIDs copied", {
      description: `${generatedULIDs.length} ULIDs copied to clipboard`,
      duration: 2000,
    });
  };

  // Decode ULID to extract the timestamp
  const decodeULID = (id: string) => {
    try {
      const timestamp = decodeTime(id);
      const date = new Date(timestamp);
      return {
        timestamp,
        formatted: format(date, "yyyy-MM-dd HH:mm:ss.SSS"),
        valid: true,
      };
    } catch (error) {
      return { timestamp: 0, formatted: "Invalid ULID", valid: false };
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>ULID Generator</CardTitle>
          <CardDescription>
            Generate Universally Unique Lexicographically Sortable Identifiers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium">
              Quantity: {quantity}
            </Label>
            <Select
              value={quantity.toString()}
              onValueChange={(value) => setQuantity(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select quantity" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="useCurrentTime"
                checked={useCurrentTime}
                onCheckedChange={(checked) =>
                  setUseCurrentTime(checked as boolean)
                }
              />
              <Label
                htmlFor="useCurrentTime"
                className="text-sm font-medium cursor-pointer"
              >
                Use current time
              </Label>
            </div>

            {!useCurrentTime && (
              <div className="pt-2">
                <Label htmlFor="customTime">Custom timestamp</Label>
                <Input
                  id="customTime"
                  type="datetime-local"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  ULIDs include a timestamp as first component
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="monotonic"
                checked={monotonicGeneration}
                onCheckedChange={(checked) =>
                  setMonotonicGeneration(checked as boolean)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="monotonic"
                  className="text-sm font-medium cursor-pointer flex items-center"
                >
                  Monotonic generation
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 ml-1 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[220px] text-xs">
                          Ensures each generated ULID is lexicographically
                          greater than the previous one, even when created
                          during the same millisecond.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <p className="text-xs text-muted-foreground">
                  Guarantees sorting order even within the same millisecond
                </p>
              </div>
            </div>
          </div>

          <Button onClick={generateULIDs} className="w-full" variant="brand">
            <RefreshCw className="mr-2 h-4 w-4" /> Generate ULIDs
          </Button>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Generated ULIDs:</h3>
              {generatedULIDs.length > 1 && (
                <Button variant="outline" size="sm" onClick={copyAllULIDs}>
                  <Clipboard className="h-3 w-3 mr-1" /> Copy All
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {generatedULIDs.map((id, index) => (
                <div key={index}>
                  <div className="flex items-center gap-2 mb-1">
                    <Input value={id} readOnly className="font-mono" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(id)}
                      title="Copy to clipboard"
                    >
                      <Clipboard className="h-4 w-4" />
                    </Button>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      value={`ulid-details-${index}`}
                      className="border px-3 rounded-md"
                    >
                      <AccordionTrigger className="py-2 text-xs">
                        {decodeULID(id).formatted}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <div>Timestamp Value:</div>
                          <div className="font-mono">
                            {decodeULID(id).timestamp}
                          </div>
                          <div>Timestamp Component:</div>
                          <div className="font-mono">{id.substring(0, 10)}</div>
                          <div>Random Component:</div>
                          <div className="font-mono">{id.substring(10)}</div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-xs text-muted-foreground">
          <div className="w-full">
            <p>
              ULID (Universally Unique Lexicographically Sortable Identifier) is
              an alternative to UUID that offers:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>128-bit compatibility with UUID</li>
              <li>Lexicographically sortable (sorted by creation time)</li>
              <li>
                Canonically encoded as 26 characters string (vs 36 for UUID)
              </li>
              <li>
                URL-safe characters: case-insensitive (no special characters)
              </li>
              <li>
                Monotonicity option to ensure proper sorting with same timestamp
              </li>
              <li>
                Contains a timestamp component allowing extraction of creation
                time
              </li>
            </ul>
            <p className="mt-2">
              Format: first 10 characters encode the time in milliseconds,
              remaining 16 are random
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
