import { useState } from "react";
import type { Todo } from "../types/todo";
import type { ThemeMode } from "./ThemeToggle";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onEdit: (id: number, title: string) => void;
  theme: ThemeMode;
  isLoading?: boolean;
};

function LoadingState({ theme }: { theme: ThemeMode }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`space-y-3 rounded-2xl border p-4 ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white/80"}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
        />
        <p
          className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}
        >
          Loading your quests...
        </p>
      </div>
      <div
        className={`h-12 animate-pulse rounded-xl ${isDark ? "bg-slate-800" : "bg-slate-100"}`}
      />
      <div
        className={`h-12 animate-pulse rounded-xl ${isDark ? "bg-slate-800" : "bg-slate-100"}`}
      />
    </div>
  );
}

export function TodoList({
  todos,
  onToggle,
  onRemove,
  onEdit,
  theme,
  isLoading = false,
}: TodoListProps) {
  const isDark = theme === "dark";
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setDraftTitle(todo.title);
  };

  const saveEdit = (id: number) => {
    const trimmed = draftTitle.trim();
    if (!trimmed) return;

    onEdit(id, trimmed);
    setEditingId(null);
    setDraftTitle("");
  };

  if (isLoading) {
    return <LoadingState theme={theme} />;
  }

  if (!todos.length) {
    return (
      <div
        className={`rounded-2xl border p-6 text-center ${isDark ? "border-slate-800 bg-slate-900/70 text-slate-400" : "border-slate-200 bg-white/80 text-slate-500"}`}
      >
        No quests yet. Add one to start your adventure.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-start justify-between gap-3 rounded-2xl border p-4 transition hover:border-emerald-400/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.12)] ${
            todo.completed
              ? "border-emerald-500/30 bg-emerald-500/10"
              : isDark
                ? "border-slate-800 bg-slate-900/90 shadow-[0_10px_30px_rgba(2,6,23,0.35)]"
                : "border-emerald-500/20 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
          }`}
        >
          <label className="flex flex-1 items-start gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              aria-label={`Mark ${todo.title} as ${todo.completed ? "active" : "completed"}`}
              className={`mt-1 h-4 w-4 rounded ${isDark ? "border-emerald-400/40 bg-slate-950 text-emerald-500 focus:ring-emerald-400/30" : "border-emerald-500/40 bg-white text-emerald-600 focus:ring-emerald-500/20"}`}
            />
            <span className="flex-1 space-y-1">
              {editingId === todo.id ? (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                    Edit task title
                  </label>
                  <input
                    aria-label="Edit task title"
                    value={draftTitle}
                    onChange={(event) => setDraftTitle(event.target.value)}
                    className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${isDark ? "border-slate-700 bg-slate-950 text-slate-100" : "border-emerald-200 bg-white text-slate-900"}`}
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => saveEdit(todo.id)}
                      className="rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setDraftTitle("");
                      }}
                      className={`rounded-lg px-3 py-1.5 text-sm ${isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span
                    className={`block text-sm font-medium ${todo.completed ? (isDark ? "text-slate-400 line-through" : "text-slate-400 line-through") : isDark ? "text-slate-100" : "text-slate-800"}`}
                  >
                    {todo.title}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${isDark ? "bg-slate-800 text-slate-300" : "bg-emerald-100 text-emerald-700"}`}
                    >
                      {todo.category ?? "daily"}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${isDark ? "bg-emerald-500/15 text-emerald-300" : "bg-emerald-50 text-emerald-700"}`}
                    >
                      {todo.difficulty ?? "easy"}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}
                    >
                      +{todo.xpAward ?? 10} XP
                    </span>
                  </div>
                  <span
                    className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}
                  >
                    Created {todo.createdAt}
                  </span>
                </>
              )}
            </span>
          </label>
          {editingId !== todo.id ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={`Edit ${todo.title}`}
                onClick={() => startEdit(todo)}
                className={`text-sm transition ${isDark ? "text-slate-400 hover:text-emerald-400" : "text-slate-500 hover:text-emerald-600"}`}
              >
                Edit
              </button>
              {pendingDeleteId === todo.id ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onRemove(todo.id);
                      setPendingDeleteId(null);
                    }}
                    className="text-sm font-semibold text-rose-500"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDeleteId(null)}
                    className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setPendingDeleteId(todo.id)}
                  className={`text-sm transition ${isDark ? "text-slate-400 hover:text-rose-400" : "text-slate-500 hover:text-rose-500"}`}
                >
                  Remove
                </button>
              )}
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
