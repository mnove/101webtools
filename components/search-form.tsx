import { Search, SearchIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";
import { SearchDialog } from "./site-search";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <a
        className="hidden md:flex gap-2 p-2 border rounded-md text-sm text-muted-foreground cursor-pointer hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground text-nowrap min-w-[250px] items-center"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="w-4 h-4 text-muted-foreground cursor-pointer" />{" "}
        Search tools...
      </a>

      <a onClick={() => setOpen(true)}>
        <SearchIcon className="md:hidden w-6 h-6 text-muted-foreground cursor-pointer" />
      </a>
      <SearchDialog open={open} setOpen={setOpen} />
    </div>
  );
}
