const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    editTask,
  } = require('../controllers/tasks');

  router.route('/').get(getAllTasks).post(createTask);
  router.route('/:id').get(getTask).delete(deleteTask).patch(updateTask)
  // router.route('/:id').patch(updateTask).delete(deleteTask).get(getTask);
  module.exports = router;