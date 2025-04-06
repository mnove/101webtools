import TypeScaleGenerator from "@/components/layouts/typescale-generator/typescale-generator";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="container mx-auto max-w-[100rem]">
      <ToolPageHeader toolName="typescaleGenerator" />
      <TypeScaleGenerator />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("typescaleGenerator");
