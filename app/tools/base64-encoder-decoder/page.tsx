import Base64EncoderDecoder from "@/components/layouts/base64-encoder-decoder/base64-encoder-decoder";
import ToolPageHeader from "@/components/tool-page-header";
import { generateToolMetadata } from "@/lib/generate-metadata";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="">
      <ToolPageHeader toolName="base64EncoderDecoder" />
      <Base64EncoderDecoder />
    </div>
  );
}

export const metadata: Metadata = generateToolMetadata("base64EncoderDecoder");
