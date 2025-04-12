import SHA1Encrypt from "@/components/layouts/sha1-encrypt/sha1-encrypt";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="sha1Encrypt" />
      <SHA1Encrypt />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("sha1Encrypt");
