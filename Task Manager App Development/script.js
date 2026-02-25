const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const priority = document.getElementById("task-priority");
const list = document.getElementById("task-list");
const submitBtn = document.getElementById("submit-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editTaskId = null;

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item priority-${task.priority}`;
    li.innerHTML = `
            <span class="task-details">${task.name}</span>
            <div class="actions">
                <button class="btn-edit" onclick="editTask(${task.id})">Edit</button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = input.value.trim();
  if (!taskName) return;

  if (editTaskId) {
    // Update existing task
    const task = tasks.find((t) => t.id === editTaskId);
    if (task) {
      task.name = taskName;
      task.priority = priority.value;
    }
    editTaskId = null;
    submitBtn.textContent = "Add Task";
  } else {
    // Create new task
    tasks.push({
      id: Date.now(),
      name: taskName,
      priority: priority.value,
    });
  }

  input.value = "";
  priority.value = "low";
  saveAndRender();
});

window.editTask = function (id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    input.value = task.name;
    priority.value = task.priority;
    editTaskId = id;
    submitBtn.textContent = "Update Task";
    input.focus();
  }
};

window.deleteTask = function (id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveAndRender();
};

// Initial render
renderTasks();
