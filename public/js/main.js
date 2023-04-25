const signupButton = document.querySelector("#signup-button");
const loginButton = document.querySelector("#login-button");

const loginModal = document.querySelector("#login-modal");
const signupModal = document.querySelector("#signup-modal");

const signupForm = document.querySelector("#signup");
const loginForm = document.querySelector("#login");

const closeModalButtons = document.getElementsByClassName("close");

signupButton.addEventListener("click", () => {
  signupModal.style.display = "block";
});

loginButton.addEventListener("click", () => {
  loginModal.style.display = "block";
});

window.addEventListener("click", (event) => {
  if (event.target === loginModal) {
    loginModal.style.display = "none";
  } else if (event.target === signupModal) {
    signupModal.style.display = "none";
  }
});

for (const button of closeModalButtons) {
  button.addEventListener("click", (event) => {
    const target = event.target.parentNode.parentNode.parentNode;
    if (target === loginModal) {
      loginModal.style.display = "none";
    } else if (target === signupModal) {
      signupModal.style.display = "none";
    }
  });
}
