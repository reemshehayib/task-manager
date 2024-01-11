// Task.js

import React from 'react';

const Task = ({ task, onRemoveTask }) => {
  const handleRemoveClick = () => {
    onRemoveTask(task.id);
  };

  return (
    <div className="task-container">
      <span className="task-title">{task.title}</span>
      <button className="remove-button" onClick={handleRemoveClick}>
        Task Done
      </button>
    </div>
  );
};


export default Task;
