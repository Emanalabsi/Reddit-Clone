const allPostsDiv = document.querySelector(".posts");

const renderPostCard = (data) => {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  const leftDiv = document.createElement("div");
  leftDiv.classList.add("left");

  const upvoteButton = document.createElement("a");
  upvoteButton.setAttribute("id", "upvote-button");

  const votesNumber = document.createElement("span");
  votesNumber.classList.add("votes");
  votesNumber.setAttribute("id", "votes-number");

  upvoteButton.addEventListener("click", () => {
    addVote(data.post_id, 1, votesNumber);
    // countVotes(data.post_id, votesNumber);
  });

  const upvoteIcon = document.createElement("i");
  upvoteIcon.classList.add("fas", "fa-arrow-up");

  upvoteButton.appendChild(upvoteIcon);
  leftDiv.appendChild(upvoteButton);

  countVotes(data.post_id, votesNumber);

  leftDiv.appendChild(votesNumber);

  const downvoteButton = document.createElement("a");
  downvoteButton.setAttribute("id", "downvote-button");

  downvoteButton.addEventListener("click", () => {
    addVote(data.post_id, -1, votesNumber);
  });

  const downvoteIcon = document.createElement("i");
  downvoteIcon.classList.add("fas", "fa-arrow-down");

  downvoteButton.appendChild(downvoteIcon);
  leftDiv.appendChild(downvoteButton);

  postDiv.appendChild(leftDiv);

  const rightDiv = document.createElement("div");
  rightDiv.classList.add("right");

  const userDiv = document.createElement("div");
  userDiv.classList.add("user");
  userDiv.style.justifyContent = "space-between";
  userDiv.style.display = "flex";

  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");

  const userImageDiv = document.createElement("div");
  userImageDiv.classList.add("user-image");

  const userImage = document.createElement("img");
  userImage.setAttribute("src", "../images/user.jpg");
  userImageDiv.appendChild(userImage);

  userInfo.appendChild(userImageDiv);

  const userNameDiv = document.createElement("div");
  userNameDiv.classList.add("user-name");

  const postUserName = document.createElement("p");
  postUserName.setAttribute("id", "post-user-name");
  postUserName.textContent = data.comments[0].username;
  userNameDiv.appendChild(postUserName);

  const postCreatedAt = document.createElement("span");
  postCreatedAt.setAttribute("id", "post-createdAt");

  postCreatedAt.textContent = resetTime(data.created_at);
  userNameDiv.appendChild(postCreatedAt);

  userInfo.append(userNameDiv);

  const deleteButtonDiv = document.createElement("div");
  deleteButtonDiv.setAttribute("id", "delete-button-div");

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("id", "delete-button");
  deleteButton.setAttribute("style", "display: none");
  deleteButton.innerHTML = "Delete";
  deleteButtonDiv.appendChild(deleteButton);
  userDiv.append(userInfo);
  userDiv.append(deleteButtonDiv);
  rightDiv.append(userDiv);

  const postBodyDiv = document.createElement("div");
  postBodyDiv.classList.add("post-body");

  const postTitle = document.createElement("p");
  postTitle.classList.add("post-title");
  postTitle.textContent = data.post_title;
  postBodyDiv.appendChild(postTitle);

  const postDescription = document.createElement("p");
  postDescription.classList.add("post-description");
  postDescription.textContent = data.post_description;
  postBodyDiv.appendChild(postDescription);

  const postImageDiv = document.createElement("div");
  postImageDiv.classList.add("post-image");

  if (!data.post_media) {
    postImageDiv.style.display = "none";
  }
  const postBodyImage = document.createElement("img");
  postBodyImage.setAttribute("src", data.post_media);
  postImageDiv.append(postBodyImage);

  postBodyDiv.appendChild(postImageDiv);
  rightDiv.appendChild(postBodyDiv);

  const postComments = document.createElement("div");
  postComments.classList.add("post-comments");
  //
  // const commentDiv = createComment(data.data);

  const commentsLink = document.createElement("a");
  commentsLink.addEventListener("click", () => {
    data.comments.length === 0
      ? console.log("no comments")
      : commentDiv.classList.toggle("comment-show");
  });
  const commentsIcon = document.createElement("i");
  commentsIcon.classList.add("fas", "fa-comments");
  commentsLink.appendChild(commentsIcon);

  const commentsText = document.createTextNode("show comments");
  commentsLink.appendChild(commentsText);

  postComments.appendChild(commentsLink);

  const commentForm = document.createElement("form");
  commentForm.className = "comment-form";
  const commentTextArea = document.createElement("input");
  commentTextArea.setAttribute("type", "text");
  // commentTextArea.className = "comment-text";
  commentTextArea.name = "content";
  commentTextArea.placeholder = "What are your thoughts?";

  commentForm.appendChild(commentTextArea);

  const commentButton = document.createElement("button");
  commentButton.className = "comment-button";
  commentButton.textContent = "comment";

  commentButton.addEventListener("click", (event) => {
    const commentValue = { content: commentTextArea.value };
    event.preventDefault();
    fetch(`/api/v1/comments/${data.post_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(commentValue),
    })
      .then((result) => result.json())
      .then((data) => createComment(data.data));
  });
  commentForm.appendChild(commentButton);

  postComments.appendChild(commentForm);

  // postComments.appendChild(commentDiv);
  rightDiv.append(postComments);

  postDiv.append(leftDiv);
  postDiv.append(rightDiv);
  allPostsDiv.prepend(postDiv);
};

const renderAllPosts = (posts) => {
  allPostsDiv.textContent = "";
  console.log(posts);
  posts.message.forEach((post) => {
    return renderPostCard(post);
  });
};

const createComment = (data) => {
  const user = document.createElement("p");
  user.textContent = data.username;

  const userName = document.createElement("div");
  userName.classList.add("user-name");

  userName.appendChild(user);

  const commenterImage = document.createElement("div");
  commenterImage.classList.add("user-image");

  const commentUser = document.createElement("div");
  commentUser.classList.add("comment-user");

  commentUser.appendChild(commenterImage);
  commentUser.appendChild(userName);

  const commentText = document.createElement("div");
  commentText.classList.add("comment-text");

  if (data.content != null) {
    commentText.innerHTML = `<p>${data.content}</p>`;
    commenterImage.innerHTML = '<img src="/images/user.jpg">';
  }

  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");

  commentDiv.appendChild(commentUser);
  commentDiv.appendChild(commentText);

  return commentDiv;
};

const addVote = (postId, vote, votesNumber) => {
  return fetch(`/api/v1/votes/${postId}/${vote}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((data) => countVotes(data.data[0].post_id, votesNumber));
};

const countVotes = (postId, votesNumber) => {
  fetch(`/api/v1/votes/count/${postId}`)
    .then((result) => result.json())
    .then((data) => (votesNumber.textContent = data.data.voteCount));
};

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
    .catch((err) => console.log(err));
  location.reload();
});

fetch("/api/v1/posts")
  .then((result) => result.json())
  .then((data) => renderAllPosts(data))
  .then(console.log);
