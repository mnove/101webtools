import MD5Encrypt from "@/components/layouts/md5-encrypt/md5-encrypt";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="md5Encrypt" />
      <MD5Encrypt />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("md5Encrypt");
