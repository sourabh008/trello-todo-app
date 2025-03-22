# Trello-Style Todo Board

A modern Todo board application built with React that allows users to manage tasks using a drag-and-drop interface. Features include task creation, editing, deletion, and status tracking across three columns: Pending, In Progress, and Completed.

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trello-todo-board.git
cd trello-todo-board
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- React
- Tailwind CSS
- react-beautiful-dnd
- DummyJSON Todos API

## Features

- Drag and drop tasks between columns
- Create, edit, and delete tasks
- Real-time updates with API persistence
- Loading states and error handling
- Responsive design

## Design Decisions & Patterns

### Component Architecture
- **Atomic Design**: Components are organized in a hierarchical structure (atoms → molecules → organisms)
- **Single Responsibility**: Each component has a focused purpose (Board, Lane, TaskCard)
- **Composition**: Complex UI is built by composing smaller, reusable components

### State Management
- **Custom Hooks**: `useTodos` hook encapsulates all todo-related logic and API calls
- **Local State**: Component-level state for UI interactions (editing, loading)
- **Prop Drilling Prevention**: State is managed at appropriate levels to minimize prop passing

### Performance Optimizations
- **Memoization**: React.memo for TaskCard to prevent unnecessary re-renders
- **Lazy Loading**: Components are loaded only when needed
- **Debounced API Calls**: API requests are optimized to prevent excessive calls

### Error Handling
- **Centralized Error Management**: Single error state with dismissible popup
- **Graceful Degradation**: UI remains functional even when API calls fail
- **User Feedback**: Clear loading states and error messages

### UI/UX Considerations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Semantic HTML and ARIA attributes
- **Visual Feedback**: Loading states and transitions for better user experience
