const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("job_token");
  const isForm = options.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...(isForm ? {} : { "Content-Type": "application/json" }), ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const api = {
  register: body => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: body => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => request("/auth/me"),
  updateProfile: body => request("/auth/profile", { method: "PATCH", body: JSON.stringify(body) }),
  jobs: params => request(`/jobs${params ? `?${new URLSearchParams(params)}` : ""}`),
  job: id => request(`/jobs/${id}`),
  createJob: body => request("/jobs", { method: "POST", body: JSON.stringify(body) }),
  updateJob: (id, body) => request(`/jobs/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteJob: id => request(`/jobs/${id}`, { method: "DELETE" }),
  employerJobs: () => request("/jobs/mine"),
  apply: (jobId, formData) => request(`/applications/jobs/${jobId}`, { method: "POST", body: formData }),
  myApplications: () => request("/applications/mine"),
  employerApplications: () => request("/applications/employer"),
  updateApplication: (id, status) => request(`/applications/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
  resumeUrl: id => `${API_URL}/applications/${id}/resume`
};
