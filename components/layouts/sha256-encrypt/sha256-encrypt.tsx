"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Clipboard, RefreshCw, ArrowRightLeft, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SHA256Encrypt() {
  // Input and output states
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle SHA-256 hashing
  const handleEncrypt = async () => {
    try {
      setIsLoading(true);
      setError("");

      if (!input.trim()) {
        setError("Please enter some text to hash");
        toast.error("Empty input", {
          description: "Please enter some text to hash",
        });
        return;
      }

      // Convert input string to Uint8Array
      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      // Use Web Crypto API to create SHA-256 hash
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);

      // Convert the hash to a hexadecimal string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      setOutput(hashHex);
      toast("SHA-256 hash generated", {
        description: "Your text has been hashed successfully",
        duration: 3000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during hashing";
      setError(errorMessage);
      toast.error("Hashing failed", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle copy hash text
  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setIsCopied(true);
      toast("Copied to clipboard", {
        description: "SHA-256 hash copied to clipboard",
        duration: 2000,
      });
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Handle reset function
  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
    toast("Reset complete", {
      description: "All content has been cleared",
      duration: 2000,
    });
  };

  // Load sample text
  const loadSample = () => {
    setInput(sampleText);
    toast("Sample text loaded", {
      description: "Sample text has been loaded",
      duration: 2000,
    });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Text to hash (SHA-256):</h3>
            <Button variant="outline" size="sm" onClick={loadSample}>
              Load sample text
            </Button>
          </div>
          <Textarea
            className="min-h-[200px] font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text to generate SHA-256 hash"
          />
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">SHA-256 Hash:</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!output || isCopied}
            >
              <Clipboard className="h-3 w-3 mr-1" />
              {isCopied ? "Copied" : "Copy"}
            </Button>
          </div>
          <Textarea
            className="min-h-[200px] font-mono"
            value={output}
            readOnly
            placeholder="SHA-256 hash will appear here"
          />
          {error && (
            <div className="text-red-500 text-sm mt-1">Error: {error}</div>
          )}
        </div>
      </div>

      <div className="flex justify-center my-6 gap-4">
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex items-center"
        >
          <RefreshCw className="h-3 w-3 mr-1" /> Reset
        </Button>
        <Button
          variant="brand"
          onClick={handleEncrypt}
          disabled={!input.trim() || isLoading}
          className="px-8"
        >
          <ArrowRightLeft className="h-3 w-3 mr-1" />
          {isLoading ? "Generating..." : "Generate SHA-256 Hash"}
        </Button>
      </div>

      {/* Explanation Cards */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">About SHA-256 Hashing</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Enter your text in the input textarea</li>
              <li>Click the &quot;Generate SHA-256 Hash&quot; button</li>
              <li>Your SHA-256 hash will appear in the output area</li>
              <li>
                Click the &quot;Copy&quot; button to copy the hash to your
                clipboard
              </li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>What is SHA-256?</CardTitle>
                <CardDescription>
                  Understanding SHA-256 hash function
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic
                  hash function that takes an input and produces a 256-bit
                  (32-byte) hash value. This hash is typically rendered as a
                  64-digit hexadecimal number.
                </p>
                <p>Key characteristics of SHA-256:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Always produces a fixed-size output (256 bits)</li>
                  <li>Same input always yields the same hash</li>
                  <li>
                    Small changes in input result in vastly different hashes
                  </li>
                  <li>
                    One-way function (cannot derive original input from hash)
                  </li>
                  <li>Designed to be collision-resistant</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/30 p-2 mt-2 rounded border-l-2 border-green-400 flex">
                  <Info className="h-4 w-4 mr-2 flex-shrink-0 text-green-600" />
                  <p className="text-xs">
                    <span className="font-semibold">Security Note:</span>{" "}
                    SHA-256 is currently considered secure for most
                    cryptographic purposes and is widely used in security
                    applications and protocols.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Use Cases</CardTitle>
                <CardDescription>Where SHA-256 is used</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span className="font-semibold">Digital Signatures:</span>{" "}
                    Used in SSL/TLS certificates and digital signature
                    algorithms
                  </li>
                  <li>
                    <span className="font-semibold">
                      Blockchain Technology:
                    </span>{" "}
                    Bitcoin and many other cryptocurrencies use SHA-256 for
                    mining and transaction verification
                  </li>
                  <li>
                    <span className="font-semibold">File Integrity:</span>{" "}
                    Verifying that files or messages haven&apos;t been altered
                  </li>
                  <li>
                    <span className="font-semibold">Password Storage:</span>{" "}
                    Securely storing password hashes (with proper salting)
                  </li>
                </ul>
                <p className="mt-2">Example SHA-256 hash:</p>
                <p className="font-mono bg-gray-100 dark:bg-gray-800 p-1 mt-1 rounded text-xs break-all">
                  Text: Hello World!
                  <br />
                  SHA-256:
                  7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
            <p className="font-semibold mb-2">
              Advantage of SHA-256 over older hash functions:
            </p>
            <p>
              SHA-256 is part of the SHA-2 family designed by the NSA, offering
              significantly improved security over SHA-1. With a 256-bit output,
              it provides stronger protection against collision attacks and is
              the current industry standard for many security-critical
              applications. Unlike SHA-1, which has been broken, SHA-256 remains
              secure against known cryptographic attacks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample text for the SHA-256 feature
const sampleText = `Hello, World! This is a sample text to demonstrate SHA-256 hashing.`;
