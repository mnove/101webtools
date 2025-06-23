const FAVORITES_KEY = "favoriteTools";

/**
 * Get the list of favorite tool names from localStorage.
 */
export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Save the list of favorite tool names to localStorage.
 */
export function setFavorites(favorites: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
