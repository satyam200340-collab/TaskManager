import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { INITIAL_TASKS } from './constants/tasks';

function App() {
  // Load tasks from localStorage or default to initial tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure all tasks have a createdAt date
          return parsed.map((t) => ({
            ...t,
            createdAt: t.createdAt || '2026-09-08',
          }));
        }
      } catch (e) {
        console.error('Error parsing tasks from localStorage', e);
      }
    }
    return INITIAL_TASKS;
  });

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Delete modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedToDelete, setSelectedToDelete] = useState([]);
  const [onDeleteSuccess, setOnDeleteSuccess] = useState(null);

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Preserve the original createdAt date
      setTasks(
        tasks.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t))
      );
    } else {
      // Set createdAt to today's date (YYYY-MM-DD)
      const today = new Date().toISOString().split('T')[0];
      const newTask = {
        id: String(Date.now()),
        ...taskData,
        createdAt: today,
      };
      setTasks([newTask, ...tasks]);
    }
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleRequestDeleteSingle = (task) => {
    setTaskToDelete(task);
    setSelectedToDelete([]);
    setDeleteModalOpen(true);
  };

  const handleRequestDeleteMultiple = (ids, callback) => {
    setSelectedToDelete(ids);
    setTaskToDelete(null);
    setOnDeleteSuccess(() => callback);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((t) => t.id !== taskToDelete.id));
    } else if (selectedToDelete.length > 0) {
      setTasks(tasks.filter((t) => !selectedToDelete.includes(t.id)));
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    }
    setDeleteModalOpen(false);
    setTaskToDelete(null);
    setSelectedToDelete([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="py-2 sm:py-6">
        <TaskList
          tasks={tasks}
          onOpenCreateModal={handleOpenCreateModal}
          onOpenEditModal={handleOpenEditModal}
          onRequestDeleteSingle={handleRequestDeleteSingle}
          onRequestDeleteMultiple={handleRequestDeleteMultiple}
        />
      </main>

      {/* Add / Edit Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTask}
        initialData={editingTask}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        taskCount={selectedToDelete.length > 0 ? selectedToDelete.length : 1}
        taskName={taskToDelete ? taskToDelete.name : ''}
      />
    </div>
  );
}

export default App;