import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ todo, index, onEdit, onDelete, isEditing, setEditingTodo }) => {
  const [editText, setEditText] = useState(todo.todo);

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit({ ...todo, todo: editText });
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setEditText(todo.todo);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 rounded-lg shadow mb-2"
        >
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-2 border rounded"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="flex-1">{todo.todo}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(todo)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard; 