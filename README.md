# Backend - Calendar Event Management System

## 📌 Overview

This backend is built using **Node.js, Express, and MongoDB**, with **Redis and Socket.IO** to handle **real-time event notifications** efficiently. It powers a **calendar-based event management system** where users can create and manage events inside rooms.

---

## ⚙️ Tech Stack

- **Node.js & Express** - Backend framework
- **MongoDB & Mongoose** - Database and ORM
- **Redis** - Used for **Pub/Sub messaging** and storing OTP
- **Socket.IO** - Real-time communication
- **Server-Sent Events (SSE)** - For live event notifications
- **JWT Authentication** - Secure user authentication
- **Nodemailer** - For sending email verifications to user

---

## 🔧 Installation & Setup

### **1️⃣ Clone the repository**

```sh
git clone https://github.com/ramzy1453/Calendar-Events-Backend.git
cd backend
```

### **2️⃣ Install dependencies**

```sh
npm install
```

### **3️⃣ Set up environment variables**

Create a `.env` file and configure:

````env
ProjectName = "events-calendar"
VERSION = v1

PORT= 5000
DB_NAME = events-calendar
DB_URL =mongodb+srv://username:password@cluster4.abcde.mongodb.net/events-calendar
DB_PASS = gaza

JWT_SECRET = your_secret
JWT_EXPIRE = 30d


NODE_ENV = "development"
FRONTEND_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379

EMAIL_USER=test@gmail.com
EMAIL_PASS=your_pass```

### **4️⃣ Start the server**

```sh
npm run dev
---

/backend
 ├── src/
 │   ├── controllers/   # Handles request logic
 │   ├── models/        # Mongoose schemas
 │   ├── routes/        # Express routes
 │   ├── services/      # Business logic
 │   ├── config/        # Configuration files (Redis, MongoDB, etc.)
 │   ├── middlewares/    # Authentication & validation
 │   ├── utils/         # Utility functions
 │   ├── lib/           # Helper methods
 │   ├── index.ts       # Main app
 ├── .env               # Environment variables
 ├── package.json       # Dependencies
 └── README.md          # Project documentation
---

## 📜 Contributing

1. **Fork the project**
2. **Create a new branch** (`git checkout -b feature/new-feature`)
3. **Commit your changes** (`git commit -m "Added new feature"`)
4. **Push to the branch** (`git push origin feature/new-feature`)
5. **Open a Pull Request**

---

## ⚖️ License

This project is open-source and available under the **MIT License**.
````
