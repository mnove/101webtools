import SHA1HashGenerator from "@/components/layouts/sha1-hash/sha1-hash";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div>
      <ToolPageHeader toolName="sha1HashGenerator" />
      <SHA1HashGenerator />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("sha1HashGenerator");
