let tasksDb = []; // database simulasi

// Tambah Task
function addTask() {
  const taskInput = document.getElementById("todo-input");
  const taskDate = document.getElementById("todo-date");

  if (validateInput(taskInput.value, taskDate.value)) {
    const newTask = {
      id: Date.now(),
      task: taskInput.value,
      date: taskDate.value,
      completed: false
    };

    tasksDb.push(newTask);
    taskInput.value = "";
    taskDate.value = "";
    renderTasks();
  }
}

// Render Task
function renderTasks(filtered = tasksDb) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  if (filtered.length === 0) {
    taskList.innerHTML = "<li>No tasks added yet</li>";
    return;
  }

  filtered.forEach((taskObj) => {
    const li = document.createElement("li");
    li.className = taskObj.completed ? "done" : "";

    li.innerHTML = `
      <div class="task-item">
        <div>
          <input type="checkbox" ${taskObj.completed ? "checked" : ""} 
                 onchange="toggleTask(${taskObj.id})" />
          <span class="task-text">${taskObj.task}</span>
          <span class="task-date">(${taskObj.date})</span>
        </div>
        <button class="delete-btn" onclick="deleteTask(${taskObj.id})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Tandai selesai / belum
function toggleTask(id) {
  tasksDb = tasksDb.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Hapus 1 task
function deleteTask(id) {
  tasksDb = tasksDb.filter(task => task.id !== id);
  renderTasks();
}

// Hapus semua
function deleteAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasksDb = [];
    renderTasks();
  }
}

// Filter
function filterTasks() {
  const filterValue = document.getElementById("filter-select").value;
  let filtered = tasksDb;

  if (filterValue === "done") {
    filtered = tasksDb.filter(task => task.completed);
  } else if (filterValue === "pending") {
    filtered = tasksDb.filter(task => !task.completed);
  }

  renderTasks(filtered);
}

// Validasi Input
function validateInput(task, date) {
  if (task.trim() === "" || date.trim() === "") {
    alert("Please enter both task and due date.");
    return false;
  }
  return true;
}
