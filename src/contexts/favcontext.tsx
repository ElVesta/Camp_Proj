import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  rentDays: number;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: Omit<FavoriteItem, 'quantity' | 'rentDays'>, quantity?: number, rentDays?: number) => void;
  removeFromFavorites: (id: number) => void;
  updateFavoriteQuantity: (id: number, quantity: number) => void;
  updateFavoriteRentDays: (id: number, rentDays: number) => void;
  isFavorite: (id: number) => boolean;
  totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'camp_favorites';

const loadFavorites = (): FavoriteItem[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(loadFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: Omit<FavoriteItem, 'quantity' | 'rentDays'>, quantity = 1, rentDays = 1) => {
    setFavorites(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id 
            ? { ...i, quantity: i.quantity + quantity, rentDays }
            : i
        );
      }
      return [...prev, { ...item, quantity, rentDays }];
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const updateFavoriteQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromFavorites(id);
      return;
    }
    setFavorites(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const updateFavoriteRentDays = (id: number, rentDays: number) => {
    setFavorites(prev =>
      prev.map(item => (item.id === id ? { ...item, rentDays } : item))
    );
  };

  const isFavorite = (id: number) => {
    return favorites.some(item => item.id === id);
  };

  const totalFavorites = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        updateFavoriteQuantity,
        updateFavoriteRentDays,
        isFavorite,
        totalFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};