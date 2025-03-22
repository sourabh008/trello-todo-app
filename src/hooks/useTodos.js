import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOperationLoading, setIsOperationLoading] = useState(false);

  // Fetch todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await api.getTodos();
      // Add inProgress field to all todos
      const todosWithStatus = data.todos.map(todo => ({
        ...todo,
        inProgress: false
      }));
      setTodos(todosWithStatus);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create todo
  const createTodo = async (todo) => {
    try {
      setIsOperationLoading(true);
      const newTodo = await api.createTodo(todo);
      setTodos(prev => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsOperationLoading(false);
    }
  };

  // Update todo
  const updateTodo = async (id, updates) => {
    try {
      setIsOperationLoading(true);
      // Only update completed status in API, handle inProgress locally
      const { inProgress, ...apiUpdates } = updates;
      const updatedTodo = await api.updateTodo(id, apiUpdates);
      
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...updatedTodo, inProgress: inProgress ?? todo.inProgress } : todo
      ));
      return updatedTodo;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsOperationLoading(false);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      setIsOperationLoading(true);
      await api.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsOperationLoading(false);
    }
  };

  // Move todo between lanes
  const moveTodo = async (id, completed, inProgress) => {
    try {
      setIsOperationLoading(true);
      // Update completed status in API, handle inProgress locally
      await updateTodo(id, { completed, inProgress });
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsOperationLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    isOperationLoading,
    createTodo,
    updateTodo,
    deleteTodo,
    moveTodo,
    refreshTodos: fetchTodos
  };
}; 