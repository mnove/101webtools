"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ToolsData } from "@/lib/tools-data";
import { Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFavorites } from "./favorites-context";
import { Button } from "./ui/button";

// Define a processed group type for our sidebar navigation
type ProcessedGroup = {
  group: string;
  items: {
    id: string;
    name: string;
    url: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
};

type NavToolItemProps = {
  item: {
    id: string;
    name: string;
    url: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
  isFavorite: (id: string) => boolean;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
};

function NavToolItem({
  item,
  isFavorite,
  addFavorite,
  removeFavorite,
}: NavToolItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SidebarMenuItem
      key={item.name}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SidebarMenuButton asChild>
        <Link
          href={item.url}
          className="flex items-center gap-2 justify-between relative"
        >
          <div className="flex items-center gap-2 flex-1">
            <item.icon />
            <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
              {item.name}
            </span>
          </div>

          {isHovered && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Button
                variant="secondary"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.preventDefault();
                  if (isFavorite(item.id)) {
                    removeFavorite(item.id);
                  } else {
                    addFavorite(item.id);
                  }
                }}
              >
                <Star
                  className={`w-3 h-3 ${
                    isFavorite(item.id)
                      ? "text-yellow-500"
                      : "text-muted-foreground"
                  }`}
                />
              </Button>
            </div>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

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
        id: _key,
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

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {tools.map((toolGroup) => (
        <div key={toolGroup.group} className="mt-4">
          <SidebarGroupLabel>{toolGroup.group}</SidebarGroupLabel>
          <SidebarMenu>
            {toolGroup.items.map((item) => (
              <NavToolItem
                key={item.name}
                item={item}
                isFavorite={isFavorite}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
              />
            ))}
          </SidebarMenu>
        </div>
      ))}
    </SidebarGroup>
  );
}
