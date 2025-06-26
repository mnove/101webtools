"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import crypto from "crypto-js";
import {
  ArrowRightLeft,
  Clipboard,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MD5Encrypt() {
  // Input and output states
  const [hashInput, setHashInput] = useState("");
  const [hashOutput, setHashOutput] = useState("");
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

  // Copy states
  const [isHashCopied, setIsHashCopied] = useState(false);

  // Generate MD5 hash
  const generateHash = () => {
    try {
      if (!hashInput.trim()) {
        toast.error("Please enter some text to hash");
        return;
      }

      const hash = crypto.MD5(hashInput).toString();
      setHashOutput(hash);

      toast("MD5 hash generated", {
        description: "Your text has been hashed",
        duration: 2000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during hashing";
      toast.error("Hashing failed", {
        description: errorMessage,
      });
    }
  };

  // Verify MD5 hash
  const checkHash = () => {
    try {
      if (!verifyInput.trim() || !verifyHash.trim()) {
        toast.error("Please enter both text and hash to verify");
        return;
      }

      const generatedHash = crypto.MD5(verifyInput).toString();
      const match = generatedHash.toLowerCase() === verifyHash.toLowerCase();

      setVerifyResult(match);

      if (match) {
        toast.success("Hash verification successful", {
          description: "The hash matches the input text",
          duration: 2000,
        });
      } else {
        toast.error("Hash verification failed", {
          description: "The hash does not match the input text",
          duration: 2000,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during verification";
      toast.error("Verification failed", {
        description: errorMessage,
      });
    }
  };

  // Handle copy hash
  const handleCopyHash = () => {
    navigator.clipboard.writeText(hashOutput).then(() => {
      setIsHashCopied(true);
      toast("Copied to clipboard", {
        description: "MD5 hash copied to clipboard",
        duration: 2000,
      });
      setTimeout(() => setIsHashCopied(false), 2000);
    });
  };

  // Handle reset functions
  const handleHashReset = () => {
    setHashInput("");
    setHashOutput("");
    toast("Hash generator reset", {
      description: "All content has been cleared",
      duration: 2000,
    });
  };

  const handleVerifyReset = () => {
    setVerifyInput("");
    setVerifyHash("");
    setVerifyResult(null);
    toast("Verification reset", {
      description: "All verification content has been cleared",
      duration: 2000,
    });
  };

  // Load sample text
  const loadHashSample = () => {
    setHashInput(sampleText);
    toast("Sample text loaded", {
      description: "Sample text has been loaded",
      duration: 2000,
    });
  };

  const loadVerifySample = () => {
    setVerifyInput(sampleText);
    setVerifyHash(sampleHash);
    toast("Sample verification data loaded", {
      description: "Sample text and hash have been loaded",
      duration: 2000,
    });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid grid-cols-2 w-64 mx-auto mb-6">
          <TabsTrigger value="generate">Generate Hash</TabsTrigger>
          <TabsTrigger value="verify">Verify Hash</TabsTrigger>
        </TabsList>

        {/* Generate Hash Tab */}
        <TabsContent value="generate">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Text to hash:</h3>
                <Button variant="outline" size="sm" onClick={loadHashSample}>
                  Load sample text
                </Button>
              </div>
              <Textarea
                placeholder="Type or paste text to hash"
                className="min-h-[200px] font-mono"
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">MD5 hash result:</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyHash}
                  disabled={!hashOutput || isHashCopied}
                >
                  <Clipboard className="h-3 w-3 mr-1" />
                  {isHashCopied ? "Copied" : "Copy"}
                </Button>
              </div>
              <Textarea
                placeholder="MD5 hash will appear here"
                className="min-h-[80px] font-mono"
                value={hashOutput}
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-center my-4 gap-4">
            <Button
              variant="outline"
              onClick={handleHashReset}
              className="flex items-center"
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Reset
            </Button>
            <Button
              onClick={generateHash}
              disabled={!hashInput}
              className="px-8"
            >
              <ShieldAlert className="h-3 w-3 mr-1" />
              Generate MD5 Hash
            </Button>
          </div>
        </TabsContent>

        {/* Verify Hash Tab */}
        <TabsContent value="verify">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Text to verify:</h3>
                <Button variant="outline" size="sm" onClick={loadVerifySample}>
                  Load sample data
                </Button>
              </div>
              <Textarea
                placeholder="Type or paste text to verify"
                className="min-h-[150px] font-mono"
                value={verifyInput}
                onChange={(e) => setVerifyInput(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="mb-2">
                <h3 className="font-medium">MD5 hash to verify against:</h3>
              </div>
              <Textarea
                placeholder="Enter the MD5 hash to verify against"
                className="min-h-[50px] font-mono"
                value={verifyHash}
                onChange={(e) => setVerifyHash(e.target.value)}
              />
            </div>

            {verifyResult !== null && (
              <div
                className={`p-4 rounded-md ${
                  verifyResult
                    ? "bg-green-100 dark:bg-green-900/30 border border-green-400"
                    : "bg-red-100 dark:bg-red-900/30 border border-red-400"
                }`}
              >
                <p className="font-medium">
                  {verifyResult
                    ? "✓ Hash verification successful! The hash matches the input text."
                    : "✗ Hash verification failed! The hash does not match the input text."}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center my-4 gap-4">
            <Button
              variant="outline"
              onClick={handleVerifyReset}
              className="flex items-center"
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Reset
            </Button>
            <Button
              onClick={checkHash}
              disabled={!verifyInput || !verifyHash}
              className="px-8"
            >
              <ArrowRightLeft className="h-3 w-3 mr-1" />
              Verify Hash
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Explanation Cards */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">About MD5 Hashing</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Choose between Generate Hash or Verify Hash in the tabs</li>
              <li>For generating: Enter your text in the input area</li>
              <li>Click the Generate MD5 Hash button to create a hash</li>
              <li>For verifying: Enter the text and the MD5 hash to verify</li>
              <li>Click the Verify Hash button to check if they match</li>
              <li>Copy the results as needed</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>What is MD5?</CardTitle>
                <CardDescription>Message Digest Algorithm 5</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  MD5 (Message Digest Algorithm 5) is a widely used
                  cryptographic hash function that produces a 128-bit (16-byte)
                  hash value, typically expressed as a 32-character hexadecimal
                  number.
                </p>
                <p>
                  It was designed to be a one-way function, meaning it&apos;s
                  practically impossible to derive the original text from the
                  hash value.
                </p>
                <p className="font-mono bg-gray-100 dark:bg-gray-800 p-1 mt-1 rounded text-xs break-all">
                  Text: &quot;Hello World&quot;
                  <br />
                  MD5: b10a8db164e0754105b7a99be72e3fe5
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Considerations</CardTitle>
                <CardDescription>Important limitations to know</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded border-l-2 border-yellow-400">
                  <p className="font-semibold text-yellow-800 dark:text-yellow-200">
                    Security Warning
                  </p>
                  <p>
                    MD5 is considered cryptographically broken and unsuitable
                    for security applications.
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-1">
                  <li>Vulnerable to collision attacks</li>
                  <li>Not suitable for password storage</li>
                  <li>Should not be used for security-critical applications</li>
                  <li>Better alternatives include SHA-256, SHA-3, or Bcrypt</li>
                </ul>
                <p>
                  While MD5 is still useful for checksums and data integrity
                  verification in non-security contexts, use stronger algorithms
                  for security purposes.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-2">Common MD5 Use Cases:</h3>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">File Verification</p>
                <p className="text-sm text-muted-foreground">
                  Checking if files have been altered or corrupted during
                  transfer
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Data Integrity</p>
                <p className="text-sm text-muted-foreground">
                  Verifying data hasn&apos;t changed in non-security critical
                  applications
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Deduplication</p>
                <p className="text-sm text-muted-foreground">
                  Identifying duplicate files by comparing their MD5 hash values
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Remember that MD5 always produces a fixed-size output (32
              hexadecimal characters) regardless of input size. The same input
              will always produce the same MD5 hash, but different inputs should
              rarely produce the same hash (though collisions are possible due
              to known vulnerabilities).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample text for the hash feature
const sampleText = `Hello, World! This is a sample text to demonstrate MD5 hashing.`;

// Sample hash for the verify feature
const sampleHash = "6cd3556deb0da54bca060b4c39479839";
