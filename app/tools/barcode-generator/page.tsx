import BarcodeGenerator from "@/components/layouts/barcode-generator";
import ToolPageHeader from "@/components/tool-page-header";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="container mx-auto max-w-4xl">
      <ToolPageHeader toolName="barcodeGenerator" />
      <BarcodeGenerator />
    </div>
  );
}
