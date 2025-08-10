import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch todos
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      return data.slice(0, 5).map(t => ({
        id: t.id,
        title: t.title,
        done: t.completed,
        edit: false,
        editingTitle: t.title
      }));
    } catch (err) {
      console.error(err.message);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.message); // custom payload
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    inputValue: "",
    loading: false,
    error: null
  },
  reducers: {
    setInput: (state, action) => {
      state.inputValue = action.payload;
    },
    addTodo: (state) => {
      if (state.inputValue.trim() === "") return;
      state.items.push({
        id: Date.now(),
        title: state.inputValue,
        done: false,
        edit: false,
        editingTitle: state.inputValue
      });
      state.inputValue = "";
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) todo.done = !todo.done;
    },
    editTodo: (state, action) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) todo.edit = true;
    },
    changeEditTitle: (state, action) => {
      const { id, value } = action.payload;
      const todo = state.items.find(t => t.id === id);
      if (todo) todo.editingTitle = value;
    },
    saveTodo: (state, action) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) {
        todo.title = todo.editingTitle;
        todo.edit = false;
      }
    },
    cancelEdit: (state, action) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) {
        todo.editingTitle = todo.title;
        todo.edit = false;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setInput,
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  changeEditTitle,
  saveTodo,
  cancelEdit
} = todosSlice.actions;

