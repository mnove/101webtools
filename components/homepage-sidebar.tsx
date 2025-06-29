"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ToolsData, toolsData } from "@/lib/tools-data";
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
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  tools: ToolsData;
};

const data: NavbarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  tools: toolsData,
};

export function HomepageSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>ss </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavTools toolsData={data.tools} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
