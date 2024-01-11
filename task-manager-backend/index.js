const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'task_manager',

});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Connected to the database');
  }
});

// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const insertQuery = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    db.query(insertQuery, [title, description], (err, result) => {
      if (err) {
        console.error('Error creating task:', err);
        res.status(500).send('Error creating task');
      } else {
        res.status(201).send('Task created successfully');
      }
    });
  });
  
  // Get all tasks  
  app.get('/tasks', (req, res) => {
    const selectQuery = 'SELECT * FROM tasks';
    db.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).send('Error fetching tasks');
      } else {
        console.log('Sending tasks:', results); // Log the tasks being sent
        res.status(200).json(results);
      }
    });
  });
  
  // Get a specific task
  app.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const selectQuery = 'SELECT * FROM tasks WHERE id = ?';
    db.query(selectQuery, [taskId], (err, result) => {
      if (err) {
        console.error('Error fetching task:', err);
        res.status(500).send('Error fetching task');
      } else {
        res.status(200).json(result[0]);
      }
    });
  });
  
  // Update a task
  app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, description } = req.body;
    const updateQuery = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';
    db.query(updateQuery, [title, description, taskId], (err, result) => {
      if (err) {
        console.error('Error updating task:', err);
        res.status(500).send('Error updating task');
      } else {
        res.status(200).send('Task updated successfully');
      }
    });
  });
  
  // Delete a task
  app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const deleteQuery = 'DELETE FROM tasks WHERE id = ?';
    db.query(deleteQuery, [taskId], (err, result) => {
      if (err) {
        console.error('Error deleting task:', err);
        res.status(500).send('Error deleting task');
      } else {
        res.status(200).send('Task deleted successfully');
      }
    });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  