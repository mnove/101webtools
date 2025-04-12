import SHA224Encrypt from "@/components/layouts/sha224-encrypt/sha224-encrypt";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="sha224Encrypt" />
      <SHA224Encrypt />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("sha224Encrypt");
