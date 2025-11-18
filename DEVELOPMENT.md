# Development setup (local)

This repository contains a backend and a frontend. The backend expects a MongoDB instance.

Backend:

```bash
cd backend
cp .env.example .env   # edit values (MONGODB_URI, MONGODB_DB, JWT_SECRET)
npm install
# start with a local secret for dev
env JWT_SECRET=devsecret node server.js
```

Frontend (Vite):

```bash
cd frontend
npm install
npm run dev
```

Run temporary MongoDB with Docker:

```bash
docker run -d --name rentit-mongo -p 27017:27017 -v rentit-mongo-data:/data/db mongo:6
```

Environment files
- `backend/.env.example` lists backend env vars.
- `frontend/.env` contains `VITE_BACKEND_URL` (defaults to http://localhost:4000).

Notes
- For local dev you can use `devsecret` as JWT (see server start command above) but use a strong secret in production.
- The frontend expects the API base URL in `import.meta.env.VITE_BACKEND_URL`.
