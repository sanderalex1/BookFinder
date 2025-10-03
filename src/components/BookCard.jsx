import "../css/BookCard.css";
import { useBookContext } from "../context/BookContext";

function BookCard({ book }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useBookContext();
  const favorite = isFavorite(book.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(book.id);
    else addToFavorites(book);
  }

  return (
    <div className="book-card">
      <div className="book-cover">
        <img
          src={
            book.cover || "https://via.placeholder.com/150x200?text=No+Cover"
          }
          alt={book.title}
          width="150"
        />
        <div className="book-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="book-info">
        <h2>{book.title}</h2>
        <h3>Author: {book.author}</h3>
        <p>{book.category}</p>
        <p>Language: {book.languages}</p>
        <p>Number of downloads: {book.download_count}</p>
        <a href={book.web_link}>Read</a>
      </div>
    </div>
  );
}

export default BookCard;
