// import { useState } from "react";
import { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import "./TodoList.css";

export default function TodoList() {
    

    // **Extracted logic outside the useState hook**
    const savedTodos = localStorage.getItem("todos");
    const initialTodos = savedTodos ? JSON.parse(savedTodos) : [{ task: "Open Todo", id: uuidv4(), isDone: false }];
    
    // **State initialization**
    const [todos, setTodos] = useState(initialTodos);  // Using initialTodos to initialize state
    const [newTodo, setNewTodo] = useState("");

  

  let addNewTask = () => {
    if (newTodo.trim() === "") return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { task: newTodo, id: uuidv4(), isDone: false },
    ]);
    setNewTodo("");
  };


  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };


  let deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };


  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo
      )
    );
  };


  let markAllAsDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, isDone: true }))
    );
  };

    // Save todos to localStorage whenever todos change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);


  return (
    <div className="todo-app">
      <div className="app-header">
        <h1>Todo List</h1>
        <p>Plan and manage your tasks efficiently</p>
      </div>

      <div className="todo-form">
        <input
          className="todo-input"
          placeholder="Add a task"
          value={newTodo}
          onChange={updateTodoValue}
        />
        <button className="add-button" onClick={addNewTask}>
          Add Task
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.isDone ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.isDone}
              onChange={() => markAsDone(todo.id)}
            />
            <span className="todo-text">{todo.task}</span>
            <div className="todo-actions">
              <button
                className="todo-button delete"
                onClick={() => deleteTodo(todo.id)}
              >
                 <DeleteRoundedIcon />
              </button>
              {!todo.isDone && (
                <button
                  className="todo-button edit"
                  onClick={() => markAsDone(todo.id)}
                >
                  ✅
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="app-footer">
        <span className="todo-count">{todos.length} tasks total</span>
        <button className="clear-button" onClick={markAllAsDone}>
          Mark All as Done
        </button>
      </div>
    </div>
    
  );
}
