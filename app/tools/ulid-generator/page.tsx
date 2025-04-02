import ULIDGenerator from "@/components/layouts/ulid-generator";
import ToolPageHeader from "@/components/tool-page-header";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="ulidGenerator" />
      <ULIDGenerator />
    </div>
  );
}
