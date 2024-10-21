import React, { useState, useEffect } from 'react';

const TaskForm = ({ onAddTask, editingTask, onSaveEdit, onCancelEdit, dueDate, setDueDate, dueTime, setDueTime }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium'); // Default priority

  // Populate the form when editingTask is present
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
      setDueTime(editingTask.dueTime);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setDueTime('');
    }
  }, [editingTask, setDueDate, setDueTime]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!title.trim() || !dueDate || !dueTime) {
      alert('Please fill out the task title, date, and time.');
      return;
    }

    const newTask = { title, description, priority, dueDate, dueTime };

    if (editingTask) {
      onSaveEdit({ ...editingTask, ...newTask });
    } else {
      onAddTask(newTask);
    }

    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-md shadow-md space-y-4">
      <div>
        <label className="text-white">Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          required
        />
      </div>

      <div>
        <label className="text-white">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <div>
        <label className="text-white">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-md"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white shadow-md transition duration-200"
        >
          {editingTask ? 'Save Changes' : 'Add Task'}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-md text-white shadow-md transition duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
