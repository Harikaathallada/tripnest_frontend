# TripNest – React Frontend

## Tech Stack
- React 18
- React Router DOM v6
- Vite
- Axios

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

The app will run at **http://localhost:5173**

> Make sure the Spring Boot backend is running on port 8080 first.
> The Vite proxy forwards all `/api` requests to `http://localhost:8080`.

---

## Pages

| Route          | Page         | Description                                  |
|----------------|--------------|----------------------------------------------|
| `/`            | Home         | Landing page with hero, features, destinations strip |
| `/plan`        | Plan         | Trip form + live itinerary generator         |
| `/destinations`| Destinations | Browse and filter all 26 destinations        |
| `/about`       | About        | Project info, tech stack, roadmap            |

---

## Offline / Preview Mode
If the Spring Boot backend is not running, the app falls back to built-in sample data.
A yellow notice banner appears on the itinerary result indicating preview mode.

---

## Build for Production
```bash
npm run build
```

Output goes to `dist/`. You can then serve it via any static file host, or
configure Spring Boot to serve it from `src/main/resources/static/`.

---

## Project Structure
```
src/
├── api/
│   └── tripnest.js        ← Axios API client
├── components/
│   ├── Navbar.jsx + .css
│   └── Footer.jsx + .css
├── pages/
│   ├── Home.jsx + .css
│   ├── Plan.jsx + .css
│   ├── Destinations.jsx + .css
│   └── About.jsx + .css
├── App.jsx                ← Router setup
├── main.jsx               ← React entry point
└── index.css              ← Global design system
```
"# tripnest_frontend" 
