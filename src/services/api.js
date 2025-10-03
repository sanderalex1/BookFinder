const BASE_URL = "https://gutendex.com/books/";

export const getBooksList = async () => {
  const response = await fetch(`${BASE_URL}`);
  const data = await response.json();
  return data.results.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.authors.map((a) => a.name).join(", "),
    cover: book.formats["image/jpeg"] || null,
    category: book.bookshelves.length
      ? book.bookshelves[1]
      : book.subjects[0] || "Uncategorized",
    languages: book.languages,
    download_count: book.download_count,
    web_link:
      book.formats["text/html; charset=utf-8"] ||
      book.formats["text/html; charset=iso-8859-1"] ||
      book.formats["text/html"],
  }));
};

export const searchBooksList = async (query) => {
  const response = await fetch(
    `${BASE_URL}?search=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.authors.map((a) => a.name).join(", "),
    cover: book.formats["image/jpeg"] || null,
    category: book.bookshelves.length
      ? book.bookshelves[1]
      : book.subjects[0] || "Uncategorized",
    languages: book.languages,
    download_count: book.download_count,
    web_link:
      book.formats["text/html; charset=utf-8"] ||
      book.formats["text/html; charset=iso-8859-1"] ||
      book.formats["text/html"],
  }));
};
