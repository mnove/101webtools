"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { toolsData, ToolsData } from "@/lib/tools-data";
import * as React from "react";
import { ModeToggle } from "./mode-toggle";
import { NavFavorites } from "./nav-favorites";
import { NavTools } from "./nav-tools";

export type NavbarTool = {
  name: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type NavbarToolGroup = {
  group: string;
  items: NavbarTool[];
};

export type NavbarData = {
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
  // tools: NavbarToolGroup[];
  tools: ToolsData;
};

const data: NavbarData = {
  tools: toolsData,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader className="p-0">
        <SidebarMenu>
          <SidebarMenuItem></SidebarMenuItem>
        </SidebarMenu>
        <NavFavorites />
      </SidebarHeader>
      <SidebarContent>
        <NavTools toolsData={data.tools} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
        {/* <NavUser user={data.user} /> */}
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
