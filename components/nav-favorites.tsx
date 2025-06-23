import { getToolByName } from "@/lib/tools-data";
import { Star, XIcon } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "./favorites-context";
import { Button } from "./ui/button";
import { SidebarGroup, SidebarGroupLabel } from "./ui/sidebar";

export const NavFavorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Favorites</SidebarGroupLabel>
      <div>
        {favorites.length === 0 ? (
          <div className="text-muted-foreground text-sm px-2 py-1">
            No favorites yet
          </div>
        ) : (
          <ul>
            {favorites.map((fav) => (
              <li
                key={fav}
                className="px-2 py-0 text-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <Link
                    href={(getToolByName(fav)?.url as string) || ``}
                    className="flex items-center"
                  >
                    {getToolByName(fav)?.label}
                  </Link>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 text-red-500"
                  onClick={() => removeFavorite(fav)}
                >
                  <XIcon className="w-2 h-2" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SidebarGroup>
  );
};
