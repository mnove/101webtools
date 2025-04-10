"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Editor from "@monaco-editor/react";
import { Clipboard, Download, RefreshCw, Text } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CssMinifier() {
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
      // Dynamically import the minify function from csso
      //? Otherwise it breaks the build process
      const { minify } = await import("csso/dist/csso.esm");

      // Using CSSO for minification
      const options = {
        restructure: true, // Enable structural optimizations
        comments: false, // Remove comments
        debug: false, // Disable debug info
      };

      const result = minify(code, options);
      setMinifiedCode(result.css);
      calculateSavings(code, result.css);
      toast("CSS minified successfully", {
        description: "Your code has been minified and is ready to use.",
        duration: 2000,
      });
    } catch (err) {
      console.error("Minification error:", err);
      setError(
        `An error occurred while minifying the CSS code: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      toast.error("Minification failed", {
        description: "Please check your CSS syntax and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(minifiedCode).then(() => {
      setIsCopied(true);
      toast("Copied to clipboard", {
        description: "Minified CSS code copied to clipboard",
        duration: 2000,
      });
    });
  };

  const handleDownload = () => {
    const blob = new Blob([minifiedCode], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified.css";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast("CSS downloaded", {
      description: "Your minified CSS has been downloaded",
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
            <h3 className="font-medium">Original CSS:</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCode(sampleCssCode);
                  toast("Sample code loaded", {
                    description: "Sample CSS code has been loaded",
                    duration: 2000,
                  });
                }}
              >
                Load sample code
              </Button>
            </div>
          </div>

          <Editor
            height="400px"
            defaultLanguage="css"
            defaultValue="/* Write your CSS code here */"
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
              minimap: {
                enabled: false,
              },
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Minified CSS:</h3>
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
            defaultLanguage="css"
            defaultValue="/* Minified code will appear here */"
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
              minimap: {
                enabled: false,
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
          variant="brand"
          onClick={handleMinify}
          disabled={isLoading || !code}
          className="px-8"
        >
          <Text className="h-3 w-3 mr-1" />
          {isLoading ? "Minifying..." : "Minify CSS"}
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
        <h2 className="text-lg font-semibold mb-4">About CSS Minification</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Paste your CSS code into the editor on the left</li>
              <li>Click the &quot;Minify CSS&quot; button</li>
              <li>Copy or download your minified code from the right editor</li>
            </ol>
          </div>
          <div>
            <h3 className="font-medium mb-2">Benefits of CSS minification:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Reduced file size for faster page loading</li>
              <li>Lower bandwidth consumption</li>
              <li>Improved website performance</li>
              <li>Better user experience from faster style processing</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Note: CSS minification removes whitespace, comments, and unnecessary
            characters while optimizing and restructuring selectors and
            properties. The resulting code is not human-readable but functions
            exactly the same.
          </p>
        </div>
      </div>
    </div>
  );
}

const sampleCssCode = `/* Basic reset and typography */
html, body, div, span, h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, address, cite, code, em, img, small, strike, strong, sub, sup {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}

/* Main styling */
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
                 Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f9f9f9;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

/* Header styles */
.header {
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 8px;
}

/* Navigation */
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-list {
    display: flex;
    list-style: none;
}

.nav-item {
    margin-left: 1.5rem;
}

.nav-link {
    color: #555;
    text-decoration: none;
    transition: color 0.2s ease;
}

.nav-link:hover {
    color: #0070f3;
}

/* Main content area */
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

/* Cards */
.card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-content {
    padding: 1.5rem;
}

/* Media queries */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
    
    .nav {
        flex-direction: column;
        text-align: center;
    }
    
    .nav-list {
        margin-top: 1rem;
        justify-content: center;
    }
    
    .nav-item {
        margin: 0 0.75rem;
    }
}

/* Animation */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.fade-in {
    animation: fadeIn 0.5s ease-in;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}`;
