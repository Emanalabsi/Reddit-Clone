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

const postRequest = (url, data, redirectUrl) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      if (data.message === "Logged in successfully") {
        window.location.href = redirectUrl;
      } else if (data.data.massage === "user created successfully") {
        window.location.href = redirectUrl;
      }
    })
    .catch((error) => console.log(error));
};
