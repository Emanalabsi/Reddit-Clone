const signupBtn = document.querySelector(".signup");

signupBtn.addEventListener("click", fetch("/signup").then(console.log));
