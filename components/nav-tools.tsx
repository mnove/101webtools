"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavbarToolGroup } from "./app-sidebar";

export function NavTools({ tools }: { tools: NavbarToolGroup[] }) {
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
