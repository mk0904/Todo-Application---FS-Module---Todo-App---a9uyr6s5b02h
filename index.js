const fs = require('fs');
const path = require('path');
const getTodosSync = () => {
  return fs.readFileSync('db.txt', 'utf-8');
};
const getTodoSync = (id) => {
  const data = getTodosSync();
  const strippedData = data.split("}");
  strippedData.pop()
  const formattedData = strippedData.map(it => {
    if(it != ''){
      return JSON.parse(it + '}')
    }
    return '';
  })
  // formattedData.pop();
  return JSON.stringify(formattedData.find(it => it.id == id));
};
const createTodoSync = (todo) => {
  let Todo = {
    "id": Date.now(),
    "title": todo,
    "isCompleted": false,
    "createdAt": new Date().toISOString(),
    "updatedAt": new Date().toISOString()
  }
  fs.appendFileSync("db.txt", JSON.stringify(Todo, null, 2));
};
const updateTodoSync = (id, updates) => {
  const data = getTodosSync();
  const strippedData = data.split("}");
  strippedData.pop()
  const formattedData = strippedData.map(it => {
    if(it != ''){
      return JSON.parse(it + '}')
    }
    return '';
  })
  // formattedData.pop();
  const updatedArray = formattedData.map(it => {
    if(it.id == id){
      if(updates.title){
        it.title = updates.title
      }
      if(updates.isCompleted){
        it.isCompleted = updates.isCompleted
      }
      it.updatedAt =  new Date().toISOString();
    }
    return it
  });
  const DBData =  updatedArray.reduce((prev, it) => {
    return prev + JSON.stringify(it, null, 2);
  }, "");
  console.log(DBData)
  fs.writeFileSync('db.txt', DBData);
};
const deleteTodoSync = () => {
  fs.writeFileSync('db.txt', "");
};
const getTodos = () => {};
const getTodo = (id) => {};
const createTodo = (todo) => {};
const updateTodo = async (id, updates) => {};
const deleteTodo = async (id) => {};
module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
};
