const allPostsDiv = document.querySelector(".posts");

fetch("/api/v1/posts")
  .then((result) => result.json())
  .then((data) => renderAllPosts(data));

const resetTime = (creationTime) => {
  let theTime = "";
  const now = Date.now();
  const timesTamp = new Date(creationTime);
  const melSecond = now - timesTamp.getTime();
  const toMinutes = Math.floor(melSecond / (1000 * 60));
  const toHours = Math.floor(melSecond / (1000 * 60 * 60));

  if (melSecond < 1000 * 60 * 60) {
    theTime = `${toMinutes} minutes ago `;
  } else if (melSecond < 1000 * 60 * 60 * 24) {
    theTime = `${toHours} hours ago `;
  } else {
    theTime = timesTamp.toISOString().slice(0, 10);
  }

  return theTime;
};

const renderPostCard = (data) => {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  const leftDiv = document.createElement("div");
  leftDiv.classList.add("left");

  const upvoteLink = document.createElement("a");
  upvoteLink.setAttribute("href", "#");
  upvoteLink.setAttribute("id", "upvote-button");
  leftDiv.append(upvoteLink);

  const upvoteIcon = document.createElement("i");
  upvoteIcon.classList.add("fas", "fa-arrow-up");
  leftDiv.append(upvoteIcon);

  const votesSpan = document.createElement("span");
  votesSpan.classList.add("votes");
  votesSpan.setAttribute("id", "votes-number");
  votesSpan.innerHTML = "45.3k";
  leftDiv.append(votesSpan);

  const downvoteLink = document.createElement("a");
  downvoteLink.setAttribute("href", "#");
  downvoteLink.setAttribute("id", "downvote-button");
  leftDiv.append(downvoteLink);

  const downvoteIcon = document.createElement("i");
  downvoteIcon.classList.add("fas", "fa-arrow-down");
  leftDiv.append(downvoteIcon);

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
  userInfo.appendChild(userImageDiv);

  const userImage = document.createElement("img");
  userImage.setAttribute("src", "../images/");
  userImageDiv.appendChild(userImage);
  userInfo.appendChild(userImage);

  const userNameDiv = document.createElement("div");
  userNameDiv.classList.add("user-name");

  const postUserName = document.createElement("p");
  postUserName.setAttribute("id", "post-user-name");
  postUserName.innerHTML = data.comments[0].username;
  userNameDiv.appendChild(postUserName);

  const postCreatedAt = document.createElement("span");
  postCreatedAt.setAttribute("id", "post-createdAt");
  postCreatedAt.innerHTML = resetTime(resetTime(data.created_at));
  userNameDiv.appendChild(postCreatedAt);

  const postImage = document.createElement("img");
  postImage.setAttribute("src", data.post_media);
  postImage.setAttribute("alt", "");
  userInfo.appendChild(postImage);
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

  const postBody = document.createElement("p");
  postBody.setAttribute("id", "post-body2");
  postBody.innerHTML = data.post_description;
  postBodyDiv.appendChild(postBody);

  const postImageDiv = document.createElement("div");
  postImageDiv.setAttribute("id", "post-image2");
  postImageDiv.classList.add("post-image");

  const postBodyImage = document.createElement("img");
  postBodyImage.setAttribute(
    "src",
    "https://images.unsplash.com/photo-1682079470276-619657e2a48b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=489&q=80"
  );
  postBodyDiv.append(postBodyImage);

  postBodyDiv.appendChild(postImageDiv);
  rightDiv.appendChild(postBodyDiv);

  const postCommentsDiv = document.createElement("div");
  postCommentsDiv.className = "post-comments";

  const newCommentDiv = document.createElement("div");
  newCommentDiv.className = "new-comment-div";

  const commentForm = document.createElement("form");
  commentForm.action = "";

  const commentInput = document.createElement("textarea");
  commentInput.name = "body";
  commentInput.id = "comment-body-input";
  commentInput.placeholder = "What are your thoughts?";
  commentInput.cols = "30";
  commentInput.rows = "10";

  commentForm.appendChild(commentInput);

  const commentsButtonIcon = document.createElement("div");
  commentsButtonIcon.className = "comments-button-icon";

  const showCommentsLink = document.createElement("a");
  showCommentsLink.href = "#";
  showCommentsLink.id = "post-comments";

  const showCommentsIcon = document.createElement("i");
  showCommentsIcon.className = "fas fa-comments";

  showCommentsLink.appendChild(showCommentsIcon);

  const showCommentsText = document.createTextNode("show comments");

  showCommentsLink.appendChild(showCommentsText);

  commentsButtonIcon.appendChild(showCommentsLink);

  const commentSubmitButton = document.createElement("button");
  commentSubmitButton.type = "submit";
  commentSubmitButton.className = "comment-button";
  commentSubmitButton.id = "save-comment-button";
  commentSubmitButton.style.marginTop = "0";

  const commentSubmitText = document.createTextNode("Comment");

  commentSubmitButton.appendChild(commentSubmitText);

  commentForm.appendChild(commentsButtonIcon);
  commentForm.appendChild(commentSubmitButton);

  newCommentDiv.appendChild(commentForm);

  postCommentsDiv.appendChild(newCommentDiv);
  const posts = document.querySelector(".posts");
  rightDiv.appendChild(postCommentsDiv);

  postDiv.append(leftDiv);
  postDiv.append(rightDiv);
  posts.appendChild(postDiv);
};

const renderAllPosts = (posts) => {
  allPostsDiv.textContent = "";
  console.log(posts);
  posts.message.forEach((post) => {
    return renderPostCard(post);
  });
};

const showComment = (comment) => {
  const user = document.createElement("p");
  user.textContent = comment.name;

  const createAt = document.createElement("span");
  createAt.textContent = moment(comment.created_at).fromNow();

  const userName = document.createElement("div");
  userName.classList.add("user-name");
  userName.appendChild(user);
  userName.appendChild(createAt);

  const userImage = document.createElement("div");
  userImage.classList.add("user-image");
  userImage.innerHTML = '<img src="/images/avatar.png">';

  const commentUser = document.createElement("div");
  commentUser.classList.add("comment-user");
  commentUser.appendChild(userImage);
  commentUser.appendChild(userName);

  const commentText = document.createElement("div");
  commentText.classList.add("comment-text");
  commentText.innerHTML = `<p>${comment.body}</p>`;

  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");
  commentDiv.appendChild(commentUser);
  commentDiv.appendChild(commentText);

  commentsDiv.appendChild(commentDiv);
};
