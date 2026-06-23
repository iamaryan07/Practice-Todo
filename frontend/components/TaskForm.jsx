"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TaskForm({ addTask, task, updateTask, setIsEditing }) {
  const router = useRouter();

  const [title, setTitle] = useState(task?.title || "");
  const [deadline, setDeadline] = useState(task?.deadline ? task.deadline.slice(0, 16) : "");
  const [completed, setCompleted] = useState(task?.completed || false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      if (task) {
        await updateTask(task.id, {
          title,
          deadline,
          completed,
        });

        setIsEditing(false);
      } else {
        await addTask({ title, deadline });

        setTitle("");
        setDeadline("");
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-white/60 bg-white/78 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-7"
    >
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          {task ? "Edit task" : "Create task"}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          {task ? "Update task details" : "Add a new task"}
        </h2>
      </div>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="deadline" className="text-sm font-medium text-slate-700">
            Deadline
          </label>
          <input
            id="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {task && (
          <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-slate-800">Completed</p>
              <p className="text-xs text-slate-500">Mark the current task state.</p>
            </div>
            <input
              id="completed"
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
          </label>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
        >
          {task ? "Update Task" : "Add Task"}
        </button>

        {task && (
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
