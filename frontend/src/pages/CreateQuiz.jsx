import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";

const blankQuestion = () => ({
  question: "",
  options: ["", "", "", ""],
  correctAnswer: 0
});

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([blankQuestion()]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const updateQuestion = (index, value) => {
    setQuestions(prev => prev.map((q, i) => i === index ? {...q, question: value} : q));
  };

  const updateOption = (qIndex, optionIndex, value) => {
    setQuestions(prev => prev.map((q, i) => {
      if (i !== qIndex) return q;
      const options = [...q.options];
      options[optionIndex] = value;
      return {...q, options};
    }));
  };

  const setCorrect = (qIndex, answer) => {
    setQuestions(prev => prev.map((q, i) => i === qIndex ? {...q, correctAnswer: Number(answer)} : q));
  };

  const addQuestion = () => setQuestions(prev => [...prev, blankQuestion()]);

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const data = await api.createQuiz({ title, description, questions });
      navigate(`/quiz/${data.quiz._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page narrow">
      <div className="page-heading">
        <div>
          <span className="eyebrow">QUIZ CREATOR</span>
          <h1>Build your quiz</h1>
          <p>Add questions with four choices and mark the correct answer.</p>
        </div>
      </div>

      <form onSubmit={submit}>
        {error && <div className="alert">{error}</div>}

        <div className="form-card">
          <label>Quiz title<input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. JavaScript Basics" required /></label>
          <label>Description<textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What is this quiz about?" /></label>
        </div>

        {questions.map((q, index) => (
          <section className="question-editor" key={index}>
            <div className="editor-heading">
              <h2>Question {index + 1}</h2>
              {questions.length > 1 && <button type="button" className="text-button danger" onClick={() => removeQuestion(index)}>Remove</button>}
            </div>
            <label>Question<input value={q.question} onChange={e => updateQuestion(index, e.target.value)} placeholder="Write your question..." required /></label>

            <div className="options-editor">
              {q.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  Option {String.fromCharCode(65 + optionIndex)}
                  <input value={option} onChange={e => updateOption(index, optionIndex, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`} required />
                </label>
              ))}
            </div>

            <label>Correct answer
              <select value={q.correctAnswer} onChange={e => setCorrect(index, e.target.value)}>
                {q.options.map((_, i) => <option value={i} key={i}>Option {String.fromCharCode(65 + i)}</option>)}
              </select>
            </label>
          </section>
        ))}

        <div className="create-actions">
          <button type="button" className="btn btn-outline" onClick={addQuestion}>+ Add Question</button>
          <button className="btn" disabled={saving}>{saving ? "Publishing..." : "Publish Quiz"}</button>
        </div>
      </form>
    </main>
  );
}
