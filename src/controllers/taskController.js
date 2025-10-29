import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function getTaskById(req, res, next) {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    res.json(task);
  } catch (err) {
    if (err.status === 400) {
      return res.status(400).json({ error: err.message, details: err.details });
    }
    if (err.status === 404) {
      return res.status(404).json({ error: err.message });
    }
    next(err);
  }
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}
