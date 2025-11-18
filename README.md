<!--
    RentIt - README
    This README is tailored for the RentIt project (peer-to-peer item borrowing).

# RentIt

RentIt is a peer-to-peer item borrowing platform that lets nearby people lend and borrow everyday items. The application was adapted from an e-commerce template and customized to support listings with images, time-based pricing (hourly/daily), borrow requests, and owner approval workflows.

## Table of contents

<!-- RentIt — polished README -->

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Built with React](https://img.shields.io/badge/front-React-blue.svg)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/back-Node.js-brightgreen.svg)](https://nodejs.org)

<p align="center">
  <img src="frontend/public/custom_logo.png" alt="RentIt" height="96" />
  <h1 align="center">RentIt</h1>
  <p align="center"><em>Borrow what you need. Lend what you own. Build local trust.</em></p>
</p>


## One-liner

RentIt is a lightweight peer-to-peer item borrowing platform for nearby communities — list items with images, set hourly/daily pricing, and accept or decline borrow requests.

## Why it matters



## Key features



## Visual preview

Add screenshots to `docs/screenshots/` and they'll appear here in the README. Example placeholders:

![Home preview](docs/screenshots/home.png)
![Product preview](docs/screenshots/product.png)


## Project layout

```
RentIt/
├─ backend/          # Express API, Mongoose models, uploads
├─ frontend/         # React (Vite) SPA, Tailwind CSS
├─ docs/             # screenshots, diagrams (optional)
└─ README.md
```

Important paths


## Quick setup — development (30s)

Prerequisites: Node.js (16+), npm, MongoDB (local or Atlas)

```bash
# install backend deps
cd backend
npm install

# install frontend deps
cd ../frontend
npm install
```

Run both servers (two terminals):

```bash
# Terminal A: backend
cd backend
npm run dev

# Terminal B: frontend
cd frontend
npm run dev
```

The frontend runs on a Vite port (default shown in terminal), backend defaults to http://localhost:4000.


## Environment variables (backend)

Create `backend/.env` with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=super_secret_value
PORT=4000
# Optional:
# STRIPE_SECRET_KEY=sk_test_...
# CLOUDINARY_URL=...
```

Tip: keep an example file at `backend/.env.example` (do not commit secrets).


## Seed demo data

To populate demo users and items (useful for testing):

```bash
cd backend
node seed.js
```

Check the script for seeded usernames/passwords.


## API highlights


See `backend/routes` and `frontend/src/api.js` for full details.


## Deploy notes (production)

1. Build frontend: `cd frontend && npm run build`
2. Host the build on a static host (Vercel/Netlify) or serve it from the backend
3. Host backend on a Node.js platform (Render, Heroku, DigitalOcean)
4. Move uploads off local disk to S3/Cloudinary for production reliability


## Design & UX notes


Color palette suggestion


## Contributing

1. Fork the repo
2. Create a feature branch
3. Run tests / linters (if present)
4. Open a pull request with a clear description

If you want, I can add a `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.


## License

MIT — see `LICENSE`


If you'd like, I can also:


Thanks for using RentIt — tell me which extras you'd like and I'll add them.

 
