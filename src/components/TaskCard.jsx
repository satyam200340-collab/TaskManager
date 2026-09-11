import React from 'react';

const TaskCard = ({ task, isSelected, onToggleSelect, onEdit, onDelete }) => {
  // Status color badge helper
  const getStatusClass = (status) => {
    switch (status) {
      case 'Working on it':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Done':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Stuck':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'To-Do':
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Priority badge helper
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  // Format date helper e.g. "Sep 10, 2026"
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const [year, month, day] = dateStr.split('-');
      if (!year || !month || !day) return dateStr;
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className={`bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border transition-all ${
        isSelected
          ? 'border-blue-400 bg-blue-50/20 ring-1 ring-blue-300'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Mobile Layout (< sm) */}
      <div className="flex flex-col gap-3 sm:hidden">
        {/* Top: Checkbox, Name, and Priority */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="pt-0.5">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleSelect(task.id)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>
            <span
              onClick={() => onEdit(task)}
              className={`font-medium text-gray-800 text-sm leading-snug cursor-pointer break-words active:text-blue-600 ${
                task.status === 'Done' ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.name}
            </span>
          </div>

          <span
            className={`shrink-0 text-xs px-2 py-0.5 rounded font-semibold border ${getPriorityClass(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 -mx-1" />

        {/* Bottom: Meta Info & Actions */}
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
          {/* Status & Owner & Date */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${getStatusClass(
                task.status
              )}`}
            >
              {task.status}
            </span>

            {task.owner ? (
              <span className="text-gray-600 font-medium inline-flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {task.owner}
              </span>
            ) : null}

            {task.createdAt && (
              <span className="text-gray-400 text-[11px]">
                {formatDate(task.createdAt)}
              </span>
            )}
          </div>

          {/* Action buttons with comfortable touch targets */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              onClick={() => onEdit(task)}
              className="px-2.5 py-1.5 text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-md border border-blue-200 cursor-pointer font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task)}
              className="px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 active:bg-rose-100 rounded-md border border-rose-200 cursor-pointer font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Desktop / Tablet Layout (>= sm) */}
      <div className="hidden sm:flex items-center justify-between gap-4">
        {/* Left side: Checkbox, Name, Priority */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(task.id)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
          />

          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span
              onClick={() => onEdit(task)}
              className={`cursor-pointer font-medium text-gray-800 hover:text-blue-600 transition-colors ${
                task.status === 'Done' ? 'line-through text-gray-400' : ''
              }`}
              title="Click to edit"
            >
              {task.name}
            </span>

            <span
              className={`text-xs px-2 py-0.5 rounded font-semibold border ${getPriorityClass(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>
        </div>

        {/* Right side: Owner, Added Date, Status Pill, Edit/Delete Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Owner */}
          {task.owner ? (
            <span className="text-xs text-gray-600 font-medium inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {task.owner}
            </span>
          ) : (
            <span className="text-xs text-gray-400 italic">No owner</span>
          )}

          {/* Added Date */}
          {task.createdAt && (
            <span className="text-xs text-gray-400">
              Added: {formatDate(task.createdAt)}
            </span>
          )}

          {/* Status Badge */}
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold border ${getStatusClass(
              task.status
            )}`}
          >
            {task.status}
          </span>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => onEdit(task)}
              className="px-2.5 py-1 text-blue-600 hover:bg-blue-50 rounded border border-blue-200 cursor-pointer font-medium transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task)}
              className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded border border-rose-200 cursor-pointer font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
