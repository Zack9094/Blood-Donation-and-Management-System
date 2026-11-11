# 🩸 Blood Donation Management System

A full-stack web application designed to simplify and manage the blood donation process by connecting blood donors with people in need of blood. The system provides a centralized platform to manage donor registrations, blood requests, blood inventory, and donation records.

## 🚀 Project Overview

The Blood Donation Management System (Rakt_Dan) aims to make blood donation more accessible and organized through a user-friendly web interface.

It provides separate functionalities for administrators and users, allowing efficient donor management, blood request handling, inventory tracking, and donation history management.

## ✨ Key Features

- **User Registration & Authentication:** Secure user registration and login using JWT authentication.
- **Role-Based Access Control:** Separate access and functionalities for Admin and User roles.
- **Donor Management:** Register and manage blood donors and their information.
- **Blood Request Management:** Submit and manage blood requests.
- **Blood Inventory Management:** Maintain and track blood stock information.
- **Donation History:** Maintain records of previous donations, including donation dates, hospitals, cities, and donation types.
- **Donor Eligibility Tracking:** Track donor eligibility based on previous donation dates and donation intervals.
- **Profile Management:** Manage user profile and health-related information.
- **Responsive Interface:** User-friendly interface for accessing the system.

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication & Security
- JSON Web Token (JWT)
- bcrypt.js
- Role-Based Authorization

### Tools
- Git
- GitHub
- VS Code
- Postman

## 📂 Project Structure

```text
Blood-Donation-Management-System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── db/
│   ├── middleware/
│   ├── ...
│   ├── index.js
│   └── package.json
│
├── helpers/
│   └── generateToken.js
│
├── .gitignore
└── README.md
```

*Note: Folder structure may vary slightly depending on the latest project organization.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Zack9094/Blood-Donation-and-Management-System.git
```

### 2. Navigate to the Project Directory

```bash
cd Blood-Donation-and-Management-System
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 5. Configure Environment Variables

Create a `.env` file in the backend directory.

```env
PORT=50334
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

Replace the placeholder values with your own local configuration.

### 6. Run the Application

Start the backend using the command configured in its `package.json` scripts.

Start the frontend using:

```bash
cd frontend
npm start
```

The frontend and backend should now be running locally.

## 🔐 Security Features

- Password hashing using bcrypt.js.
- JWT-based authentication.
- Protected routes using authentication middleware.
- Role-based authorization for Admin and User accounts.
- Environment variables for sensitive configuration.

## 🎯 Project Objective

The main objective of this project is to develop a centralized blood donation management platform that improves donor accessibility, simplifies blood request management, and helps maintain organized donation records.

## 👩‍💻 Developed By

**Sakshi Priya**

B.Tech Computer Science and Engineering

Interested in Full-Stack Development, Software Engineering, and Artificial Intelligence.

---

⭐ If you find this project useful, consider giving this repository a star!