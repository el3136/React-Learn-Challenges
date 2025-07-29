import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Todolist = () => {
    const [inputValue, setInputValue] = useState("");
    const [todolist, setTodolist] = useState([]);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!inputValue.trim()) return;
        const newTodoItem = { id: uuidv4(), title: inputValue, done: false, edit: false, editingTitle: inputValue };
        setTodolist([...todolist, newTodoItem]);
        setInputValue("");
    };

    const handleToggle = (id) => {
        const updated = todolist.map((item) =>
            item.id === id ? { ...item, done: !item.done } : item
        );
        setTodolist(updated);
    };

    const handleDelete = (id) => {
        const filtered = todolist.filter((item) => item.id !== id);
        setTodolist(filtered);
    };

    const handleEdit = (id) => {
        // find the edited todo and turn the field into an <input>
        const updated = todolist.map((item) =>
            item.id === id ? { ...item, edit: !item.edit, editingTitle: item.title } : item
        );
        setTodolist(updated);
    };

    const handleEditChange = (id, value) => {
        const updated = todolist.map((item) =>
            item.id === id ? { ...item, editingTitle: value } : item
        );
        setTodolist(updated);
    };

    const handleSave = (id) => {
        // find the edited todo and turn the <input> back to normal text
        const updated = todolist.map((item) =>
            item.id === id ? { ...item, edit: !item.edit, title: item.editingTitle } : item
        );
        setTodolist(updated);
    };

    const handleCancel = (id) => {
        const updated = todolist.map((item) =>
            item.id === id ? { ...item, edit: !item.edit, editingTitle: item.title } : item
        );
        setTodolist(updated);
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="input-row">
                <input
                    type="text"
                    placeholder="Add your Task"
                    className="add-task-input"
                    value={inputValue}
                    onChange={handleChange}
                />
                <button type="submit" className="add-task-button">
                    Add
                </button>
            </div>

            <div className="todo-task-list">
                {todolist.map((item) => (
                    <label className="todo-task-row" key={item.id}>
                        <input
                            type="checkbox"
                            className="todo-checkbox"
                            checked={item.done}
                            onChange={() => handleToggle(item.id)}
                        />
                        <span className="task-text">
                            {(item.edit) ? (
                                <input 
                                    value={item.editingTitle} 
                                    onChange={(e) => handleEditChange(item.id, e.target.value)}
                                />
                            ): (item.done && !item.edit) ? (
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
                            </>
                        )}
                    </label>
                ))}
            </div>
        </form>
    );
};

export default Todolist;
