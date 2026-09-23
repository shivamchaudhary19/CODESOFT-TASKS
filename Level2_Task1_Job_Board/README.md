# CODSOFT Level 2 Task 1 — Job Board

A full-stack job board where employers can post and manage jobs and candidates can search, apply, upload resumes, and track application status.

## Stack
- Frontend: React, Vite, React Router, responsive CSS
- Backend: Node.js, Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt
- Resume upload: Multer memory storage + MongoDB Buffer
- Email notifications: Nodemailer SMTP (optional configuration)
- Deployment: Vercel + MongoDB Atlas

## Features
- Candidate and employer registration/login
- Role-based protected dashboards
- Job listing, detail, search and filters
- Employer job posting and deletion
- Candidate profile and application tracking
- Resume upload (PDF/DOC/DOCX, max 5 MB)
- Employer candidate/application management
- Application status updates
- Resume download by authorized employer
- Email notifications when SMTP is configured
- Responsive mobile-friendly UI

## Local setup
### Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```
Set `MONGODB_URI` and `JWT_SECRET` in `.env`.

Optional demo data:
```bash
npm run seed
```

### Frontend
```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```
Set `VITE_API_URL=http://localhost:5000/api`.

## Demo employer
After running the seed script:
- Email: `demo@technova.dev`
- Password: `Demo1234`

## Email setup
Email is implemented with Nodemailer. Add SMTP variables to the backend `.env` to send real emails. If SMTP is not configured, application/status notifications are logged by the backend instead, so the core job-board flow still works.

## Vercel deployment
Deploy backend and frontend as separate Vercel projects from this repository. Backend root: `backend`. Frontend root: `frontend`. Frontend env: `VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api`. Backend env: `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL` set to the production frontend domain.
