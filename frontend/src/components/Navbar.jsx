import { Link, useNavigate } from "react-router-dom";
import { getUser, isLoggedIn, logout } from "../auth.js";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/">Quizly<span>.</span></Link>

      <nav>
        <Link to="/quizzes">Quizzes</Link>
        {isLoggedIn() && <Link to="/create">Create Quiz</Link>}
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="welcome">Hi, {user.name}</span>
            <button className="btn btn-outline small" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline small" to="/login">Login</Link>
            <Link className="btn small" to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
