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

## 🚀 Deployment

This project is deployed using:

- **Frontend:** Vercel  
- **Backend:** Render  

---

### 🔧 Backend Deployment (Render)

1. Push your code to GitHub

2. Go to https://render.com  
3. Click **New → Web Service**  
4. Connect your GitHub repository  

5. Configure:
   - **Environment:** Node  
   - **Root Directory:** backend  
   - **Build Command:** `npm install`  
   - **Start Command:** `npm start`  

6. Add Environment Variables:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

7. Click **Deploy**

👉 After deployment, you will get a backend URL like:
 https://team-task-manager-fkkt.onrender.com

 
---

### 🌐 Frontend Deployment (Vercel)

1. Go to https://vercel.com  
2. Import your GitHub repository  
3. Select the **frontend** folder  

4. Before deploying, update API URL:

📄 `src/api/axios.js`

baseURL: "https://team-task-manager-fkkt.onrender.com/api"

Click Deploy

Author
Aman Dwivedi
