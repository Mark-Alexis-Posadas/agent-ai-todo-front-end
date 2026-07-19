import api from "../api/axios";

export const getTodos = async () => {
  const { data } = await api.get("/todos");
  return data;
};

export const getDeletedTodos = async () => {
  const { data } = await api.get("/todos/deleted");
  return data;
};

export const getTodo = async (id: number) => {
  const { data } = await api.get(`/todos/${id}`);
  return data;
};

export const createTodo = async (todoData: Record<string, unknown>) => {
  const { data } = await api.post("/todos", todoData);
  return data;
};

export const updateTodo = async (id: number, todoData: Record<string, unknown>) => {
  const { data } = await api.put(`/todos/${id}`, todoData);
  return data;
};

export const deleteTodo = async (id: number) => {
  const { data } = await api.delete(`/todos/${id}`);
  return data;
};

export const restoreTodo = async (id: number) => {
  const { data } = await api.post(`/todos/${id}/restore`);
  return data;
};

export const forceDeleteTodo = async (id: number) => {
  const { data } = await api.delete(`/todos/${id}/force-delete`);
  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/profile");
  return data;
};

export const updateProfile = async (profileData: Record<string, unknown>) => {
  const { data } = await api.put("/profile", profileData);
  return data;
};
