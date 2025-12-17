import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    capacity: "",
    date: ""
  });

  useEffect(() => {
    api.get(`/events/${id}`).then(res => {
      const e = res.data;
      setForm({
        title: e.title,
        description: e.description,
        location: e.location,
        capacity: e.capacity,
        date: e.date ? new Date(e.date).toISOString().slice(0, 16) : ""

      });
    });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();
    await api.put(`/events/${id}`, form);
    navigate(`/events/${id}`);
  };

  return (
  <div className="form-page">
    <form onSubmit={submit} className="event-form-card">
      <h2>Edit Event</h2>
      <p className="form-subtitle">Update your event details</p>

      <label>Title</label>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Event title"
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Event description"
      />

      <label>Location</label>
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Event location"
      />

      <label>Capacity</label>
      <input
        type="number"
        name="capacity"
        value={form.capacity}
        onChange={handleChange}
      />

      <label>Date & Time</label>
      <input
        type="datetime-local"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <button className="btn-primary full-btn">
        Update Event
      </button>
    </form>
  </div>
);

}
