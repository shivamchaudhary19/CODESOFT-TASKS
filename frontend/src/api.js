const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("quiz_token");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const api = {
  register: (body) => request("/auth/register", {
    method: "POST",
    body: JSON.stringify(body)
  }),
  login: (body) => request("/auth/login", {
    method: "POST",
    body: JSON.stringify(body)
  }),
  getQuizzes: () => request("/quizzes"),
  getQuiz: (id) => request(`/quizzes/${id}`),
  createQuiz: (body) => request("/quizzes", {
    method: "POST",
    body: JSON.stringify(body)
  })
};
