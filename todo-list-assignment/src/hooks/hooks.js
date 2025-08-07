// hooks/hooks.js
import { useSelector, useDispatch } from "react-redux";

export const useTodos = () => useSelector(state => state.todos);
export const useInputValue = () => useSelector(state => state.inputValue);
export const useTodoDispatch = () => useDispatch();
