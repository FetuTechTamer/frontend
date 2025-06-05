const tasks = []; // Start with an empty array for tasks

const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');

let editingTaskId = null; // To track which task is being edited
let filteredTasks = []; // To store filtered tasks

// Function to render tasks
function renderTasks(tasksToRender) {
    taskList.innerHTML = '';
    (tasksToRender || tasks).forEach(task => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center border-b p-2';
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''} text-lg ${task.completed ? 'text-gray-400' : 'text-gray-800'}">${task.title}</span>
            <div>
                <button onclick="toggleComplete(${task.id})" class="bg-yellow-500 text-white p-1 mr-2 rounded-md hover:bg-yellow-600 transition">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${task.id})" class="bg-green-500 text-white p-1 mr-2 rounded-md hover:bg-green-600 transition">Edit</button>
                <button onclick="deleteTask(${task.id})" class="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 transition">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Function to add or edit a task
addTaskBtn.onclick = function() {
    const title = taskInput.value.trim();
    if (title) {
        if (editingTaskId) {
            // Edit existing task
            const task = tasks.find(t => t.id === editingTaskId);
            task.title = title;
            editingTaskId = null; // Reset editingTaskId
        } else {
            // Add a new task
            const newTask = { id: Date.now(), title, completed: false };
            tasks.push(newTask);
        }
        taskInput.value = ''; // Clear the input
        renderTasks(); // Render all tasks after adding/editing
    } else {
        alert('Task title cannot be empty');
    }
};

// Function to toggle task completion
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks(filteredTasks.length ? filteredTasks : tasks); // Render the appropriate task list
    }
}

// Function to delete a task
function deleteTask(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index > -1) {
        tasks.splice(index, 1);
        renderTasks(filteredTasks.length ? filteredTasks : tasks); // Render the appropriate task list
    }
}

// Function to edit a task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        taskInput.value = task.title; // Populate input with the task title
        editingTaskId = id; // Set the editing task ID
    }
}

// Filter functions
document.getElementById('filterAllBtn').onclick = function() {
    filteredTasks = [];
    renderTasks();
};

document.getElementById('filterCompletedBtn').onclick = function() {
    filteredTasks = tasks.filter(t => t.completed);
    renderTasks(filteredTasks);
};

document.getElementById('filterPendingBtn').onclick = function() {
    filteredTasks = tasks.filter(t => !t.completed);
    renderTasks(filteredTasks);
};

// Initial render
renderTasks();