'use client';

import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Search } from 'lucide-react';
import Swal from 'sweetalert2'; // Make sure you have this installed or remove if not needed

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isMounted]);

  const addTask = (newTask) => {
    if (!dueDate || !dueTime) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Due Date or Time',
        text: 'Please select a due date and time for the task.',
      });
      return;
    }

    setTasks([...tasks, { ...newTask, id: Date.now(), dueDate, dueTime }]);
    setDueDate('');
    setDueTime('');

    Swal.fire({
      title: 'Task Added Successfully!',
      text: 'Your task was added with due date and time.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
      imageWidth: 80,
      imageHeight: 80,
      imageAlt: 'Task Added Icon',
      background: '#f9f9f9',
      confirmButtonColor: '#3085d6',
      footer: '<b>Keep up the great work!</b>',
    });
  };

  const deleteTask = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks(tasks.filter((task) => task.id !== id));
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      }
    });
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
    Swal.fire('Updated!', 'Task marked as completed.', 'success');
  };

  const startEditTask = (task) => {
    setEditingTask(task);
    setDueDate(task.dueDate);
    setDueTime(task.dueTime);
  };

  const saveEditTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setDueDate('');
    setDueTime('');

    Swal.fire('Updated!', 'Task has been edited successfully.', 'success');
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setDueDate('');
    setDueTime('');
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Task Management App
        </h1>

        {/* Search Bar */}
        <div className="mb-4 flex items-center relative">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 bg-gray-700 text-white border border-gray-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <Search className="absolute left-3 top-2 text-gray-400" />
        </div>

        {/* Date and Time Inputs */}
        <div className="mb-4 flex items-center justify-center">
          <label className="text-white mr-2">Select Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 bg-gray-800 text-white border border-gray-600 rounded-md shadow-md"
          />
          <label className="text-white mx-2">Time:</label>
          <input
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            className="p-2 bg-gray-800 text-white border border-gray-600 rounded-md shadow-md"
          />
        </div>

        {/* Task Form */}
        <TaskForm
          onAddTask={addTask}
          editingTask={editingTask}
          onSaveEdit={saveEditTask}
          onCancelEdit={cancelEdit}
          dueDate={dueDate}
          setDueDate={setDueDate}
          dueTime={dueTime}
          setDueTime={setDueTime}
        />

        {/* Task Lists */}
        <div className="flex justify-between mt-4 space-x-4">
          {/* Active Tasks */}
          <div className="rounded-lg overflow-hidden shadow-lg bg-gray-800 w-1/2">
            <h2 className="text-lg text-white text-center py-2">My Tasks</h2>
            <TaskList
              tasks={filteredTasks.filter((task) => !task.isCompleted)}
              onDelete={deleteTask}
              onComplete={completeTask}
              onEdit={startEditTask}
            />
          </div>

          {/* Completed Tasks */}
          <div className="rounded-lg overflow-hidden shadow-lg bg-gray-800 w-1/2">
            <h2 className="text-lg text-white text-center py-2">Completed Tasks</h2>
            <TaskList
              tasks={filteredTasks.filter((task) => task.isCompleted)}
              onDelete={deleteTask}
              onComplete={completeTask}
              onEdit={startEditTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
