import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm 
        onSubmit={editingTask ? updateTask : addTask} 
        initialTask={editingTask}
      />
      <TaskList 
        tasks={tasks} 
        onEditTask={startEditing} 
        onDeleteTask={deleteTask}
      />
      {editingTask && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Editing Task</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">{editingTask.title}</td>
                <td className="border p-2">{editingTask.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tasks;