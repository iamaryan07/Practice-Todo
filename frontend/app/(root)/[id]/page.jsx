"use client"

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import useTasks from "@/hooks/useTasks";
import TaskForm from "@/components/TaskForm";

const TaskPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { fetchTask, updateTask, deleteTask } = useTasks();

  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function loadTask() {
      const data = await fetchTask(id);
      setTask(data);
    }

    loadTask();
  }, [id]);

  async function handleDelete() {
    await deleteTask(task.id);
    router.push("/");
  }

  if (!task) {
    return (
      <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-white/60 bg-white/78 p-10 text-center shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Task not found
          </p>
        </div>
      </main>
    );
  }

  if (isEditing) {
    return (
      <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-3xl">
          <TaskForm task={task} updateTask={updateTask} setIsEditing={setIsEditing} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <button
          onClick={() => router.push("/")}
          className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/72 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_12px_32px_rgba(15,23,42,0.06)] backdrop-blur transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          Back to tasks
        </button>

        <section className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex min-h-8 items-center rounded-full px-3 text-xs font-semibold uppercase tracking-[0.18em] ${
                    task.completed
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
                <span className="inline-flex min-h-8 items-center rounded-full bg-slate-100 px-3 text-xs font-medium text-slate-600">
                  Task detail
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  {task.title}
                </h1>
                <p className="text-sm leading-6 text-slate-600 sm:text-base">
                  {task.deadline ? new Date(task.deadline).toLocaleString() : "No deadline"}
                </p>
              </div>
            </div>

            <div className="grid min-w-[220px] gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Status
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {task.completed ? "Completed" : "Pending"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Deadline
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  {task.deadline ? new Date(task.deadline).toLocaleString() : "No deadline"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-100"
            >
              Delete
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TaskPage;
