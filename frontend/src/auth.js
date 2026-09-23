export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("quiz_user") || "null");
  } catch {
    return null;
  }
};

export const saveSession = (data) => {
  localStorage.setItem("quiz_token", data.token);
  localStorage.setItem("quiz_user", JSON.stringify(data.user));
};

export const logout = () => {
  localStorage.removeItem("quiz_token");
  localStorage.removeItem("quiz_user");
};

export const isLoggedIn = () => Boolean(localStorage.getItem("quiz_token"));
