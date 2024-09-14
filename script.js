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
function createTodo() {
  if (emptyList) {
    emptyList.remove();
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  const close = document.createElement("img");
  close.src = "./images/icon-cross.svg";
  close.classList.add("close");

  const todo = document.createElement("li");
  todo.classList.add("todo");
  todo.setAttribute("draggable", "true");

  const textTodo = document.createElement("p");
  textTodo.classList.add("text");
  textTodo.textContent = input.value;

  list.appendChild(todo);
  todo.appendChild(textTodo);
  todo.prepend(checkbox);
  todo.appendChild(close);
  number++;
  count.textContent = number + " items";

  todo.addEventListener("dragstart", () => {
    todo.classList.add("dragging");
  });

  todo.addEventListener("dragend", () => {
    todo.classList.remove("dragging");
  });

  list.addEventListener("dragover", (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(event.clientY);
    const draggingItem = document.querySelector(".dragging");
    if (!afterElement) {
      list.appendChild(draggingItem);
    } else {
      list.insertBefore(draggingItem, afterElement);
    }
  });

  close.addEventListener("click", () => {
    todo.remove();

    const checkbox = todo.querySelector(".checkbox");
    const isChecked = checkbox.checked;
    if (!isChecked) {
      number--;
    }
    number = Math.max(number, 0);
    count.textContent = number + " items";
  });

  checkbox.addEventListener("click", () => {
    if (!checkbox.checked) {
      number++;
      textTodo.style.textDecoration = "none";
    } else {
      number--;
      textTodo.style.textDecoration = "line-through";
    }

    count.textContent = number + " items";
  });
  all.addEventListener("click", () => {
    document.querySelectorAll(".todo").forEach((todo) => {
      todo.style.display = "flex";
    });
  });
  active.addEventListener("click", () => {
    if (!checkbox.checked) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
  completed.addEventListener("click", () => {
    if (!checkbox.checked) {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
  clearCompleted.addEventListener("click", () => {
    if (checkbox.checked) {
      todo.remove();
    }
  });
  input.value = "";
}

function getDragAfterElement(y) {
  const draggableElements = document.querySelectorAll(".todo:not(.dragging)");
  let closestElement = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < draggableElements.length; i++) {
    const child = draggableElements[i];
    const box = child.getBoundingClientRect();
    const offset = y - (box.top + box.height / 2);

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestElement = child;
    }
  }

  return closestElement;
}

input.addEventListener("keypress", (e) => {
  if (e.keyCode === 13 && input.value.trim() !== "") {
    createTodo();
  }
});

add.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    createTodo();
  }
});

function changeMode() {
  let toggleTheme = true;

  switchMode.addEventListener("click", () => {
    if (toggleTheme) {
      switchMode.src = "./images/icon-moon.svg";
      toggleTheme++;
    } else {
      toggleTheme--;
    }
  });
}

let toggleTheme = true;

switchMode.addEventListener("click", () => {
  console.log("re");
  if (toggleTheme === true) {
    switchMode.src = "./images/icon-moon.svg";
    document.querySelector("body").style.setProperty("background-color", "hsl(236, 33%, 92%)");
    document.querySelector("body").style.setProperty("background-color", "hsl(236, 33%, 92%)");
    document.querySelector(".headerImg").src = "./images/bg-desktop-light.jpg";
    document.querySelector(".list li").style.color = "gray";

    toggleTheme = false;
  } else {
    toggleTheme = true;
    switchMode.src = "./images/icon-sun.svg";
    document.querySelector("body").style.setProperty("background-color", "");
    document.querySelector(".headerImg").src = "./images/bg-desktop-dark.jpg";
  }
});
