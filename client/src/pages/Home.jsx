import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-wrapper">

      {/* ================= HERO SECTION ================= */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1>
            Manage & Discover <span>Events</span> Easily
          </h1>

          <p>
            MiniEvent is a simple and powerful platform to create, manage,
            and attend events — all in one place.
          </p>

          <div className="home-hero-actions">
            {user ? (
              <Link to="/dashboard" className="btn-primary">
                Explore Events
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-outline">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="home-features">
        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Create Events</h3>
          <p>
            Create events with images, date, location, and capacity
            in just a few clicks.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎟️</div>
          <h3>RSVP & Attend</h3>
          <p>
            Join events easily, track attendees, and manage participation
            securely.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔐</div>
          <h3>Secure Platform</h3>
          <p>
            Authentication protected system with role-based access
            and secure APIs.
          </p>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      {!user && (
        <section className="home-cta">
          <h2>Start Managing Events Today</h2>
          <p>
            Register now and experience a simple, fast, and modern
            event management platform.
          </p>
          <Link to="/register" className="btn-primary">
            Create Free Account
          </Link>
        </section>
      )}
    </div>
  );
}
