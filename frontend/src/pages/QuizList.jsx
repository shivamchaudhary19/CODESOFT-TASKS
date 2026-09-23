import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.getQuizzes().then(data => setQuizzes(data.quizzes)).catch(err => setError(err.message));
  }, []);

  const filtered = quizzes.filter(q =>
    `${q.title} ${q.description}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">QUIZ LIBRARY</span>
          <h1>Choose a quiz</h1>
          <p>Find a quiz and test what you know.</p>
        </div>
        <input className="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search quizzes..." />
      </div>

      {error && <div className="alert">{error}</div>}

      <div className="quiz-grid">
        {filtered.map(quiz => (
          <article className="quiz-tile" key={quiz._id}>
            <div className="tile-number">{String(quiz.questionCount).padStart(2, "0")}</div>
            <h2>{quiz.title}</h2>
            <p>{quiz.description || "Test yourself with this quiz."}</p>
            <div className="tile-footer">
              <span>{quiz.questionCount} questions</span>
              <Link className="btn small" to={`/quiz/${quiz._id}`}>Take Quiz →</Link>
            </div>
          </article>
        ))}
      </div>

      {!filtered.length && !error && <div className="empty">No quizzes found. Try another search.</div>}
    </main>
  );
}
