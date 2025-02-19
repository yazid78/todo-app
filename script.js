const input = document.querySelector(".input");
const list = document.querySelector(".list");
const emptyList = document.getElementById("emptyList");
const add = document.querySelector(".containerInput button");
const count = document.querySelector(".count p");
const active = document.getElementById("active");
const all = document.getElementById("all");
const completed = document.getElementById("completed");
const clearCompleted = document.getElementById("clearCompleted");
const switchMode = document.querySelector(".light");

let number = 0;

function saveTodos() {
  const todos = [];
  document.querySelectorAll(".todo").forEach((todo) => {
    todos.push({
      text: todo.querySelector(".text").textContent,
      completed: todo.querySelector(".checkbox").checked,
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodo(text, completed = false) {
  if (emptyList) {
    emptyList.remove();
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = completed;

  const close = document.createElement("img");
  close.src = "./images/icon-cross.svg";
  close.classList.add("close");

  const todo = document.createElement("li");
  todo.classList.add("todo");
  todo.setAttribute("draggable", "true");

  const textTodo = document.createElement("p");
  textTodo.classList.add("text");
  textTodo.textContent = text;
  textTodo.style.textDecoration = completed ? "line-through" : "none";

  list.appendChild(todo);
  todo.appendChild(textTodo);
  todo.prepend(checkbox);
  todo.appendChild(close);

  number++;
  count.textContent = number + " items";

  saveTodos();

  close.addEventListener("click", () => {
    todo.remove();
    number--;
    count.textContent = number + " items";
    saveTodos();
  });

  checkbox.addEventListener("change", () => {
    textTodo.style.textDecoration = checkbox.checked ? "line-through" : "none";
    saveTodos();
  });
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    createTodo(todo.text, todo.completed);
  });
}

document.addEventListener("DOMContentLoaded", loadTodos);

input.addEventListener("keypress", (e) => {
  if (e.keyCode === 13 && input.value.trim() !== "") {
    createTodo(input.value);
    input.value = "";
  }
});

add.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    createTodo(input.value);
    input.value = "";
  }
});
