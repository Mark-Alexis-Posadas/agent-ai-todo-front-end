import type { Todo } from "../types/todo";

type DeletedTodoListProps = {
  theme: "dark" | "light";
  todos: Todo[];
  onRestore: (id: number) => void;
  onPermanentDelete: (id: number) => void;
};

export function DeletedTodoList({
  theme,
  todos,
  onRestore,
  onPermanentDelete,
}: DeletedTodoListProps) {
  if (!todos.length) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <section
      className={`rounded-2xl border p-4 ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white/70"}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3
          className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-700"}`}
        >
          Deleted quests
        </h3>
        <span
          className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
        >
          {todos.length} archived
        </span>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between rounded-xl border px-3 py-2 ${isDark ? "border-slate-800 bg-slate-950/60" : "border-slate-200 bg-slate-50"}`}
          >
            <div>
              <p
                className={`text-sm font-medium ${isDark ? "text-slate-100" : "text-slate-800"}`}
              >
                {todo.title}
              </p>
              <p
                className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                {todo.category} • {todo.difficulty}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onRestore(todo.id)}
                className={`rounded-full px-3 py-1 text-sm transition ${isDark ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"}`}
              >
                Restore
              </button>
              <button
                type="button"
                onClick={() => onPermanentDelete(todo.id)}
                className={`rounded-full px-3 py-1 text-sm transition ${isDark ? "bg-rose-500/20 text-rose-300 hover:bg-rose-500/30" : "bg-rose-100 text-rose-700 hover:bg-rose-200"}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
