"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ToolsData } from "@/lib/tools-data";
import Link from "next/link";

// Define a processed group type for our sidebar navigation
type ProcessedGroup = {
  group: string;
  items: {
    name: string;
    url: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
};

export function NavTools({ toolsData }: { toolsData: ToolsData }) {
  // Process toolsData into formatted groups for rendering
  const processToolsData = (): ProcessedGroup[] => {
    // Group by category
    const groupedTools: Record<string, ProcessedGroup["items"]> = {};

    // Process each tool
    Object.entries(toolsData).forEach(([_key, tool]) => {
      // Format category name by replacing underscores with spaces
      const categoryName = tool.category.replace(/_/g, " ");

      // Initialize category if it doesn't exist
      if (!groupedTools[categoryName]) {
        groupedTools[categoryName] = [];
      }

      // Add tool to its category
      groupedTools[categoryName].push({
        name: tool.label,
        url: tool.url,
        icon: tool.icon,
      });
    });

    // Convert to array and sort everything
    return (
      Object.entries(groupedTools)
        .map(([group, items]) => ({
          group,
          // Sort tools alphabetically by name
          items: items.sort((a, b) => a.name.localeCompare(b.name)),
        }))
        // Sort groups alphabetically
        .sort((a, b) => a.group.localeCompare(b.group))
    );
  };

  const tools = processToolsData();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {tools.map((toolGroup) => (
        <div key={toolGroup.group}>
          <SidebarGroupLabel>{toolGroup.group}</SidebarGroupLabel>
          <SidebarMenu>
            {toolGroup.items.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      ))}
    </SidebarGroup>
  );
}
