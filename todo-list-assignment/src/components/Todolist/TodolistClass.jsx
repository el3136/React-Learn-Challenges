import React, { Component, createRef } from "react";
import { v4 as uuidv4 } from "uuid";

// useState => this.state and this.setState
// useRef => createRef()
// useEffect => componentDidUpdate
class TodolistClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            todolist: [],
        };
        this.inputRef = createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.inputValue !== this.state.inputValue &&
            this.state.inputValue === "") {
            this.inputRef.current?.focus();
        }
    }

    handleChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { inputValue, todolist } = this.state;
        if (!inputValue.trim()) return;

        const newTodo = {
            id: uuidv4(),
            title: inputValue,
            done: false,
            edit: false,
            editingTitle: inputValue,
        };

        this.setState({
            todolist: [...todolist, newTodo],
            inputValue: "",
        });
    };

    handleDelete = (id) => {
        this.setState((prevState) => ({
            todolist: prevState.todolist.filter((item) => item.id !== id),
        }));
    };

    handleToggle = (id) => {
        this.setState((prevState) => ({
            todolist: prevState.todolist.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
            ),
        }));
    };

    handleEdit = (id) => {
        this.setState((prevState) => ({
            todolist: prevState.todolist.map((item) =>
                item.id === id
                    ? { ...item, edit: !item.edit, editingTitle: item.title }
                    : item
            ),
        }));
    };

    handleEditChange = (id, value) => {
        this.setState((prevState) => ({
            todolist: prevState.todolist.map((item) =>
                item.id === id ? { ...item, editingTitle: value } : item
            ),
        }));
    };

    handleSave = (id) => {
        this.setState((prevState) => ({
            todolist: prevState.todolist.map((item) =>
                item.id === id
                    ? { ...item, title: item.editingTitle, edit: false }
                    : item
            ),
        }));
    };

    handleCancel = (id) => {
        this.setState((prevState) => ({
            todolist: prevState.todolist.map((item) =>
                item.id === id
                    ? { ...item, edit: false, editingTitle: item.title }
                    : item
            ),
        }));
    };

    renderTodoItem = (item) => (
        <label className="todo-task-row" key={item.id}>
            <span className="task-text">
                {item.edit ? (
                    <input
                        value={item.editingTitle}
                        onChange={(e) =>
                            this.handleEditChange(item.id, e.target.value)
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
                    <button
                        type="button"
                        className="edit-task-button"
                        onClick={() => this.handleSave(item.id)}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="remove-task-button"
                        onClick={() => this.handleCancel(item.id)}
                    >
                        x
                    </button>
                </>
            ) : (
                <>
                    <button
                        type="button"
                        className="edit-task-button"
                        onClick={() => this.handleEdit(item.id)}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="remove-task-button"
                        onClick={() => this.handleDelete(item.id)}
                    >
                        x
                    </button>
                    <button
                        type="button"
                        className="toggle-task-button"
                        onClick={() => this.handleToggle(item.id)}
                    >
                        {item.done ? "⬅️" : "➡️"}
                    </button>
                </>
            )}
        </label>
    );

    render() {
        const { inputValue, todolist } = this.state;
        const pendingTodos = todolist.filter((item) => !item.done);
        const completedTodos = todolist.filter((item) => item.done);

        return (
            <div>
                <form className="todo-form" onSubmit={this.handleSubmit}>
                    <div className="input-row">
                        <input
                            type="text"
                            placeholder="Add your Task"
                            className="add-task-input"
                            value={inputValue}
                            onChange={this.handleChange}
                            ref={this.inputRef}
                        />
                        <button type="submit" className="add-task-button">
                            Add
                        </button>
                    </div>
                </form>

                <div className="todo-task-section">
                    <h3>Pending Tasks</h3>
                    <div className="todo-task-list">
                        {pendingTodos.map(this.renderTodoItem)}
                    </div>

                    <h3>Completed Tasks</h3>
                    <div className="todo-task-list">
                        {completedTodos.map(this.renderTodoItem)}
                    </div>
                </div>
            </div>
        );
    }
}

export default TodolistClass;
