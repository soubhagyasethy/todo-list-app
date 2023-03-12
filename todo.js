let tasks = [];
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

function renderList() {}

function markTaskAsComplete(taskId) {}

function deleteTask(taskId) {
  const newTasks = tasks.filter((task) => {
    return task.id !== taskId;
  });

  tasks = newTasks;
  renderList();
  showNotification("Task deleted successfully");
}

function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task added successfully!");
    return;
  }

  showNotification("Task can not be added");
}

function showNotification(text) {}

function handleInputKeyPress(e) {
  if (e.key === "Enter") {
    const text = e.target.value;
    console.log(text);
    if (!text) {
      showNotification("Task text can not be empty");
      return;
    }

    const task = {
      text: text,
      id: Date.now().toString(),
      done: false,
    };

    e.target.value = "";
    addTask(task);
  }
}

addTaskInput.addEventListener("keyup", handleInputKeyPress);
