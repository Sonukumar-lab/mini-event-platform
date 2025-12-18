import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  /* ---------- FETCH EVENT ---------- */
  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    } catch {
      alert("Event not found");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) return <p className="container">Loading event...</p>;
  if (!event) return null;

  /* ---------- LOGIC ---------- */
  const isCreator =
    event.createdBy === userId ||
    event.createdBy?._id === userId;

  const isJoined = event.attendees.some(
    a => a.user?._id === userId
  );

  const isFull = event.attendees.length >= event.capacity;

  /* ---------- DATE FORMAT FIX ---------- */
  const formatDate = (dateStr) => {
    if (!dateStr) return "Date not available";
    const d = new Date(dateStr);
    if (isNaN(d)) return "Date not available";

    return d.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  };

  const eventDate = formatDate(event.date);

  /* ---------- RSVP ---------- */
  const joinEvent = async () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Enter valid 10 digit mobile number");
      return;
    }


    try {
      setJoining(true);
      await api.post(`/rsvp/join/${id}`, { phone });
      setShowModal(false);
      setPhone("");
      await fetchEvent();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to join");
    } finally {
      setJoining(false);
    }
  };

  const leaveEvent = async () => {
    try {
      await api.post(`/rsvp/leave/${id}`);
      await fetchEvent();
    } catch {
      alert("Unable to leave event");
    }
  };

  /* ---------- DELETE ---------- */
  const deleteEvent = async () => {
    if (!window.confirm("Delete this event permanently?")) return;
    await api.delete(`/events/${id}`);
    navigate("/");
  };

  /* ---------- UI ---------- */
  return (
    <div className="container event-detail-page">
      {/* IMAGE */}
      {event.image ? (
        <div className="detail-image-wrapper">
          <img
            src={
              event.image.startsWith("http")
                ? event.image
                : null
            }
            className="detail-img"
            alt={event.title}
          />
        </div>
      ) : (
        <div
          style={{
            height: "350px",
            background: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
            fontSize: "14px",
          }}
        >
          No Image Available
        </div>
      )}

      {/* HEADER */}
      <div className="event-detail-header">
        <h1>{event.title}</h1>
        <p className="event-meta">
          📍 {event.location} &nbsp; | &nbsp; 🗓 {eventDate}
        </p>
      </div>

      {/* DESCRIPTION */}
      <p className="event-description">{event.description}</p>

      {/* STATS */}
      <div className="event-stats">
        <div>
          <span>Capacity</span>
          <b>{event.capacity}</b>
        </div>
        <div>
          <span>Joined</span>
          <b>{event.attendees.length}</b>
        </div>
      </div>

      {/* ACTIONS */}
      {!isCreator && (
        <>
          {isJoined ? (
            <button className="btn-danger" onClick={leaveEvent}>
              Leave Event
            </button>
          ) : (
            <button
              className="btn-primary"
              disabled={isFull}
              onClick={() => setShowModal(true)}
            >
              {isFull ? "Event Full" : "Join Event"}
            </button>
          )}
        </>
      )}

      {/* JOIN MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Enter Phone Number</h3>

            <input
              type="tel"
              placeholder="Mobile number"
              maxLength={10}
              value={phone}
              onChange={e =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
            />


            <div className="modal-actions">
              <button
                className="btn-outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={joinEvent}
                disabled={joining || phone.length !== 10}
              >

                {joining ? "Joining..." : "OK"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATOR ACTIONS */}
      {isCreator && (
        <div className="creator-actions">
          <button
            className="btn-outline"
            onClick={() => navigate(`/events/edit/${id}`)}
          >
            Edit Event
          </button>
          <button className="btn-danger" onClick={deleteEvent}>
            Delete Event
          </button>
        </div>
      )}

      <hr />

      {/* ATTENDEES */}
      <h3>Attendees</h3>

      {event.attendees.length === 0 && (
        <p className="empty-text">No attendees yet</p>
      )}

      <div className="attendee-list">
        {event.attendees.map((a, i) => (
          <div key={i} className="attendee-card">
            <div className="avatar">
              {a.user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className="attendee-name">{a.user?.name}</p>
              <p className="attendee-phone">{a.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
