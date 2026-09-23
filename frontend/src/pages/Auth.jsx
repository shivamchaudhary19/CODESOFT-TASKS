import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../api.js";
import { saveSession } from "../auth.js";

export default function Auth({ mode }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = isRegister ? await api.register(form) : await api.login({
        email: form.email,
        password: form.password
      });
      saveSession(data);
      navigate(location.state?.from || "/quizzes");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="form-card" onSubmit={submit}>
        <span className="eyebrow">{isRegister ? "GET STARTED" : "WELCOME BACK"}</span>
        <h1>{isRegister ? "Create your account" : "Login to Quizly"}</h1>
        <p className="muted">{isRegister ? "Create quizzes and take quizzes made by others." : "Continue your quiz journey."}</p>

        {error && <div className="alert">{error}</div>}

        {isRegister && (
          <label>Name<input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" /></label>
        )}
        <label>Email<input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" /></label>
        <label>Password<input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="At least 6 characters" /></label>

        <button className="btn full" disabled={loading}>{loading ? "Please wait..." : isRegister ? "Create Account" : "Login"}</button>

        <p className="switch-text">
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <Link to={isRegister ? "/login" : "/register"}>{isRegister ? "Login" : "Register"}</Link>
        </p>
      </form>
    </main>
  );
}
