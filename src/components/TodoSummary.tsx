import type { ThemeMode } from "./ThemeToggle";

type TodoSummaryProps = {
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
  xpTotal: number;
  level: number;
  streak: number;
  theme: ThemeMode;
};

export function TodoSummary({
  activeCount,
  completedCount,
  onClearCompleted,
  xpTotal,
  level,
  streak,
  theme,
}: TodoSummaryProps) {
  const isDark = theme === "dark";

  return (
    <aside
      className={`w-full max-w-sm space-y-4 rounded-3xl border p-5 shadow-[0_20px_50px_rgba(0,0,0,0.16)] lg:sticky lg:top-6 lg:h-fit ${isDark ? "border-emerald-400/25 bg-[linear-gradient(135deg,rgba(2,6,23,0.95),rgba(5,15,35,0.95))] text-white" : "border-emerald-500/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(236,253,245,0.95))] text-slate-900"}`}
    >
      <div>
        <p
          className={`text-sm uppercase tracking-[0.3em] ${isDark ? "text-emerald-400" : "text-emerald-700"}`}
        >
          Summary
        </p>
        <h2 className="mt-2 text-2xl font-semibold">
          {activeCount} active tasks
        </h2>
      </div>

      <div
        className={`rounded-2xl border p-4 ${isDark ? "border-emerald-400/20 bg-emerald-500/10" : "border-emerald-500/20 bg-emerald-50"}`}
      >
        <p
          className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
        >
          Completed tasks
        </p>
        <p
          className={`mt-2 text-3xl font-semibold ${isDark ? "text-emerald-300" : "text-emerald-700"}`}
        >
          {completedCount}
        </p>
      </div>

      <div
        className={`rounded-2xl border p-4 ${isDark ? "border-emerald-400/20 bg-emerald-500/10" : "border-emerald-500/20 bg-emerald-50"}`}
      >
        <p
          className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
        >
          Adventure status
        </p>
        <p
          className={`mt-2 text-3xl font-semibold ${isDark ? "text-emerald-300" : "text-emerald-700"}`}
        >
          Lv. {level}
        </p>
        <p
          className={`mt-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          XP: {xpTotal} • Streak: {streak} 🔥
        </p>
      </div>

      <div
        className={`rounded-2xl border p-4 ${isDark ? "border-emerald-400/20 bg-emerald-500/10" : "border-emerald-500/20 bg-emerald-50"}`}
      >
        <p
          className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
        >
          Focus mode
        </p>
        <p
          className={`mt-2 text-sm leading-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          {activeCount > 0
            ? "Keep your top task visible and clear the rest."
            : "Everything is done, great work!"}
        </p>
      </div>

      <button
        type="button"
        onClick={onClearCompleted}
        className={`w-full rounded-xl border px-4 py-3 text-sm font-semibold transition ${isDark ? "border-emerald-400/25 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/25" : "border-emerald-500/25 bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600/20"}`}
      >
        Clear completed
      </button>

      <p
        className={`text-xs leading-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
      >
        Your tasks are stored locally in the browser, so they stay available on
        refresh.
      </p>
    </aside>
  );
}
