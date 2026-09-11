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

  // Quick stats
  const completedCount = tasks.filter((t) => t.status === 'Done').length;
  const inProgressCount = tasks.filter((t) => t.status === 'Working on it').length;

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
    <div className="max-w-3xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Task Manager
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Keep track of your tasks and projects
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          <span>New Task</span>
        </button>
      </div>

      {/* Quick stats pills */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 text-center">
        <div className="bg-white p-2 sm:p-2.5 rounded-lg border border-gray-200 shadow-xs">
          <span className="block text-[11px] sm:text-xs text-gray-500 font-medium">Total</span>
          <span className="text-base sm:text-lg font-bold text-gray-800">{tasks.length}</span>
        </div>
        <div className="bg-white p-2 sm:p-2.5 rounded-lg border border-amber-200/70 shadow-xs bg-amber-50/30">
          <span className="block text-[11px] sm:text-xs text-amber-700 font-medium">In Progress</span>
          <span className="text-base sm:text-lg font-bold text-amber-800">{inProgressCount}</span>
        </div>
        <div className="bg-white p-2 sm:p-2.5 rounded-lg border border-emerald-200/70 shadow-xs bg-emerald-50/30">
          <span className="block text-[11px] sm:text-xs text-emerald-700 font-medium">Done</span>
          <span className="text-base sm:text-lg font-bold text-emerald-800">{completedCount}</span>
        </div>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-gray-200 shadow-xs mb-3 sm:mb-4 flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-between items-stretch sm:items-center">
        {/* Search Input with Clear Button */}
        <div className="relative flex-1">
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search task or priority..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Controls (Sort + Bulk Delete) */}
        <div className="flex items-center gap-2 justify-between sm:justify-end">
          {/* Sort dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              <option value="none">Sort: Default</option>
              <option value="high-low">Priority: High → Low</option>
              <option value="low-high">Priority: Low → High</option>
              <option value="date-newest">Date: Newest First</option>
              <option value="date-oldest">Date: Oldest First</option>
            </select>
          </div>

          {/* Delete Selected button */}
          {selectedIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="shrink-0 bg-rose-50 text-rose-600 hover:bg-rose-100 active:bg-rose-200 border border-rose-200 text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg cursor-pointer transition-colors"
            >
              Delete ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      {/* Select All Row */}
      {filteredTasks.length > 0 && (
        <div className="flex justify-between items-center px-1 mb-2.5 text-xs text-gray-500">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleToggleSelectAll}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="font-medium text-gray-700">Select all ({filteredTasks.length})</span>
          </label>

          {selectedIds.length > 0 && (
            <button
              onClick={() => setSelectedIds([])}
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline cursor-pointer"
            >
              Deselect all
            </button>
          )}
        </div>
      )}

      {/* Task List (Card Rows) */}
      <div className="flex flex-col gap-2.5 sm:gap-3">
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
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 sm:p-12 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600">
              {search ? 'No tasks match your search.' : 'No tasks yet.'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {search ? 'Try searching for a different keyword or priority.' : 'Click "+ New Task" above to get started.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;