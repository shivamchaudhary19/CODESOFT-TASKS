import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api.js";

export default function TakeQuiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getQuiz(id)
      .then(data => {
        setQuiz(data.quiz);
        setAnswers(new Array(data.quiz.questions.length).fill(null));
      })
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <main className="page"><div className="alert">{error}</div></main>;
  if (!quiz) return <main className="page"><div className="loading">Loading quiz...</div></main>;

  const question = quiz.questions[current];

  const choose = (index) => {
    if (submitted) return;
    setAnswers(prev => {
      const copy = [...prev];
      copy[current] = index;
      return copy;
    });
  };

  const score = answers.reduce((total, answer, index) =>
    total + (answer === quiz.questions[index].correctAnswer ? 1 : 0), 0
  );

  if (submitted) {
    return (
      <main className="page narrow">
        <section className="result-card">
          <span className="eyebrow">QUIZ COMPLETE</span>
          <div className="score">{score}<small>/{quiz.questions.length}</small></div>
          <h1>{score === quiz.questions.length ? "Perfect score!" : "Nice work!"}</h1>
          <p>You answered {score} out of {quiz.questions.length} questions correctly.</p>
          <div className="result-actions">
            <button className="btn" onClick={() => { setSubmitted(false); setCurrent(0); setAnswers(new Array(quiz.questions.length).fill(null)); }}>Try Again</button>
            <Link className="btn btn-outline" to="/quizzes">Back to Quizzes</Link>
          </div>
        </section>

        <section className="answer-review">
          <h2>Answer Review</h2>
          {quiz.questions.map((q, index) => (
            <div className="review-item" key={q._id}>
              <strong>{index + 1}. {q.question}</strong>
              <p className={answers[index] === q.correctAnswer ? "correct" : "wrong"}>
                Your answer: {answers[index] !== null ? q.options[answers[index]] : "Not answered"}
              </p>
              {answers[index] !== q.correctAnswer && <p className="correct">Correct answer: {q.options[q.correctAnswer]}</p>}
            </div>
          ))}
        </section>
      </main>
    );
  }

  return (
    <main className="page narrow">
      <div className="quiz-progress">
        <div><span>{quiz.title}</span><strong>{current + 1} / {quiz.questions.length}</strong></div>
        <div className="progress-track"><div style={{width: `${((current + 1) / quiz.questions.length) * 100}%`}} /></div>
      </div>

      <section className="take-card">
        <span className="eyebrow">QUESTION {current + 1}</span>
        <h1>{question.question}</h1>

        <div className="answer-options">
          {question.options.map((option, index) => (
            <button
              className={`answer-option ${answers[current] === index ? "selected" : ""}`}
              onClick={() => choose(index)}
              key={index}
            >
              <span>{String.fromCharCode(65 + index)}</span>{option}
            </button>
          ))}
        </div>

        <div className="quiz-nav">
          <button className="btn btn-outline" disabled={current === 0} onClick={() => setCurrent(current - 1)}>← Previous</button>
          {current === quiz.questions.length - 1 ? (
            <button className="btn" disabled={answers[current] === null} onClick={() => setSubmitted(true)}>Submit Quiz</button>
          ) : (
            <button className="btn" disabled={answers[current] === null} onClick={() => setCurrent(current + 1)}>Next →</button>
          )}
        </div>
      </section>
    </main>
  );
}
