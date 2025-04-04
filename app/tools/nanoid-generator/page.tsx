import NanoidGenerator from "@/components/layouts/nanoid-generator";
import ToolPageHeader from "@/components/tool-page-header";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="nanoidGenerator" />
      <NanoidGenerator />
    </div>
  );
}
