import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskRemove from './TaskRemove';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    axios.get('http://localhost:3001/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    console.log('Adding task:', newTask);
    fetchTasks();

  };

  const removeTask = (taskId) => {
    axios.delete(`http://localhost:3001/tasks/${taskId}`)
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.error('Error removing task:', error);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-list-container">
      <h2>To-Do List</h2>
      <TaskForm onAddTask={addTask} />
      {tasks.map((task) => (
        <TaskRemove key={task.id} task={task} onRemoveTask={removeTask} />
      ))}
    </div>
  );
};

export default TaskList;
