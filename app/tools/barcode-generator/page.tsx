import BarcodeGenerator from "@/components/layouts/barcode-generator/barcode-generator";
import ToolPageHeader from "@/components/tool-page-header";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="barcodeGenerator" />
      <BarcodeGenerator />
    </div>
  );
}
