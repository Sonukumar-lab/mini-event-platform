# Mini Event Platform (MERN Stack)

## Project Overview

This is a full‑stack **Mini Event Platform** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. The application allows users to create events, view upcoming events, and RSVP (join/leave) events while strictly enforcing capacity limits and handling concurrent requests safely.

The project was developed as part of the **Full Stack Developer Intern – Technical Screening Assignment**.

---

## Live Deployment

* **Frontend (React):** <YOUR_FRONTEND_URL>
* **Backend (Node/Express):** <YOUR_BACKEND_URL>
* **Database:** MongoDB Atlas

---

##  Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS (Responsive Design)

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication

---

## Authentication & Security

* User Sign Up & Login implemented using **JWT (JSON Web Tokens)**
* Protected routes for creating, editing, deleting events
* Only event creators can edit or delete their own events

---

##  Event Management Features

Authenticated users can:

* Create events with:

  * Title
  * Description
  * Date & Time
  * Location
  * Capacity
  * Image Upload
* View all upcoming events on the dashboard
* Edit/Delete only events created by them
* View full event details with image and attendee list

---

## RSVP System (Capacity & Concurrency Handling)

### Business Rules Implemented

* A user can join an event only once
* Event creators cannot RSVP to their own events
* Event capacity is strictly enforced
* Overbooking is prevented even under concurrent requests

### Concurrency Solution (Important)

To prevent race conditions (e.g., multiple users trying to join the last available slot), an **atomic MongoDB update** is used:

* `findOneAndUpdate()`
* `$expr` with `$size` to check current attendees count
* `$push` to add attendee in the same operation

This ensures that capacity validation and RSVP insertion happen in **one single atomic database operation**, making the system concurrency‑safe.

---

## Responsive UI

* Fully responsive layout
* Optimized for Desktop, Tablet, and Mobile screens
* Event cards maintain consistent size
* Images scale properly without distortion

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
root
 ├── client (React Frontend)
 │   ├── src
 │   │   ├── pages
 │   │   ├── components
 │   │   ├── styles
 │   │   └── services
 ├── server (Backend)
 │   ├── controllers
 │   ├── models
 │   ├── routes
 │   └── middleware
```

---

## Local Setup Instructions

### Clone Repository

```bash
git clone <GITHUB_REPO_URL>
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

Create `.env` file:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
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
* Image Upload
* RSVP Join/Leave
* Capacity Enforcement
* Concurrency‑safe backend logic
* Responsive UI
* Search & Filter
* Dark Mode

---

## Author

Developed by **Sonu Kumar**

---

This project satisfies all **mandatory requirements** and includes multiple **optional enhancements** for bonus evaluation.
