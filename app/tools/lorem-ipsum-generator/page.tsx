import LoremIpsumGenerator from "@/components/layouts/lorem-ipsum-generator/lorem-ipsum-generator";
import ToolPageHeader from "@/components/tool-page-header";
import { getToolByName } from "@/lib/tools-data";
import { Metadata } from "next";

const tool = getToolByName("loremIpsumGenerator");

export const metadata: Metadata = {
  title: `${tool?.label} - 101 Web Tools`,
  description: tool?.description,
};

export default function LoremIpsumGeneratorPage() {
  return (
    <div>
      <ToolPageHeader toolName="loremIpsumGenerator" />
      <LoremIpsumGenerator />
    </div>
  );
}
