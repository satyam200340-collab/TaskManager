import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskCount = 1, taskName = '' }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-sm p-5 sm:p-6 text-center my-auto">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5">
          {taskCount > 1 ? `Delete ${taskCount} tasks?` : 'Delete task?'}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed">
          {taskCount > 1
            ? `Are you sure you want to delete these ${taskCount} selected tasks? This action cannot be undone.`
            : `Are you sure you want to delete "${taskName || 'this task'}"? This action cannot be undone.`}
        </p>

        <div className="flex flex-col-reverse sm:flex-row justify-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-300 font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-lg shadow-sm cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
