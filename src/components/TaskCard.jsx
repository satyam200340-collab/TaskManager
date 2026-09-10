import React from 'react';

const TaskCard = ({ task, isSelected, onToggleSelect, onEdit, onDelete }) => {
  // Simple status color badge helper
  const getStatusClass = (status) => {
    switch (status) {
      case 'Working on it':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Done':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Stuck':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'To-Do':
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  // Simple priority badge helper
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border border-red-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
      case 'Low':
      default:
        return 'bg-blue-50 text-blue-700 border border-blue-200';
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
      className={`bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between gap-4 transition-colors ${
        isSelected ? 'border-blue-400 bg-blue-50/20' : 'border-gray-200'
      }`}
    >
      {/* Left side: Checkbox, Name, Priority */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(task.id)}
          className="w-4 h-4 cursor-pointer"
        />

        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span
            onClick={() => onEdit(task)}
            className={`cursor-pointer font-medium text-gray-800 hover:text-blue-600 ${
              task.status === 'Done' ? 'line-through text-gray-400' : ''
            }`}
            title="Click to edit"
          >
            {task.name}
          </span>

          <span
            className={`text-xs px-2 py-0.5 rounded font-semibold ${getPriorityClass(
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
          <span className="text-xs text-gray-600 font-medium">
            {task.owner}
          </span>
        ) : (
          <span className="text-xs text-gray-400 italic">No owner</span>
        )}

        {/* Added Date */}
        {task.createdAt && (
          <span className="text-xs text-gray-400 hidden sm:inline">
            Added: {formatDate(task.createdAt)}
          </span>
        )}

        {/* Status Badge */}
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
            task.status
          )}`}
        >
          {task.status}
        </span>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => onEdit(task)}
            className="px-2.5 py-1 text-blue-600 hover:bg-blue-50 rounded border border-blue-200 cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task)}
            className="px-2.5 py-1 text-red-600 hover:bg-red-50 rounded border border-red-200 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
