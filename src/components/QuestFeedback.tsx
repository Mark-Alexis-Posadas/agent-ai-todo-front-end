import { useEffect } from "react";

type QuestFeedbackProps = {
  message: string;
  xp: number;
  level: number;
  onClose: () => void;
  theme: "light" | "dark";
};

export function QuestFeedback({
  message,
  xp,
  level,
  onClose,
  theme,
}: QuestFeedbackProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 2200);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  const isDark = theme === "dark";

  return (
    <div
      className={`fixed right-4 top-4 z-50 max-w-sm rounded-2xl border px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.2)] ${isDark ? "border-emerald-400/30 bg-slate-950/95 text-slate-100" : "border-emerald-500/20 bg-white/95 text-slate-900"}`}
    >
      <p className="text-sm font-semibold">{message}</p>
      <p
        className={`mt-1 text-sm ${isDark ? "text-emerald-300" : "text-emerald-700"}`}
      >
        +{xp} XP • Lv. {level}
      </p>
    </div>
  );
}
