import { Link, NavLink } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const { user, logout } = useAuth();
  return <header className="nav"><div className="container nav-inner"><Link to="/" className="brand"><span>JN</span> JobNest</Link><nav><NavLink to="/jobs">Browse Jobs</NavLink>{user?.role === "candidate" && <NavLink to="/candidate">My Dashboard</NavLink>}{user?.role === "employer" && <NavLink to="/employer">Employer Dashboard</NavLink>}</nav><div className="nav-actions">{user ? <><span className="welcome">Hi, {user.name.split(" ")[0]}</span><button className="btn ghost small" onClick={logout}>Logout</button></> : <><Link className="btn ghost small" to="/login">Login</Link><Link className="btn small" to="/register">Get Started</Link></>}</div></div></header>;
}
