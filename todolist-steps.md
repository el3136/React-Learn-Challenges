
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