import CSSMinifier from "@/components/layouts/css-minifier/css-minifier";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="cssMinifier" />
      <CSSMinifier />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("cssMinifier");
