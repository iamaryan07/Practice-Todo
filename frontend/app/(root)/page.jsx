"use client"

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import useTasks from "@/hooks/useTasks";

export default function Home() {
  const { tasks, loading, error, addTask } = useTasks();

  if (loading) {
    return (
      <main className="min-h-screen px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center rounded-[28px] border border-white/60 bg-white/70 p-16 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
            Loading tasks...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-red-200 bg-white/80 p-10 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-red-500">
            {error}
          </p>
        </div>
      </main>
    );
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="overflow-hidden rounded-[28px] border border-white/60 bg-white/72 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-10">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Task board
              </p>
              <div className="space-y-3">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Keep the day tight, visible, and under control.
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  Add work, review deadlines, and jump into any task without leaving the current flow.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 self-start sm:gap-4">
              <div className="rounded-3xl border border-slate-200/80 bg-slate-950 px-5 py-5 text-white">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
                  Total
                </p>
                <p className="mt-4 text-3xl font-semibold">{tasks.length}</p>
              </div>
              <div className="rounded-3xl border border-slate-200/80 bg-slate-50 px-5 py-5 text-slate-950">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Completed
                </p>
                <p className="mt-4 text-3xl font-semibold">{completedCount}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-6 lg:self-start">
            <TaskForm addTask={addTask} />
          </div>

          <TaskList tasks={tasks} />
        </section>
      </div>
    </main>
  );
}
