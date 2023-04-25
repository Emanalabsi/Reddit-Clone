const allPostsDiv = document.querySelector(".posts");
const addPostForm = document.querySelector("#addPostForm");

const addPostButton = document.querySelector("#add-post");
const newPostModal = document.querySelector("#new-post-modal");

const closeModalButton = document.querySelector(".close");

closeModalButton.addEventListener("click", (event) => {
  const target = event.target.parentNode.parentNode.parentNode;
  if (target === newPostModal) {
    newPostModal.style.display = "none";
  }
});
addPostButton.addEventListener("click", () => {
  newPostModal.style.display = "block";
});

addPostForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = getFormData(event.target);
  fetch("/api/v1/posts/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((result) => result.json())
    .then(console.log);
});

window.addEventListener("click", (event) => {
  if (event.target === newPostModal) {
    newPostModal.style.display = "none";
  }
});
