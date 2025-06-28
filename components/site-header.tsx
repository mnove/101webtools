"use client";

import { Github, SidebarIcon } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Badge } from "./ui/badge";

export function SiteHeaderTools() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b px-4">
      <div className="flex h-(--header-height) w-full items-center gap-2 ">
        {/* <p className="font-mono text-xl font-semibold">101webtools.com</p> */}
        <Link href="/" className="tracking-tighter text-xl font-bold">
          101webtools<span className="text-muted-foreground">.com</span>
        </Link>
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>

        <SearchForm className="w-full sm:ml-auto sm:w-auto text-nowrap" />
      </div>

      <div className="grow-0 items-center justify-end gap-2 hidden md:flex">
        <Button variant="ghost" asChild>
          <Link href="/about">About</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            href={siteConfig.feedbackUrls.toolRequestFormUrl}
            target="_blank"
          >
            <span className="pr-1">🎁</span> Request a Tool
          </Link>
        </Button>

        {/* <InstallButton /> */}
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>
    </header>
  );
}

export function SiteHeaderHome() {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b px-4">
      <div className="flex h-(--header-height) w-full items-center gap-2 ">
        {/* <p className="font-mono text-xl font-semibold">101webtools.com</p> */}

        <Link href="/" className="tracking-tighter text-xl font-bold">
          101webtools<span className="text-muted-foreground">.com</span>
        </Link>
        <Button
          className="h-8 w-8 block md:hidden"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <SearchForm className="w-full sm:ml-auto sm:w-auto text-nowrap" />
      </div>

      <div className="grow-0 items-center justify-end gap-2 hidden md:flex h-5">
        <Button variant="ghost" asChild>
          <Link href="/about">About</Link>
        </Button>

        <Button variant="ghost" asChild>
          <Link href="/pwa">
            Get the App <Badge>New</Badge>
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            href={siteConfig.feedbackUrls.toolRequestFormUrl}
            target="_blank"
          >
            <span className="pr-1">🎁</span> Request a Tool
          </Link>
        </Button>

        {/* <InstallButton /> */}
        <Separator orientation="vertical" />
        <Button variant="outline" asChild>
          <div>
            <Github className="h-4 w-4" />
            <Link href="https://github.com/mnove/101webtools" target="_blank">
              Github
            </Link>
          </div>
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}
