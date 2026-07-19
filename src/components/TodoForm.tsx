import type { FormEvent } from "react";
import type { QuestCategory } from "../types/todo";
import type { ThemeMode } from "./ThemeToggle";

type TodoFormProps = {
  title: string;
  onTitleChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  category: QuestCategory;
  difficulty: "easy" | "medium" | "hard";
  onCategoryChange: (value: QuestCategory) => void;
  onDifficultyChange: (value: "easy" | "medium" | "hard") => void;
  theme: ThemeMode;
};

export function TodoForm({
  title,
  onTitleChange,
  onSubmit,
  category,
  difficulty,
  onCategoryChange,
  onDifficultyChange,
  theme,
}: TodoFormProps) {
  const isDark = theme === "dark";

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-3 rounded-2xl border p-3 shadow-inner ${isDark ? "border-emerald-400/25 bg-slate-900/80 shadow-emerald-500/10" : "border-emerald-500/20 bg-emerald-50/70 shadow-emerald-400/10"}`}
    >
      <input
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        placeholder="What needs to be done?"
        className={`flex-1 rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${isDark ? "border-emerald-400/20 bg-slate-950/80 text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:ring-emerald-400/30" : "border-emerald-500/20 bg-white text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20"}`}
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={category}
          onChange={(event) =>
            onCategoryChange(event.target.value as QuestCategory)
          }
          className={`rounded-xl border px-3 py-2 text-sm ${isDark ? "border-emerald-400/20 bg-slate-950/80 text-slate-100" : "border-emerald-500/20 bg-white text-slate-800"}`}
        >
          <option value="daily">Daily Quest</option>
          <option value="main">Main Quest</option>
          <option value="bounty">Bounty</option>
        </select>
        <select
          value={difficulty}
          onChange={(event) =>
            onDifficultyChange(event.target.value as "easy" | "medium" | "hard")
          }
          className={`rounded-xl border px-3 py-2 text-sm ${isDark ? "border-emerald-400/20 bg-slate-950/80 text-slate-100" : "border-emerald-500/20 bg-white text-slate-800"}`}
        >
          <option value="easy">Side Quest</option>
          <option value="medium">Main Quest</option>
          <option value="hard">Boss Fight</option>
        </select>
        <button
          type="submit"
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${isDark ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400" : "bg-emerald-600 text-white hover:bg-emerald-500"}`}
        >
          Add task
        </button>
      </div>
    </form>
  );
}
