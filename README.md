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
- [Running in production (basic)](#running-in-production-basic)
- [Important implementation notes](#important-implementation-notes)
- [Contributing & license](#contributing--license)

---

## Features

- Create, edit and remove item listings with multiple images
- Specify hourly or daily rates and mark availability
- Browse and search listings; image gallery on item page
- Borrow request workflow: borrowers submit requests; owners accept/decline
- User authentication with JWT; user profile and request history
- File uploads handled with multer; files served from `/uploads`

## Architecture & folders

Top-level layout (important folders):

- `backend/` — Express server, Mongoose models, routes, middleware, uploads
    - `backend/server.js` — app entrypoint (serves `/uploads` statically)
    - `backend/routes/` — API route definitions (items, requests, users, orders)
    - `backend/controllers/` — controller logic
    - `backend/models/` — Mongoose schemas (item, request, user, order)
    - `backend/middleware/` — auth (JWT), multer config, admin checks
    - `backend/uploads/` — stored images (served at `/uploads`)

- `frontend/` — React (Vite) application
    - `frontend/src/Pages` — main pages (Home, Product, NewListing, Profile, Requests, etc.)
    - `frontend/src/components` — reusable UI components
    - `frontend/src/api.js` — central client-side API helpers

Other helpful files:

- `backend/seed.js` — script to populate demo users and items
- `README.md` — this file

## Prerequisites

- Node.js >= 16, npm
- MongoDB (local or Atlas). If using Atlas, get the connection URI.

## Environment variables

Create a `.env` file inside `backend/` with the following values (minimum):

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_strong_secret_for_jwt
PORT=4000
# Optional (only if you plan to use them):
# STRIPE_SECRET_KEY=sk_live_...
# CLOUDINARY_URL=...
```

Keep secrets out of the repo. Use environment management for production.

## Local setup (development)

1) Install dependencies

```bash
# from project root
cd backend
npm install

cd ../frontend
npm install
```

2) Start the backend and frontend

Open two terminals (or use a multiplexer):

```bash
# Terminal A: start backend
cd backend
npm run dev

# Terminal B: start frontend (Vite)
cd frontend
npm run dev
```

Notes:
- Backend defaults to http://localhost:4000 (can be changed via `PORT`).
- Frontend runs on a Vite port (usually http://localhost:5173). The frontend expects the API at `http://localhost:4000` by default.

3) Sign in / testing

- Use the routes in `backend/seed.js` to create demo accounts (or run the seed manually). Once signed in you can create listings from the `NewListing` page and upload images.

## Seeding test data

To load demo users and items (local testing), run:

```bash
cd backend
node seed.js
```

This will create sample lender/borrower accounts and a few items. Check `backend/seed.js` for credentials and details.

## Running in production (basic)

This is a minimal guide — adapt as needed for your hosting provider.

1) Build frontend

```bash
cd frontend
npm run build
```

2) Serve frontend and backend

- Option A: Deploy frontend build to static host (Netlify/Vercel) and deploy backend to a Node host (Heroku, Render, DigitalOcean).
- Option B: Serve built frontend from the backend with a static middleware (not preconfigured) — you may need to copy `frontend/dist` into a `public` folder and serve it from Express.

3) Set environment variables in your host for `MONGO_URI`, `JWT_SECRET`, and other keys.

## Important implementation notes

- File uploads: Images uploaded via the frontend are stored in `backend/uploads` (disk) and served at `http://<server>/uploads/<filename>`.
    - Consider switching to a managed object store (S3/Cloudinary) for production.

- Auth: Requests expect a `token` header with the JWT. See `backend/middleware/authMiddleware.js` for details.

- Requests and availability: The request flow is implemented with lightweight request documents (see `backend/models/requestModel.js`) and owner actions to approve/decline.

- Seed data: `backend/seed.js` will attempt to connect to your configured MongoDB and populate sample documents.

## Troubleshooting

- If frontend can't reach the API, ensure backend is running and `MONGO_URI` is correct.
- Inspect server logs (`backend/*-start.log`, `backend-run.log`) for errors.
- If file uploads fail, check folder permissions for `backend/uploads` and that the backend serves that static path in `server.js`.

## Contributing

- Use branches for features and open a pull request when ready. For large changes open an issue first to discuss the design.

## License

This project is released under the MIT License.

---
If you want, I can also add:

- a `CONTRIBUTING.md` with development guidelines
- a short `README-short.md` for GitHub home and move detailed docs into `docs/`
- badges (build / license) at the top of this README

Tell me which extras you'd like and I'll add them.
<h2>🤝 Contributing</h2>
