import SHA256Encrypt from "@/components/layouts/sha256-encrypt/sha256-encrypt";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="sha256Encrypt" />
      <SHA256Encrypt />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("sha256Encrypt");
