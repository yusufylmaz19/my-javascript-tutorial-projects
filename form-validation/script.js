const name = document.getElementById("name");
const password = document.getElementById("password");
const error = document.getElementById("error");

const button = document.getElementById("button");

form.addEventListener("submit", (e) => {
  let messages = [];
  if (name.value === "" || name.value === null) {
    messages.push("Write Your name");
  }

  if (password.value.length <=6) {
    messages.push('password must be longer than 6 charachters')
  }
  if (messages.length > 0) {
    e.preventDefault();
    error.innerText = messages.join(",");
  }
});
