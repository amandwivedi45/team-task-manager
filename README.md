# 🚀 Team Task Manager

A full-stack web application to manage team projects and tasks collaboratively.  
Users can create projects, assign tasks, manage team members, and track progress.

---

## 🌐 Live Demo
👉 https://team-task-manager-neon.vercel.app

---

## 📌 Features

### 🔐 Authentication
- User Signup & Login
- JWT-based authentication

### 📁 Project Management
- Create projects
- Add members to projects
- View project details

### ✅ Task Management
- Create tasks with:
  - Title
  - Description
  - Due Date
  - Priority
- Assign tasks to users
- Update task status (To Do, In Progress, Done)

### 📊 Dashboard
- Total tasks
- Tasks by status
- Overdue tasks

### 🔐 Role-Based Access
- **Admin**:
  - Create projects
  - Add members
  - Manage all tasks
- **Member**:
  - View assigned tasks
  - Update task status

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Deployment
- Frontend: Vercel
- Backend: Render

---

## ⚙️ Setup Instructions

### 1. Clone Repository

git clone YOUR_GITHUB_LINK
cd team-task-manager

2. Backend Setup
cd backend
npm install
npm run dev


Create .env file:

MONGO_URI=your_mongodb_url
JWT_SECRET=secret123

3. Frontend Setup
cd frontend
npm install
npm run dev

Author
Aman Dwivedi
