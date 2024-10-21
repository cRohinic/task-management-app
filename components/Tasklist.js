import { CheckCircle, Edit3, Trash2 } from 'lucide-react'; // Import icons

const TaskList = ({ tasks, onDelete, onComplete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        No tasks available.
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <ul className="divide-y divide-gray-600">
      {tasks.map((task) => (
        <li key={task.id} className="p-4 flex justify-between items-center bg-gray-700 hover:bg-gray-600 rounded-md mb-2 transition duration-200">
          <div className="flex items-center space-x-3">
            {/* Priority Indicator */}
            <span className={`w-4 h-4 rounded-full ${getPriorityColor(task.priority)}`} title={`Priority: ${task.priority}`}></span>

            <div>
              <h3 className={`text-lg font-bold ${task.isCompleted ? 'line-through text-gray-500' : 'text-white'}`}>
                {task.title}
              </h3>
              <p className="text-sm text-gray-400">{task.description}</p>
              <p className="text-sm text-gray-500">Due: {task.dueDate} at {task.dueTime}</p>
            </div>
          </div>

          <div className="flex space-x-2">
            {/* Complete Button */}
            <button
              onClick={() => onComplete(task.id)}
              className={`p-2 rounded-md shadow-md text-white ${task.isCompleted ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
              title={task.isCompleted ? 'Undo Complete' : 'Mark as Complete'}
            >
              <CheckCircle size={20} />
            </button>

            {/* Edit Button */}
            <button
              onClick={() => onEdit(task)}
              className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-md shadow-md text-white transition duration-200"
              title="Edit Task"
            >
              <Edit3 size={20} />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 bg-red-600 hover:bg-red-700 rounded-md shadow-md text-white transition duration-200"
              title="Delete Task"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
