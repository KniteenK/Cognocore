import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask }),
      });
      const addedTask = await response.json();
      setTasks([...tasks, addedTask]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management App</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="border p-2 flex-grow mr-2"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="flex justify-between items-center border-b py-2">
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white p-1 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
