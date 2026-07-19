import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

const mockGetTodos = vi.fn();
const mockCreateTodo = vi.fn();
const mockUpdateTodo = vi.fn();
const mockDeleteTodo = vi.fn();

vi.mock("./services/todoService", () => ({
  getTodos: mockGetTodos,
  getDeletedTodos: vi.fn().mockResolvedValue([]),
  createTodo: mockCreateTodo,
  updateTodo: mockUpdateTodo,
  deleteTodo: mockDeleteTodo,
  restoreTodo: vi.fn().mockResolvedValue({}),
  forceDeleteTodo: vi.fn().mockResolvedValue({}),
  getProfile: vi.fn().mockResolvedValue({ xp: 0, level: 1, streak: 0 }),
  updateProfile: vi.fn().mockResolvedValue({}),
}));

beforeEach(() => {
  mockGetTodos.mockReset();
  mockCreateTodo.mockReset();
  mockUpdateTodo.mockReset();
  mockDeleteTodo.mockReset();

  mockGetTodos.mockResolvedValue([]);
  mockCreateTodo.mockImplementation(async (data) => ({
    id: 1,
    title: data.title,
    completed: false,
    created_at: "2026-07-19T00:00:00.000000Z",
  }));
  mockUpdateTodo.mockImplementation(async (_id, data) => ({
    id: 1,
    title: data.title ?? "Write tests",
    completed: data.completed ?? false,
    created_at: "2026-07-19T00:00:00.000000Z",
  }));
});

describe("Todo app", () => {
  it("adds and completes a task", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, "Write tests");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByText("Write tests")).toBeInTheDocument();

    await user.click(
      screen.getByRole("checkbox", { name: /mark write tests as completed/i }),
    );
    expect(screen.getByText("Write tests")).toHaveClass("line-through");
  });

  it("edits an existing task", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, "Write tests");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await user.click(screen.getByRole("button", { name: /edit write tests/i }));
    const editInput = screen.getByLabelText(/edit task title/i);
    await user.clear(editInput);
    await user.type(editInput, "Write better tests");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText("Write better tests")).toBeInTheDocument();
  });
});
