# ⚡ Smart Leads Dashboard

A production-grade **Lead Management Dashboard** built with the MERN stack and TypeScript. Features JWT authentication, role-based access control, advanced filtering, pagination, CSV export, and dark mode.

---

## 🔗 Links

| | |
|---|---|
| **Live Demo** | https://smart-leads-dashboard-three.vercel.app |
| **Backend API** | https://smart-leads-dashboard-y4ry.onrender.com/api |
| **Health Check** | https://smart-leads-dashboard-y4ry.onrender.com/health |
| **GitHub** | https://github.com/Sakshi-shukla01/smart-leads-dashboard |

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
| MongoDB Atlas | Cloud database |

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
│   ├── .env.example
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

- [Node.js v18+](https://nodejs.org)
- [Git](https://git-scm.com)
- [MongoDB Atlas account](https://cloud.mongodb.com) — free tier works

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Sakshi-shukla01/smart-leads-dashboard.git
cd smart-leads-dashboard
```

---

### Step 2 — Setup MongoDB Atlas

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Click **Connect** → **Drivers** → copy the connection string
4. Go to **Network Access** → Add IP → **Allow Access from Anywhere** (`0.0.0.0/0`)

Connection string format:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smart_leads?retryWrites=true&w=majority
```

---

### Step 3 — Setup Backend

```bash
cd backend
cp .env.example .env
```

Fill in `.env`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/smart_leads?retryWrites=true&w=majority
JWT_SECRET=mysupersecretkey123456789abcdef
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Run:
```bash
npm install
npm run dev
```

Expected:
```
✅ MongoDB Atlas connected successfully
🚀 Server running on port 5000
```

---

### Step 4 — Setup Frontend

Open a new terminal:

```bash
cd frontend
```

Create `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Run:
```bash
npm install
npm run dev
```

Expected:
```
VITE v8.x  ready in 300ms
➜  Local: http://localhost:5173/
```

---

### Step 5 — Open Browser

👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🐳 Docker Setup

```bash
cp .env.example .env
# Fill in your values in .env

docker-compose up --build
```

App runs at 👉 **[http://localhost:80](http://localhost:80)**

```bash
# Stop
docker-compose down
```

---

## 📡 API Documentation

### Base URL
```
https://smart-leads-dashboard-y4ry.onrender.com/api
```

Local:
```
http://localhost:5000/api
```

---

### Auth Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | ❌ | Register new user |
| POST | `/auth/login` | ❌ | Login and get token |
| GET | `/auth/me` | ✅ | Get current user |

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

All endpoints require:
```
Authorization: Bearer <your_jwt_token>
```

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/leads` | All | Get paginated leads |
| GET | `/leads/export/csv` | All | Download as CSV |
| GET | `/leads/:id` | All | Get single lead |
| POST | `/leads` | All | Create lead |
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
| `search` | string | — | Search name or email |
| `sort` | string | `latest` | `latest` or `oldest` |

**Example:**
```
GET /api/leads?status=Qualified&source=Instagram&search=Rahul&page=1
```

**Response:**
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

### Error Response Format

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
| `201` | Created |
| `400` | Validation error |
| `401` | Not authenticated |
| `403` | Not authorized |
| `404` | Not found |
| `409` | Duplicate entry |
| `500` | Server error |

---

## 🔐 Role Based Access Control

| Action | Sales User | Admin |
|--------|-----------|-------|
| Register / Login | ✅ | ✅ |
| View leads | Own leads only | All leads |
| Create lead | ✅ | ✅ |
| Edit lead | Own leads only | Any lead |
| Delete lead | ❌ | ✅ |
| Export CSV | Own leads only | All leads |

---

## 🔑 Environment Variables

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

## 📦 Scripts

### Backend
```bash
npm run dev      # Development with hot reload
npm run build    # Compile TypeScript
npm start        # Run production build
```

### Frontend
```bash
npm run dev      # Vite dev server
npm run build    # Production build
npm run preview  # Preview production locally
```

---

## 🚢 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://smart-leads-dashboard-three.vercel.app |
| Backend | Render | https://smart-leads-dashboard-y4ry.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |

### Backend — Render
```
Root Directory  → backend
Build Command   → npm install && npm run build
Start Command   → node dist/app.js
```

### Frontend — Vercel
```
Root Directory  → frontend
Build Command   → npm run build
Output Dir      → dist
VITE_API_URL    → https://smart-leads-dashboard-y4ry.onrender.com/api
```

> ⚠️ Free tier on Render sleeps after 15 minutes of inactivity.
> First request may take 30–60 seconds to wake up. This is normal.

---

## 👩‍💻 Author

**Sakshi Shukla**
- GitHub: [@Sakshi-shukla01](https://github.com/Sakshi-shukla01)
- Email: sakshishukla1008@gmail.com

---

## 📄 License

Built as part of the MERN Full Stack Internship Assignment for **ServiceHive**.
