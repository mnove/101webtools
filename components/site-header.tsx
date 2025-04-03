"use client";

import { Gift, SidebarIcon, Star } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b px-4">
      <div className="flex h-(--header-height) w-full items-center gap-2 ">
        {/* <p className="font-mono text-xl font-semibold">101webtools.com</p> */}
        <p className="tracking-tighter text-2xl font-bold">
          101webtools<span className="text-muted-foreground">.com</span>
        </p>
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grow-0 flex items-center justify-end gap-2">
        <Button variant="outline">
          {" "}
          <Star className="text-brand" /> Upgrade to Pro
        </Button>
        <Button variant="link">Sign up</Button>
        <SearchForm className="w-full sm:ml-auto sm:w-auto text-nowrap" />
      </div>
    </header>
  );
}
