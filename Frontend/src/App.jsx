import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'https://cognocore.onrender.com';


function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task using axios.post
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const newTask = { title, description, dueDate };
      const response = await axios.post(`${apiUrl}/tasks`, newTask, {
        headers: { 'Content-Type': 'application/json' },
      });
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Delete a task using axios.delete
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${apiUrl}/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Toggle task completion status; assumes a PUT endpoint exists
  const toggleTaskCompletion = async (id, currentStatus) => {
    try {
      const updatedTask = { completed: !currentStatus };
      const response = await axios.put(`${apiUrl}/tasks/${id}`, updatedTask, {
        headers: { 'Content-Type': 'application/json' },
      });
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Cognocore</h1>
        <form onSubmit={addTask} className="mb-8 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            rows="3"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add Task
          </button>
        </form>
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available. Add a new task above.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map(task => (
              <li key={task._id} className="bg-gray-50 border border-gray-200 rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2
                    className={`text-xl font-semibold ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleTaskCompletion(task._id, task.completed)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        task.completed
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {task.completed ? 'Mark Pending' : 'Mark Completed'}
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {task.description && <p className="text-gray-700 mb-2">{task.description}</p>}
                {task.dueDate && (
                  <p className="text-gray-600">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
