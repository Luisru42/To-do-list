let tasks = [];
const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTask');
let currentFilter = 'all';

function renderTasks() {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'incomplete') return !task.completed;
        if (currentFilter === 'complete') return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleComplete(index);

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
}

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        newTaskInput.value = '';
        renderTasks();
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasks(filter) {
    currentFilter = filter;
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.filter-btn[onclick="filterTasks('${filter}')"]`).classList.add('active');
    renderTasks();
}

// Initial rendering of tasks (if any are loaded from local storage later)
renderTasks();