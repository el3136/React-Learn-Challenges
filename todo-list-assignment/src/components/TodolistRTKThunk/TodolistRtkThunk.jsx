import React, { useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  setInput,
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  changeEditTitle,
  saveTodo,
  cancelEdit
} from "./todosRtkThunkSlice";

const Todolist = () => {
  const { items: todos, inputValue, loading, error } = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if (inputValue === "") {
      inputRef.current?.focus();
    }
  }, [inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo());
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
              dispatch(changeEditTitle({ id: item.id, value: e.target.value }))
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
          <button onClick={() => dispatch(saveTodo(item.id))}>Save</button>
          <button onClick={() => dispatch(cancelEdit(item.id))}>x</button>
        </>
      ) : (
        <>
          <button onClick={() => dispatch(editTodo(item.id))}>Edit</button>
          <button onClick={() => dispatch(deleteTodo(item.id))}>x</button>
          <button onClick={() => dispatch(toggleTodo(item.id))}>
            {item.done ? "<=" : "=>"}
          </button>
        </>
      )}
    </label>
  );

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <input
            type="text"
            placeholder="Add your Task"
            className="add-task-input"
            value={inputValue}
            onChange={(e) => dispatch(setInput(e.target.value))}
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
