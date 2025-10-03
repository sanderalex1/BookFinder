import { useState, useEffect } from "react";
import "./css/App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import { BookProvider } from "./context/BookContext";

function App() {
  const [key, setKey] = useState(0);

  const resetHome = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <BookProvider>
      <NavBar resetHome={resetHome} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home key={key} />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </BookProvider>
  );
}

export default App;
