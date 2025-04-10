"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Editor from "@monaco-editor/react";
import { ArrowRightLeft, Clipboard, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type BinaryFormatType = "withSpaces" | "withoutSpaces";

export default function BinaryToTextConverter() {
  // Input and output states for both tabs
  const [encodeInput, setEncodeInput] = useState(""); // Text to binary
  const [encodeOutput, setEncodeOutput] = useState(""); // Binary result
  const [decodeInput, setDecodeInput] = useState(""); // Binary to text
  const [decodeOutput, setDecodeOutput] = useState(""); // Text result

  // Format settings
  const [encodeFormat, setEncodeFormat] =
    useState<BinaryFormatType>("withSpaces");
  const [decodeFormat, setDecodeFormat] =
    useState<BinaryFormatType>("withSpaces");

  // Copy states
  const [isEncodeCopied, setIsEncodeCopied] = useState(false);
  const [isDecodeCopied, setIsDecodeCopied] = useState(false);

  // Error states
  const [encodeError, setEncodeError] = useState("");
  const [decodeError, setDecodeError] = useState("");

  // Handle Text to Binary conversion
  const handleEncode = () => {
    try {
      setEncodeError("");
      if (!encodeInput) {
        setEncodeOutput("");
        return;
      }

      // Convert each character to its binary representation
      const result = Array.from(encodeInput).map((char) => {
        // Get char code and convert to binary string with 8 bits (padded with leading zeros)
        let binary = char.charCodeAt(0).toString(2);
        // Pad to 8 bits
        binary = binary.padStart(8, "0");
        return binary;
      });

      // Join based on the selected format
      const formattedResult =
        encodeFormat === "withSpaces" ? result.join(" ") : result.join("");

      setEncodeOutput(formattedResult);
      toast("Text converted to binary", {
        description: "Your text has been converted to binary",
        duration: 2000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during conversion";
      setEncodeError(errorMessage);
      toast.error("Conversion failed", {
        description: errorMessage,
      });
    }
  };

  // Handle Binary to Text conversion
  const handleDecode = () => {
    try {
      setDecodeError("");
      if (!decodeInput) {
        setDecodeOutput("");
        return;
      }

      // Clean the input based on the selected format
      const cleanBinary = decodeInput.trim();

      if (decodeFormat === "withSpaces") {
        // Split by spaces and validate each binary chunk
        const binaryArray = cleanBinary.split(/\s+/);
        if (binaryArray.some((chunk) => !/^[01]+$/.test(chunk))) {
          throw new Error(
            "Invalid binary format. Input should only contain 0s and 1s."
          );
        }

        // Convert each 8-bit binary chunk to a character
        const result = binaryArray
          .map((bin) => {
            return String.fromCharCode(parseInt(bin, 2));
          })
          .join("");

        setDecodeOutput(result);
      } else {
        // For format without spaces
        if (!/^[01]+$/.test(cleanBinary)) {
          throw new Error(
            "Invalid binary format. Input should only contain 0s and 1s."
          );
        }

        // Check if the binary length is multiple of 8
        if (cleanBinary.length % 8 !== 0) {
          throw new Error(
            "Invalid binary length. Each character should be represented by 8 bits."
          );
        }

        // Convert every 8 bits to a character
        let result = "";
        for (let i = 0; i < cleanBinary.length; i += 8) {
          const byte = cleanBinary.substring(i, i + 8);
          result += String.fromCharCode(parseInt(byte, 2));
        }

        setDecodeOutput(result);
      }

      toast("Binary converted to text", {
        description: "Your binary has been converted to text",
        duration: 2000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during conversion";
      setDecodeError(errorMessage);
      toast.error("Conversion failed", {
        description: errorMessage,
      });
    }
  };

  // Handle copy encoded text
  const handleEncodeCopy = () => {
    navigator.clipboard.writeText(encodeOutput).then(() => {
      setIsEncodeCopied(true);
      toast("Copied to clipboard", {
        description: "Binary text copied to clipboard",
        duration: 2000,
      });
      setTimeout(() => setIsEncodeCopied(false), 2000);
    });
  };

  // Handle copy decoded text
  const handleDecodeCopy = () => {
    navigator.clipboard.writeText(decodeOutput).then(() => {
      setIsDecodeCopied(true);
      toast("Copied to clipboard", {
        description: "Decoded text copied to clipboard",
        duration: 2000,
      });
      setTimeout(() => setIsDecodeCopied(false), 2000);
    });
  };

  // Handle reset functions
  const handleEncodeReset = () => {
    setEncodeInput("");
    setEncodeOutput("");
    setEncodeError("");
    toast("Encode reset complete", {
      description: "All content has been cleared",
      duration: 2000,
    });
  };

  const handleDecodeReset = () => {
    setDecodeInput("");
    setDecodeOutput("");
    setDecodeError("");
    toast("Decode reset complete", {
      description: "All content has been cleared",
      duration: 2000,
    });
  };

  // Load sample text
  const loadEncodeSample = () => {
    setEncodeInput(sampleText);
    toast("Sample text loaded", {
      description: "Sample text has been loaded",
      duration: 2000,
    });
  };

  const loadDecodeSample = () => {
    setDecodeInput(sampleBinaryText);
    toast("Sample binary loaded", {
      description: "Sample binary text has been loaded",
      duration: 2000,
    });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <Tabs defaultValue="encode" className="w-full">
        <TabsList className="grid grid-cols-2 w-64 mx-auto mb-6">
          <TabsTrigger value="encode">Text to Binary</TabsTrigger>
          <TabsTrigger value="decode">Binary to Text</TabsTrigger>
        </TabsList>

        {/* Text to Binary Tab */}
        <TabsContent value="encode">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Text to convert:</h3>
                <Button variant="outline" size="sm" onClick={loadEncodeSample}>
                  Load sample text
                </Button>
              </div>
              <Editor
                height="300px"
                defaultLanguage="text"
                defaultValue="Type or paste text to convert to binary"
                value={encodeInput}
                onChange={(value) => setEncodeInput(value || "")}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: "on",
                  minimap: { enabled: false },
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Binary result:</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEncodeCopy}
                  disabled={!encodeOutput || isEncodeCopied}
                >
                  <Clipboard className="h-3 w-3 mr-1" />
                  {isEncodeCopied ? "Copied" : "Copy"}
                </Button>
              </div>
              <Editor
                height="300px"
                defaultLanguage="text"
                defaultValue="Binary will appear here"
                value={encodeOutput}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  fontSize: 14,
                  lineNumbers: "off",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: "on",
                  minimap: { enabled: false },
                }}
              />
              {encodeError && (
                <div className="text-red-500 text-sm mt-1">
                  Error: {encodeError}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center my-4 gap-4">
            <Button
              variant="outline"
              onClick={handleEncodeReset}
              className="flex items-center"
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Reset
            </Button>
            <Button
              variant="brand"
              onClick={handleEncode}
              disabled={!encodeInput}
              className="px-8"
            >
              <ArrowRightLeft className="h-3 w-3 mr-1" />
              Convert to Binary
            </Button>
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Output Format:</h3>
              <Select
                value={encodeFormat}
                onValueChange={(value) =>
                  setEncodeFormat(value as BinaryFormatType)
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="withSpaces">With spaces</SelectItem>
                  <SelectItem value="withoutSpaces">Without spaces</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        {/* Binary to Text Tab */}
        <TabsContent value="decode">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Binary to convert:</h3>
                <Button variant="outline" size="sm" onClick={loadDecodeSample}>
                  Load sample binary
                </Button>
              </div>
              <Editor
                height="300px"
                defaultLanguage="text"
                defaultValue="Type or paste binary code to convert to text"
                value={decodeInput}
                onChange={(value) => setDecodeInput(value || "")}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: "on",
                  minimap: { enabled: false },
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Text result:</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecodeCopy}
                  disabled={!decodeOutput || isDecodeCopied}
                >
                  <Clipboard className="h-3 w-3 mr-1" />
                  {isDecodeCopied ? "Copied" : "Copy"}
                </Button>
              </div>
              <Editor
                height="300px"
                defaultLanguage="text"
                defaultValue="Text will appear here"
                value={decodeOutput}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  fontSize: 14,
                  lineNumbers: "off",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: "on",
                  minimap: { enabled: false },
                }}
              />
              {decodeError && (
                <div className="text-red-500 text-sm mt-1">
                  Error: {decodeError}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center my-4 gap-4">
            <Button
              variant="outline"
              onClick={handleDecodeReset}
              className="flex items-center"
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Reset
            </Button>
            <Button
              variant="brand"
              onClick={handleDecode}
              disabled={!decodeInput}
              className="px-8"
            >
              <ArrowRightLeft className="h-3 w-3 mr-1" />
              Convert to Text
            </Button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Input Format:</h3>
              <Select
                value={decodeFormat}
                onValueChange={(value) =>
                  setDecodeFormat(value as BinaryFormatType)
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="withSpaces">With spaces</SelectItem>
                  <SelectItem value="withoutSpaces">Without spaces</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Explanation Cards */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">
          About Binary-Text Conversion
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>
                Choose between Text to Binary or Binary to Text in the tabs
              </li>
              <li>
                Select the appropriate format option (with or without spaces)
              </li>
              <li>Enter your text or binary in the input editor</li>
              <li>Click the Convert button to process your input</li>
              <li>Copy the results from the output editor</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Binary Representation</CardTitle>
                <CardDescription>
                  How text is converted to binary
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-semibold">ASCII Encoding</p>
                  <p>
                    Each character in ASCII is represented by a 7-bit number
                    (0-127). In this converter, we use 8 bits (1 byte) per
                    character, which is standard in computing.
                  </p>
                  <p className="mt-2">Example:</p>
                  <p className="font-mono bg-gray-100 dark:bg-gray-800 p-1 mt-1 rounded text-xs">
                    Character: A
                    <br />
                    ASCII value: 65
                    <br />
                    Binary: 01000001
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Binary Format Options</p>
                  <p>
                    <span className="font-medium">With spaces:</span> Each 8-bit
                    character is separated by a space for better readability.
                    <br />
                    <span className="font-medium">Without spaces:</span> Binary
                    bits are joined without spaces, producing a more compact
                    representation.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Understanding Binary</CardTitle>
                <CardDescription>Binary system basics</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-semibold">Binary Number System</p>
                  <p>
                    Binary is a base-2 number system that uses only two digits:
                    0 and 1. Each digit position represents a power of 2,
                    starting from 2⁰ (1) at the rightmost position.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Binary to Decimal:</p>
                  <p className="font-mono bg-gray-100 dark:bg-gray-800 p-1 mt-1 rounded text-xs">
                    Binary: 01000001
                    <br />
                    = 0×2⁷ + 1×2⁶ + 0×2⁵ + 0×2⁴ + 0×2³ + 0×2² + 0×2¹ + 1×2⁰
                    <br />
                    = 0 + 64 + 0 + 0 + 0 + 0 + 0 + 1
                    <br />= 65 (ASCII for &apos;A&apos;)
                  </p>
                </div>
                <p className="bg-yellow-50 dark:bg-yellow-900/30 p-2 rounded border-l-2 border-yellow-400">
                  <span className="font-semibold">Tip:</span> When converting
                  binary to text, ensure each character is represented by 8
                  bits. Missing or extra bits will result in incorrect
                  conversion.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-2">Common Use Cases:</h3>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Digital Communication</p>
                <p className="text-sm text-muted-foreground">
                  All digital data is ultimately stored and transmitted as
                  binary
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Education</p>
                <p className="text-sm text-muted-foreground">
                  Learning how computers represent and process text information
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Programming</p>
                <p className="text-sm text-muted-foreground">
                  Understanding binary representations for low-level programming
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Binary conversion is essential in computing but makes data much
              larger than its original form - each character requires 8 bits.
              Binary is not encryption and provides no security, it&apos;s
              simply a different way to represent the same information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample text for the encode feature
const sampleText = `Hello, World! This is a sample text to demonstrate binary conversion.`;

// Sample binary text for the decode feature
const sampleBinaryText = `01001000 01100101 01101100 01101100 01101111 00101100 00100000 01010111 01101111 01110010 01101100 01100100 00100001`;
