export type ThemeMode = "dark" | "light";

type ThemeToggleProps = {
  theme: ThemeMode;
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition ${
        isDark
          ? "border-emerald-400/25 bg-slate-900/80 text-emerald-200 hover:bg-slate-800"
          : "border-emerald-500/20 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
      }`}
    >
      {isDark ? (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path
            d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            d="M20 14.7A8.2 8.2 0 0 1 9.3 4a8.2 8.2 0 1 0 10.7 10.7Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
