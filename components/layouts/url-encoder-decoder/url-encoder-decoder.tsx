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

type EncodeFunctionType = "encodeURI" | "encodeURIComponent";
type DecodeFunctionType = "decodeURI" | "decodeURIComponent";

export default function UrlEncoderDecoder() {
  // Input and output states for both tabs
  const [encodeInput, setEncodeInput] = useState("");
  const [encodeOutput, setEncodeOutput] = useState("");
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeOutput, setDecodeOutput] = useState("");

  // Function selection states
  const [encodeFunction, setEncodeFunction] =
    useState<EncodeFunctionType>("encodeURIComponent");
  const [decodeFunction, setDecodeFunction] =
    useState<DecodeFunctionType>("decodeURIComponent");

  // Copy states
  const [isEncodeCopied, setIsEncodeCopied] = useState(false);
  const [isDecodeCopied, setIsDecodeCopied] = useState(false);

  // Error states
  const [encodeError, setEncodeError] = useState("");
  const [decodeError, setDecodeError] = useState("");

  // Handle URL encoding
  const handleEncode = () => {
    try {
      setEncodeError("");
      const result =
        encodeFunction === "encodeURI"
          ? encodeURI(encodeInput)
          : encodeURIComponent(encodeInput);
      setEncodeOutput(result);
      toast("URL encoded successfully", {
        description: "Your text has been encoded",
        duration: 2000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during encoding";
      setEncodeError(errorMessage);
      toast.error("Encoding failed", {
        description: errorMessage,
      });
    }
  };

  // Handle URL decoding
  const handleDecode = () => {
    try {
      setDecodeError("");
      const result =
        decodeFunction === "decodeURI"
          ? decodeURI(decodeInput)
          : decodeURIComponent(decodeInput);
      setDecodeOutput(result);
      toast("URL decoded successfully", {
        description: "Your text has been decoded",
        duration: 2000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during decoding";
      setDecodeError(errorMessage);
      toast.error("Decoding failed", {
        description: errorMessage,
      });
    }
  };

  // Handle copy encoded text
  const handleEncodeCopy = () => {
    navigator.clipboard.writeText(encodeOutput).then(() => {
      setIsEncodeCopied(true);
      toast("Copied to clipboard", {
        description: "Encoded text copied to clipboard",
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
      description: "All encode content has been cleared",
      duration: 2000,
    });
  };

  const handleDecodeReset = () => {
    setDecodeInput("");
    setDecodeOutput("");
    setDecodeError("");
    toast("Decode reset complete", {
      description: "All decode content has been cleared",
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
    setDecodeInput(sampleEncodedText);
    toast("Sample encoded text loaded", {
      description: "Sample encoded text has been loaded",
      duration: 2000,
    });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <Tabs defaultValue="encode" className="w-full">
        <TabsList className="grid grid-cols-2 w-64 mx-auto mb-6">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>

        {/* Encode Tab */}
        <TabsContent value="encode">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Text to encode:</h3>
                <Button variant="outline" size="sm" onClick={loadEncodeSample}>
                  Load sample text
                </Button>
              </div>
              <Editor
                height="300px"
                defaultLanguage="text"
                defaultValue="Type or paste text to encode"
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
                <h3 className="font-medium">Encoded result:</h3>
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
                defaultValue="Encoded text will appear here"
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
              Encode Text
            </Button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Encoding Settings:</h3>
              <Select
                value={encodeFunction}
                onValueChange={(value) =>
                  setEncodeFunction(value as EncodeFunctionType)
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select function" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="encodeURIComponent">
                    encodeURIComponent
                  </SelectItem>
                  <SelectItem value="encodeURI">encodeURI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        {/* Decode Tab */}
        <TabsContent value="decode">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Text to decode:</h3>
                <Button variant="outline" size="sm" onClick={loadDecodeSample}>
                  Load sample text
                </Button>
              </div>
              <Editor
                height="300px"
                defaultLanguage="text"
                defaultValue="Type or paste encoded text to decode"
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
                <h3 className="font-medium">Decoded result:</h3>
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
                defaultValue="Decoded text will appear here"
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
              Decode Text
            </Button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Decoding Settings:</h3>
              <Select
                value={decodeFunction}
                onValueChange={(value) =>
                  setDecodeFunction(value as DecodeFunctionType)
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select function" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="decodeURIComponent">
                    decodeURIComponent
                  </SelectItem>
                  <SelectItem value="decodeURI">decodeURI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Explanation Cards */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">
          About URL Encoding/Decoding
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Choose between Encode or Decode in the tabs</li>
              <li>
                Select the appropriate encoding/decoding function for your needs
              </li>
              <li>Enter your text in the input editor</li>
              <li>Click the Encode/Decode button to process your text</li>
              <li>Copy the results from the output editor</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>encodeURI vs encodeURIComponent</CardTitle>
                <CardDescription>Understanding the differences</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-semibold">encodeURI</p>
                  <p>
                    Designed for encoding complete URLs. It preserves characters
                    that are part of URI structure:
                  </p>
                  <p className="font-mono bg-gray-100 dark:bg-gray-800 p-1 mt-1 rounded text-xs">
                    : / ? # [ ] @ ! $ & &apos; ( ) * + , ; =
                  </p>
                  <p className="mt-2">Example:</p>
                  <p className="font-mono bg-gray-100 dark:bg-gray-800 p-1 mt-1 rounded text-xs break-all">
                    Original: https://example.com?q=hello world
                    <br />
                    Encoded: https://example.com?q=hello%20world
                  </p>
                </div>
                <div>
                  <p className="font-semibold">encodeURIComponent</p>
                  <p>
                    Designed for encoding URL components (like query
                    parameters). Encodes all special characters.
                  </p>
                  <p className="mt-2">Example:</p>
                  <p className="font-mono bg-gray-100 dark:bg-gray-800 p-1 mt-1 rounded text-xs break-all">
                    Original: hello world&category=tools
                    <br />
                    Encoded: hello%20world%26category%3Dtools
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Use Cases</CardTitle>
                <CardDescription>When to use which function</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-semibold">Use encodeURIComponent for:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Query string parameters</li>
                    <li>Path segments containing special characters</li>
                    <li>
                      Any part of a URL that might contain reserved characters
                    </li>
                    <li>Form data values</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">Use encodeURI for:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Complete URLs</li>
                    <li>When you want to preserve URL structure</li>
                    <li>When you need to maintain reserved characters</li>
                  </ul>
                </div>
                <p className="bg-yellow-50 dark:bg-yellow-900/30 p-2 rounded border-l-2 border-yellow-400">
                  <span className="font-semibold">Tip:</span> When in doubt, use
                  encodeURIComponent for individual components and encodeURI for
                  complete URLs.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-2">Character Encoding Details:</h3>
            <p className="text-sm text-muted-foreground">
              URL encoding converts characters into a format that can be
              transmitted over the Internet. It replaces unsafe ASCII characters
              with a &quot;%&quot; followed by two hexadecimal digits. Both
              encodeURI and encodeURIComponent use UTF-8 encoding for non-ASCII
              characters, ensuring proper handling of international characters
              and symbols.
            </p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Space character</p>
                <p className="text-sm text-muted-foreground">
                  Encoded as{" "}
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    %20
                  </code>{" "}
                  (not as +)
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Non-ASCII characters</p>
                <p className="text-sm text-muted-foreground">
                  Encoded as UTF-8 byte sequences (multiple %XX values)
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Reserved characters</p>
                <p className="text-sm text-muted-foreground">
                  E.g.,{" "}
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    & = ?
                  </code>{" "}
                  have special meanings in URLs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample text for the encode feature
const sampleText = `https://example.com?q=hello_world`;

// Sample encoded text for the decode feature
const sampleEncodedText = "https%3A%2F%2Fexample.com%3Fq%3Dhello_world";
