import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { if (localStorage.getItem("job_token")) api.me().then(r => setUser(r.user)).catch(() => localStorage.removeItem("job_token")).finally(() => setLoading(false)); else setLoading(false); }, []);
  const login = async body => { const r = await api.login(body); localStorage.setItem("job_token", r.token); setUser(r.user); return r; };
  const register = async body => { const r = await api.register(body); localStorage.setItem("job_token", r.token); setUser(r.user); return r; };
  const logout = () => { localStorage.removeItem("job_token"); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
