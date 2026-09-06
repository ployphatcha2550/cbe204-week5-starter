const API_URL = "http://127.0.0.1:3000/api/tasks";

async function apiRequest(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        if (response.status === 400) {
            throw new Error("400");
        }

        if (response.status === 404) {
            throw new Error("404");
        }

        if (response.status === 500) {
            throw new Error("500");
        }

        throw new Error(`${response.status}`);
    }

    return response.json();
}

async function getTasks() {
    return apiRequest(API_URL);
}

async function getTask(id) {
    return apiRequest(`${API_URL}/${id}`);
}

async function createTask(title) {
    return apiRequest(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title
        })
    });
}

async function updateTask(id, title, completed) {
    return apiRequest(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            completed: completed
        })
    });
}

async function deleteTaskApi(id) {
    return apiRequest(`${API_URL}/${id}`, {
        method: "DELETE"
    });
}