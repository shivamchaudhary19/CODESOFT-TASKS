import { Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Auth from "./pages/Auth";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import { useAuth } from "./context/AuthContext";
function Protected({ role, children }) { const { user, loading } = useAuth(); if (loading) return <main className="section"><div className="container empty">Loading…</div></main>; if (!user) return <Navigate to="/login" replace/>; if (role && user.role !== role) return <Navigate to="/" replace/>; return children; }
export default function App(){return <><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/jobs" element={<Jobs/>}/><Route path="/jobs/:id" element={<JobDetail/>}/><Route path="/login" element={<Auth mode="login"/>}/><Route path="/register" element={<Auth mode="register"/>}/><Route path="/candidate" element={<Protected role="candidate"><CandidateDashboard/></Protected>}/><Route path="/employer" element={<Protected role="employer"><EmployerDashboard/></Protected>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes><footer>JobNest · CODSOFT Level 2 Task 1</footer></>}
