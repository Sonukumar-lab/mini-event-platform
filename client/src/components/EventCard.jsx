import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <img
        src={`http://localhost:5000${event.image}`}

        alt={event.title}
      />

      <div className="event-card-body">
        <h3>{event.title}</h3>
        <p className="event-location">{event.location}</p>
        <p className="event-desc">
          {event.description.slice(0, 90)}...
        </p>

        <Link to={`/event/${event._id}`} className="btn-primary full-width">
          View Details
        </Link>
      </div>
    </div>
  );
}
