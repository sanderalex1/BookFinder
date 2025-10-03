import { Link } from "react-router-dom";
import "../css/NavBar.css";
function NavBar({ key, resetHome }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Book App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" key={key} onClick={resetHome} className="nav-link">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
