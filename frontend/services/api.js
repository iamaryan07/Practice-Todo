const url = process.env.NEXT_PUBLIC_BASE_URL;

export async function getTasksApi() {

    try {
        const response = await fetch(`${url}`);

        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        return data
    } catch (error) {
        throw error;
    }
}


export async function getTaskApi(id) {
    try {
        const response = await fetch(`${url}/${id}`)

        if (!response.ok) {
            throw new Error("Failed to fetch task");
        }

        const data = await response.json();
        return data
    } catch (error) {
        throw error;
    }
}


export async function addTaskApi(task) {
    try {
        const response = await fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        })

        if (!response.ok) {
            throw new Error("Failed to create task");
        }

        const data = await response.json();
        return data
    } catch (error) {
        throw error;
    }
}


export async function updateTaskApi(id, task) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        })

        if (!response.ok) {
            throw new Error("Failed to update task");
        }

        const data = await response.json();
        return data
    } catch (error) {
        throw error;
    }
}


export async function deleteTaskApi(id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        const data = await response.json();
        return data
    } catch (error) {
        throw error;
    }
}