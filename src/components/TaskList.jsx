import React, { useState } from 'react';
import TaskCard from './TaskCard';

const TaskList = ({
  tasks,
  onOpenCreateModal,
  onOpenEditModal,
  onRequestDeleteSingle,
  onRequestDeleteMultiple,
}) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [selectedIds, setSelectedIds] = useState([]);

  // Priority weight map for sorting
  const priorityRank = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  // Filter tasks by name or priority
  let filteredTasks = tasks.filter((task) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;
    const matchName = task.name.toLowerCase().includes(query);
    const matchPriority = task.priority.toLowerCase().includes(query);
    return matchName || matchPriority;
  });

  // Sort tasks by Priority or Added Date
  if (sortBy === 'high-low') {
    filteredTasks.sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority]);
  } else if (sortBy === 'low-high') {
    filteredTasks.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
  } else if (sortBy === 'date-newest') {
    filteredTasks.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  } else if (sortBy === 'date-oldest') {
    filteredTasks.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
  }

  // Handle selection
  const handleToggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const isAllSelected =
    filteredTasks.length > 0 &&
    filteredTasks.every((task) => selectedIds.includes(task.id));

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(selectedIds.filter((id) => !filteredTasks.some((t) => t.id === id)));
    } else {
      const allIds = filteredTasks.map((t) => t.id);
      const combined = Array.from(new Set([...selectedIds, ...allIds]));
      setSelectedIds(combined);
    }
  };

  const handleDeleteSelected = () => {
    onRequestDeleteMultiple(selectedIds, () => {
      setSelectedIds([]);
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
          <p className="text-sm text-gray-500">A simple task management list</p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer"
        >
          + New Task
        </button>
      </div>

      {/* Search and Sort Bar */}
      <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm mb-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search task or priority..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        />

        {/* Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="none">Sort: Default</option>
            <option value="high-low">Priority: High → Low</option>
            <option value="low-high">Priority: Low → High</option>
            <option value="date-newest">Added Date: Newest First</option>
            <option value="date-oldest">Added Date: Oldest First</option>
          </select>

          {/* Delete Selected button */}
          {selectedIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer"
            >
              Delete selected ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      {/* Select All Row */}
      {filteredTasks.length > 0 && (
        <div className="flex justify-between items-center px-1 mb-2 text-xs text-gray-500">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleToggleSelectAll}
              className="w-4 h-4 cursor-pointer"
            />
            <span>Select all ({filteredTasks.length})</span>
          </label>

          {selectedIds.length > 0 && (
            <button
              onClick={() => setSelectedIds([])}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Deselect all
            </button>
          )}
        </div>
      )}

      {/* Task List (Card Rows) */}
      <div className="flex flex-col gap-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isSelected={selectedIds.includes(task.id)}
              onToggleSelect={handleToggleSelect}
              onEdit={onOpenEditModal}
              onDelete={onRequestDeleteSingle}
            />
          ))
        ) : (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-sm text-gray-500">
            {search ? 'No tasks found.' : 'No tasks yet. Click "+ New Task" to add one.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;