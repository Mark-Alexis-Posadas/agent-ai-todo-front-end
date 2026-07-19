import type { FilterType } from "../types/todo";
import type { ThemeMode } from "./ThemeToggle";

type FilterBarProps = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  theme: ThemeMode;
};

const filters: FilterType[] = ["all", "active", "completed"];

export function FilterBar({ filter, onFilterChange, theme }: FilterBarProps) {
  const isDark = theme === "dark";

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onFilterChange(item)}
          className={`rounded-full px-3 py-2 text-sm font-medium transition ${
            filter === item
              ? "bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(34,197,94,0.25)]"
              : isDark
                ? "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {item[0].toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
}
