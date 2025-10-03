import { useState, useEffect } from "react";
import { searchBooksList, getBooksList } from "../services/api";
import BookCard from "../components/BookCard";
import "../css/Home.css";
import useDebounce from "../hooks/useDebounce";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 1000);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooksList = async () => {
      try {
        const BooksList = await getBooksList();
        setBooks(BooksList);
      } catch (err) {
        console.log(err);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    loadBooksList();
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    const searchBooks = async () => {
      setLoading(true);
      try {
        const results = await searchBooksList(debouncedQuery);
        setBooks(results);
        setError(results.length === 0 ? "Couldn't find this book" : null);
      } catch (err) {
        setError("Failed to search books...");
      } finally {
        setLoading(false);
      }
    };

    searchBooks();
  }, [debouncedQuery]);

  return (
    <div className="home">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <input
          type="text"
          placeholder="Search for books..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </form>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
