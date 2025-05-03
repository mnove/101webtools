import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./ui/command";
import { toolsData } from "@/lib/tools-data";

interface SearchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SearchDialog({ open, setOpen }: SearchDialogProps) {
  const [searchValue, setSearchValue] = useState("");

  // Group tools by category
  const toolsByCategory = Object.values(toolsData).reduce<
    Record<string, (typeof toolsData)[keyof typeof toolsData][]>
  >((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {});

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search a tool..."
        value={searchValue}
        onValueChange={setSearchValue}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {Object.entries(toolsByCategory).map(([category, tools]) => (
          <CommandGroup key={category} heading={category.replace("_", " ")}>
            {tools.map((tool) => (
              <CommandItem key={tool.label}>
                <a href={tool.url} className="flex items-center">
                  <tool.icon className="mr-2" />
                  {tool.label}
                </a>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
