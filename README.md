# RentIt — borrow nearby, live lighter

RentIt is a simple, community-first marketplace for borrowing items from people nearby. Instead of buying tools, equipment, or occasional-use gear, RentIt helps you find what you need close to home — and helps owners earn from unused items.

We focus on: trust, simplicity, and local reuse. List an item in minutes, set fair hourly or daily rates, review requests, and manage availability from a single dashboard.

Why it matters

- Save money: pay only for the time you need an item.
- Reduce waste: get more value from existing products instead of buying new.
- Empower neighbors: easy way for people to earn extra income from idle items.

Core features

- Quick listings: upload multiple images, add descriptions, and set availability windows.
- Flexible pricing: choose hourly or daily rates per listing.
- Request & approval workflow: borrowers send requests; owners approve, decline, or propose times.
- Booking awareness: booked periods are tracked to avoid double bookings.
- Authentication: JWT-based user accounts and simple profile pages.
- Image uploads: development uses local uploads; production-ready storage (Cloudinary/S3) is supported.
- Seed script: `backend/seed.js` creates demo users and items for testing.
- Clean REST API: backend routes in `backend/routes`, client helpers in `frontend/src/api.js`.

Quick start (local)

1. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```


2. Start servers (two terminals)

```bash
# Terminal A - backend
cd backend
npm run dev

# Terminal B - frontend
cd frontend
npm run dev
```

Optional: seed demo data

```bash
cd backend
node seed.js
```

Where to go next

- See `DEVELOPMENT.md` for full development setup, short-term TODOs, and contributor notes.