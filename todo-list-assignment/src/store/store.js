// store/store.js
import { createStore, applyMiddleware } from "redux";
import { compose } from "redux";

// Initial State
const initialState = {
  todos: [],
  inputValue: ""
};

// Action Types
const actionTypes = [
  "SET_INPUT",
  "ADD_TODO",
  "DELETE_TODO",
  "TOGGLE_TODO",
  "EDIT_TODO",
  "CHANGE_EDIT_TITLE",
  "SAVE_TODO",
  "CANCEL_EDIT",
];

// Reducer
let nextId = 1;
function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, inputValue: action.payload };
    case "ADD_TODO":
      if (!state.inputValue.trim()) return state;
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: nextId++,
            title: action.payload,
            done: false,
            edit: false,
            editingTitle: ""
          }
        ],
        inputValue: ""
      };
    case "DELETE_TODO":
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
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
          todo.id === action.payload ? { ...todo, edit: true, editingTitle: todo.title } : todo
        )
      };
    case "CHANGE_EDIT_TITLE":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, editingTitle: action.payload.value } : todo
        )
      };
    case "SAVE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, title: todo.editingTitle, edit: false, editingTitle: "" }
            : todo
        )
      };
    case "CANCEL_EDIT":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, edit: false, editingTitle: "" } : todo
        )
      };
    default:
      return state;
  }
}

// Middleware: Format ADD_TODO title
const titleFormatterMiddleware = store => next => action => {
  if (action.type === "ADD_TODO") {
    const date = new Date();
    const timestamp = `Added at ${date}:`;
    action.payload = `${timestamp} ${store.getState().inputValue}`;
  }
  return next(action);
};

// Enhancer: Log time taken by reducer
const monitorReducerEnhancer = (createStore) => {
  return (reducer, initialState) => {
    const store = createStore((state, action) => {
      const start = performance.now();
      const result = reducer(state, action);
      const end = performance.now();
      console.log(`Action '${action.type}' processed in ${end - start}ms`);
      return result;
    }, initialState);
    return store;
  };
}

// Store
export const store = createStore(
  todoReducer,
  compose(
    applyMiddleware(titleFormatterMiddleware),
    monitorReducerEnhancer
  )
);