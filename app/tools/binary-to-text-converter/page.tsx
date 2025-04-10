import BinaryToTextConverter from "@/components/layouts/binary-to-text-converter/binary-to-text-converter";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="binaryToTextConverter" />
      <BinaryToTextConverter />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("binaryToTextConverter");
