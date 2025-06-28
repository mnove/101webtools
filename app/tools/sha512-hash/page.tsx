import SHA512HashGenerator from "@/components/layouts/sha512-hash/sha512-hash";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div>
      <ToolPageHeader toolName="sha512HashGenerator" />
      <SHA512HashGenerator />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("sha512HashGenerator");
