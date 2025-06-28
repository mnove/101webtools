import MD5HashGenerator from "@/components/layouts/md5-hash/md5-hash";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div>
      <ToolPageHeader toolName="md5HashGenerator" />
      <MD5HashGenerator />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("md5HashGenerator");
