"use strict";

const addBtn = document.getElementById("btn-add");
const taskInput = document.getElementById("input-task");
const todoListEl = document.getElementById("todo-list");

class TaskCl {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

const currentUser = JSON.parse(getFromStorage("currentUser"));
const todoArr = JSON.parse(getFromStorage("todoArr"))
  ? JSON.parse(getFromStorage("todoArr"))
  : [];

if (currentUser) {
  renderTodoList(todoArr);

  // add task
  addBtn.addEventListener("click", function () {
    const data = {
      task: taskInput.value,
      owner: currentUser.userName,
      isDone: false,
    };
    todoArr.push(data);
    saveToStorage("todoArr", JSON.stringify(todoArr));
    taskInput.value = "";
    renderTodoList(todoArr);
  });

  // render task
  function renderTodoList(todoArr) {
    todoListEl.innerHTML = "";
    todoArr.forEach(function (todo) {
      if (todo.owner === currentUser.userName) {
        const todoCheck = todo.isDone ? "checked" : "";
        const html = `<li class=${todoCheck}>${todo.task}<span class="close">×</span>
  </li>`;
        todoListEl.insertAdjacentHTML("beforeend", html);
      }
    });
  }

  todoListEl.addEventListener("click", function (e) {
    // toggle task
    todoArr.forEach(function (todo) {
      if (
        !e.target.textContent.indexOf(todo.task) &&
        todo.owner === currentUser.userName
      ) {
        todo.isDone = e.target.classList.contains("checked") ? false : true;
      }
    });

    // delete task
    if (e.target.classList.contains("close")) {
      todoArr.forEach(function (todo) {
        if (
          !e.target.parentElement.textContent.indexOf(todo.task) &&
          todo.owner === currentUser.userName
        ) {
          const todoIndex = todoArr.indexOf(todo);
          todoArr.splice(todoIndex, 1);
        }
      });
    }
    saveToStorage("todoArr", JSON.stringify(todoArr));
    renderTodoList(todoArr);
  });
} else {
  alert("Please Log in!");
}
