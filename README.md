# ⚡ Smart Leads Dashboard

A production-grade **Lead Management Dashboard** built with the MERN stack and TypeScript. Features JWT authentication, role-based access control, advanced filtering, pagination, CSV export, and dark mode.

---

## 🔗 Links

| | |
|---|---|
| **Live Demo** | https://smart-leads-dashboard.vercel.app |
| **Backend API** | https://smart-leads-backend.onrender.com |
| **GitHub** | https://github.com/YOURUSERNAME/smart-leads-dashboard |

> Replace the links above with your actual deployment URLs.

---

## 🧪 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@test.com | 123456 |
| Sales User | sales@test.com | 123456 |

---

## ✨ Features

### Core
- 🔐 JWT Authentication — Register, Login, Protected Routes
- 👥 Role Based Access Control — Admin and Sales roles
- 📋 Lead Management — Full CRUD (Create, Read, Update, Delete)
- 🔍 Advanced Filtering — Filter by Status, Source, Search by name/email
- ⌨️ Debounced Search — 500ms delay to avoid excessive API calls
- 📄 Backend Pagination — 10 records per page with metadata
- 📤 CSV Export — Export leads with active filters applied
- 🌙 Dark Mode — Persists across page refresh

### Technical
- ✅ TypeScript throughout — zero plain JavaScript
- ✅ Proper interfaces and types — no `any`
- ✅ Loading states on all async operations
- ✅ Empty states when no data
- ✅ Form validation — client side and server side
- ✅ Centralized error handling
- ✅ Reusable component architecture
- ✅ Docker support — single command to run everything

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| TailwindCSS | Styling |
| React Router DOM v6 | Client-side routing |
| Axios | HTTP client with interceptors |
| React Hot Toast | Notifications |
| Vite | Build tool |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express + TypeScript | Server framework |
| MongoDB Atlas + Mongoose | Database |
| JSON Web Token (JWT) | Authentication |
| Bcryptjs | Password hashing |
| Express Validator | Request validation |
| CORS | Cross-origin requests |

### DevOps
| Technology | Purpose |
|---|---|
| Docker + Docker Compose | Containerization |
| Render | Backend deployment |
| Vercel | Frontend deployment |

---

## 📁 Project Structure

```
smart-leads-dashboard/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                    # MongoDB Atlas connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts       # Register, Login, GetMe
│   │   │   └── lead.controller.ts       # CRUD + CSV export
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts       # JWT verify + role guard
│   │   │   ├── error.middleware.ts      # Global error handler
│   │   │   └── validate.middleware.ts   # express-validator handler
│   │   ├── models/
│   │   │   ├── user.model.ts            # User schema + bcrypt hook
│   │   │   └── lead.model.ts            # Lead schema + indexes
│   │   ├── routes/
│   │   │   ├── auth.routes.ts           # /api/auth/*
│   │   │   └── lead.routes.ts           # /api/leads/*
│   │   ├── types/
│   │   │   └── index.ts                 # All TypeScript interfaces
│   │   ├── utils/
│   │   │   ├── apiResponse.ts           # Consistent response helpers
│   │   │   └── csvExport.ts             # CSV generator
│   │   └── app.ts                       # Express app entry point
│   ├── .env.example                     # Env template
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.ts                 # Axios instance + interceptors
│   │   │   ├── authApi.ts               # Auth API calls
│   │   │   └── leadsApi.ts              # Leads API calls
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx           # Reusable button variants
│   │   │   │   ├── Input.tsx            # Input with label + error
│   │   │   │   ├── Modal.tsx            # Portal modal with Escape key
│   │   │   │   ├── Badge.tsx            # Status + source badges
│   │   │   │   ├── Spinner.tsx          # Loading spinner
│   │   │   │   ├── EmptyState.tsx       # Empty list state
│   │   │   │   └── Pagination.tsx       # Page navigation
│   │   │   ├── leads/
│   │   │   │   ├── LeadTable.tsx        # Leads table with actions
│   │   │   │   ├── LeadForm.tsx         # Create + edit form
│   │   │   │   ├── LeadFilters.tsx      # Search + filter bar
│   │   │   │   └── LeadDetailModal.tsx  # Lead detail view
│   │   │   └── layout/
│   │   │       └── Navbar.tsx           # Top navigation bar
│   │   ├── context/
│   │   │   ├── AuthContext.tsx          # Auth state + actions
│   │   │   └── ThemeContext.tsx         # Dark mode toggle
│   │   ├── hooks/
│   │   │   ├── useDebounce.ts           # 500ms debounce hook
│   │   │   └── useLeads.ts              # Leads data + operations
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── DashboardPage.tsx
│   │   ├── routes/
│   │   │   └── ProtectedRoute.tsx       # Auth guard
│   │   ├── types/
│   │   │   └── index.ts                 # All TypeScript types
│   │   └── App.tsx                      # Router setup
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites

Make sure you have these installed:

- [Node.js v18+](https://nodejs.org)
- [Git](https://git-scm.com)
- [MongoDB Atlas account](https://cloud.mongodb.com) — free tier works

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOURUSERNAME/smart-leads-dashboard.git
cd smart-leads-dashboard
```

---

### Step 2 — Setup MongoDB Atlas

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Click **Connect** → **Drivers** → copy the connection string
4. Go to **Network Access** → Add IP → **Allow Access from Anywhere** (`0.0.0.0/0`)

Your connection string looks like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smart_leads?retryWrites=true&w=majority
```

---

### Step 3 — Setup Backend

```bash
cd backend
cp .env.example .env
```

Open `.env` and fill in:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/smart_leads?retryWrites=true&w=majority
JWT_SECRET=mysupersecretkey123456789abcdef
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Then run:
```bash
npm install
npm run dev
```

Expected output:
```
✅ MongoDB Atlas connected successfully
🚀 Server running on port 5000
```

---

### Step 4 — Setup Frontend

Open a **new terminal**:

```bash
cd frontend
```

Create `.env`:
```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

Then run:
```bash
npm install
npm run dev
```

Expected output:
```
VITE v8.x  ready in 300ms
➜  Local: http://localhost:5173/
```

---

### Step 5 — Open Browser

Go to 👉 **[http://localhost:5173](http://localhost:5173)**

Register an admin account and a sales account to test all features.

---

## 🐳 Docker Setup

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

```bash
# Copy env file and fill in your values
cp .env.example .env

# Start everything — MongoDB + Backend + Frontend
docker-compose up --build
```

App runs at 👉 **[http://localhost:80](http://localhost:80)**

```bash
# Stop everything
docker-compose down
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

---

### Auth Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|--------------|-------------|
| POST | `/auth/register` | ❌ | Register new user |
| POST | `/auth/login` | ❌ | Login and get token |
| GET | `/auth/me` | ✅ | Get current user info |

---

#### POST `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "admin"
}
```

**Success Response `201`:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGci...",
    "user": {
      "id": "64b1f...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    }
  }
}
```

---

#### POST `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Success Response `200`:** Same structure as register.

---

### Lead Endpoints

All lead endpoints require header:
```
Authorization: Bearer <your_jwt_token>
```

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/leads` | All | Get paginated leads |
| GET | `/leads/export/csv` | All | Download leads as CSV |
| GET | `/leads/:id` | All | Get single lead |
| POST | `/leads` | All | Create new lead |
| PATCH | `/leads/:id` | Owner / Admin | Update lead |
| DELETE | `/leads/:id` | Admin only | Delete lead |

---

#### GET `/leads` — Query Parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Records per page |
| `status` | string | — | `New` `Contacted` `Qualified` `Lost` |
| `source` | string | — | `Website` `Instagram` `Referral` |
| `search` | string | — | Search by name or email |
| `sort` | string | `latest` | `latest` or `oldest` |

**Example with multiple filters:**
```
GET /api/leads?status=Qualified&source=Instagram&search=Rahul&page=1&sort=latest
```

**Success Response `200`:**
```json
{
  "success": true,
  "message": "Leads fetched successfully",
  "data": [
    {
      "_id": "64b1f...",
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "status": "Qualified",
      "source": "Instagram",
      "createdBy": {
        "name": "Admin User",
        "email": "admin@test.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-16T08:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalRecords": 47,
    "limit": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

#### POST `/leads`

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "status": "New",
  "source": "Website"
}
```

---

#### PATCH `/leads/:id`

**Request Body** (partial update — any field):
```json
{
  "status": "Qualified"
}
```

---

### Error Response Format

All errors follow this consistent format:
```json
{
  "success": false,
  "message": "Human readable error message",
  "error": "Technical detail"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created successfully |
| `400` | Validation error |
| `401` | Not authenticated — invalid or missing token |
| `403` | Not authorized — insufficient permissions |
| `404` | Resource not found |
| `409` | Conflict — duplicate email |
| `500` | Internal server error |

---

## 🔐 Role Based Access Control

| Action | Sales User | Admin |
|--------|-----------|-------|
| Register / Login | ✅ | ✅ |
| View leads | Own leads only | All leads |
| Create lead | ✅ | ✅ |
| Edit lead | Own leads only | Any lead |
| Delete lead | ❌ Not allowed | ✅ |
| Export CSV | Own leads only | All leads |

---

## 🔑 Environment Variables Reference

### `backend/.env`

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/smart_leads?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_minimum_32_characters
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Scripts Reference

### Backend
```bash
npm run dev      # Development server with hot reload
npm run build    # Compile TypeScript → JavaScript
npm start        # Run compiled production build
```

### Frontend
```bash
npm run dev      # Vite development server
npm run build    # Production build
npm run preview  # Preview production build locally
```

---

## 🚢 Deployment Guide

### Backend on Render (Free)

1. Go to [render.com](https://render.com) → Sign up with GitHub
2. **New** → **Web Service** → Connect your repo
3. Configure:
   ```
   Root Directory  → backend
   Build Command   → npm install && npm run build
   Start Command   → npm start
   ```
4. Add all environment variables from `backend/.env`
5. Deploy — you get a URL like `https://smart-leads-backend.onrender.com`

---

### Frontend on Vercel (Free)

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. **New Project** → Import your repo
3. Configure:
   ```
   Root Directory  → frontend
   Build Command   → npm run build
   Output Dir      → dist
   ```
4. Add environment variable:
   ```
   VITE_API_URL = https://smart-leads-backend.onrender.com/api
   ```
5. Deploy — you get a URL like `https://smart-leads-dashboard.vercel.app`

---

### After Deploying Both

Update your Render backend environment variable:
```
CLIENT_URL = https://smart-leads-dashboard.vercel.app
```

Then redeploy the backend so CORS accepts requests from your Vercel frontend.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOURUSERNAME](https://github.com/YOURUSERNAME)
- Email: your@email.com

---

## 📄 License

Built as part of the MERN Full Stack Internship Assignment for **ServiceHive**.