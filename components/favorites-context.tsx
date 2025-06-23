"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getFavorites, setFavorites } from "../lib/manage-favorites";

type FavoritesContextType = {
  favorites: string[];
  addFavorite: (toolName: string) => void;
  removeFavorite: (toolName: string) => void;
  isFavorite: (toolName: string) => boolean;
  setFavoritesList: (favorites: string[]) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavoritesState] = useState<string[]>([]);

  useEffect(() => {
    setFavoritesState(getFavorites());
  }, []);

  // Listen to localStorage changes from other tabs
  useEffect(() => {
    const handler = () => setFavoritesState(getFavorites());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const addFavorite = (toolName: string) => {
    setFavoritesState((prev) => {
      if (!prev.includes(toolName)) {
        const updated = [...prev, toolName];
        setFavorites(updated);
        return updated;
      }
      return prev;
    });
  };

  const removeFavorite = (toolName: string) => {
    setFavoritesState((prev) => {
      const updated = prev.filter((name) => name !== toolName);
      setFavorites(updated);
      return updated;
    });
  };

  const isFavorite = (toolName: string) => favorites.includes(toolName);

  const setFavoritesList = (favorites: string[]) => {
    setFavorites(favorites);
    setFavoritesState(favorites);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        setFavoritesList,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
