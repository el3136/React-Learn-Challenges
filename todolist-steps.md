
- .tsx
npm create vite@latest todo-list-assignment -- --template react-ts

- .jsx
npm create vite@latest todo-list-assignment -- --template react

- npm install uuid
import { v4 as uuidv4 } from "uuid";

# Tic Tac Toe initial
npm create vite@latest tic-tac-toe -- --template react
npm install
npm install uuid

# useContext() + useReducer
- 1. /src/context/TodoContext.jsx — Context + Reducer
- 2. Update Todolist.jsx
- 3. /src/main.jsx - Wrap <App />
createRoot(document.getElementById('root')).render(
  <TodoProvider>
    <App />
  </TodoProvider>,
)

## Homework: refactor your functional todolist app to use redux core
Define a reducer to handle state logic for the todo list
For “add todo” action: Apply a middleware to modify the title to be this specific format: { title: "Added at 2025-08-01: Buy groceries" }
Apply a store enhancer to log the time it takes to process actions in the reducer

- Redux Core
npm install react-redux redux

- new files:
/src/store/store.js
/src/hooks/hooks.js

- modified:
/src/components/Todolist.jsx
import { useTodos, useInputValue, useTodoDispatch} from "../hooks/hooks";

const Todolist = () => {
  const todos = useTodos();
  const inputValue = useInputValue();
  const dispatch = useTodoDispatch();
}

/src/App.jsx
import { Provider } from "react-redux";
import { store } from "./store/store";
import Todolist from "./components/Todolist";
export default function App() {
  return (
    <Provider store={store}>
      <Todolist />
    </Provider>
  );
}