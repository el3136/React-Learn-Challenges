import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

// Version with:
// useState, useRef, useEffect, useCallback, useMemo

const Todolist = () => {
    const [inputValue, setInputValue] = useState("");
    const [todolist, setTodolist] = useState([]);

    const inputRef = useRef(null);

    useEffect(() => {
        // focus on inputRef after "Add" task is completed
        if (inputValue === "") {
            inputRef.current?.focus();
        }
    }, [inputValue]);

    const handleChange = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        
        if (!inputValue.trim()) return;
        const newTodo = {
            id: uuidv4(),
            title: inputValue,
            done: false,
            edit: false,
            editingTitle: inputValue,
        };
        setTodolist((prev) => [...prev, newTodo]);
        setInputValue("");
    }, [inputValue]);

    const handleDelete = useCallback((id) => {
        setTodolist((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const handleToggle = useCallback((id) => {
        setTodolist((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        );
    }, []);

    const handleEdit = useCallback((id) => {
        setTodolist((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, edit: !item.edit, editingTitle: item.title }
                    : item
            )
        );
    }, []);

    const handleEditChange = useCallback((id, value) => {
        setTodolist((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, editingTitle: value } : item
            )
        );
    }, []);

    const handleSave = useCallback((id) => {
        setTodolist((prev) =>
            prev.map((item) =>
                item.id === id 
                    ? {
                        ...item,
                        edit: false,
                        title: item.editingTitle,
                    } : item
            )
        );
    }, []);

    const handleCancel = useCallback((id) => {
        setTodolist((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, edit: false, editingTitle: item.title }
                    : item
            )
        );
    }, []);

    const pendingTodos = useMemo(() => todolist.filter((item) => !item.done), [todolist]);
    const completedTodos = useMemo(() => todolist.filter((item) => item.done), [todolist]);

    const renderTodoItem = (item) => (
        <label className="todo-task-row" key={item.id}>
            <span className="task-text">
                {item.edit ? (
                    <input
                        value={item.editingTitle}
                        onChange={(e) => handleEditChange(item.id, e.target.value)}
                    />
                ) : item.done ? (
                    <del className="deleted-task">{item.title}</del>
                ) : (
                    <span>{item.title}</span>
                )}
            </span>

            {item.edit ? (
                <>
                    <button
                        type="button"
                        className="edit-task-button"
                        onClick={() => handleSave(item.id)}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="remove-task-button"
                        onClick={() => handleCancel(item.id)}
                    >
                        x
                    </button>
                </>
            ) : (
                <>
                    <button
                        type="button"
                        className="edit-task-button"
                        onClick={() => handleEdit(item.id)}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="remove-task-button"
                        onClick={() => handleDelete(item.id)}
                    >
                        x
                    </button>
                    <button
                        type="button"
                        className="toggle-task-button"
                        onClick={() => handleToggle(item.id)}
                    >
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
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button type="submit" className="add-task-button">
                        Add
                    </button>
                </div>
            </form>

            <div className="todo-task-section">
                <h3>Pending Tasks</h3>
                <div className="todo-task-list">
                    {pendingTodos.map(renderTodoItem)}
                </div>

                <h3>Completed Tasks</h3>
                <div className="todo-task-list">
                    {completedTodos.map(renderTodoItem)}
                </div>
            </div>
        </div>
    );
};

export default Todolist;
