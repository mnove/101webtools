"use client";

import { Button } from "@/components/ui/button";
import { JsonViewer } from "@/components/ui/json-tree-viewer";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import Editor from "@monaco-editor/react";
import { Clipboard, Code, Download, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function JsonViewerTool() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [formattedJson, setFormattedJson] = useState("");

  // Debounce the JSON input to avoid overwhelming the parser
  const [_debouncedJsonInput] = useDebounceValue(jsonInput, 500, {
    onDebounce: (value) => {
      if (value.trim()) {
        handleParseJson(value);
      } else {
        // Clear everything if input is empty
        setParsedJson(null);
        setFormattedJson("");
        setError("");
      }
    },
  });

  const handleParseJson = (input: string) => {
    setError("");
    setIsCopied(false);

    try {
      const parsed = JSON.parse(input);
      setParsedJson(parsed);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormattedJson(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format");
      setParsedJson(null);
      setFormattedJson("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson).then(() => {
      setIsCopied(true);
      toast("Copied to clipboard", {
        description: "Formatted JSON copied to clipboard",
        duration: 2000,
      });
    });
  };

  const handleDownload = () => {
    const blob = new Blob([formattedJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast("JSON downloaded", {
      description: "Your formatted JSON has been downloaded",
      duration: 2000,
    });
  };

  const handleReset = () => {
    setJsonInput("");
    setParsedJson(null);
    setFormattedJson("");
    setError("");
    setIsCopied(false);
    toast("Reset complete", {
      description: "All content has been cleared",
      duration: 2000,
    });
  };

  const handleFormat = () => {
    if (parsedJson !== null) {
      const formatted = JSON.stringify(parsedJson, null, 2);
      setJsonInput(formatted);
      setFormattedJson(formatted);
      toast("JSON formatted", {
        description: "Your JSON has been formatted with proper indentation",
        duration: 2000,
      });
    }
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
            <h3 className="font-medium">JSON Input:</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setJsonInput(sampleJsonData);
                toast("Sample JSON loaded", {
                  description: "Sample JSON data has been loaded",
                  duration: 2000,
                });
              }}
            >
              Load sample data
            </Button>
          </div>

          <Editor
            height="800px"
            defaultLanguage="json"
            defaultValue=""
            value={jsonInput}
            onChange={(value) => setJsonInput(value || "")}
            theme="vs-dark"
            options={{
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: "on",
              minimap: { enabled: false },
              formatOnPaste: true,
              formatOnType: true,
            }}
          />

          {error && (
            <div className="text-red-500 text-sm mt-1">Error: {error}</div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Tree View:</h3>
            <div className="flex gap-2">
              {parsedJson && (
                <Button variant="outline" size="sm" onClick={handleFormat}>
                  <Code className="h-3 w-3 mr-1" />
                  Format
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!formattedJson || isCopied}
              >
                <Clipboard className="h-3 w-3 mr-1" />
                {isCopied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={!formattedJson}
              >
                <Download className="h-3 w-3 mr-1" /> Download
              </Button>
            </div>
          </div>

          <div className="h-[800px] border rounded-md p-4 bg-background overflow-auto">
            {parsedJson !== null ? (
              <JsonViewer
                data={parsedJson}
                rootName="json"
                defaultExpanded={true}
              />
            ) : (
              <div className="text-muted-foreground text-center py-8">
                {jsonInput.trim()
                  ? error
                    ? "Invalid JSON - check syntax"
                    : "Parsing JSON..."
                  : "Start typing JSON to view the tree structure"}
              </div>
            )}
          </div>
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
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">About JSON Viewer</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Paste or type your JSON data into the editor on the left</li>
              <li>
                The JSON will be automatically parsed and displayed in the tree
                view
              </li>
              <li>Explore the tree structure on the right</li>
              <li>Use the Format button to beautify your JSON</li>
              <li>Copy or download the formatted JSON</li>
            </ol>
          </div>
          <div>
            <h3 className="font-medium mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Real-time JSON parsing with debounced input</li>
              <li>Interactive tree view with expand/collapse functionality</li>
              <li>JSON validation with error reporting</li>
              <li>Copy individual values or entire objects</li>
              <li>JSON formatting and beautification</li>
              <li>Syntax highlighting in the editor</li>
              <li>Download formatted JSON as a file</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            This tool helps you visualize, validate, and format JSON data in
            real-time. The tree view makes it easy to explore complex nested
            structures and understand the data hierarchy at a glance.
          </p>
        </div>
      </div>
    </div>
  );
}

const sampleJsonData = `{
  "name": "John Doe",
  "age": 30,
  "isEmployee": true,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001",
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  },
  "phoneNumbers": [
    {
      "type": "home",
      "number": "555-1234"
    },
    {
      "type": "work",
      "number": "555-5678"
    }
  ],
  "skills": ["JavaScript", "React", "Node.js", "TypeScript"],
  "projects": [
    {
      "id": 1,
      "name": "E-commerce Website",
      "status": "completed",
      "technologies": ["React", "Express", "MongoDB"],
      "startDate": "2023-01-15",
      "endDate": "2023-06-30"
    },
    {
      "id": 2,
      "name": "Mobile App",
      "status": "in-progress",
      "technologies": ["React Native", "Firebase"],
      "startDate": "2023-07-01",
      "endDate": null
    }
  ],
  "preferences": {
    "theme": "dark",
    "notifications": {
      "email": true,
      "push": false,
      "sms": true
    },
    "privacy": {
      "profileVisible": true,
      "showEmail": false
    }
  }
}`;
