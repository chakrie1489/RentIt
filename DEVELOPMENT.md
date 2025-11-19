
# Development — Local setup, notes & TODO

This document explains how to run the project locally and lists short-term development tasks.

Prerequisites

- Node.js 16+ and npm
- MongoDB (local or Atlas) or Docker

Quick setup

1. Backend

```bash
cd backend
cp .env.example .env   # edit values (MONGODB_URI, MONGODB_DB, JWT_SECRET)
npm install
# dev server (uses nodemon if available)
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Run a local MongoDB with Docker (optional):

```bash
docker run -d --name rentit-mongo -p 27017:27017 -v rentit-mongo-data:/data/db mongo:6
```

Seed demo data

```bash
cd backend
node seed.js
```

Core environment variables (backend)

- MONGODB_URI (e.g. mongodb://127.0.0.1:27017)
- MONGODB_DB (database name)
- JWT_SECRET (use a secure secret in production)
- PORT (optional, defaults to 4000)

Important files

- `backend/server.js` — Express entry
- `backend/routes/` — API endpoints
- `backend/middleware/multer.js` — uploads handling
- `frontend/src/api.js` — client API helpers

Short-term TODO (prioritized)

1. Fix/Improve availability calendar for listings (show booked periods)
2. Add unit/integration tests for backend routes (auth, requests, items)
3. Harden upload handling (validate file types, sizes) and add production storage (Cloudinary/S3)
4. Add pagination and filters to item listing endpoints
5. Add end-to-end (E2E) smoke tests for critical flows (create listing, request, accept)
6. Add CI pipeline (lint, tests, build) and deploy previews

Notes for contributors

- Keep secrets out of git. Use `.env` files locally and set platform env vars for deployments.
- Use the seed script for demo users when testing locally.

If something is unclear, open an issue with steps to reproduce the problem and any logs.
