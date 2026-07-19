import type { ThemeMode } from "./ThemeToggle";

type HeaderProps = {
  title: string;
  description: string;
  theme: ThemeMode;
};

export function Header({ title, description, theme }: HeaderProps) {
  const isDark = theme === "dark";

  return (
    <div className="space-y-3">
      <p
        className={`text-sm font-semibold uppercase tracking-[0.35em] ${isDark ? "text-emerald-400" : "text-emerald-700"}`}
      >
        Mission control
      </p>
      <h1
        className={`text-4xl font-semibold tracking-tight sm:text-5xl ${isDark ? "text-white" : "text-slate-900"}`}
      >
        {title}
      </h1>
      <p
        className={`max-w-xl text-base sm:text-lg ${isDark ? "text-slate-300" : "text-slate-600"}`}
      >
        {description}
      </p>
    </div>
  );
}
