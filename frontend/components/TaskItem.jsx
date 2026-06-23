"use client"

import { useRouter } from "next/navigation";

export default function TaskItem({ task }) {
  const router = useRouter();

  async function handleView() {
    router.push(`/${task.id}`);
  }

  return (
    <article className="rounded-[28px] border border-white/60 bg-white/78 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-0.5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
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
              {task.deadline ? "Scheduled" : "No deadline"}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">
              {task.title}
            </h3>
            <p className="text-sm leading-6 text-slate-600">
              {task.deadline ? new Date(task.deadline).toLocaleString() : "No deadline"}
            </p>
          </div>
        </div>

        <button
          onClick={handleView}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
        >
          View
        </button>
      </div>
    </article>
  );
}
