import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { SearchDialog } from "./site-search";

export function SearchForm({}: React.ComponentProps<"form">) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <a
        className="hidden md:flex gap-2 p-2 border rounded-md text-sm text-muted-foreground cursor-pointer hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground text-nowrap min-w-[250px] items-center justify-between"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="w-4 h-4 text-muted-foreground cursor-pointer grow-0" />{" "}
        <span className="grow">Search tools...</span>
        <span className="grow-0">⌘K</span>
      </a>

      <a onClick={() => setOpen(true)}>
        <SearchIcon className="md:hidden w-6 h-6 text-muted-foreground cursor-pointer" />
      </a>
      <SearchDialog open={open} setOpen={setOpen} />
    </div>
  );
}
