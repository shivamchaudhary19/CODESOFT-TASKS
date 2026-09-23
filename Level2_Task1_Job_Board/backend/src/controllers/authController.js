import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function tokenFor(user) {
  return jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role, companyName: user.companyName, headline: user.headline, skills: user.skills, location: user.location };
}

export async function register(req, res) {
  try {
    const { name, email, password, role = "candidate", companyName = "" } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: "Name, email and password are required" });
    if (!/[A-Za-z]/.test(password) || password.length < 6) return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    if (!["candidate", "employer"].includes(role)) return res.status(400).json({ success: false, message: "Invalid role" });
    if (role === "employer" && !companyName.trim()) return res.status(400).json({ success: false, message: "Company name is required for employers" });
    if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ success: false, message: "An account with this email already exists" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), password: passwordHash, role, companyName: role === "employer" ? companyName : "" });
    res.status(201).json({ success: true, message: "Account created", token: tokenFor(user), user: publicUser(user) });
  } catch (error) { res.status(500).json({ success: false, message: "Registration failed" }); }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user || !(await bcrypt.compare(password || "", user.password))) return res.status(401).json({ success: false, message: "Invalid email or password" });
    res.json({ success: true, message: "Login successful", token: tokenFor(user), user: publicUser(user) });
  } catch { res.status(500).json({ success: false, message: "Login failed" }); }
}

export async function me(req, res) { res.json({ success: true, user: publicUser(req.user) }); }

export async function updateProfile(req, res) {
  const allowed = ["name", "headline", "skills", "location", "companyName"];
  const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select("-password");
  res.json({ success: true, user: publicUser(user) });
}
