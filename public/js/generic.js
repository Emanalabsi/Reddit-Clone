function getFormData(form) {
  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  form.reset();
  return data;
}

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
