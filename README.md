# RentIt — borrow nearby, live lighter

RentIt is a community-first marketplace for borrowing items from people nearby. Instead of buying tools, equipment, or occasional-use gear, RentIt helps you find what you need locally and helps owners earn from unused items.

## Core Features ✅

### User Management
- JWT-based authentication with secure password hashing (bcrypt)
- User profiles with ratings and bio
- Profile images and account management

### Marketplace
- Browse and search items by category and location
- Responsive grid layout with image galleries
- Owner information cards on product pages

### Requests System
- Borrowers post requests for what they need (title, description, category, desired dates, location, max price)
- Lenders can send offers on open requests
- Track request status (open/closed/fulfilled)

### Booking & Payments
- Date picker for rental periods
- Automatic price calculation: daily rate × days + tax (10%) + deposit (escrow)
- Payment method selection (Card/PayPal/Bank Transfer)
- Booking management dashboard

### Rating System
- 1-5 star ratings with comments
- Both lenders and borrowers can rate each other
- User rating summaries on profile pages
- Rating history and statistics

### Dashboard
- My Listings: view and manage items
- My Rentals: track active and past bookings
- My Requests: manage posted requests
- Order history with ratings

## Tech Stack

**Frontend**
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- React Toastify for notifications

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- Cloudinary for image uploads
- Stripe integration (optional)

**Infrastructure**
- MongoDB in Docker
- Local development servers

## Quick Start

### Prerequisites
- Node.js 16+
- Docker (for MongoDB)
- MongoDB running on port 27017

### Setup

1. **Install dependencies**
```bash
cd backend && npm install
cd ../frontend && npm install
```

2. **Start MongoDB** (if not running)
```bash
docker start rentit-mongo
# or
docker run -d -p 27017:27017 --name rentit-mongo -v mongo-data:/data/db mongo:latest
```

3. **Start servers** (two terminals)
```bash
# Terminal 1 - Backend
cd backend
node server.js        # or npm run dev (with nodemon)

# Terminal 2 - Frontend
cd frontend
npm run dev
```

4. **Seed demo data** (optional)
```bash
cd backend
node seed.js
```

The frontend will be available at `http://localhost:5174` and the backend API at `http://localhost:4000`.

## API Reference

See `API_DOCUMENTATION.md` for complete endpoint documentation.

## Project Specifications

See `site_specs.md` for detailed feature specifications and requirements.