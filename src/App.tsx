import { useEffect, useMemo, useState, type FormEvent } from "react";
import { FilterBar } from "./components/FilterBar";
import { Header } from "./components/Header";
import { ThemeToggle, type ThemeMode } from "./components/ThemeToggle";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { DeletedTodoList } from "./components/DeletedTodoList";
import { QuestFeedback } from "./components/QuestFeedback";
import { TodoSummary } from "./components/TodoSummary";
import {
  createTodo,
  deleteTodo,
  forceDeleteTodo,
  getDeletedTodos,
  getProfile,
  getTodos,
  restoreTodo,
  updateProfile,
  updateTodo,
} from "./services/todoService";
import type { FilterType, QuestCategory, Todo } from "./types/todo";

const DIFFICULTY_XP: Record<string, number> = {
  easy: 10,
  medium: 30,
  hard: 100,
};

const normalizeTodo = (todo: any): Todo => ({
  id: todo.id,
  title: todo.title,
  completed: Boolean(todo.completed),
  createdAt: todo.created_at?.slice(0, 10) ?? "",
  category: (todo.category as QuestCategory | undefined) ?? "daily",
  difficulty:
    (todo.difficulty as "easy" | "medium" | "hard" | undefined) ?? "easy",
  xpAward:
    todo.xp_award ?? DIFFICULTY_XP[(todo.difficulty as string) ?? "easy"],
});

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [deletedTodos, setDeletedTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<QuestCategory>("daily");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy",
  );
  const [filter, setFilter] = useState<FilterType>("all");
  const [profile, setProfile] = useState({ xp: 0, level: 1, streak: 0 });
  const [feedback, setFeedback] = useState<{
    message: string;
    xp: number;
    level: number;
  } | null>(null);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const storedTheme = window.localStorage.getItem("agentic-theme");
    return storedTheme === "light" ? "light" : "dark";
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todoData, deletedTodoData, profileData] = await Promise.all([
          getTodos(),
          getDeletedTodos(),
          getProfile(),
        ]);
        setTodos(todoData.map(normalizeTodo));
        setDeletedTodos(deletedTodoData.map(normalizeTodo));
        setProfile({
          xp: Number(profileData?.xp ?? 0),
          level: Number(profileData?.level ?? 1),
          streak: Number(profileData?.streak ?? 0),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("agentic-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.body.style.background =
      theme === "dark"
        ? "linear-gradient(135deg, #020617 0%, #050816 100%)"
        : "linear-gradient(135deg, #f8fafc 0%, #ecfeff 100%)";
  }, [theme]);

  const addTodo = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    try {
      const todo = await createTodo({
        title: trimmed,
        completed: false,
        category,
        difficulty,
        xp_award: DIFFICULTY_XP[difficulty],
      });
      setTodos((current) => [normalizeTodo(todo), ...current]);
      setTitle("");
      setCategory("daily");
      setDifficulty("easy");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTodo = async (id: number) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;

    try {
      const updated = await updateTodo(id, { completed: !target.completed });
      const nextCompleted = !target.completed;
      const gainedXp = nextCompleted ? (target.xpAward ?? 10) : 0;

      setTodos((current) =>
        current.map((todo) =>
          todo.id === id
            ? normalizeTodo({
                ...updated,
                created_at: updated.created_at ?? todo.createdAt,
                category: updated.category ?? todo.category,
                difficulty: updated.difficulty ?? todo.difficulty,
                xp_award: updated.xp_award ?? todo.xpAward,
              })
            : todo,
        ),
      );

      if (nextCompleted) {
        const nextXp = profile.xp + gainedXp;
        const nextLevel = Math.floor(nextXp / 100) + 1;
        const nextStreak = profile.streak + 1;
        setProfile({ xp: nextXp, level: nextLevel, streak: nextStreak });
        setFeedback({
          message: `Quest complete: ${target.title}`,
          xp: gainedXp,
          level: nextLevel,
        });
        await updateProfile({
          xp: nextXp,
          level: nextLevel,
          streak: nextStreak,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editTodo = async (id: number, title: string) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;

    try {
      const updated = await updateTodo(id, {
        title,
        completed: target.completed,
      });
      setTodos((current) =>
        current.map((todo) =>
          todo.id === id
            ? normalizeTodo({
                ...updated,
                created_at: updated.created_at ?? todo.createdAt,
              })
            : todo,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const removeTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((current) => current.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const clearCompleted = async () => {
    try {
      const completedTodos = todos.filter((todo) => todo.completed);
      await Promise.all(completedTodos.map((todo) => deleteTodo(todo.id)));
      setTodos((current) => current.filter((todo) => !todo.completed));
    } catch (error) {
      console.error(error);
    }
  };

  const restoreDeletedTodo = async (id: number) => {
    try {
      const restoredTodo = await restoreTodo(id);
      setDeletedTodos((current) => current.filter((todo) => todo.id !== id));
      setTodos((current) => [normalizeTodo(restoredTodo), ...current]);
    } catch (error) {
      console.error(error);
    }
  };

  const permanentlyDeleteTodo = async (id: number) => {
    try {
      await forceDeleteTodo(id);
      setDeletedTodos((current) => current.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const xpTotal = profile.xp;
  const level = profile.level;
  const streak = Math.min(7, profile.streak);

  return (
    <main
      className={`min-h-screen px-4 py-8 sm:px-6 lg:px-8 ${theme === "dark" ? "bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_38%),linear-gradient(135deg,#020617_0%,#050816_60%,#020617_100%)] text-slate-100" : "bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_35%),linear-gradient(135deg,#f8fafc_0%,#ecfeff_60%,#f8fafc_100%)] text-slate-900"}`}
    >
      <section
        className={`mx-auto flex max-w-6xl flex-col gap-6 rounded-4xl border p-6 shadow-[0_24px_80px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:p-8 lg:flex-row lg:gap-8 ${theme === "dark" ? "border-emerald-400/30 bg-slate-950/90" : "border-emerald-500/20 bg-white/85"}`}
      >
        {feedback ? (
          <QuestFeedback
            message={feedback.message}
            xp={feedback.xp}
            level={feedback.level}
            onClose={() => setFeedback(null)}
            theme={theme}
          />
        ) : null}
        <div className="flex-1 space-y-5">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3">
            <p
              className={`text-[0.7rem] font-semibold uppercase tracking-[0.45em] ${theme === "dark" ? "text-emerald-300" : "text-emerald-700"}`}
            >
              Quest board
            </p>
            <ThemeToggle
              theme={theme}
              onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
          </div>

          <Header
            theme={theme}
            title="Command your mission board."
            description="Stack your tasks, clear your lane, and keep your momentum locked in like a pro-level run."
          />

          <TodoForm
            theme={theme}
            title={title}
            onTitleChange={setTitle}
            onSubmit={addTodo}
            category={category}
            difficulty={difficulty}
            onCategoryChange={setCategory}
            onDifficultyChange={setDifficulty}
          />

          <FilterBar theme={theme} filter={filter} onFilterChange={setFilter} />

          <TodoList
            theme={theme}
            todos={visibleTodos}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            onEdit={editTodo}
            isLoading={isLoading}
          />

          <DeletedTodoList
            theme={theme}
            todos={deletedTodos}
            onRestore={restoreDeletedTodo}
            onPermanentDelete={permanentlyDeleteTodo}
          />
        </div>

        <TodoSummary
          theme={theme}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
          xpTotal={xpTotal}
          level={level}
          streak={streak}
        />
      </section>
    </main>
  );
}

export default App;
