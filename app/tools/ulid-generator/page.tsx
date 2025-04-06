import ULIDGenerator from "@/components/layouts/ulid-generator";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="ulidGenerator" />
      <ULIDGenerator />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("ulidGenerator");
