import SHA256HashGenerator from "@/components/layouts/sha256-hash/sha256-hash";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div>
      <ToolPageHeader toolName="sha256HashGenerator" />
      <SHA256HashGenerator />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("sha256HashGenerator");
