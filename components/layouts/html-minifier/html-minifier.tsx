"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Editor from "@monaco-editor/react";
import { Clipboard, Code, Download, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function HtmlMinifier() {
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
      // Dynamically import html-minifier-terser only when needed
      //? Otherwise it breaks the build process
      const { minify } = await import(
        "html-minifier-terser/dist/htmlminifier.esm.bundle"
      );

      const minified = await minify(code, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        useShortDoctype: true,
      });

      setMinifiedCode(minified);
      calculateSavings(code, minified);
      toast("HTML minified successfully", {
        description: "Your HTML has been minified and is ready to use.",
        duration: 2000,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during minification"
      );
      toast.error("Minification failed", {
        description: "Please check your HTML syntax and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(minifiedCode).then(() => {
      setIsCopied(true);
      toast("Copied to clipboard", {
        description: "Minified HTML copied to clipboard",
        duration: 2000,
      });
    });
  };

  const handleDownload = () => {
    const blob = new Blob([minifiedCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast("HTML downloaded", {
      description: "Your minified HTML has been downloaded",
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
            <h3 className="font-medium">Original HTML:</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCode(sampleHtmlCode);
                toast("Sample code loaded", {
                  description: "Sample HTML code has been loaded",
                  duration: 2000,
                });
              }}
            >
              Load sample code
            </Button>
          </div>

          <Editor
            height="400px"
            defaultLanguage="html"
            defaultValue="<!-- Write your HTML code here -->"
            value={code}
            onChange={(value) => setCode(value || "")}
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
            <h3 className="font-medium">Minified HTML:</h3>
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
            defaultLanguage="html"
            defaultValue="<!-- Minified code will appear here -->"
            value={minifiedCode}
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
          <Code className="h-3 w-3 mr-1" />
          {isLoading ? "Minifying..." : "Minify HTML"}
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
        <h2 className="text-lg font-semibold mb-4">About HTML Minification</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Paste your HTML code into the editor on the left</li>
              <li>Click the &quot;Minify HTML&quot; button</li>
              <li>Copy or download your minified code from the right editor</li>
            </ol>
          </div>
          <div>
            <h3 className="font-medium mb-2">Benefits of minification:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Removes unnecessary whitespace and comments</li>
              <li>Reduces file size for faster page loading</li>
              <li>Optimizes embedded CSS and JavaScript</li>
              <li>Removes redundant HTML attributes</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Note: HTML minification preserves functionality while making your
            web pages more efficient by removing unnecessary characters without
            changing how the page renders.
          </p>
        </div>
      </div>
    </div>
  );
}

const sampleHtmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Page</title>
    <style>
        /* Some CSS comment */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
    </style>
</head>
<body>
    <!-- This is a comment that will be removed -->
    <div class="container">
        <h1>Hello World</h1>
        <p>This is a sample HTML document with some unnecessary whitespace and comments.</p>
        
        <div class="content">
            <h2>Features</h2>
            <ul>
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
            </ul>
        </div>
    </div>
    
    <script type="text/javascript">
        // This is a JavaScript comment
        console.log("Hello World!");
        
        function doSomething() {
            return "Something";
        }
    </script>
</body>
</html>`;
