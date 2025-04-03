"use client";

import * as React from "react";
import {
  Barcode,
  BookOpen,
  Bot,
  Command,
  Frame,
  IdCard,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { NavTools } from "./nav-tools";

export type NavbarTool = {
  name: string;
  url: string;
  icon: React.ComponentType<any>;
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
  tools: NavbarToolGroup[];
};

const data: NavbarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  tools: [
    {
      group: "ID Generators",
      items: [
        {
          name: "Nano ID Generator",
          url: "/tools/nanoid-generator",
          icon: IdCard,
        },
        {
          name: "UUID Generator",
          url: "/tools/uuid-generator",
          icon: IdCard,
        },
        {
          name: "ULID Generator",
          url: "/tools/ulid-generator",
          icon: IdCard,
        },
      ],
    },
    {
      group: "Code Generators",
      items: [
        {
          name: "Barcode Generator",
          url: "/tools/barcode-generator",
          icon: Barcode,
        },
      ],
    },

    {
      group: "Design Tools",
      items: [
        {
          name: "Typographic Scale Generator",
          url: "/tools/typescale-generator",
          icon: BookOpen,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {" "}
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavTools tools={data.tools} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
