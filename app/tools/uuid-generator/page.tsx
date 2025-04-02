import NanoidGenerator from "@/components/layouts/nanoid-generator";
import UUIDGenerator from "@/components/layouts/uuid-generator";
import ToolPageHeader from "@/components/tool-page-header";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="uuidGenerator" />
      <UUIDGenerator />
    </div>
  );
}
