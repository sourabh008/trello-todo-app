import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Lane from '../Lane/Lane';
import TaskCard from '../TaskCard/TaskCard';
import { useTodos } from '../../hooks/useTodos';
import Loader from '../Loader/Loader';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

const Board = () => {
  const { todos, loading, createTodo, updateTodo, deleteTodo, moveTodo, isOperationLoading } = useTodos();
  const [newTodo, setNewTodo] = useState({ 
    todo: '', 
    completed: false, 
    inProgress: false,
    userId: 1
  });
  const [editingTodo, setEditingTodo] = useState(null);
  const [error, setError] = useState(null);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, source, destination } = result;
    const todo = todos.find(t => t.id === parseInt(draggableId));

    if (!todo) return;

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    if (sourceId === destinationId) return;

    let completed = todo.completed;
    let inProgress = todo.inProgress;

    if (destinationId === 'completed') {
      completed = true;
      inProgress = false;
    } else if (destinationId === 'in-progress') {
      completed = false;
      inProgress = true;
    } else if (destinationId === 'pending') {
      completed = false;
      inProgress = false;
    }

    try {
      await moveTodo(todo.id, completed, inProgress);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.todo.trim()) return;

    try {
      await createTodo(newTodo);
      setNewTodo({ 
        todo: '', 
        completed: false, 
        inProgress: false,
        userId: 1
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async (todo) => {
    if (!editingTodo) {
      setEditingTodo(todo);
    } else {
      try {
        await updateTodo(todo.id, { todo: todo.todo });
        setEditingTodo(null);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="w-12 h-12" />
      </div>
    );
  }

  const pendingTodos = todos.filter(todo => !todo.completed && !todo.inProgress);
  const inProgressTodos = todos.filter(todo => todo.inProgress);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="p-4">
      {isOperationLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Loader size="w-12 h-12" />
          </div>
        </div>
      )}

      <ErrorPopup error={error} onClose={() => setError(null)} />
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo.todo}
            onChange={(e) => setNewTodo({ ...newTodo, todo: e.target.value })}
            placeholder="Add a new task..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={isOperationLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Task
          </button>
        </div>
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Lane
            title="Pending"
            todos={pendingTodos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            editingTodo={editingTodo}
            setEditingTodo={setEditingTodo}
          />
          <Lane
            title="In Progress"
            todos={inProgressTodos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            editingTodo={editingTodo}
            setEditingTodo={setEditingTodo}
          />
          <Lane
            title="Completed"
            todos={completedTodos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            editingTodo={editingTodo}
            setEditingTodo={setEditingTodo}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board; 