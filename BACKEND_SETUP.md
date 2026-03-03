# 🚀 SAPIVI Full-Stack Backend Setup Guide

Complete Node.js + Express + MySQL backend for the SAPIVI admin console.

---

## 📁 Backend Folder Structure

```
backend/
├── .env
├── .gitignore
├── package.json
├── server.js
├── config/
│   └── db.js
├── middleware/
│   └── auth.js
├── routes/
│   ├── authRoutes.js
│   ├── contentRoutes.js
│   └── messageRoutes.js
├── controllers/
│   ├── authController.js
│   ├── contentController.js
│   └── messageController.js
└── models/
    └── (queries are inline in controllers for simplicity)
```

---

## 1️⃣ MySQL Database Schema

Run these SQL queries in your MySQL client (phpMyAdmin, MySQL Workbench, or CLI):

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS sapivi_db;
USE sapivi_db;

-- =====================
-- USERS TABLE
-- =====================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor', 'viewer') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================
-- HERO CONTENT
-- =====================
CREATE TABLE hero_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  badge VARCHAR(100),
  headline VARCHAR(255),
  description TEXT,
  cta_primary VARCHAR(100),
  cta_secondary VARCHAR(100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================
-- ABOUT CONTENT
-- =====================
CREATE TABLE about_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hero_headline VARCHAR(255),
  hero_description TEXT,
  mission TEXT,
  vision TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================
-- SERVICES
-- =====================
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  features JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================
-- PORTFOLIO PROJECTS
-- =====================
CREATE TABLE portfolio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  image VARCHAR(500),
  tags JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================
-- CLIENTS
-- =====================
CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  logo VARCHAR(10),
  industry VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- CONTACT INFO
-- =====================
CREATE TABLE contact_info (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150),
  phone VARCHAR(50),
  address TEXT,
  cin VARCHAR(100),
  business_hours VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================
-- CONTACT MESSAGES
-- =====================
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sample Data

```sql
-- Admin user (password: admin123)
-- The hash below is for "admin123" using bcrypt with 10 rounds
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@sapivi.com', '$2b$10$YourHashHere', 'admin');
-- NOTE: Generate real hash by running the register endpoint or use:
-- node -e "const bcrypt=require('bcrypt'); bcrypt.hash('admin123',10).then(h=>console.log(h))"

-- Hero content
INSERT INTO hero_content (badge, headline, description, cta_primary, cta_secondary) VALUES
('Transforming Businesses Since 2010', 'We Build Digital Excellence', 'Creating innovative solutions that drive growth and transform businesses for the digital age.', 'Get Started', 'View Portfolio');

-- About content
INSERT INTO about_content (hero_headline, hero_description, mission, vision) VALUES
('About SAPIVI', 'We are a team of passionate professionals dedicated to delivering exceptional digital solutions.', 'To empower businesses with innovative technology solutions that drive growth and efficiency.', 'To be the leading digital transformation partner for businesses worldwide.');

-- Services
INSERT INTO services (title, description, features) VALUES
('Web Development', 'Custom websites and web applications built with modern technologies.', '["React", "Node.js", "TypeScript", "Responsive Design"]'),
('Mobile Development', 'Native and cross-platform mobile applications.', '["iOS", "Android", "React Native", "Flutter"]'),
('UI/UX Design', 'Beautiful and intuitive user interfaces.', '["Figma", "Prototyping", "User Research", "Design Systems"]');

-- Portfolio
INSERT INTO portfolio (title, category, description, image, tags) VALUES
('E-Commerce Platform', 'Web Development', 'A full-featured online store with payment integration.', '/placeholder.svg', '["React", "Node.js", "Stripe"]'),
('Health App', 'Mobile Development', 'A health tracking mobile application.', '/placeholder.svg', '["React Native", "Firebase"]');

-- Clients
INSERT INTO clients (name, logo, industry) VALUES
('TechCorp', 'TC', 'Technology'),
('DesignHub', 'DH', 'Design'),
('DataFlow', 'DF', 'Analytics');

-- Contact info
INSERT INTO contact_info (email, phone, address, cin, business_hours) VALUES
('contact@sapivi.com', '+1 234 567 890', '123 Business Ave, Tech City, TC 12345', 'CIN123456', 'Mon - Fri: 9:00 AM - 6:00 PM');
```

---

## 2️⃣ Backend Code

### `backend/package.json`

```json
{
  "name": "sapivi-backend",
  "version": "1.0.0",
  "description": "SAPIVI REST API with Express and MySQL",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.11.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

### `backend/.env`

```env
# Server
PORT=3001

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=sapivi_db

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

### `backend/.gitignore`

```
node_modules
.env
```

### `backend/server.js`

```js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/messages", messageRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SAPIVI API running on http://localhost:${PORT}`);
});
```

### `backend/config/db.js`

```js
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection
pool.getConnection()
  .then((conn) => {
    console.log("✅ MySQL connected successfully");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ MySQL connection failed:", err.message);
  });

module.exports = pool;
```

### `backend/middleware/auth.js`

```js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticate;
```

### `backend/routes/authRoutes.js`

```js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
```

### `backend/routes/contentRoutes.js`

```js
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  getHero, updateHero,
  getAbout, updateAbout,
  getServices, createService, updateService, deleteService,
  getPortfolio, createPortfolio, updatePortfolio, deletePortfolio,
  getClients, createClient, updateClient, deleteClient,
  getContact, updateContact,
} = require("../controllers/contentController");

// Hero
router.get("/hero", getHero);
router.put("/hero", authenticate, updateHero);

// About
router.get("/about", getAbout);
router.put("/about", authenticate, updateAbout);

// Services
router.get("/services", getServices);
router.post("/services", authenticate, createService);
router.put("/services/:id", authenticate, updateService);
router.delete("/services/:id", authenticate, deleteService);

// Portfolio
router.get("/portfolio", getPortfolio);
router.post("/portfolio", authenticate, createPortfolio);
router.put("/portfolio/:id", authenticate, updatePortfolio);
router.delete("/portfolio/:id", authenticate, deletePortfolio);

// Clients
router.get("/clients", getClients);
router.post("/clients", authenticate, createClient);
router.put("/clients/:id", authenticate, updateClient);
router.delete("/clients/:id", authenticate, deleteClient);

// Contact
router.get("/contact", getContact);
router.put("/contact", authenticate, updateContact);

module.exports = router;
```

### `backend/routes/messageRoutes.js`

```js
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  getMessages,
  submitMessage,
  deleteMessage,
} = require("../controllers/messageController");

router.get("/", authenticate, getMessages);
router.post("/", submitMessage); // Public - anyone can submit
router.delete("/:id", authenticate, deleteMessage);

module.exports = router;
```

### `backend/controllers/authController.js`

```js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    // Check if user exists
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // Generate token
    const token = jwt.sign(
      { id: result.insertId, email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      token,
      user: { id: result.insertId.toString(), email, name },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find user
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: { id: user.id.toString(), email: user.email, name: user.name },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
```

### `backend/controllers/contentController.js`

```js
const db = require("../config/db");

// ========== HERO ==========
const getHero = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM hero_content LIMIT 1");
    res.json(rows[0] || {});
  } catch (err) { next(err); }
};

const updateHero = async (req, res, next) => {
  try {
    const { badge, headline, description, cta_primary, cta_secondary } = req.body;
    const [existing] = await db.query("SELECT id FROM hero_content LIMIT 1");

    if (existing.length > 0) {
      await db.query(
        "UPDATE hero_content SET badge=?, headline=?, description=?, cta_primary=?, cta_secondary=? WHERE id=?",
        [badge, headline, description, cta_primary, cta_secondary, existing[0].id]
      );
    } else {
      await db.query(
        "INSERT INTO hero_content (badge, headline, description, cta_primary, cta_secondary) VALUES (?,?,?,?,?)",
        [badge, headline, description, cta_primary, cta_secondary]
      );
    }
    res.json({ message: "Hero updated successfully" });
  } catch (err) { next(err); }
};

// ========== ABOUT ==========
const getAbout = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM about_content LIMIT 1");
    res.json(rows[0] || {});
  } catch (err) { next(err); }
};

const updateAbout = async (req, res, next) => {
  try {
    const { hero_headline, hero_description, mission, vision } = req.body;
    const [existing] = await db.query("SELECT id FROM about_content LIMIT 1");

    if (existing.length > 0) {
      await db.query(
        "UPDATE about_content SET hero_headline=?, hero_description=?, mission=?, vision=? WHERE id=?",
        [hero_headline, hero_description, mission, vision, existing[0].id]
      );
    } else {
      await db.query(
        "INSERT INTO about_content (hero_headline, hero_description, mission, vision) VALUES (?,?,?,?)",
        [hero_headline, hero_description, mission, vision]
      );
    }
    res.json({ message: "About updated successfully" });
  } catch (err) { next(err); }
};

// ========== SERVICES ==========
const getServices = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM services ORDER BY created_at DESC");
    res.json(rows.map(r => ({ ...r, features: JSON.parse(r.features || '[]') })));
  } catch (err) { next(err); }
};

const createService = async (req, res, next) => {
  try {
    const { title, description, features } = req.body;
    const [result] = await db.query(
      "INSERT INTO services (title, description, features) VALUES (?,?,?)",
      [title, description, JSON.stringify(features)]
    );
    res.status(201).json({ id: result.insertId, title, description, features });
  } catch (err) { next(err); }
};

const updateService = async (req, res, next) => {
  try {
    const { title, description, features } = req.body;
    await db.query(
      "UPDATE services SET title=?, description=?, features=? WHERE id=?",
      [title, description, JSON.stringify(features), req.params.id]
    );
    res.json({ message: "Service updated" });
  } catch (err) { next(err); }
};

const deleteService = async (req, res, next) => {
  try {
    await db.query("DELETE FROM services WHERE id=?", [req.params.id]);
    res.json({ message: "Service deleted" });
  } catch (err) { next(err); }
};

// ========== PORTFOLIO ==========
const getPortfolio = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM portfolio ORDER BY created_at DESC");
    res.json(rows.map(r => ({ ...r, tags: JSON.parse(r.tags || '[]') })));
  } catch (err) { next(err); }
};

const createPortfolio = async (req, res, next) => {
  try {
    const { title, category, description, image, tags } = req.body;
    const [result] = await db.query(
      "INSERT INTO portfolio (title, category, description, image, tags) VALUES (?,?,?,?,?)",
      [title, category, description, image, JSON.stringify(tags)]
    );
    res.status(201).json({ id: result.insertId, title, category, description, image, tags });
  } catch (err) { next(err); }
};

const updatePortfolio = async (req, res, next) => {
  try {
    const { title, category, description, image, tags } = req.body;
    await db.query(
      "UPDATE portfolio SET title=?, category=?, description=?, image=?, tags=? WHERE id=?",
      [title, category, description, image, JSON.stringify(tags), req.params.id]
    );
    res.json({ message: "Portfolio updated" });
  } catch (err) { next(err); }
};

const deletePortfolio = async (req, res, next) => {
  try {
    await db.query("DELETE FROM portfolio WHERE id=?", [req.params.id]);
    res.json({ message: "Portfolio deleted" });
  } catch (err) { next(err); }
};

// ========== CLIENTS ==========
const getClients = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM clients ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) { next(err); }
};

const createClient = async (req, res, next) => {
  try {
    const { name, logo, industry } = req.body;
    const [result] = await db.query(
      "INSERT INTO clients (name, logo, industry) VALUES (?,?,?)",
      [name, logo, industry]
    );
    res.status(201).json({ id: result.insertId, name, logo, industry });
  } catch (err) { next(err); }
};

const updateClient = async (req, res, next) => {
  try {
    const { name, logo, industry } = req.body;
    await db.query(
      "UPDATE clients SET name=?, logo=?, industry=? WHERE id=?",
      [name, logo, industry, req.params.id]
    );
    res.json({ message: "Client updated" });
  } catch (err) { next(err); }
};

const deleteClient = async (req, res, next) => {
  try {
    await db.query("DELETE FROM clients WHERE id=?", [req.params.id]);
    res.json({ message: "Client deleted" });
  } catch (err) { next(err); }
};

// ========== CONTACT ==========
const getContact = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM contact_info LIMIT 1");
    res.json(rows[0] || {});
  } catch (err) { next(err); }
};

const updateContact = async (req, res, next) => {
  try {
    const { email, phone, address, cin, business_hours } = req.body;
    const [existing] = await db.query("SELECT id FROM contact_info LIMIT 1");

    if (existing.length > 0) {
      await db.query(
        "UPDATE contact_info SET email=?, phone=?, address=?, cin=?, business_hours=? WHERE id=?",
        [email, phone, address, cin, business_hours, existing[0].id]
      );
    } else {
      await db.query(
        "INSERT INTO contact_info (email, phone, address, cin, business_hours) VALUES (?,?,?,?,?)",
        [email, phone, address, cin, business_hours]
      );
    }
    res.json({ message: "Contact info updated" });
  } catch (err) { next(err); }
};

module.exports = {
  getHero, updateHero,
  getAbout, updateAbout,
  getServices, createService, updateService, deleteService,
  getPortfolio, createPortfolio, updatePortfolio, deletePortfolio,
  getClients, createClient, updateClient, deleteClient,
  getContact, updateContact,
};
```

### `backend/controllers/messageController.js`

```js
const db = require("../config/db");

const getMessages = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM messages ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) { next(err); }
};

const submitMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required." });
    }

    const [result] = await db.query(
      "INSERT INTO messages (name, email, subject, message) VALUES (?,?,?,?)",
      [name, email, subject, message]
    );

    res.status(201).json({ id: result.insertId, message: "Message sent successfully" });
  } catch (err) { next(err); }
};

const deleteMessage = async (req, res, next) => {
  try {
    await db.query("DELETE FROM messages WHERE id=?", [req.params.id]);
    res.json({ message: "Message deleted" });
  } catch (err) { next(err); }
};

module.exports = { getMessages, submitMessage, deleteMessage };
```

---

## 3️⃣ Installation & Running

### Backend Setup

```bash
# 1. Create the backend folder and copy the files above
mkdir backend && cd backend

# 2. Install dependencies
npm install

# 3. Set up MySQL
#    - Install MySQL if not installed
#    - Create database and run the SQL schema above
#    - Update .env with your MySQL credentials

# 4. Generate admin password hash
node -e "const bcrypt=require('bcrypt'); bcrypt.hash('admin123',10).then(h=>console.log(h))"
# Copy the hash and update the INSERT INTO users query

# 5. Start the server
npm run dev
# Server runs on http://localhost:3001
```

### Frontend Setup

```bash
# Already running via Lovable, or locally:
npm install
npm run dev
# Runs on http://localhost:8080
```

### Connect Frontend to Backend

1. Go to `/admin` in your browser
2. Click **"Configure API Endpoint"**
3. Enter `http://localhost:3001/api`
4. Login with: `admin@sapivi.com` / `admin123`

---

## 4️⃣ API Endpoints Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login & get JWT |
| GET | `/api/content/hero` | ❌ | Get hero content |
| PUT | `/api/content/hero` | ✅ | Update hero |
| GET | `/api/content/about` | ❌ | Get about content |
| PUT | `/api/content/about` | ✅ | Update about |
| GET | `/api/content/services` | ❌ | List services |
| POST | `/api/content/services` | ✅ | Create service |
| PUT | `/api/content/services/:id` | ✅ | Update service |
| DELETE | `/api/content/services/:id` | ✅ | Delete service |
| GET | `/api/content/portfolio` | ❌ | List portfolio |
| POST | `/api/content/portfolio` | ✅ | Create project |
| PUT | `/api/content/portfolio/:id` | ✅ | Update project |
| DELETE | `/api/content/portfolio/:id` | ✅ | Delete project |
| GET | `/api/content/clients` | ❌ | List clients |
| POST | `/api/content/clients` | ✅ | Create client |
| PUT | `/api/content/clients/:id` | ✅ | Update client |
| DELETE | `/api/content/clients/:id` | ✅ | Delete client |
| GET | `/api/content/contact` | ❌ | Get contact info |
| PUT | `/api/content/contact` | ✅ | Update contact |
| GET | `/api/messages` | ✅ | List messages |
| POST | `/api/messages` | ❌ | Submit message |
| DELETE | `/api/messages/:id` | ✅ | Delete message |
| GET | `/api/health` | ❌ | Health check |

---

## 5️⃣ Default Admin Credentials

After running the SQL insert with the generated bcrypt hash:

- **Email:** `admin@sapivi.com`
- **Password:** `admin123`

⚠️ **Change these in production!**
