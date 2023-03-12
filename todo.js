let tasks = [];
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

function fetchTodos() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then((data) => {
      tasks = data.slice(0, 10);
      renderList();
    })
    .catch((error) => console.log("Error: ", error));
}

// adding task to dom
function addTaskToDOM(task) {
  const li = document.createElement("li");

  li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${
    task.completed ? "checked" : ""
  } class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="bin.svg" class="delete" id="${task.id}">
    `;

  taskList.append(li);
}

// rendering the task list
function renderList() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    addTaskToDOM(tasks[i]);
  }

  tasksCounter.innerHTML = tasks.length;
}

// toggling the task from mark as completed to not completed
function toggleTask(taskId) {
  const task = tasks.filter((task) => {
    return task.id === Number(taskId);
  });

  if (task.length > 0) {
    const currentTask = task[0];

    currentTask.completed = !currentTask.completed;
    renderList();
    showNotification("Task toggled successfully!");
    return;
  }

  showNotification("Could not toggle the task");
}

// deleting a task
function deleteTask(taskId) {
  const newTasks = tasks.filter((task) => {
    return task.id !== Number(taskId);
  });

  tasks = newTasks;
  renderList();
  showNotification("Task deleted successfully");
}

// adding a task to tasks list
function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task added successfully!");
    return;
  }

  showNotification("Task can not be added");
}

// showing alert notification
function showNotification(text) {
  alert(text);
}

// handling the input from input box
function handleInputKeyPress(e) {
  if (e.key === "Enter") {
    const text = e.target.value;
    console.log(text);
    if (!text) {
      showNotification("Task text can not be empty");
      return;
    }

    const task = {
      title: text,
      id: Date.now().toString(),
      completed: false,
    };

    e.target.value = "";
    addTask(task);
  }
}

// adding click listener to delete icon and checkbox by event delegation process
function handleClickListener(e) {
  console.log(target);

  if (target.className === "delete") {
    const taskId = target.id;
    deleteTask(taskId);
    return;
  } else if (target.className === "custom-checkbox") {
    const taskId =
      target.id; /*dataset is not added in this element so directly choosing id as id is present */
    toggleTask(taskId);
    return;
  }
}

function initializeApp() {
  addTaskInput.addEventListener("keyup", handleInputKeyPress);
  document.addEventListener(
    "click",
    handleClickListener
  ); /* event delegation adding click listener to the whole DOM */
  fetchTodos();
}

initializeApp();
