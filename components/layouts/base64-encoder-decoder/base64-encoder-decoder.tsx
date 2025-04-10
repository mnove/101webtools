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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Editor from "@monaco-editor/react";
import { ArrowRightLeft, Clipboard, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Base64FormatType = "base64" | "base64url";

export default function Base64EncoderDecoder() {
  // Input and output states for both tabs
  const [encodeInput, setEncodeInput] = useState("");
  const [encodeOutput, setEncodeOutput] = useState("");
  const [decodeInput, setDecodeInput] = useState("");
  const [decodeOutput, setDecodeOutput] = useState("");

  // Function selection states
  const [encodeFormat, setEncodeFormat] = useState<Base64FormatType>("base64");
  const [decodeFormat, setDecodeFormat] = useState<Base64FormatType>("base64");

  // Padding options
  const [omitPadding, setOmitPadding] = useState(false);

  // Copy states
  const [isEncodeCopied, setIsEncodeCopied] = useState(false);
  const [isDecodeCopied, setIsDecodeCopied] = useState(false);

  // Error states
  const [encodeError, setEncodeError] = useState("");
  const [decodeError, setDecodeError] = useState("");

  // Handle Base64 encoding
  const handleEncode = () => {
    try {
      setEncodeError("");
      const encoder = new TextEncoder();
      const data = encoder.encode(encodeInput);
      let base64 = btoa(String.fromCharCode(...data));

      // Convert to base64url if needed
      if (encodeFormat === "base64url") {
        base64 = base64.replace(/\+/g, "-").replace(/\//g, "_");
      }

      // Remove padding if requested
      if (omitPadding) {
        base64 = base64.replace(/=+$/, "");
      }

      setEncodeOutput(base64);
      toast("Base64 encoded successfully", {
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

  // Handle Base64 decoding
  const handleDecode = () => {
    try {
      setDecodeError("");

      // Process input based on format
      let processedInput = decodeInput;

      // Handle Base64URL format
      if (decodeFormat === "base64url") {
        processedInput = processedInput.replace(/-/g, "+").replace(/_/g, "/");
      }

      // Add padding if potentially missing
      while (processedInput.length % 4 !== 0) {
        processedInput += "=";
      }

      // Decode
      const binary = atob(processedInput);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const decoder = new TextDecoder();
      const result = decoder.decode(bytes);

      setDecodeOutput(result);
      toast("Base64 decoded successfully", {
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

          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Encoding Format:</h3>
              <Select
                value={encodeFormat}
                onValueChange={(value) =>
                  setEncodeFormat(value as Base64FormatType)
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="base64">Base64 (Standard)</SelectItem>
                  <SelectItem value="base64url">Base64URL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="omit-padding"
                checked={omitPadding}
                onCheckedChange={setOmitPadding}
              />
              <Label htmlFor="omit-padding">Omit padding (=)</Label>
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
              <h3 className="font-medium">Input Format:</h3>
              <Select
                value={decodeFormat}
                onValueChange={(value) =>
                  setDecodeFormat(value as Base64FormatType)
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="base64">Base64 (Standard)</SelectItem>
                  <SelectItem value="base64url">Base64URL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Explanation Cards */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">
          About Base64 Encoding/Decoding
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Choose between Encode or Decode in the tabs</li>
              <li>Select the appropriate encoding format for your needs</li>
              <li>
                For encoding, choose whether to include padding characters
              </li>
              <li>Enter your text in the input editor</li>
              <li>Click the Encode/Decode button to process your text</li>
              <li>Copy the results from the output editor</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Base64 vs Base64URL</CardTitle>
                <CardDescription>Understanding the differences</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-semibold">Standard Base64</p>
                  <p>
                    Uses the character set A-Z, a-z, 0-9, +, and / with = for
                    padding. May cause issues in URLs and filenames due to
                    special characters.
                  </p>
                  <p className="mt-2">Example:</p>
                  <p className="font-mono bg-gray-100 dark:bg-gray-800 p-1 mt-1 rounded text-xs break-all">
                    Original: Hello World!
                    <br />
                    Base64: SGVsbG8gV29ybGQh
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Base64URL</p>
                  <p>
                    URL-safe variant that replaces + with - and / with _. Safe
                    to use in URLs, filenames, and other contexts.
                  </p>
                  <p className="mt-2">Example with special chars:</p>
                  <p className="font-mono bg-gray-100 dark:bg-gray-800 p-1 mt-1 rounded text-xs break-all">
                    Standard: a+b/c==
                    <br />
                    Base64URL: a-b_c==
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Padding in Base64</CardTitle>
                <CardDescription>Why padding matters</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-semibold">What is padding?</p>
                  <p>
                    Base64 encodes 3 bytes of data into 4 characters. When the
                    input length is not a multiple of 3, padding characters (=)
                    are added to make the output length a multiple of 4.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Padding examples:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>1 byte remaining: two padding chars (==)</li>
                    <li>2 bytes remaining: one padding char (=)</li>
                  </ul>
                </div>
                <p className="bg-yellow-50 dark:bg-yellow-900/30 p-2 rounded border-l-2 border-yellow-400">
                  <span className="font-semibold">Tip:</span> Some systems can
                  decode Base64 without padding. Omitting padding makes encoded
                  strings shorter but may cause compatibility issues with some
                  decoders.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-2">Common Base64 Use Cases:</h3>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Email Attachments</p>
                <p className="text-sm text-muted-foreground">
                  MIME format uses Base64 to encode binary attachments in email
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Data URIs</p>
                <p className="text-sm text-muted-foreground">
                  Embedding images directly in HTML/CSS using Base64 encoding
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">JWT Tokens</p>
                <p className="text-sm text-muted-foreground">
                  JSON Web Tokens use Base64URL encoding for their components
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Base64 encoding increases data size by approximately 33% compared
              to the original. It is not a form of encryption and does not
              provide security - it is an encoding scheme for representing
              binary data in ASCII text format.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample text for the encode feature
const sampleText = `Hello, World! This is a sample text to demonstrate Base64 encoding.`;

// Sample encoded text for the decode feature
const sampleEncodedText =
  "SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgdG8gZGVtb25zdHJhdGUgQmFzZTY0IGVuY29kaW5nLg==";
