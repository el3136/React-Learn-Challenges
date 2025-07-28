import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Todolist from "./components/Todolist/Todolist";
//auto complete
function App() {
    //const [count, setCount] = useState(0);
    // const handleClick = (name) => {
    //     console.log("child button is clicked", name);
    // };
    return (
        <div className="todo-container">
            {/* <EventDemo onClickButton={handleClick} /> */}
            {/* <Counter /> */}
            <h2>To-Do List</h2>
            <Todolist />
        </div>
    );
}

export default App;