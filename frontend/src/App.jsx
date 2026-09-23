import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import QuizList from "./pages/QuizList.jsx";
import CreateQuiz from "./pages/CreateQuiz.jsx";
import TakeQuiz from "./pages/TakeQuiz.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/:id" element={<TakeQuiz />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route path="/create" element={
          <ProtectedRoute><CreateQuiz /></ProtectedRoute>
        } />
      </Routes>
      <footer>Quizly · CODSOFT Level 2 Task 2</footer>
    </>
  );
}
