import { useEffect, useState } from "react";

const FAVORITES_KEY = "warehouse_favorites";

function readFavorites() {
  const savedFavorites = localStorage.getItem(FAVORITES_KEY);

  if (!savedFavorites) {
    return [];
  }

  try {
    return JSON.parse(savedFavorites);
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => readFavorites());

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) => {
    return favorites.includes(Number(id));
  };

  const toggleFavorite = (id) => {
    const numericId = Number(id);

    if (favorites.includes(numericId)) {
      setFavorites(favorites.filter((itemId) => itemId !== numericId));
    } else {
      setFavorites([...favorites, numericId]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((itemId) => itemId !== Number(id)));
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
  };
}