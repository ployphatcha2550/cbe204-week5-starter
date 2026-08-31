
function showError(message) {
    document.querySelector("#errorMessage").textContent = message;
}

function renderTasks(tasks) {
    const list = document.querySelector("#taskList");

    list.innerHTML = "";

    tasks.forEach(task => {
        const item = document.createElement("div");

        item.textContent =
            `${task.id}: ${task.title}`;

        list.appendChild(item);
    });
}

async function loadTasks() {
    try {

        const response = await fetch("http://localhost:3000/api/tasks");
        if (!response.ok) {
            throw new Error(
                `API error: ${response.status}`
            );
        }

        const tasks = await response.json();

        console.log(tasks);

        renderTasks(tasks);
    } catch (error) {
        console.error(error);
        // Display an appropriate message 
        showError("Unable to load tasks. Please try again");

    }
}

document
    .querySelector("#taskForm")
    .addEventListener("submit", async (event) => {

        event.preventDefault();

        const title =
            document.querySelector("#taskTitle").value;

        // Send task to API
        const response = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, completed: false })
        });
        const tasks = await response.json();
        console.log(tasks);

        renderTasks(tasks);
    });


loadTasks();
