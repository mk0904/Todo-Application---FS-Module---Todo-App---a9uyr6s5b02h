const path = './db.txt';
const { readFileSync: rfs, writeFileSync: wfs } = require('fs');

// Helper function to read and parse todos from db.txt
const readTodos = () => {
  const data = rfs(path, 'utf-8').trim();
  if (data) {
    return data.split('\n').map(line => JSON.parse(line)); // Return array of todos
  }
  return [];
};

// Helper function to write todos to db.txt
const writeTodos = (todos) => {
  const data = todos.map(todo => JSON.stringify(todo, null, 2)).join('\n');
  wfs(path, data, 'utf-8');
};

// Get all todos
const getTodosSync = () => {
  return rfs(path, 'utf-8'); // Return raw data without formatting
};

// Get a specific todo by ID
const getTodoSync = (id) => {
  const todos = readTodos();
  const todo = todos.find(todo => todo.id === id);
  return todo ? JSON.stringify(todo, null, 2) : null;
};

// Create a new todo
const createTodoSync = (title) => {
  const todos = readTodos();
  const newTodo = {
    id: Date.now(),
    title: title,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  writeTodos(todos);
  return newTodo;
};

// Update a todo by ID
const updateTodoSync = (id, updates) => {
  const todos = readTodos();
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos[index] = {
      ...todos[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    writeTodos(todos);
    return todos[index];
  }
  return null;
};

// Delete a todo by ID
const deleteTodoSync = (id) => {
  const todos = readTodos();
  const updatedTodos = todos.filter(todo => todo.id !== id);
  if (updatedTodos.length !== todos.length) {
    writeTodos(updatedTodos);
    return true;
  }
  return false;
};

module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};
