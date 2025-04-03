import NanoidGenerator from "@/components/layouts/nanoid-generator";
import ToolPageHeader from "@/components/tool-page-header";

export default function Page() {
  return (
    <div className="container mx-auto max-w-4xl">
      <ToolPageHeader toolName="nanoidGenerator" />
      <NanoidGenerator />
    </div>
  );
}
