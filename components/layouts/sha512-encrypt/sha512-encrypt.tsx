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

export default function SHA512Encrypt() {
  // Input and output states
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle SHA-512 hashing
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

      // Use Web Crypto API to create SHA-512 hash
      const hashBuffer = await crypto.subtle.digest("SHA-512", data);

      // Convert the hash to a hexadecimal string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      setOutput(hashHex);
      toast("SHA-512 hash generated", {
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
        description: "SHA-512 hash copied to clipboard",
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
            <h3 className="font-medium">Text to hash (SHA-512):</h3>
            <Button variant="outline" size="sm" onClick={loadSample}>
              Load sample text
            </Button>
          </div>
          <Textarea
            className="min-h-[200px] font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text to generate SHA-512 hash"
          />
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">SHA-512 Hash:</h3>
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
            placeholder="SHA-512 hash will appear here"
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
          {isLoading ? "Generating..." : "Generate SHA-512 Hash"}
        </Button>
      </div>

      {/* Explanation Cards */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">About SHA-512 Hashing</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Enter your text in the input textarea</li>
              <li>Click the &quot;Generate SHA-512 Hash&quot; button</li>
              <li>Your SHA-512 hash will appear in the output area</li>
              <li>
                Click the &quot;Copy&quot; button to copy the hash to your
                clipboard
              </li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>What is SHA-512?</CardTitle>
                <CardDescription>
                  Understanding SHA-512 hash function
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  SHA-512 (Secure Hash Algorithm 512-bit) is a cryptographic
                  hash function that takes an input and produces a 512-bit
                  (64-byte) hash value. This hash is typically rendered as a
                  128-digit hexadecimal number.
                </p>
                <p>Key characteristics of SHA-512:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Always produces a fixed-size output (512 bits)</li>
                  <li>Same input always yields the same hash</li>
                  <li>
                    Small changes in input result in vastly different hashes
                  </li>
                  <li>
                    One-way function (cannot derive original input from hash)
                  </li>
                  <li>Highly collision-resistant</li>
                </ul>
                <div className="bg-green-50 dark:bg-green-900/30 p-2 mt-2 rounded border-l-2 border-green-400 flex">
                  <Info className="h-4 w-4 mr-2 flex-shrink-0 text-green-600" />
                  <p className="text-xs">
                    <span className="font-semibold">Security Note:</span>{" "}
                    SHA-512 offers even stronger security than SHA-256, making
                    it suitable for high-security applications and
                    future-proofing against potential advances in cryptographic
                    attacks.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Use Cases</CardTitle>
                <CardDescription>Where SHA-512 is used</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span className="font-semibold">
                      High-Security Applications:
                    </span>{" "}
                    Used where maximum security is required, such as government
                    and military systems
                  </li>
                  <li>
                    <span className="font-semibold">Digital Signatures:</span>{" "}
                    Used in advanced digital signature schemes requiring maximum
                    security
                  </li>
                  <li>
                    <span className="font-semibold">Password Storage:</span>{" "}
                    Securing highly sensitive credentials with stronger
                    protection than SHA-256
                  </li>
                  <li>
                    <span className="font-semibold">Data Integrity:</span>{" "}
                    Verifying integrity of large files and critical data where
                    maximum collision resistance is required
                  </li>
                </ul>
                <p className="mt-2">Example SHA-512 hash:</p>
                <p className="font-mono bg-gray-100 dark:bg-gray-800 p-1 mt-1 rounded text-xs break-all">
                  Text: Hello World!
                  <br />
                  SHA-512:
                  861844d6704e8573fec34d967e20bcfef3d424cf48be04e6dc08f2bd58c729743371015ead891cc3cf1c9d34b49264b510751b1ff9e537937bc46b5d6ff4ecc8
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
            <p className="font-semibold mb-2">
              Advantage of SHA-512 over other hash functions:
            </p>
            <p>
              SHA-512 is part of the SHA-2 family designed by the NSA, offering
              the highest security level in the family. With a 512-bit output,
              it provides twice the bit-length of SHA-256, making it
              significantly more resistant to collision and preimage attacks.
              It&apos;s particularly beneficial for 64-bit systems where it can
              actually be faster than SHA-256 in some implementations. SHA-512
              is recommended for applications requiring maximum security and
              long-term protection against future cryptographic advances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample text for the SHA-512 feature
const sampleText = `Hello, World! This is a sample text to demonstrate SHA-512 hashing.`;
