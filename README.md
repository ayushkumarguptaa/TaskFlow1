# TaskFlow – AI Powered Task Management System

TaskFlow is a full-stack AI-powered Task Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). It enables users to efficiently organize projects using Kanban boards, manage tasks, and leverage Groq AI to generate task ideas and improve productivity.

The application features secure JWT authentication, board and task management, AI-assisted task generation, and a responsive user interface for seamless task organization.

---

# Live Demo

**Frontend (Vercel):**
https://task-flow-liart-delta.vercel.app/

---

# Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Password Encryption using bcrypt

## Dashboard

* View all created boards
* Create new boards
* Delete boards
* Responsive dashboard layout

## Board Management

* Create multiple boards
* Open individual boards
* Organize projects separately

## Task Management

* Create tasks
* Edit tasks
* Delete tasks
* Move tasks between columns
* Track task progress visually

## Kanban Workflow

Each board contains three workflow columns:

* To Do
* In Progress
* Done

Every newly created task is automatically added to the **To Do** column.

## AI Integration
* Generate task ideas
* Improve task descriptions
* Productivity assistance using Groq AI

## Responsive UI

* Mobile Friendly
* Tablet Friendly
* Desktop Responsive

---

# How It Works

## Step 1 — Register

Create a new account by entering your:

* Name
* Email
* Password

---

## Step 2 — Login

Login using your registered email and password.

After successful authentication, you will automatically be redirected to the **Dashboard**.

---

## Step 3 — Dashboard

The dashboard displays all your boards.

You can:

* Create a new board
* View all boards
* Delete boards

Each board represents a separate project.

---

## Step 4 — Open a Board

Click on any board to enter it.

Inside the board you will see three columns:

* To Do
* In Progress
* Done

---

## Step 5 — Add Tasks

Create a task by entering:

* Task Title
* Description

Every newly created task is automatically placed inside the **To Do** column.

---

## Step 6 — Manage Tasks

You can:

* Edit Tasks
* Delete Tasks
* Move Tasks between workflow columns:

  * To Do → In Progress
  * In Progress → Done
  * Done → In Progress

This makes tracking project progress simple and intuitive.

---

## Step 7 — AI Assistance

TaskFlow integrates Groq AI, allowing users to:

* Generate task ideas
* Improve task descriptions
* Receive smart productivity suggestions

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Context API
* Axios
* Tailwind CSS
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Groq API

---

# Project Structure

```text
TaskFlow
│
├── Client
│   ├── public
│   ├── src
│   │
│   ├── assets
│   │
│   ├── components
│   │     ├── BoardCard.jsx
│   │     ├── BoardModal.jsx
│   │     ├── Loader.jsx
│   │     ├── Navbar.jsx
│   │     ├── ProtectedRoute.jsx
│   │     ├── TaskCard.jsx
│   │     └── TaskModal.jsx
│   │
│   ├── context
│   │     ├── AuthContext.jsx
│   │     └── useContext.jsx
│   │
│   ├── pages
│   │     ├── Login.jsx
│   │     ├── Register.jsx
│   │     ├── Dashboard.jsx
│   │     └── BoardDetails.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   ├── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── Server
│   ├── config
│   │     └── db.js
│   │
│   ├── controllers
│   │     ├── aiController.js
│   │     ├── authController.js
│   │     ├── boardController.js
│   │     ├── dashboardController.js
│   │     └── taskController.js
│   │
│   ├── middleware
│   │     ├── authMiddleware.js
│   │     └── errorMiddleware.js
│   │
│   ├── models
│   │     ├── User.js
│   │     ├── Board.js
│   │     └── Task.js
│   │
│   ├── routes
│   │     ├── aiRoutes.js
│   │     ├── authRoutes.js
│   │     ├── boardRoutes.js
│   │     ├── dashboardRoutes.js
│   │     └── taskRoutes.js
│   │
│   ├── services
│   │     └── groqService.js
│   │
│   ├── controllers
│         └── aiController.js
│
├── README.md
└── package.json
```

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/your-username/TaskFlow.git
```

```bash
cd TaskFlow
```

---

## Install Backend Dependencies

```bash
cd Server
npm install
```

---

## Install Frontend Dependencies

```bash
cd Client
npm install
```

---

# Environment Variables

Create a `.env` file inside the **Server** directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
CLIENT_URL=http://localhost:5173
```

---

# Run the Project

## Start Backend

```bash
cd Server
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Start Frontend

```bash
cd Client
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# API Endpoints

## Authentication

```http
POST   /user/auth/register
POST   /user/auth/login
GET    /user/auth/profile
```

---

## Dashboard

```http
GET    /user/dashboard
```

---

## Boards

```http
GET      /user/boards
POST     /user/boards
PUT      /user/boards/:id
DELETE   /user/boards/:id
```

---

## Tasks

```http
GET      /user/tasks/:boardId
POST     /user/tasks
PUT      /user/tasks/:id
DELETE   /user/tasks/:id
PATCH    /user/tasks/move
```

---

## AI

```http
POST    /user/ai/generate
```

---

# Security Features

* JWT Authentication
* Protected Routes
* Password Hashing using bcryptjs
* Authentication Middleware
* Secure REST APIs
* HTTP-only Cookie Support (if enabled)

---

# Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |

### Live Application

**Frontend:** https://task-flow-liart-delta.vercel.app/

---

# Screenshots

## Register Page

User Can Register

![User Can Register](https://github.com/user-attachments/assets/1cf07f7d-63ca-4a2e-b1c9-023c6daa83a6)

## Login Page

User can while  they visit

![User can while  they visit](https://github.com/user-attachments/assets/c267d728-f11f-461e-b9de-97ae9c4db4c0)

## Create Board

User Can Create Board After Login

![User Can Create Board After Login](https://github.com/user-attachments/assets/d8d69c7c-2767-4c07-a303-3b3c0ad8b018)
![User Can Create Board After Login](https://github.com/user-attachments/assets/366b2d3c-7d51-4c12-969f-926ae3706e7c)

## Task Board

User Can Add Task After Creating Board

![User Can Add Task After Creating Board](https://github.com/user-attachments/assets/e4e8e7c3-459c-42f8-bc63-c2eed08f3a69)
![User Can Add Task After Creating Board](https://github.com/user-attachments/assets/f91c7549-c16d-440d-a436-027df6c46d9a)

## AI Estimation (Date & Hours)

AI can Estimate Date & Hours for Particular task while adding and editing the task.

![AI ESTIMATE DATE & HOURS](https://github.com/user-attachments/assets/42ae41f0-7873-4ac2-a684-af1de581b55d)
![AI ESTIMATE DATE & HOURS](https://github.com/user-attachments/assets/93c1ebdf-4ff0-44cf-acb4-35900c560995)

---

# Future Enhancements

* Drag & Drop Tasks
* Task Due Dates
* Task Priorities
* Labels & Tags
* Team Collaboration
* Email Notifications
* Calendar View
* Dark Mode
* Activity History
* File Attachments
* Search & Filter Tasks

---

# Author

**Ayush Kumar Gupta**

**MERN Stack Developer**

* GitHub: https://github.com/ayushkumarguptaa
* LinkedIn: https://linkedin.com/in/ayush-kumar-guptaa

---

## License

This project is licensed under the **MIT License**.
