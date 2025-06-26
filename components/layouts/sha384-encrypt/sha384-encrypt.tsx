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

export default function SHA384Encrypt() {
  // Input and output states
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle SHA-384 hashing
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

      // Use Web Crypto API to create SHA-384 hash
      const hashBuffer = await crypto.subtle.digest("SHA-384", data);

      // Convert the hash to a hexadecimal string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      setOutput(hashHex);
      toast("SHA-384 hash generated", {
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
        description: "SHA-384 hash copied to clipboard",
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
            <h3 className="font-medium">Text to hash (SHA-384):</h3>
            <Button variant="outline" size="sm" onClick={loadSample}>
              Load sample text
            </Button>
          </div>
          <Textarea
            className="min-h-[200px] font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text to generate SHA-384 hash"
          />
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">SHA-384 Hash:</h3>
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
            placeholder="SHA-384 hash will appear here"
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
          variant="default"
          onClick={handleEncrypt}
          disabled={!input.trim() || isLoading}
          className="px-8"
        >
          <ArrowRightLeft className="h-3 w-3 mr-1" />
          {isLoading ? "Generating..." : "Generate SHA-384 Hash"}
        </Button>
      </div>

      {/* Explanation Cards */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">About SHA-384 Hashing</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Enter your text in the input textarea</li>
              <li>Click the &quot;Generate SHA-384 Hash&quot; button</li>
              <li>Your SHA-384 hash will appear in the output area</li>
              <li>
                Click the &quot;Copy&quot; button to copy the hash to your
                clipboard
              </li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>What is SHA-384?</CardTitle>
                <CardDescription>
                  Understanding SHA-384 hash function
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  SHA-384 (Secure Hash Algorithm 384-bit) is a cryptographic
                  hash function that takes an input and produces a 384-bit
                  (48-byte) hash value. This hash is typically rendered as a
                  96-digit hexadecimal number.
                </p>
                <p>Key characteristics of SHA-384:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Always produces a fixed-size output (384 bits)</li>
                  <li>Same input always yields the same hash</li>
                  <li>
                    Small changes in input result in vastly different hashes
                  </li>
                  <li>
                    One-way function (cannot derive original input from hash)
                  </li>
                  <li>Higher security margin than SHA-256</li>
                  <li>
                    Part of the SHA-2 family alongside SHA-256 and SHA-512
                  </li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/30 p-2 mt-2 rounded border-l-2 border-green-400 flex">
                  <Info className="h-4 w-4 mr-2 flex-shrink-0 text-green-600" />
                  <p className="text-xs">
                    <span className="font-semibold">Security Note:</span>{" "}
                    SHA-384 provides a higher security level than SHA-256 while
                    maintaining excellent performance. It&apos;s often used in
                    applications requiring additional security assurance.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Use Cases</CardTitle>
                <CardDescription>Where SHA-384 is used</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span className="font-semibold">TLS/SSL Security:</span>{" "}
                    Commonly used in TLS 1.2 and higher for digital certificates
                    and secure communications
                  </li>
                  <li>
                    <span className="font-semibold">
                      High-Security Applications:
                    </span>{" "}
                    Used when higher security than SHA-256 is required without
                    the performance overhead of SHA-512
                  </li>
                  <li>
                    <span className="font-semibold">Data Integrity:</span>{" "}
                    Verifying that important files, messages, or documents
                    haven&apos;t been altered
                  </li>
                  <li>
                    <span className="font-semibold">Enterprise Systems:</span>{" "}
                    Often used in enterprise-grade security systems for
                    authentication and message integrity verification
                  </li>
                </ul>
                <p className="mt-2">Example SHA-384 hash:</p>
                <p className="font-mono bg-gray-100 dark:bg-gray-800 p-1 mt-1 rounded text-xs break-all">
                  Text: Hello World!
                  <br />
                  SHA-384:
                  bfd76c0ebbd006fee583410547c1887b0292be76d582d96c242d2a792723e3fd6fd061f9d5cfd13b8f961358e6adba4a
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
            <p className="font-semibold mb-2">
              Why choose SHA-384 over SHA-256:
            </p>
            <p>
              SHA-384 is essentially a truncated version of SHA-512, offering a
              balance between the security strength of SHA-512 and the faster
              performance of SHA-256. With its 384-bit output (48 bytes), it
              provides a greater security margin against collision attacks and
              potential future cryptographic threats. SHA-384 is particularly
              useful in scenarios where additional security is desired but the
              full 512-bit output is not necessary. It&apos;s a popular choice
              for digital signatures, certificate authorities, and other
              security-sensitive applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample text for the SHA-384 feature
const sampleText = `Hello, World! This is a sample text to demonstrate SHA-384 hashing.`;
