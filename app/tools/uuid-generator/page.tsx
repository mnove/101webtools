import UUIDGenerator from "@/components/layouts/uuid-generator";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="uuidGenerator" />
      <UUIDGenerator />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("uuidGenerator");
