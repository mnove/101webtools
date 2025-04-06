// util function to generate metadata for a page

import { Metadata } from "next";
import { toolsData } from "@/lib/tools-data";

export function generateToolMetadata(toolName: string): Metadata {
  const tool = toolsData[toolName];

  if (!tool) {
    throw new Error(`Tool with name ${toolName} not found`);
  }

  return {
    title: tool.label,
    description: tool.description,
    keywords: tool.badges,
    // openGraph: {
    //   title: tool.label,
    //   description: tool.description,
    //   url: `/tools/${toolName}`,
    //   siteName: "Tools",
    //   images: [
    //     {
    //       url: `/images/tools/${toolName}.png`,
    //       width: 800,
    //       height: 600,
    //       alt: tool.label,
    //     },
    //   ],
    // },
  };
}
