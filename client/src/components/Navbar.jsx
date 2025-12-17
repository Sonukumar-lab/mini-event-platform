import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ dark, setDark }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">MiniEvent</Link>

        <nav className="nav-actions">
          {/*  DARK MODE BUTTON */}
          <button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
            title="Toggle theme"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

          {user ? (
            <>
              <Link to="/" className="nav-link">Events</Link>
              <Link to="/create" className="btn-primary">
                Create Event
              </Link>
              <button onClick={logout} className="btn-danger">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
