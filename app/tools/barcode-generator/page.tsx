import BarcodeGenerator from "@/components/layouts/barcode-generator/barcode-generator";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="barcodeGenerator" />
      <BarcodeGenerator />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("barcodeGenerator");
