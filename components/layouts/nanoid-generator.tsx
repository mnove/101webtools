"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Clipboard, RefreshCw } from "lucide-react";
import { customAlphabet, nanoid } from "nanoid";
import {
  alphanumeric,
  lowercase,
  nolookalikes,
  nolookalikesSafe,
  numbers,
  uppercase,
} from "nanoid-dictionary";
import * as React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { Label } from "../ui/label";

// Dictionary of available alphabets
const alphabets = {
  default: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-",
  lowercase,
  uppercase,
  numbers,
  alphanumeric,
  nolookalikes,
  nolookalikesSafe,
};

// Calculate collision probability for n random IDs with given length and alphabet
const calculateCollisionProbability = (
  idCount: number,
  idLength: number,
  alphabetSize: number
): number => {
  // For very small probabilities, we can use approximation:
  // p ≈ n² / (2 * alphabetSize^length)
  const possibleCombinations = Math.pow(alphabetSize, idLength);
  return Math.pow(idCount, 2) / (2 * possibleCombinations);
};

// Find how many IDs would give approximately 1% collision probability
const findIDsFor1PercentCollision = (
  idLength: number,
  alphabetSize: number
): number => {
  // Solve for n: 0.01 = n² / (2 * alphabetSize^length)
  // n = sqrt(0.01 * 2 * alphabetSize^length)
  const possibleCombinations = Math.pow(alphabetSize, idLength);
  return Math.floor(Math.sqrt(0.01 * 2 * possibleCombinations));
};

type AlphabetType = keyof typeof alphabets;

// Debounce function to prevent excessive regeneration
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function NanoidGenerator() {
  const [idLength, setIdLength] = React.useState<number>(21);
  const [quantity, setQuantity] = React.useState<number>(5);
  const [generatedIds, setGeneratedIds] = React.useState<string[]>([]);
  const [selectedAlphabet, setSelectedAlphabet] =
    React.useState<AlphabetType>("default");

  // Debounce the idLength to avoid excessive regeneration while sliding
  const debouncedIdLength = useDebounce(idLength, 300);
  const debouncedQuantity = useDebounce(quantity, 300);
  const debouncedAlphabet = useDebounce(selectedAlphabet, 300);

  const generateIds = () => {
    if (selectedAlphabet === "default") {
      // Use standard nanoid
      const newIds = Array(quantity)
        .fill(0)
        .map(() => nanoid(idLength));
      setGeneratedIds(newIds);
    } else {
      // Use custom alphabet
      const customNanoid = customAlphabet(
        alphabets[selectedAlphabet],
        idLength
      );
      const newIds = Array(quantity)
        .fill(0)
        .map(() => customNanoid());
      setGeneratedIds(newIds);
    }
  };
  // Generate IDs on initial load and when length/quantity/alphabet change
  React.useEffect(() => {
    generateIds();
  }, [debouncedIdLength, debouncedQuantity, debouncedAlphabet]);

  // Calculate entropy based on alphabet length
  const calculateEntropy = () => {
    const alphabetLength = alphabets[selectedAlphabet].length;
    return Math.pow(alphabetLength, idLength).toExponential();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      description: "ID copied to clipboard",
      duration: 2000,
    });
  };

  // Copy all IDs at once
  const copyAllIds = () => {
    navigator.clipboard.writeText(generatedIds.join("\n"));
    toast("All IDs copied", {
      description: `${generatedIds.length} IDs copied to clipboard`,
      duration: 2000,
    });
  };

  // Generate data points for the collision probability graph
  const generateCollisionProbabilityData = () => {
    const alphabetSize = alphabets[selectedAlphabet].length;
    const maxSafeIDs = findIDsFor1PercentCollision(idLength, alphabetSize);

    // Generate data points - logarithmic scale works better for visualization
    const dataPoints = [];
    const numPoints = 10;

    for (let i = 0; i <= numPoints; i++) {
      // Generate logarithmically distributed points between 1 and maxSafeIDs
      const idCount =
        i === 0 ? 1 : Math.floor(Math.pow(maxSafeIDs, i / numPoints));
      const probability =
        calculateCollisionProbability(idCount, idLength, alphabetSize) * 100;

      dataPoints.push({
        ids: idCount,
        probability: probability < 0.001 ? 0.001 : probability, // Minimum threshold for visibility
        label: idCount.toLocaleString(),
      });
    }

    return dataPoints;
  };

  const collisionData = generateCollisionProbabilityData();

  return (
    <div className=" py-10 container mx-auto max-w-4xl">
      <div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="alphabet" className="text-sm font-medium">
              Character Set
            </Label>
            <Select
              value={selectedAlphabet}
              onValueChange={(value) =>
                setSelectedAlphabet(value as AlphabetType)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select alphabet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default (URL-friendly)</SelectItem>
                <SelectItem value="alphanumeric">
                  Alphanumeric (A-Z, a-z, 0-9)
                </SelectItem>
                <SelectItem value="lowercase">Lowercase (a-z)</SelectItem>
                <SelectItem value="uppercase">Uppercase (A-Z)</SelectItem>
                <SelectItem value="numbers">Numbers (0-9)</SelectItem>
                <SelectItem value="nolookalikes">
                  No look-alikes (no Il1O0)
                </SelectItem>
                <SelectItem value="nolookalikesSafe">
                  No look-alikes (safe, more limited)
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Character set: {alphabets[selectedAlphabet].length} unique
              characters
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="length" className="text-sm font-medium">
                ID Length: {idLength}
              </Label>
            </div>
            <Slider
              id="length"
              min={5}
              max={36}
              step={1}
              value={[idLength]}
              onValueChange={(value) => setIdLength(value[0])}
              className="w-full"
            />
          </div>

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

          <Button onClick={generateIds} className="w-full" variant="brand">
            <RefreshCw className="mr-2 h-4 w-4" /> Generate IDs
          </Button>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Generated IDs:</h3>
              {generatedIds.length > 1 && (
                <Button variant="outline" size="sm" onClick={copyAllIds}>
                  <Clipboard className="h-3 w-3 mr-1" /> Copy All
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {generatedIds.map((id, index) => (
                <div key={index} className="flex items-center gap-2">
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
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 text-xs text-muted-foreground">
          <div className="w-full flex justify-between">
            <p>Based on nanoid library</p>
            <p>
              {idLength} characters, {calculateEntropy()} possible combinations
            </p>
          </div>

          <div className="w-full">
            <p className="mb-2">
              You would need to generate approximately{" "}
              {findIDsFor1PercentCollision(
                idLength,
                alphabets[selectedAlphabet].length
              ).toLocaleString()}{" "}
              IDs to have a 1% probability of collision
            </p>

            <div className="h-48 w-full mt-2 rounded-md border p-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={collisionData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <XAxis
                    dataKey="label"
                    scale="auto"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => {
                      // Format large numbers for readability
                      if (Number(value) >= 1000000)
                        return `${(Number(value) / 1000000).toFixed(1)}M`;
                      if (Number(value) >= 1000)
                        return `${(Number(value) / 1000).toFixed(1)}K`;
                      return value;
                    }}
                  />
                  <YAxis
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 1]}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `${value.toFixed(6)}%`,
                      "Collision Probability",
                    ]}
                    labelFormatter={(value) => `${value} IDs`}
                  />
                  <Line
                    type="monotone"
                    dataKey="probability"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-[10px] text-center mt-1">
                Number of IDs generated vs. Collision Probability (%)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
