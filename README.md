# Bundela Finance — Website Redesign

Modern redesign of [Bundela Finance](https://www.bundelafinance.com/) built with a scalable monorepo architecture. This project maintains ~90–95% similarity in layout, UX, and functionality while using a professional color palette (no black backgrounds).

## Tech Stack

### Frontend
- React 19 + Vite
- Tailwind CSS
- React Router DOM
- Axios, Swiper.js, React CountUp, React Hook Form, React Icons, Framer Motion
- ESLint + Prettier

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- express-validator, helmet, morgan, cors

## Project Structure

```
bundela-finance/
├── frontend/          # React SPA
├── backend/           # Express REST API
├── package.json       # Root workspace scripts
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

## Installation

### 1. Clone and install dependencies

```bash
# From project root
npm run install:all
```

Or install manually:

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 2. Environment setup

**Frontend** — copy and configure:

```bash
cp frontend/.env.example frontend/.env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | Application name | `Bundela Finance` |

**Backend** — copy and configure:

```bash
cp backend/.env.example backend/.env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/bundela-finance` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` |

### 3. Start MongoDB

Ensure MongoDB is running locally, or update `MONGODB_URI` in `backend/.env` with your Atlas connection string.

## Development

### Run both frontend and backend

```bash
npm run dev
```

### Run individually

```bash
# Frontend only (http://localhost:5173)
npm run dev:frontend

# Backend only (http://localhost:5000)
npm run dev:backend
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start frontend + backend concurrently |
| `npm run dev:frontend` | Start Vite dev server |
| `npm run dev:backend` | Start Express with nodemon |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint on frontend |
| `npm run format` | Format frontend code with Prettier |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/contact` | Contact form submission |
| `POST` | `/api/applications` | Loan application submission |
| `POST` | `/api/newsletter` | Newsletter subscription |

### Example requests

**Health check:**
```bash
curl http://localhost:5000/api/health
```

**Contact form:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"9876543210","subject":"Inquiry","message":"Hello"}'
```

**Loan application:**
```bash
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","phone":"9876543210","loanType":"e-auto","amount":500000}'
```

**Newsletter:**
```bash
curl -X POST http://localhost:5000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'
```

## Frontend Architecture

- **Absolute imports** via `@/` alias pointing to `src/`
- **Lazy-loaded pages** for code splitting
- **Error boundary** for graceful error handling
- **Centralized API service** using Axios (`src/services/api.js`)
- **Component folders**: `common`, `layout`, `home`, `forms`, `calculator`, `testimonials`, `ui`

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#0F172A` | Headings, nav, key UI |
| Secondary | `#10B981` | CTAs, success states |
| Accent | `#F59E0B` | Highlights, badges |
| Background | `#F8FAFC` | Page background |
| Text | `#1E293B` | Body text |

## License

Private — internship project.
