import { Link } from "react-router-dom";
import { isLoggedIn } from "../auth.js";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div>
          <span className="eyebrow">ONLINE QUIZ MAKER</span>
          <h1>Create. Take.<br /><span>Learn.</span></h1>
          <p>
            Create your own multiple-choice quizzes or challenge yourself with quizzes
            created by other users. Get your score and instant feedback.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/quizzes">Browse Quizzes</Link>
            <Link className="btn btn-outline" to={isLoggedIn() ? "/create" : "/register"}>
              Create a Quiz
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="quiz-card-top">
            <span>Quick Challenge</span>
            <span>01 / 05</span>
          </div>
          <h3>Which language runs in a web browser?</h3>
          {["Python", "Java", "JavaScript", "C++"].map((option, index) => (
            <div className={`mock-option ${index === 2 ? "selected" : ""}`} key={option}>
              <span>{String.fromCharCode(65 + index)}</span>{option}
            </div>
          ))}
        </div>
      </section>

      <section className="features">
        <article><div className="feature-icon">✦</div><h3>Create quizzes</h3><p>Add questions, four choices, and select the correct answer.</p></article>
        <article><div className="feature-icon">✓</div><h3>Take quizzes</h3><p>Answer one question at a time and get your score immediately.</p></article>
        <article><div className="feature-icon">↗</div><h3>Track results</h3><p>Review your score and see which answers were correct.</p></article>
      </section>
    </main>
  );
}
