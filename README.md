# CODSOFT Internship Tasks

This repository contains the projects completed as part of the **CODSOFT Internship Program – August Batch C20**.

---

## 👨‍💻 Intern

**Shivam Chaudhary**  
B.Tech CSE-E  
NIET

---

# 📂 Projects

| Task | Project | Tech Stack | Live Demo |
|---|---|---|---|
| Level 2 – Task 1 | **Job Board** | React, Vite, Node.js, Express, MongoDB, Mongoose, JWT | [Live Demo](https://codsoft-job-board-beta.vercel.app) |
| Level 2 – Task 2 | **Online Quiz Maker** | React, Vite, Node.js, Express, MongoDB, Mongoose, JWT | [Live Demo](https://codsoft-quiz-maker-lake.vercel.app) |

---

# 🚀 Level 2 – Task 1: Job Board

A full-stack job portal that connects candidates and employers.

## ✨ Features

### Candidate

- Candidate registration and login
- JWT-based authentication
- Browse available jobs
- Search and filter jobs
- View job details
- Apply for jobs
- Upload resume
- Add cover letter
- Track applications
- View application status
- Candidate dashboard
- Profile management

### Employer

- Employer registration and login
- JWT-based authentication
- Employer dashboard
- Create job postings
- Manage job postings
- Delete job postings
- View applications
- View candidate information
- Download candidate resumes
- Update application status

### Security

- JWT authentication
- bcrypt password hashing
- Role-based authorization
- Protected API routes
- Input validation
- CORS configuration

### UI

- Responsive design
- Mobile-friendly interface
- Job listing interface
- Candidate dashboard
- Employer dashboard
- Application management

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Nodemailer
- CORS

## 🔗 Links

**Live Application:**  
https://codsoft-job-board-beta.vercel.app

**Backend API:**  
https://codsoft-job-board-api.vercel.app

**API Health Check:**  
https://codsoft-job-board-api.vercel.app/api/health

## 📁 Folder

```text
Level2_Task1_Job_Board/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── seed.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🧠 Level 2 – Task 2: Online Quiz Maker

A full-stack online quiz platform where users can create, browse, attempt, and review quizzes.

## ✨ Features

### Authentication

- User registration
- User login
- JWT-based authentication
- bcrypt password hashing
- Protected routes

### Quiz Creation

- Create quizzes
- Add quiz title
- Add quiz description
- Add multiple-choice questions
- Add multiple answer options
- Define correct answers
- Store quizzes in MongoDB

### Quiz Discovery

- Browse available quizzes
- Search quizzes
- View quiz information
- Select quizzes to attempt

### Quiz Attempt

- Attempt multiple-choice questions
- Navigate through questions
- Submit quiz
- Automatic score calculation
- Display final score
- Review submitted answers
- Compare selected answers with correct answers

### Results

- Final score
- Correct answer count
- Incorrect answer count
- Answer review
- Quiz result summary

### UI

- Responsive design
- Mobile-friendly interface
- Authentication pages
- Quiz listing page
- Quiz creation page
- Quiz attempt page
- Result and review page

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS

## 🔗 Links

**Live Application:**  
https://codsoft-quiz-maker-lake.vercel.app

**Backend API:**  
https://codsoft-quiz-maker-api.vercel.app

**API Health Check:**  
https://codsoft-quiz-maker-api.vercel.app/api/health

## 📁 Folder

```text
Level-2-Task-2-Online-Quiz-Maker/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 📁 Complete Repository Structure

```text
CODSOFT-TASKS/
│
├── Level2_Task1_Job_Board/
│   ├── backend/
│   ├── frontend/
│   ├── .gitignore
│   └── README.md
│
├── Level-2-Task-2-Online-Quiz-Maker/
│   ├── backend/
│   ├── frontend/
│   ├── .gitignore
│   └── README.md
│
└── README.md
```

---

# ⚙️ Local Setup

Each project has an independent frontend and backend.

## Job Board

### Backend

```bash
cd Level2_Task1_Job_Board/backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd Level2_Task1_Job_Board/frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Online Quiz Maker

### Backend

```bash
cd Level-2-Task-2-Online-Quiz-Maker/backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd Level-2-Task-2-Online-Quiz-Maker/frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

> Check the individual project README files and `.env.example` files for project-specific environment variables.

---

# 🌐 Deployment

Both projects are deployed using Vercel.

## Job Board

| Service | URL |
|---|---|
| Frontend | https://codsoft-job-board-beta.vercel.app |
| Backend | https://codsoft-job-board-api.vercel.app |
| Health Check | https://codsoft-job-board-api.vercel.app/api/health |

## Online Quiz Maker

| Service | URL |
|---|---|
| Frontend | https://codsoft-quiz-maker-lake.vercel.app |
| Backend | https://codsoft-quiz-maker-api.vercel.app |
| Health Check | https://codsoft-quiz-maker-api.vercel.app/api/health |

---

# 🧰 Technologies Used

## Frontend

- React
- Vite
- React Router
- CSS
- Responsive Web Design

## Backend

- Node.js
- Express.js
- REST APIs
- JWT
- bcrypt
- Multer
- CORS

## Database

- MongoDB
- Mongoose

## Deployment

- Vercel

## Development Tools

- Git
- GitHub
- VS Code
- Postman

---

# 📚 Skills Practiced

Through these projects, I practiced:

- Full-stack web development
- React frontend development
- Node.js backend development
- Express.js
- REST API development
- MongoDB
- Mongoose
- JWT authentication
- bcrypt password hashing
- Role-based authorization
- Protected routes
- CRUD operations
- API integration
- Form handling
- Input validation
- File uploads
- Resume handling
- Database persistence
- Error handling
- CORS
- Environment variables
- Responsive web design
- Git and GitHub
- Vercel deployment

---

# 🏗️ Application Architecture

Both applications follow a separated frontend and backend architecture.

```text
                 React Frontend
                       │
                       │ REST API
                       ▼
                Node.js + Express
                       │
                       │ Mongoose
                       ▼
                 MongoDB Database
```

Authentication flow:

```text
User
 │
 ▼
Register / Login
 │
 ▼
bcrypt Password Hashing
 │
 ▼
JWT Token
 │
 ▼
Protected API Routes
 │
 ▼
Authorized Resource
```

---

# 🎯 Internship Tasks Summary

## Level 2 – Task 1: Job Board

A complete recruitment platform providing:

- Candidate authentication
- Employer authentication
- Job posting
- Job searching
- Job filtering
- Job applications
- Resume uploads
- Application tracking
- Employer application management

**Live Application:**  
https://codsoft-job-board-beta.vercel.app

---

## Level 2 – Task 2: Online Quiz Maker

A complete quiz platform providing:

- User authentication
- Quiz creation
- Multiple-choice questions
- Quiz browsing
- Quiz searching
- Quiz attempts
- Automatic scoring
- Result review
- MongoDB persistence

**Live Application:**  
https://codsoft-quiz-maker-lake.vercel.app

---

# 🔗 GitHub Repository

**CODSOFT-TASKS**

https://github.com/shivamchaudhary19/CODSOFT-TASKS

---

# 📌 About

These projects were developed as part of the **CODSOFT Internship Program – August Batch C20**.

The projects demonstrate practical implementation of full-stack web development concepts through functional, database-connected, authenticated, responsive, and deployed applications.
