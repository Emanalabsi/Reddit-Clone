const getFormInputs = (form) => {
  const inputs = form.querySelectorAll("input");
  const data = {};
  inputs.forEach((element) => {
    data[element.name] = element.value;
  });
  return data;
};

const signup = (userData) =>
  postRequest("/api/v1/users/signup", { ...userData });

const login = (userData) => {
  postRequest("/api/v1/users/login", { ...userData });
};

signupForm.addEventListener("click", (event) => {
  signup(getFormInputs(event.target));
});

loginForm.addEventListener("click", (event) => {
  login(getFormInputs(event.target));
});
