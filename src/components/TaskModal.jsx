import React, { useState, useEffect } from 'react';
import { PRIORITIES, STATUSES } from '../constants/tasks';

const TaskModal = ({ isOpen, onClose, onSave, initialData }) => {
  const isEditing = Boolean(initialData);

  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('To-Do');
  const [error, setError] = useState('');

  // Load existing data when editing, or reset when adding
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setOwner(initialData.owner || '');
      setPriority(initialData.priority || 'Medium');
      setStatus(initialData.status || 'To-Do');
    } else {
      setName('');
      setOwner('');
      setPriority('Medium');
      setStatus('To-Do');
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a task name.');
      return;
    }

    onSave({
      ...(initialData || {}),
      name: name.trim(),
      owner: owner.trim(),
      priority,
      status,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/50 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md p-5 sm:p-6 my-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {isEditing ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="p-2.5 mb-3 text-xs sm:text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Task Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Redesign landing page"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              autoFocus
            />
          </div>

          {/* Owner */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Owner (optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Satya, Alex"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Priority & Status in a responsive 2-column layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Priority */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white cursor-pointer"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white cursor-pointer"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-300 cursor-pointer font-medium text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm cursor-pointer text-center"
            >
              {isEditing ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
