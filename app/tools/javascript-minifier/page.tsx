import JavascriptMinifier from "@/components/layouts/javascript-minifier/javascript-minifier";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="javascriptMinifier" />
      <JavascriptMinifier />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("javascriptMinifier");
