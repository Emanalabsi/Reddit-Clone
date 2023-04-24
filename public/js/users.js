function getFormData(form) {
  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  form.reset();
  return data;
}

const signup = (userData) =>
  postRequest("/api/v1/users/signup", userData, "api/v1/pages/home");

const login = (userData) =>
  postRequest("/api/v1/users/login", userData, "api/v1/pages/home");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signup(getFormData(event.target));
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  login(getFormData(event.target));
});
