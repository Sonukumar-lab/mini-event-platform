# Mini Event Platform (MERN Stack)

## Project Overview

This is a full-stack **Mini Event Platform** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. The application allows users to create events, browse upcoming events, upload event images, and RSVP (join/leave) events while strictly enforcing capacity limits and core business rules.

The project is fully deployed and publicly accessible, following real-world full-stack development practices.  
It was developed as part of a **Full Stack Developer Intern**.

---

## Live Deployment

* **Frontend (React – Vercel):** https://mini-event-app.vercel.app  
* **Backend (Node/Express – Render):** https://mini-event-backend-ujlp.onrender.com/api  
* **Database:** MongoDB Atlas  

---

## Tech Stack

### Frontend

* React.js (Vite)
* React Router DOM
* Axios
* Custom CSS (Responsive Design)
* Deployment: Vercel

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Multer
* Cloudinary
* Deployment: Render

---

## Authentication & Security

* User Sign Up & Login implemented using **JWT (JSON Web Tokens)**
* Protected routes for authenticated users
* Only event creators can edit or delete their own events
* Secure access control enforced on backend APIs

---

## Event Management Features

Authenticated users can:

* Create events with:
  * Title
  * Description
  * Date & Time
  * Location
  * Capacity
  * Image Upload (Cloudinary)
* View all upcoming events
* View detailed event pages
* Edit or delete only events created by them

---

## RSVP Capacity & Concurrency Handling

To prevent overbooking during simultaneous RSVP requests, the backend uses
atomic MongoDB update operations.

- The event document stores an array of attendee user IDs.
- RSVP requests use conditional queries to ensure:
  - The user is not already in the attendee list.
  - The current attendee count is less than the event capacity.

MongoDB's atomic update guarantees that only one request can succeed when
capacity is nearly full, preventing race conditions.

This ensures:
- No duplicate RSVPs
- No capacity overflow
- Concurrency-safe event joining

---

## Image Upload & Media Handling

* Event images are uploaded using **Multer**
* Images are stored securely on **Cloudinary**
* Images render correctly in production
* Scalable and production-ready media handling

---

## Responsive UI

* Fully responsive layout
* Optimized for Desktop, Tablet, and Mobile screens
* Clean and user-friendly interface
* Consistent event card layout and image scaling

---

## Optional Enhancements Implemented

### Search & Filter

* Search events by title
* Filter events by date (upcoming)

### Dark Mode

* Light/Dark theme toggle
* Theme preference stored in `localStorage`
* Smooth UI transition between themes

---

## Project Structure

```
mini-event-platform/
├── client
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ ├── services
│ │ └── context
│ └── package.json
│
├── server
│ ├── config
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── routes
│ ├── server.js
│ └── package.json
│
└── README.md
```

## Local Setup Instructions

### Clone Repository

```bash
git clone https://github.com/Sonukumar-lab/mini-event-platform
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

---

## Features Summary

* JWT Authentication
* Event CRUD Operations
* Image Upload with Cloudinary
* RSVP Join / Leave System
* Capacity Enforcement
* Concurrency‑safe backend logic
* Responsive UI
* Search & Filter
* Dark Mode
* Cloud Deployment (Vercel + Render)
* MongoDB Atlas Integration

---

## Author

Developed by **Sonu Kumar**
Full Stack Developer Intern Candidate

GitHub: https://github.com/Sonukumar-lab
