import { useState } from "react";
import api from "../services/api";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    capacity: "",
    date: "",
    image: null,
  });

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key] !== null) {
        fd.append(key, form[key]);
      }
    });

    await api.post("/events", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Event Created");
  };

  return (
    <div className="create-event-card">
      <h2>Create Event</h2>

      <form onSubmit={submit} className="form-grid">
        <input
          placeholder="Title"
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Location"
          onChange={e => setForm({ ...form, location: e.target.value })}
        />

        <input
          type="datetime-local"
          onChange={e => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="number"
          placeholder="Capacity"
          onChange={e => setForm({ ...form, capacity: e.target.value })}
        />

        <textarea
          placeholder="Description"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="file"
          onChange={e => setForm({ ...form, image: e.target.files[0] })}
        />

        <button className="btn-primary full-width">
          Create Event
        </button>
      </form>
    </div>
  );
}
