function renderTasks(tasks) {
    const list = document.querySelector("#taskList");

    list.innerHTML = "";

    tasks.forEach(task => {
        const item = document.createElement("div");

        item.innerHTML = `
            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleComplete(${task.id}, this.checked, '${task.title}')"
            >

            <span>No. ${task.id}: ${task.title}</span>

            <button onclick="editTask(${task.id}, '${task.title}')">
                Edit
            </button>

            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        list.appendChild(item);
    });
}

function showError(message) {
    document.querySelector("#errorMessage").textContent = message;
}

// challenge 4
function handleApiError(error) {
    if (error.message === "400") {
        showError("Bad request. Please check your input.");
    } else if (error.message === "404") {
        showError("Task not found.");
    } else if (error.message === "500") {
        showError("Server error. Please try again later.");
    } else {
        showError("Unable to connect to the server.");
    }
}

async function loadTasks() {
    const loadingMessage = document.querySelector("#loadingMessage");

    loadingMessage.style.display = "block";

    try {
        const tasks = await getTasks();

        console.log(tasks);
        renderTasks(tasks);

    } catch (error) {
        console.error(error);
        handleApiError(error);

    } finally {
        loadingMessage.style.display = "none";
    }
}

loadTasks();

async function deleteTask(id) {
    try {
        await deleteTaskApi(id);

        loadTasks();

    } catch (error) {
        console.error(error);
        handleApiError(error);
    }
}

async function editTask(id, oldTitle) { // Prompt the user for a new title
    const newTitle = prompt("Edit task:", oldTitle);

    if (!newTitle) {
        return;
    }

    try {
        await updateTask(id, newTitle, false);

        loadTasks();

    } catch (error) {
        console.error(error);
        handleApiError(error);
    }
}

async function toggleComplete(id, completed, title) {
    try {
        await updateTask(id, title, completed);

        loadTasks();

    } catch (error) {
        console.error(error);
        handleApiError(error);
    }
}

const taskForm = document.querySelector("#taskForm");

taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title =
        document.querySelector("#taskTitle").value;

    console.log("Ready to send: " + title);

    try {
        const tasks = await createTask(title);

        document.querySelector("#taskTitle").value = "";

        console.log(tasks);
        renderTasks(tasks);

    } catch (error) {
        console.error(error);
        handleApiError(error);
    }
});

// challenge 1

const searchButton = document.querySelector("#searchButton");

searchButton.addEventListener("click", async () => {
    const keyword = document
        .querySelector("#searchInput")
        .value
        .toLowerCase();

    try {
        const tasks = await getTasks();

        if (keyword === "") {
            renderTasks(tasks);
            return;
        }

        const filteredTasks = tasks.filter(task =>
            task.title.toLowerCase().includes(keyword)
        );

        renderTasks(filteredTasks);

    } catch (error) {
        console.error(error);
        handleApiError(error);
    }
});

// challenge 2

document.querySelector("#allButton").addEventListener("click", async () => {
    try {
        const tasks = await getTasks();

        renderTasks(tasks);

    } catch (error) {
        console.error(error);
        handleApiError(error);
    }
});

document.querySelector("#completedButton").addEventListener("click", async () => {
    try {
        const tasks = await getTasks();

        const completedTasks =
            tasks.filter(task => task.completed === true);

        renderTasks(completedTasks);

    } catch (error) {
        console.error(error);
        handleApiError(error);
    }
});

document.querySelector("#incompleteButton").addEventListener("click", async () => {
    try {
        const tasks = await getTasks();

        const incompleteTasks =
            tasks.filter(task => task.completed === false);

        renderTasks(incompleteTasks);

    } catch (error) {
        console.error(error);
        handleApiError(error);
    }
});