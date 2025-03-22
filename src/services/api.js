import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

export const api = {
  // Get all todos
  getTodos: async () => {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    return response.data;
  },

  // Create a new todo
  createTodo: async (todo) => {
    const response = await axios.post(`${API_BASE_URL}/todos/add`, todo);
    return response.data;
  },

  // Update a todo
  updateTodo: async (id, updates) => {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, updates);
    return response.data;
  },

  // Delete a todo
  deleteTodo: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/todos/${id}`);
    return response.data;
  }
}; 