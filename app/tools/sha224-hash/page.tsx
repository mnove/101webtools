import SHA224HashGenerator from "@/components/layouts/sha224-hash/sha224-hash";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div>
      <ToolPageHeader toolName="sha224HashGenerator" />
      <SHA224HashGenerator />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("sha224HashGenerator");
