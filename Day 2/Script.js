

const todoInput = document.getElementById('taskInput');
const addButton = document.getElementById('addTaskButton');
const deleteButton = document.getElementById('deleteCompletedButton');
const todoList = document.getElementById('taskList');

function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");
        li.textContent = taskText;
        todoList.appendChild(li);
        todoInput.value = "";
    }
}

function deleteCompletedTasks() {
    const completedTasks = todoList.querySelectorAll("li.completed");
    completedTasks.forEach(task => task.remove());
}

todoList.addEventListener("click", event => {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("completed");
    }
});

addButton.addEventListener("click", addTask);
deleteButton.addEventListener("click", deleteCompletedTasks);
