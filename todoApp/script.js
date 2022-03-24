const form = document.getElementById("form");
const input = document.getElementById("input");
const todosEl = document.querySelector(".todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;
  if (todo) {
      todoText=todo.text
  }
  if (todoText) {
    const todoEl = document.createElement("li");

    if(todo &&  todo.completed){
        todoEl.classList.add('completed');
    }

    todoEl.innerHTML = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todosEl.appendChild(todoEl);
    input.value = "";
    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todo) => {
    todos.push({
      todos: todo.innerText,
      completed: todo.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
