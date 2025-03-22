import React from 'react';
import Board from './components/Board/Board';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-900">Trello-style Todo Board</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6">
        <Board />
      </main>
    </div>
  );
}

export default App;
