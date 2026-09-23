# CODSOFT Level 2 Task 2 — Online Quiz Maker

A simple full-stack Online Quiz Maker built with React, Node.js, Express and MongoDB.

## Included functionality

- Home page with welcome message and create/take options
- User registration and login
- JWT authentication
- Create quizzes
- Add multiple-choice questions
- Four options per question
- Select the correct answer
- Quiz listing page
- Search quizzes
- Take a quiz one question at a time
- Immediate score after submission
- Correct-answer review
- Responsive/mobile-friendly UI
- MongoDB persistence
- Protected quiz creation API

## Project structure

```text
codsoft-online-quiz-maker/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── App.jsx
│   │   └── styles.css
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 1. MongoDB

You can use either MongoDB Atlas or a local MongoDB installation.

For Atlas:
1. Create a free cluster.
2. Create a database user.
3. Allow your IP address in Network Access.
4. Copy the connection string.

The database name used in this project is `codsoft_quiz_maker`.

## 2. Start backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and update:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173
```

Then:

```bash
npm run dev
```

Backend:
`http://localhost:5000`

Health check:
`http://localhost:5000/api/health`

## 3. Start frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:
`http://localhost:5173`

If your backend is deployed somewhere else, create a frontend `.env` file:

```env
VITE_API_URL=https://your-backend-url/api
```

## 4. Test flow

1. Register an account.
2. Login.
3. Open **Create Quiz**.
4. Add a title and questions.
5. Publish the quiz.
6. Open **Quizzes**.
7. Take the quiz.
8. Submit it.
9. Review the score and correct answers.

## Notes

This intentionally keeps the project at the level required by the CODSOFT task. It does not add unnecessary admin panels, payments, real-time features, complex roles, or external services.
