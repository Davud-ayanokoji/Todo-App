import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  return (
    <>
      <button onClick={toggleDarkMode} style={{ marginBottom: "1rem" }}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      <TodoList />
    </>
  );
}

export default App;
