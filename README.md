# RentIt# RentIt<!-- RentIt — Project README -->



[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[![Built with React](https://img.shields.io/badge/frontend-React-blue.svg)](https://reactjs.org)

[![Node.js Backend](https://img.shields.io/badge/backend-Node.js-brightgreen.svg)](https://nodejs.org)[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)



> **Borrow what you need — lend what you own.**[![Built with React](https://img.shields.io/badge/frontend-React-blue.svg)](https://reactjs.org)[![Built with React](https://img.shields.io/badge/front-React-blue.svg)](https://reactjs.org)



RentIt is a peer-to-peer item borrowing platform that connects neighbors to share everyday items. Create listings with photos, set hourly/daily rates, and manage borrow requests with owner approval.[![Node.js Backend](https://img.shields.io/badge/backend-Node.js-brightgreen.svg)](https://nodejs.org)[![Node.js](https://img.shields.io/badge/back-Node.js-brightgreen.svg)](https://nodejs.org)



## ✨ Features



- **Item Listings** — Create, edit, and manage listings with multiple images> Borrow what you need — lend what you own.<p align="center">

- **Time-Based Pricing** — Set hourly or daily rental rates

- **Request Management** — Borrowers request items; owners approve or decline  <img src="frontend/public/custom_logo.png" alt="RentIt" height="96" />

- **User Authentication** — Secure JWT-based login and user profiles

- **Image Uploads** — Upload and manage item photosRentIt is a peer-to-peer item borrowing platform that connects neighbors to share everyday items. Create listings with photos, set hourly/daily rates, and manage borrow requests with approval workflows.  <h1 align="center">RentIt</h1>

- **Demo Data** — Seed script with test users and sample items

  <p align="center"><em>Borrow what you need — lend what you own.</em></p>

## 🛠 Tech Stack

## Features</p>

- **Backend:** Node.js + Express + MongoDB (Mongoose)

- **Frontend:** React 18 (Vite) + Tailwind CSS

- **Auth:** JWT tokens

- **Storage:** Local disk for development; S3/Cloudinary for production- **Item Listings** — Create, edit, and manage listings with multiple images---



## 🚀 Getting Started- **Time-Based Pricing** — Set hourly or daily rental rates



### Requirements- **Request Management** — Borrowers request items; owners approve or decline## Overview



- Node.js 16+- **User Authentication** — Secure JWT-based login and user profiles

- npm

- MongoDB (local or Atlas)- **Image Uploads** — Upload and manage item photos via multipart/form-dataRentIt is a minimal and approachable peer-to-peer item borrowing platform. It allows users to create listings, set time-based pricing (hourly/daily), upload images, and manage borrow requests with owner approval.



### Setup- **Seed Data** — Demo script to populate test users and items



1. **Install dependencies**The project is built with a Node/Express + MongoDB backend and a React (Vite) frontend styled with Tailwind.



```bash## Tech Stack

cd backend && npm install

cd ../frontend && npm install---

```

- **Backend:** Node.js + Express + MongoDB (Mongoose)

2. **Configure environment**

- **Frontend:** React 18 (Vite) + Tailwind CSS## Key features

Copy the template and set values in `backend/.env`:

- **Auth:** JWT tokens

```bash

cp backend/.env.example backend/.env- **File Storage:** Local disk (`backend/uploads`) for development; S3/Cloudinary for production- Create, edit and remove item listings with multiple images

```

- Hourly and daily pricing with availability control

Required variables:

## Getting Started- Borrow request flow (request → owner accept/decline)

```env

MONGODB_URI=mongodb://127.0.0.1:27017- User authentication with JWT and profile views

MONGODB_DB=e-commerce

JWT_SECRET=your-secret-key-here### Prerequisites- Image uploads via `multipart/form-data`, stored under `backend/uploads`

PORT=4000

```- Seed script to populate demo users and items for quick testing



3. **Start development servers**- Node.js 16+



Open two terminals:- npm---



```bash- MongoDB (local or Atlas URI)

# Terminal 1: Backend

cd backend && npm run dev## Preview



# Terminal 2: Frontend### Installation

cd frontend && npm run dev

```Add screenshots to `docs/screenshots/` and reference them here (recommended sizes: 1200×700 for hero images, 800×500 for product cards):



Backend: http://localhost:4000  1. **Clone and install dependencies**

Frontend: http://localhost:5173 (or next available port)

![Home preview](docs/screenshots/home.png)

### Load Demo Data

```bash![Product preview](docs/screenshots/product.png)

Populate the database with test users and items:

cd backend && npm install

```bash

cd backend && node seed.jscd ../frontend && npm install---

```

```

**Demo accounts:**

- `demo.lender@example.com` / `password`## Project structure

- `demo.borrower@example.com` / `password`

2. **Set up environment variables**

## 📁 Project Structure

```

```

RentIt/Create `backend/.env` using `backend/.env.example` as a template:RentIt/

├── backend/

│   ├── controllers/    # Request handlers├─ backend/          # Express API, Mongoose models, uploads

│   ├── middleware/     # Auth, file uploads

│   ├── models/         # Database schemas```env├─ frontend/         # React (Vite) SPA, Tailwind CSS

│   ├── routes/         # API endpoints

│   ├── uploads/        # Stored imagesMONGODB_URI=mongodb://127.0.0.1:27017├─ docs/             # screenshots, diagrams

│   ├── server.js       # Express entry point

│   ├── seed.js         # Demo dataMONGODB_DB=e-commerce├─ backend/.env.example

│   └── .env.example    # Environment template

├── frontend/JWT_SECRET=your-secret-key-here└─ README.md

│   ├── src/

│   │   ├── Pages/      # Page componentsPORT=4000```

│   │   ├── components/ # Reusable UI

│   │   └── api.js      # HTTP client```

│   └── vite.config.js

└── README.mdKey files and folders:

```

3. **Start development servers**- `backend/server.js` — API bootstrap and static uploads serving

## 📡 API Endpoints

- `backend/routes/` — route handlers for items/requests/users

| Method | Endpoint | Description |

|--------|----------|-------------|Open two terminals:- `backend/controllers/` — request handlers and business logic

| GET | `/api/items` | List all items |

| GET | `/api/items/:id` | Get item details |- `backend/models/` — Mongoose schemas

| POST | `/api/items/upload` | Create item with images |

| POST | `/api/requests` | Create borrow request |```bash- `frontend/src/Pages/` — top-level routes and pages (NewListing, Product, Profile, Requests)

| PUT | `/api/requests/:id/respond` | Owner responds to request |

# Terminal 1: Backend (Express + MongoDB)- `frontend/src/api.js` — HTTP helpers and central client API

Full documentation: `backend/routes/` and `frontend/src/api.js`

cd backend

## 🔑 Environment Variables

npm run dev---

| Variable | Required | Default | Description |

|----------|----------|---------|-------------|

| `MONGODB_URI` | Yes | — | MongoDB connection string |

| `MONGODB_DB` | Yes | — | Database name |# Terminal 2: Frontend (Vite)## Quick start — Local development

| `JWT_SECRET` | Yes | — | JWT signing secret |

| `PORT` | No | 4000 | Server port |cd frontend

| `STRIPE_SECRET_KEY` | No | — | Stripe API key (optional) |

| `CLOUDINARY_URL` | No | — | Cloudinary credentials (optional) |npm run devPrerequisites: Node.js (16+), npm, and MongoDB (local or Atlas).



⚠️ Never commit `.env` to version control.```



## 🌐 Deployment1) Install dependencies



### FrontendThe backend runs on http://localhost:4000 and the frontend on http://localhost:5173 (or another available Vite port).



Build for production:```bash



```bash### Load Demo Data# from the project root

cd frontend && npm run build

```cd backend && npm install



Deploy `dist/` to Vercel, Netlify, or any static host.To populate demo users and sample items:cd ../frontend && npm install



### Backend```



Deploy to Render, Heroku, DigitalOcean, or any Node.js host.```bash



Set environment variables on your hosting platform.cd backend2) Prepare environment variables



**Production uploads:** Use S3, Cloudinary, or DigitalOcean Spaces instead of local disk.node seed.js



## 🐛 Troubleshooting```Copy the sample file and provide values in `backend/.env`:



| Problem | Solution |

|---------|----------|

| Frontend can't reach backend | Verify backend is running on `:4000` and `MONGODB_URI` is correct |**Demo accounts:**```bash

| Image uploads fail | Check `backend/uploads` folder exists and has write permissions |

| MongoDB connection error | Verify `MONGODB_URI` format and MongoDB is running |- Email: `demo.lender@example.com` / Password: `password`cp backend/.env.example backend/.env

| Port 4000 in use | Change `PORT` in `.env` or kill the process using the port |

- Email: `demo.borrower@example.com` / Password: `password````

## 🤝 Contributing



Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Project StructureMinimum required variables in `backend/.env`:

## 📄 License

```env

MIT License — see [LICENSE](LICENSE) for details.

```MONGODB_URI=mongodb://127.0.0.1:27017

---

RentIt/MONGODB_DB=e-commerce

**Have questions?** Open an issue or check [CONTRIBUTING.md](CONTRIBUTING.md).

├── backend/JWT_SECRET=replace-with-a-secure-secret

│   ├── controllers/        # Business logicPORT=4000

│   ├── middleware/         # Auth, file uploads```

│   ├── models/            # Mongoose schemas

│   ├── routes/            # API endpoints3) Start servers

│   ├── uploads/           # Uploaded images

│   ├── server.js          # Express entry point```bash

│   ├── seed.js            # Demo data script# Terminal A — start backend (nodemon)

│   └── .env.example       # Environment templatecd backend && npm run server

├── frontend/

│   ├── src/# Terminal B — start frontend (Vite)

│   │   ├── Pages/         # Page componentscd frontend && npm run dev

│   │   ├── components/    # Reusable UI components```

│   │   ├── api.js         # HTTP client helpers

│   │   └── ...By default, the backend listens on http://localhost:4000 and the frontend on a Vite port (usually http://localhost:5173).

│   └── vite.config.js

└── README.md---

```

## Demo data (seed)

## API Endpoints (Overview)

The project includes a seed script to generate demo users and sample items for quick testing.

| Method | Endpoint | Description |

|--------|----------|-------------|```bash

| GET | `/api/items` | List all items |cd backend

| GET | `/api/items/:id` | Get item details |node seed.js

| POST | `/api/items/upload` | Create item with images |```

| POST | `/api/requests` | Create a borrow request |

| PUT | `/api/requests/:id/respond` | Owner accepts/declines request |Demo accounts created by the seed (email / password):

| GET | `/api/profile` | Get user profile |- `demo.lender@example.com` / `password`

- `demo.borrower@example.com` / `password`

See `backend/routes` and `frontend/src/api.js` for complete API documentation.

---

## Environment Variables

## Environment variables (summary)

| Variable | Required | Description |

|----------|----------|-------------|- `MONGODB_URI` — base connection url, e.g. `mongodb://127.0.0.1:27017`

| `MONGODB_URI` | Yes | MongoDB connection string |- `MONGODB_DB` — database name (e.g. `e-commerce`)

| `MONGODB_DB` | Yes | Database name |- `JWT_SECRET` — JWT signing secret

| `JWT_SECRET` | Yes | Secret for JWT signing |- `PORT` — backend port

| `PORT` | No | Server port (default: 4000) |- `STRIPE_SECRET_KEY` (optional) — stripe API key

| `STRIPE_SECRET_KEY` | No | Stripe API key (optional) |- `CLOUDINARY_*` (optional) — cloudinary keys if using cloudinary

| `CLOUDINARY_URL` | No | Cloudinary credentials (optional) |

Sensitive values should never be committed. Use `backend/.env.example` for guidance.

Never commit `.env` to version control. Use `.env.example` as a template.

---

## Deployment

## API highlights

### Frontend

- `GET /api/items` — list items

Build for production:- `GET /api/items/:id` — item detail

- `POST /api/items/upload` — create item with multipart/form-data

```bash- `POST /api/items/upload-only` — upload images (returns URLs)

cd frontend- `POST /api/requests` — create a borrow request

npm run build- `PUT /api/requests/:id/respond` — owner accept/reject a request

```

See `backend/routes` and `frontend/src/api.js` for the full list of routes and client helpers.

Deploy the `dist/` folder to Vercel, Netlify, or your static hosting provider.

---

### Backend

## Production notes

Deploy to a Node.js host like Render, Heroku, or DigitalOcean. Set environment variables on your host platform.

1) Build frontend for production:

**For production uploads**, move from local disk to a managed service:

- AWS S3```bash

- Cloudinarycd frontend && npm run build

- DigitalOcean Spaces```



## Troubleshooting2) Host the `dist` on a static host (Vercel/Netlify) while deploying the backend on a Node host (Render/Heroku/DigitalOcean), or serve the built `dist` from the backend.



| Issue | Solution |3) Replace uploaded file storage with a managed provider (S3/Cloudinary) in production and configure the respective keys.

|-------|----------|

| Frontend can't reach backend | Ensure backend is running on `:4000` and `MONGODB_URI` is correct |---

| Image uploads fail | Check `backend/uploads` folder exists with write permissions |

| MongoDB connection errors | Verify `MONGODB_URI` format and MongoDB server is running |## Contributing

| Port 4000 already in use | Change `PORT` in `.env` or kill the process using the port |

If you wish to contribute, please follow the basic workflow:

## Contributing1. Fork the repo and create a feature branch

2. Make changes and run the app locally

We welcome contributions! Please follow these steps:3. Open a pull request with a clear description



1. Fork the repositoryCode style & format: the front-end uses Tailwind and follows a component-driven approach. Please keep changes focused and add small, well-scoped commits.

2. Create a feature branch: `git checkout -b feature/your-feature`

3. Commit your changes: `git commit -m 'Add feature'`---

4. Push to the branch: `git push origin feature/your-feature`

5. Open a pull request## Troubleshooting



For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).- If the frontend cannot reach the backend, ensure the backend is running and the `MONGODB_URI` is set correctly.

- If uploads fail, verify `backend/uploads` exists and the backend static route is configured.

## License- Check server logs in the backend directory for runtime errors.



This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.---



---## License



**Questions?** Open an issue or check the [CONTRIBUTING.md](CONTRIBUTING.md) for more info.MIT © RentIt

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

 
