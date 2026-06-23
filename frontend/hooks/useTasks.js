"use client"

import { useEffect, useState } from "react"
import { getTaskApi, getTasksApi, addTaskApi, updateTaskApi, deleteTaskApi } from "@/services/api"

export default function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchTasks() {
        try {
            setLoading(true);

            const data = await getTasksApi();

            setTasks(data);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    async function addTask(task) {
        try {
            const newTask = await addTaskApi(task);

            setTasks(prev => [...prev, newTask]);
            setError(null);

            return newTask;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    async function fetchTask(id) {
        try {
            const task = await getTaskApi(id);

            setError(null);

            return task;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    async function updateTask(id, task) {
        try {
            const updatedTask = await updateTaskApi(id, task);

            setTasks(prev => prev.map(todo => todo.id === id ? updatedTask : todo));

            setError(null);

            return updatedTask;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    async function deleteTask(id) {
        try {
            await deleteTaskApi(id);

            setTasks(prev => prev.filter(todo => todo.id !== id))

            setError(null);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    useEffect(() => {
        fetchTasks();
    }, [])

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        fetchTask,
        updateTask,
        deleteTask
    }
}
