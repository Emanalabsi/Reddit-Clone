const signup = (userData) =>
  postRequest("/api/v1/users/signup", userData, "/home");

const login = (userData) =>
  postRequest("/api/v1/users/login", userData, "/home");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signup(getFormData(event.target));
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  login(getFormData(event.target));
});
