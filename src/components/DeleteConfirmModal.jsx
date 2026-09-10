import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskCount = 1, taskName = '' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-sm p-6 text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {taskCount > 1 ? `Delete ${taskCount} tasks?` : 'Delete task?'}
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          {taskCount > 1
            ? `Are you sure you want to delete these ${taskCount} selected tasks?`
            : `Are you sure you want to delete "${taskName || 'this task'}"?`}
        </p>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
