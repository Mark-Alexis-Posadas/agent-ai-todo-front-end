export type QuestCategory = "daily" | "main" | "bounty";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  category?: QuestCategory;
  difficulty?: "easy" | "medium" | "hard";
  xpAward?: number;
};

export type FilterType = "all" | "active" | "completed";
