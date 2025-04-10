import PasswordGenerator from "@/components/layouts/password-generator/password-generator";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="passwordGenerator" />
      <PasswordGenerator />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("passwordGenerator");
