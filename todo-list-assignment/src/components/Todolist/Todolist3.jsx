import React, { useEffect, useMemo, useRef } from "react";
import { useTodo } from "../../context/TodoContext";

// Homework: Refactor your functional component todolist.
// Use context to manage all the states, and use reducer to handle todo
//   data related updates (put useReducer in context).
// Read the documentation about context and reducer
// https://react.dev/learn/passing-data-deeply-with-context

const Todolist = () => {
  const { state, dispatch } = useTodo();
  const { todos, inputValue } = state;

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue === "") {
      inputRef.current?.focus();
    }
  }, [inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO" });
  };

  const pendingTodos = useMemo(() => todos.filter(todo => !todo.done), [todos]);
  const completedTodos = useMemo(() => todos.filter(todo => todo.done), [todos]);

  const renderTodoItem = (item) => (
    <label className="todo-task-row" key={item.id}>
      <span className="task-text">
        {item.edit ? (
          <input
            value={item.editingTitle}
            onChange={(e) =>
              dispatch({ type: "CHANGE_EDIT_TITLE", payload: { id: item.id, value: e.target.value } })
            }
          />
        ) : item.done ? (
          <del className="deleted-task">{item.title}</del>
        ) : (
          <span>{item.title}</span>
        )}
      </span>

      {item.edit ? (
        <>
          <button onClick={() => dispatch({ type: "SAVE_TODO", payload: item.id })}>Save</button>
          <button onClick={() => dispatch({ type: "CANCEL_EDIT", payload: item.id })}>x</button>
        </>
      ) : (
        <>
          <button onClick={() => dispatch({ type: "EDIT_TODO", payload: item.id })}>Edit</button>
          <button onClick={() => dispatch({ type: "DELETE_TODO", payload: item.id })}>x</button>
          <button onClick={() => dispatch({ type: "TOGGLE_TODO", payload: item.id })}>
            {item.done ? "<=" : "=>"}
          </button>
        </>
      )}
    </label>
  );

  return (
    <div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <input
            type="text"
            placeholder="Add your Task"
            className="add-task-input"
            value={inputValue}
            onChange={(e) =>
              dispatch({ type: "SET_INPUT", payload: e.target.value })
            }
            ref={inputRef}
          />
          <button type="submit" className="add-task-button">Add</button>
        </div>
      </form>

      <div className="todo-task-section">
        <h3>Pending Tasks</h3>
        <div className="todo-task-list">{pendingTodos.map(renderTodoItem)}</div>

        <h3>Completed Tasks</h3>
        <div className="todo-task-list">{completedTodos.map(renderTodoItem)}</div>
      </div>
    </div>
  );
};

export default Todolist;
