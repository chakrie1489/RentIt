<!--
    RentIt - README
    This README is tailored for the RentIt project (peer-to-peer item borrowing).
-->

# RentIt

RentIt is a peer-to-peer item borrowing platform that lets nearby people lend and borrow everyday items. The application was adapted from an e-commerce template and customized to support listings with images, time-based pricing (hourly/daily), borrow requests, and owner approval workflows.

## Table of contents

- [Features](#features)
- [Architecture & folders](#architecture--folders)
- [Prerequisites](#prerequisites)
- [Environment variables](#environment-variables)
- [Local setup (development)](#local-setup-development)
- [Seeding test data](#seeding-test-data)
````markdown
<!-- RentIt README (designed) -->

<!-- Badges (placeholders) -->
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Built with React](https://img.shields.io/badge/front-React-blue.svg)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/back-Node.js-brightgreen.svg)](https://nodejs.org)

---

<p align="center">
  <img src="frontend/public/custom_logo.png" alt="RentIt" height="84"/>
  <br/>
  <strong style="font-size:1.15rem">RentIt — Borrow what you need, lend what you own</strong>
  <br/>
  <em>Peer-to-peer borrowing, simplified. Create listings, upload images, accept requests.</em>
</p>

---

## ✨ Why RentIt?

RentIt helps neighbours share under-used items. Instead of buying, borrow — it's cheaper, greener and builds community. The app was adapted from an e‑commerce template and focused on social borrowing flows: listings, time-based pricing (hourly/daily), image galleries and owner-approved requests.

## Quick demo (local)

1. Start backend and frontend (from repo root):

```bash
# install deps
cd backend && npm install
cd ../frontend && npm install

# start servers (two terminals)
cd backend && npm run dev
cd ../frontend && npm run dev
```

2. Open the frontend (Vite port shown in terminal, typically http://localhost:5173) and the backend API at http://localhost:4000.

---

## Features

- Create/edit/delete item listings with multiple images
- Hourly & daily pricing and availability flags
- Request workflow: borrowers submit requests; owners accept/decline
- Profile and request history pages
- Image upload via multipart/form-data and stored in `backend/uploads`

---

## Project architecture (at-a-glance)

```
RentIt/
├─ backend/           # Express API, models, controllers, uploads
├─ frontend/          # React (Vite) app and UI components
├─ README.md          # you are here
```

Important backend files
- `backend/server.js` — Express app entry
- `backend/routes/` — API endpoints
- `backend/middleware/multer.js` — upload storage config

Frontend notes
- `frontend/src/api.js` — client API helpers
- Pages: `NewListing`, `Product`, `Profile`, `Requests`

---

## Design & UX notes

The UI aims to be clean, mobile-first and task-oriented. Key ideas:

- Card-driven listing layout with large hero image
- Lightweight owner badge and availability indicator on listing cards
- Request flow modal with start/end and proposed price

Suggested palette (used in styles):
- Primary: #0ea5a4 (teal)
- Accent: #06b6d4 (cyan)
- Muted background: #f8fafc (gray-50)

Typography suggestions: Inter / system stack. Keep headings bold and body 16px for legibility.

Wireframes and screenshots can live in `/docs/screenshots/` — add them and reference below.

---

## Environment variables

Create `backend/.env` with at least:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=super_secret_value
PORT=4000
# Optional: STRIPE_SECRET_KEY, CLOUDINARY_* for media
```

## Seeding (demo data)

```bash
cd backend
node seed.js
```

This creates demo users and a few sample listings for exploring the app.

---

## API highlights

- `GET /api/items` — list items
- `GET /api/items/:id` — item details
- `POST /api/items/upload` — create item (multipart/form-data)
- `POST /api/items/upload-only` — upload images only
- `POST /api/requests` — create a borrow request
- `PUT /api/requests/:id/respond` — owner responds to a request

See `backend/routes/*` and `frontend/src/api.js` for full details and helpers.

---

## Run in production (short)

1. Build frontend:

```bash
cd frontend
npm run build
```

2. Deploy the build to a static host (Vercel, Netlify) and host the backend on a Node host (Render, DigitalOcean, Heroku). Set environment variables on the host.

3. Recommended improvement: move uploads to S3/Cloudinary for reliability.

---

## Screenshots & assets

Add screenshots to `/docs/screenshots/` and reference them here. Example:

![Home mockup](docs/screenshots/home.png)

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Open a PR describing your change

If you'd like a `CONTRIBUTING.md` with commit guidelines and code style, I can add it.

---

## License

MIT — see `LICENSE` for details.

---

If you'd like, I can also:

- add a short promo GIF in `docs/` and embed it here
- add GitHub Action CI badges
- extract detailed docs into a `docs/` folder and keep a short README on top

````
