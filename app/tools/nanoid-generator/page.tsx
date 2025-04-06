import NanoidGenerator from "@/components/layouts/nanoid-generator";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="nanoidGenerator" />
      <NanoidGenerator />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("nanoidGenerator");
