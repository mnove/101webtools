import SHA384HashGenerator from "@/components/layouts/sha384-hash/sha384-hash";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div>
      <ToolPageHeader toolName="sha384HashGenerator" />
      <SHA384HashGenerator />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("sha384HashGenerator");
