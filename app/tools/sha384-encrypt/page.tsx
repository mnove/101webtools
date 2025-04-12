import SHA384Encrypt from "@/components/layouts/sha384-encrypt/sha384-encrypt";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="sha384Encrypt" />
      <SHA384Encrypt />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("sha384Encrypt");
