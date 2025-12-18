import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  // image URL fix
  const imageUrl =
    event.image && event.image.startsWith("http")
      ? event.image
      : null;

  return (
    <div className="event-card">
      {imageUrl ? (
        <img src={imageUrl} alt={event.title} />
      ) : (
        <div
          style={{
            height: "180px",
            background: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
            fontSize: "14px",
          }}
        >
          No Image
        </div>
      )}

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
