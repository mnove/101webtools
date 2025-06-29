import JsonViewerTool from "@/components/layouts/json-viewer/json-viewer";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="jsonViewer" />
      <JsonViewerTool />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("jsonViewer");
