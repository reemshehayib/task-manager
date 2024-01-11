import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const addTask = () => {
    if (!title) {
      alert('Please enter a task title.');
      return;
    }

    axios.post('http://localhost:3001/tasks', { title })
      .then((response) => {
        onAddTask(response.data);
        setTitle('');
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Enter the task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;
