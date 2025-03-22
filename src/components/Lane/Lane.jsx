import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from '../TaskCard/TaskCard';

const Lane = ({ title, todos, onEdit, onDelete, editingTodo, setEditingTodo }) => {
  // Convert title to droppableId format
  const droppableId = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex-1 min-w-[300px] bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] ${
              snapshot.isDraggingOver ? 'bg-gray-200' : ''
            }`}
          >
            {todos.map((todo, index) => (
              <TaskCard
                key={todo.id}
                todo={todo}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                isEditing={editingTodo?.id === todo.id}
                setEditingTodo={setEditingTodo}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Lane; 