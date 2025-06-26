"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Editor from "@monaco-editor/react";
import { Clipboard, Download, RefreshCw, Text } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { minify } from "terser";

export default function JavascriptMinifier() {
  const [code, setCode] = useState("");
  const [minifiedCode, setMinifiedCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [minifiedSize, setMinifiedSize] = useState(0);
  const [savingsPercentage, setSavingsPercentage] = useState(0);

  // Function to calculate byte size of a string
  const getByteSize = (str: string) => {
    return new Blob([str]).size;
  };

  // Calculate size reduction and savings percentage
  const calculateSavings = (original: string, minified: string) => {
    const origSize = getByteSize(original);
    const minSize = getByteSize(minified);
    setOriginalSize(origSize);
    setMinifiedSize(minSize);

    if (origSize > 0) {
      const savings = ((origSize - minSize) / origSize) * 100;
      setSavingsPercentage(parseFloat(savings.toFixed(1)));
    } else {
      setSavingsPercentage(0);
    }
  };

  const handleMinify = async () => {
    setIsLoading(true);
    setError("");
    setIsCopied(false);
    try {
      const result = await minify(code);
      const minCode = result.code || "";
      setMinifiedCode(minCode);
      calculateSavings(code, minCode);
      toast("JavaScript minified successfully", {
        description: "Your code has been minified and is ready to use.",
        duration: 2000,
      });
    } catch (err) {
      console.error("Minification error:", err);
      setError("An error occurred while minifying the code.");
      toast.error("Minification failed", {
        description: "Please check your JavaScript syntax and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(minifiedCode).then(() => {
      setIsCopied(true);
      toast("Copied to clipboard", {
        description: "Minified code copied to clipboard",
        duration: 2000,
      });
    });
  };

  const handleDownload = () => {
    const blob = new Blob([minifiedCode], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast("JavaScript downloaded", {
      description: "Your minified code has been downloaded",
      duration: 2000,
    });
  };

  const handleReset = () => {
    setCode("");
    setMinifiedCode("");
    setError("");
    setIsLoading(false);
    setIsCopied(false);
    setOriginalSize(0);
    setMinifiedSize(0);
    setSavingsPercentage(0);
    toast("Reset complete", {
      description: "All content has been cleared",
      duration: 2000,
    });
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Original JavaScript:</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCode(sampleJsCode);
                toast("Sample code loaded", {
                  description: "Sample JavaScript code has been loaded",
                  duration: 2000,
                });
              }}
            >
              Load sample code
            </Button>
          </div>

          <Editor
            height="400px"
            defaultLanguage="javascript"
            defaultValue="// Write your JavaScript code here"
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
            options={{
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: "on",
              wrappingStrategy: "advanced",
              wrappingIndent: "same",
              formatOnPaste: true,
              formatOnType: true,
              tabSize: 2,
              insertSpaces: true,
              renderWhitespace: "all",
              renderControlCharacters: true,
              inlineSuggest: {
                enabled: false,
              },
              tabCompletion: "off",
              suggestOnTriggerCharacters: false,
              acceptSuggestionOnEnter: "off",
              contextmenu: false,
              hover: {
                enabled: false,
              },
              minimap: {
                enabled: false,
              },
              parameterHints: {
                enabled: false,
              },
              quickSuggestions: {
                comments: false,
                other: false,
                strings: false,
              },
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Minified JavaScript:</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!minifiedCode || isCopied}
              >
                <Clipboard className="h-3 w-3 mr-1" />
                {isCopied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={!minifiedCode}
              >
                <Download className="h-3 w-3 mr-1" /> Download
              </Button>
            </div>
          </div>
          <Editor
            height="400px"
            defaultLanguage="javascript"
            defaultValue="// Minified code will appear here"
            value={minifiedCode}
            theme="vs-dark"
            options={{
              readOnly: true,
              fontSize: 14,
              lineNumbers: "off",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: "on",
              wrappingStrategy: "advanced",
              wrappingIndent: "same",
              formatOnPaste: true,
              formatOnType: true,
              tabSize: 2,
              insertSpaces: true,
              renderWhitespace: "all",
              renderControlCharacters: true,
              inlineSuggest: {
                enabled: false,
              },
              tabCompletion: "off",
              suggestOnTriggerCharacters: false,
              acceptSuggestionOnEnter: "off",
              contextmenu: false,
              hover: {
                enabled: false,
              },
              minimap: {
                enabled: false,
              },
              parameterHints: {
                enabled: false,
              },
              quickSuggestions: {
                comments: false,
                other: false,
                strings: false,
              },
            }}
          />
          {error && (
            <div className="text-red-500 text-sm mt-1">Error: {error}</div>
          )}
          {isLoading && (
            <div className="text-blue-500 text-sm mt-1">Minifying...</div>
          )}
        </div>
      </div>

      <div className="flex justify-center my-4 gap-4">
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex items-center"
        >
          <RefreshCw className="h-3 w-3 mr-1" /> Reset
        </Button>
        <Button
          variant="default"
          onClick={handleMinify}
          disabled={isLoading || !code}
          className="px-8"
        >
          <Text className="h-3 w-3 mr-1" />
          {isLoading ? "Minifying..." : "Minify JavaScript"}
        </Button>
      </div>

      {minifiedCode && !error && (
        <div className="my-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Space Savings:</h3>
            <span className="text-xl font-medium font-mono">
              {savingsPercentage}% reduction
            </span>
          </div>
          <Progress value={savingsPercentage} className="h-2 mb-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <div>
              Original: {(originalSize / 1024).toFixed(2)} KB ({originalSize}{" "}
              bytes)
            </div>
            <div>
              Minified: {(minifiedSize / 1024).toFixed(2)} KB ({minifiedSize}{" "}
              bytes)
            </div>
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            You saved {((originalSize - minifiedSize) / 1024).toFixed(2)} KB (
            {originalSize - minifiedSize} bytes)
          </div>
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">
          About JavaScript Minification
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Paste your JavaScript code into the editor on the left</li>
              <li>Click the &quot;Minify JavaScript&quot; button</li>
              <li>Copy or download your minified code from the right editor</li>
            </ol>
          </div>
          <div>
            <h3 className="font-medium mb-2">Benefits of minification:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Smaller file size (reduced bandwidth usage)</li>
              <li>Faster loading times for your website</li>
              <li>Improved webpage performance</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Note: The minified code removes whitespace, comments, and shortens
            variable names, making it difficult to read but much more efficient
            for browsers to process.
          </p>
        </div>
      </div>
    </div>
  );
}

const sampleJsCode = `/**
 * A simple JavaScript library for data manipulation
 * @author Example Developer
 * @version 1.0.0
 */

// Utility function to create formatted strings
const formatString = (str, ...values) => {
  return str.replace(/{(\\d+)}/g, (match, index) => {
    return typeof values[index] !== 'undefined' ? values[index] : match;
  });
};

// Class for managing data operations
class DataHandler {
  constructor(initialData = []) {
    this.data = initialData;
    this.lastOperation = null;
    
    // Configuration options with default values
    this.config = {
      enableLogging: true,
      maxItems: 100,
      defaultSortOrder: "ascending"
    };
  }
  
  add(item) {
    if (this.data.length >= this.config.maxItems) {
      console.warn("Maximum items reached");
      return false;
    }
    
    this.data.push(item);
    this.lastOperation = "add";
    
    if (this.config.enableLogging) {
      console.log(formatString("Item {0} added. Total items: {1}", item, this.data.length));
    }
    
    return true;
  }
  
  remove(index) {
    if (index < 0 || index >= this.data.length) {
      return null;
    }
    
    const removed = this.data.splice(index, 1)[0];
    this.lastOperation = "remove";
    
    return removed;
  }
  
  sort(order = this.config.defaultSortOrder) {
    const multiplier = order === "ascending" ? 1 : -1;
    
    this.data.sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return multiplier * (a - b);
      } else {
        return multiplier * String(a).localeCompare(String(b));
      }
    });
    
    this.lastOperation = "sort";
    return this.data;
  }
}

// Example usage
const dataHandler = new DataHandler([5, 3, 8, 1, 2]);
dataHandler.config.enableLogging = false;
dataHandler.add(10);
dataHandler.remove(2);
const sortedData = dataHandler.sort();

console.log("Final data:", sortedData);
console.log("Last operation:", dataHandler.lastOperation);
`;
