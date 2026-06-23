import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  if (!tasks.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/60 p-10 text-center shadow-[0_24px_60px_rgba(15,23,42,0.05)] backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          No tasks yet
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
          Start by adding the first task.
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
