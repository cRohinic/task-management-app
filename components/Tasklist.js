import React from 'react';
import { Edit2, Trash, CheckSquare } from 'lucide-react';

const TaskList = ({ tasks, onDelete, onComplete, onEdit }) => {
  return (
    <ul className="p-4 space-y-4">
      {tasks.length === 0 && (
        <p className="text-center text-gray-400">No tasks available.</p>
      )}
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`bg-gray-700 p-4 rounded-md shadow-md flex justify-between items-center ${
            task.isCompleted ? 'opacity-50' : ''
          }`}
        >
          <div>
            <h3 className="text-white font-bold">{task.title}</h3>
            <p className="text-gray-300">{task.description}</p>
            <p className="text-gray-400 text-sm">
              Due: {task.dueDate} at {task.dueTime}
            </p>
            <span
              className={`inline-block mt-2 px-2 py-1 text-xs font-bold rounded-full ${
                task.priority === 'high'
                  ? 'bg-red-500 text-white'
                  : task.priority === 'medium'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-green-500 text-black'
              }`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onComplete(task.id)}
              className="text-green-500 hover:text-green-400 transition"
            >
              <CheckSquare />
            </button>
            <button
              onClick={() => onEdit(task)}
              className="text-yellow-500 hover:text-yellow-400 transition"
            >
              <Edit2 />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:text-red-400 transition"
            >
              <Trash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
