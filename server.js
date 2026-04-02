const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];

// Health check (VERY IMPORTANT for DevOps)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Create task
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = {
    id: tasks.length + 1,
    title,
    createdAt: new Date()
  };

  tasks.push(task);

  res.status(201).json(task);
});

// Port from ENV (important for containers)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
