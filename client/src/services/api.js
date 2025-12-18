import axios from "axios";

const api = axios.create({
  baseURL: "https://mini-event-backend-ujlp.onrender.com/api",
});

// JWT token auto-attach
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
