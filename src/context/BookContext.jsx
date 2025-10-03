import { createContext, useState, useContext, useEffect } from "react";

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []); //store an array of favorite books in a local storage as a JSON and convert it back to JS object

  useEffect(() => {
    localStorage.setItem(`favorites`, JSON.stringify(favorites));
  }, [favorites]); //anytime the "favorites" state changes we update what we store in local storage

  const addToFavorites = (book) => {
    setFavorites((prev) => [...prev, book]);
  };

  const removeFromFavorites = (bookId) => {
    setFavorites((prev) => prev.filter((book) => book.id !== bookId));
  };

  const isFavorite = (bookId) => {
    return favorites.some((book) => book.id === bookId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
