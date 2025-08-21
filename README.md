📚 Book Library — React + Firebase Auth + Node/Express + MySQL

A simple library app where users can browse/borrow books and admins can manage the catalog.
Frontend is React (Vite) with Firebase Authentication; backend is Node/Express with MySQL for data.


Public repo: <https://github.com/Shubhi-Kushwaha/Book-Library>

 Features

Email/Password + Google login (Firebase Auth)

Admin dashboard to add/delete books

User UI to search, filter, add to bag, borrow, return

MySQL-backed catalog (books), served by Express REST API

 Project Structure
book-library/
├─ client/                      # React (Vite) app
│  ├─ src/
│  │  ├─ pages/
│  │  │  ├─ AdminDashboard.jsx
│  │  │  └─ BookLibraryApp.jsx
│  │  ├─ firebase.js
│  │  ├─ components/
│  │  │  └─ Icons.jsx
│  │  └─ main.jsx
│  ├─ .env.local               # Vite env (client-side)
│  └─ vite.config.js
├─ server/                      # Node/Express API
│  ├─ src/
│  │  ├─ index.js               # app bootstrap
│  │  ├─ db.js                  # mysql connection pool
│  │  ├─ routes/
│  │  │  └─ admin.routes.js     # /admin/books endpoints
│  │  └─ controllers/
│  │     └─ books.controller.js
│  ├─ .env                      # server env
│  └─ package.json
├─ README.md
└─ .gitignore

🚀 Quick Start
1) Prerequisites

Node.js 18+

MySQL 8+

Firebase project with Web app enabled

2) Clone & install
git clone <this-repo-url>
cd book-library

# client
cd client
npm install

# server
cd ../server
npm install

3) Environment variables
client/.env.local (Vite)

Do not put commas at the end of lines. Also, Vite env vars must start with VITE_.

VITE_API_URL=http://localhost:5000

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxxxxxx
VITE_FIREBASE_APP_ID=1:xxxx:web:yyyy


In your client/src/firebase.js, read these with import.meta.env.VITE_....

server/.env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=book_library
CORS_ORIGIN=http://localhost:5173

4) Create database & table
CREATE DATABASE IF NOT EXISTS book_library;
USE book_library;

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  total_copies INT DEFAULT 0,
  available_copies INT DEFAULT 0,
  description TEXT,
  isbn VARCHAR(50),
  published_year INT,
  cover_color VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

5) Run dev servers

Backend

cd server
npm run dev     # nodemon (or: npm start)


Frontend

cd client
npm run dev     # Vite (default at http://localhost:5173)


Open: http://localhost:5173

 Technologies & Why

React (Vite) — fast dev server, modern DX.

Firebase Auth — secure, ready-made Email/Google sign-in; no need to roll your own auth backend.

Node/Express — lightweight REST API to talk to MySQL.

MySQL — relational, stable, perfect for well-structured book/catalog data.

Axios — simple HTTP client for the frontend.

Tailwind + lucide-react — quick, consistent UI & icons.

 ER Diagram
Entities

users (Firebase manages auth — optional shadow table if you later store roles/metadata)

books (the catalog)

borrows (optional future table if you persist borrowing history)

Simple text ER (current MVP uses books)
books
- id (PK)
- title
- author
- genre
- total_copies
- available_copies
- description
- isbn
- published_year
- cover_color
- created_at
- updated_at

Future-ready ER (if you add borrow tracking)
users (from Firebase UID)
- id (PK) [or uid VARCHAR(128)]
- name
- email
- role ('user'|'admin')

books
- id (PK)
- title, author, genre
- total_copies, available_copies
- ...

borrows
- id (PK)
- user_id (FK -> users.id or users.uid)
- book_id (FK -> books.id)
- borrow_date
- return_date (nullable)
- status ('borrowed'|'returned')

 API Endpoints

Base URL: http://localhost:5000

All endpoints return JSON. Admin routes assume you gate them (e.g., server-side admin check or allow only trusted admins in UI).

Books (Admin)
Method	Route	Purpose	Body (JSON)
GET	/admin/books	List all books	—
POST	/admin/books	Create a new book	{ title, author, genre, totalCopies } (and optionally: description, isbn, published_year, cover_color)
DELETE	/admin/books/:id	Delete a book by id	—

Note: In your React Admin UI you’re calling these with withCredentials: true. Ensure your server CORS is set with credentials: true and origin: <your-client-url>.

Auth

Auth is handled client-side via Firebase (Email/Password + Google).
You don’t call server endpoints for login; you just use Firebase SDK and then navigate to /admin if the user chooses admin (or based on a role you enforce later).

 Firebase Setup Tips

In Firebase Console → Project settings → Your apps → Web app: grab API key & config and put into client/.env.local.

Don’t add commas at end of env lines.

In firebase.js, initialize with import.meta.env.VITE_FIREBASE_....

If you see auth/api-key-not-valid or network-request-failed:

Double-check .env.local variable names and values.

Restart Vite after changing env.

Ensure no trailing quotes/commas.

Check browser network tab for blocked requests (ad-blockers/VPNs can interfere).

 Deployment

Frontend (client): Netlify / Vercel

Set env vars in the hosting dashboard (VITE_...).

Build command: npm run build, Publish dir: dist.

Backend (server): Render / Railway / Fly.io

Set PORT, DB creds, and CORS_ORIGIN to your frontend’s deployed URL.

Use a managed MySQL (e.g., PlanetScale, Railway MySQL) and update env.

Update this README with your live URLs once deployed.

 How the Data Flows

User opens app → React calls GET /admin/books → list comes from MySQL.

Admin adds a book → React Admin posts to POST /admin/books → Express inserts into MySQL → Admin UI calls fetchBooks() to refresh.

User actions (bag/borrow) happen on the client for now (UI state). You can persist borrows later via a /borrows API if needed.

 Meaningful Commit Strategy

Avoid one giant commit. Use small, descriptive commits like:

feat(api): add GET /admin/books endpoint
feat(client): integrate axios and fetch books from API
fix(client): show default books if API empty
feat(admin): add form to create books
chore(db): add books table and seed script
refactor(ui): extract BookCard component
docs(readme): add setup, ERD, endpoints

🧪 Manual Test Checklist

 Can sign up with Email/Password (Firebase)

 Can sign in with Google (Firebase)

 Admin can add a book → appears in /admin/books and in User list on refresh

 Admin can delete a book

 Search/Genre/Availability filters work

 CORS works locally (CORS_ORIGIN matches Vite URL)

 MySQL connection succeeds (no pool errors)

 Contributing

PRs welcome! Please:

Branch per feature (feat/add-borrow-endpoint)

Write clear commit messages

Keep endpoint and schema changes documented in README

⚠ Troubleshooting

auth/api-key-not-valid: Wrong Firebase env values or wrong variable names; remove quotes/commas, restart dev server.

auth/network-request-failed: VPN/ad-blocker, wrong domain in Firebase, or HTTPS/CORS issues.

CORS errors: Set CORS_ORIGIN to your exact frontend URL and enable credentials: true if you use cookies.

Books not appearing: Confirm POST /admin/books returns 200/201, and that Admin UI calls fetchBooks() after create/delete.

💬 Final note

If you want, I can also paste sample server/src files (Express app, routes, controllers, and MySQL pool) matching the endpoints above so you can just drop them in.

You said:
i have alredy made a repo please only tell me what content i have to add  what i can write in my readme
ChatGPT said:

Got it  since you already have the repo, your README just needs structured content.
Here’s exactly what you should put (you can copy-paste and tweak names/links):

📚 Book Library

A full-stack library management app where admins can manage books and users can browse, filter, and borrow them.
Built with React (Vite), Firebase Auth, Node/Express, and MySQL.

🚀 Project Setup & Installation
1. Clone repo
git clone <your-repo-url>
cd book-library

2. Client setup
cd client
npm install
npm run dev

3. Server setup
cd ../server
npm install
npm run dev

4. Environment variables

client/.env.local

VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx


server/.env

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=book_library
CORS_ORIGIN=http://localhost:5173

5. Database
CREATE DATABASE book_library;
USE book_library;

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  genre VARCHAR(100),
  total_copies INT,
  available_copies INT,
  description TEXT,
  isbn VARCHAR(50),
  published_year INT,
  cover_color VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

🧠 Technologies Used

React (Vite) → fast frontend development

Firebase Authentication → secure login (email + Google)

Node.js + Express → lightweight backend API

MySQL → relational DB for catalog storage

Axios → frontend ↔ backend HTTP calls

Tailwind + lucide-react → styling + icons

 ER Diagram
books
 ├─ id (PK)
 ├─ title
 ├─ author
 ├─ genre
 ├─ total_copies
 ├─ available_copies
 ├─ description
 ├─ isbn
 ├─ published_year
 ├─ cover_color
 ├─ created_at
 └─ updated_at


(Optional future tables: users, borrows if you track borrow history.)

 API Endpoints

Base URL: http://localhost:5000

Method	Route	Purpose
GET	/admin/books	Get all books
POST	/admin/books	Add a new book
DELETE	/admin/books/:id	Delete a book by ID

Auth handled separately via Firebase SDK.

🔗 Deployment

Frontend (client) → deploy on Vercel/Netlify

Backend (server) → deploy on Render/Railway

Database → MySQL (Railway, PlanetScale, or local)

Update with links once deployed:
 Live Demo: <your deployed link>

 Commit Guidelines

Use meaningful commits, e.g.:

feat(api): add POST /admin/books
feat(client): integrate Firebase auth
fix(ui): align login form center
docs(readme): add setup instructions

🧪 Testing Checklist

 Firebase login works (Email/Google)

 Admin can add books → reflected in MySQL & frontend

 Search + filters work

 Add/remove from bag works

 Borrow/return updates availability
