import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth({ mode }) {
  const { login, register } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const params = new URLSearchParams(loc.search);
  const [role, setRole] = useState(
    params.get("role") === "employer" ? "employer" : "candidate"
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      if (mode === "register") {
        await register({ ...form, role });

        nav(role === "employer" ? "/employer" : "/candidate");
      } else {
        const result = await login({
          email: form.email,
          password: form.password,
        });

        // Use the actual role stored on the authenticated account.
        // The selected role is only for the login UI.
        nav(result.user.role === "employer" ? "/employer" : "/candidate");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">
          {mode === "register" ? "GET STARTED" : "WELCOME BACK"}
        </span>

        <h1>
          {mode === "register" ? "Create your account" : "Sign in to JobNest"}
        </h1>

        <p>
          {mode === "register"
            ? "Choose your path and start using the job board."
            : "Choose how you want to access JobNest."}
        </p>

        {error && <div className="alert">{error}</div>}

        {/* Role selection is available for both Register and Login */}
        <div className="role-toggle">
          <button
            className={role === "candidate" ? "active" : ""}
            onClick={() => setRole("candidate")}
            type="button"
          >
            Candidate
          </button>

          <button
            className={role === "employer" ? "active" : ""}
            onClick={() => setRole("employer")}
            type="button"
          >
            Employer
          </button>
        </div>

        <form onSubmit={submit}>
          {mode === "register" && (
            <label>
              Full name
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </label>

          <label>
            Password
            <input
              type="password"
              required
              minLength="6"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </label>

          {mode === "register" && role === "employer" && (
            <label>
              Company name
              <input
                required
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
              />
            </label>
          )}

          <button className="btn full" disabled={busy}>
            {busy
              ? "Please wait…"
              : mode === "register"
              ? "Create Account"
              : `Login as ${role === "employer" ? "Employer" : "Candidate"}`}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "register" ? (
            <>
              Already have an account? <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              New here? <Link to="/register">Create an account</Link>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
