import QrcodeGenerator from "@/components/layouts/qrcode-generator/qrcode-generator";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="qrcodeGenerator" />
      <QrcodeGenerator />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("qrcodeGenerator");
