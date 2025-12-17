import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/events").then(res => setEvents(res.data));
  }, []);

  /* SEARCH FILTER */
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="container">
      {/* HERO */}
      <section className="hero">
        <span className="hero-badge">Event Platform</span>
        <h1>Discover & Host Amazing Events</h1>
        <p>
          Create events, manage attendees and join experiences you love.
        </p>
      </section>

      {/* EVENTS */}
      <section className="events-section">
        <div className="events-header">
          <div>
            <h2 className="section-title">Upcoming Events</h2>
            <p className="empty-text">
              {filteredEvents.length} events available
            </p>
          </div>

          <input
            type="text"
            className="search-input"
            placeholder="Search events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {filteredEvents.length === 0 ? (
          <p className="empty-text">No events found</p>
        ) : (
          <div className="event-grid">
            {filteredEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
