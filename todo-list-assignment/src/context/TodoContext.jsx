import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoContext = createContext();

const initialState = {
  todos: [],
  inputValue: ""
};

function todoReducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, inputValue: action.payload };

    case "ADD_TODO":
      if (!state.inputValue.trim()) return state;
      const newTodo = {
        id: uuidv4(),
        title: state.inputValue,
        done: false,
        edit: false,
        editingTitle: state.inputValue
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
        inputValue: ""
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, done: !todo.done } : todo
        )
      };

    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, edit: !todo.edit, editingTitle: todo.title }
            : todo
        )
      };

    case "CHANGE_EDIT_TITLE":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, editingTitle: action.payload.value }
            : todo
        )
      };

    case "SAVE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, title: todo.editingTitle, edit: false }
            : todo
        )
      };

    case "CANCEL_EDIT":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, edit: false, editingTitle: todo.title }
            : todo
        )
      };

    default:
      return state;
  }
}

export default function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  // ".Provider" allows any descendant component within its tree
  //  to consume the data (value) stored in the context.
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
