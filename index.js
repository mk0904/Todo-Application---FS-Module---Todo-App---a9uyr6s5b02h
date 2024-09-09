const path = './db.txt'
const {readFileSync:rfs, writeFileSync:wfs} = require('fs')

const getTodosSync = () => {
  data = rfs(path, 'utf-8')
  return data
};

const getTodoSync = (id) => {};

const createTodoSync = (todo) => {};

const updateTodoSync = (id, updates) => {};

const deleteTodoSync = (id) => {};

module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};
