export const getTodos: () => Promise<any>;
export const getDeletedTodos: () => Promise<any>;
export const getTodo: (id: number) => Promise<any>;
export const createTodo: (todoData: Record<string, unknown>) => Promise<any>;
export const updateTodo: (
  id: number,
  todoData: Record<string, unknown>,
) => Promise<any>;
export const deleteTodo: (id: number) => Promise<any>;
export const restoreTodo: (id: number) => Promise<any>;
export const forceDeleteTodo: (id: number) => Promise<any>;
export const getProfile: () => Promise<any>;
export const updateProfile: (
  profileData: Record<string, unknown>,
) => Promise<any>;
