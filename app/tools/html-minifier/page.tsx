import HTMLMinifier from "@/components/layouts/html-minifier/html-minifier";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="htmlMinifier" />
      <HTMLMinifier />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("htmlMinifier");
