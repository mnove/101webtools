import SHA512Encrypt from "@/components/layouts/sha512-encrypt/sha512-encrypt";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="sha512Encrypt" />
      <SHA512Encrypt />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("sha512Encrypt");
