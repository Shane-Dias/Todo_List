import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdDelete, MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) setTodos(JSON.parse(storedTodos));

    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(storedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleCheckbox = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete it?")) {
      setTodos(todos.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((item) => item.id === id);
    setTodo(todoToEdit.todo);
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleThemeToggle = () => setIsDarkMode((prev) => !prev);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen transition-all`}
    >
      {/* Navbar */}
      <header className="flex justify-between items-center py-4 px-6 shadow-md bg-blue-600 text-white">
        <h1 className="text-2xl font-bold">To-Do App</h1>
        <button
          onClick={handleThemeToggle}
          className="text-2xl hover:text-gray-300 transition"
        >
          {isDarkMode ? <MdLightMode /> : <MdOutlineDarkMode />}
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto my-6 p-6 bg-sky-500 shadow-lg rounded-lg w-[90%] md:w-[50%] transition-all dark:bg-gray-800">
        {/* Add Todo */}
        <div className="flex items-center mb-4">
          <input
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            type="text"
            className="bg-slate-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400
             w-3/4 py-2 rounded-md px-2 border-none outline-none focus:outline-green-700 focus:shadow-xl"
            placeholder="Add a new To-Do"
          />

          <button
            onClick={handleAdd}
            disabled={todo.trim() === ""}
            className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 ${
              todo.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Add
          </button>
        </div>
        {/* Todos List */}
        <h2 className="font-semibold text-4xl text-gray-800 dark:text-gray-200">
          Your Todos
        </h2>
        {todos.length === 0 && (
          <p className="text-pink-700 text-center font-bold text-2xl">No todos currently, maybe add one?</p>
        )}

        {todos.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-3 mb-2 rounded-lg shadow-md ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handleCheckbox(item.id)}
                className="mr-3 w-5 h-5"
              />
              <p
                className={`${
                  item.isCompleted ? "line-through text-gray-500" : ""
                } text-lg`}
              >
                {item.todo}
              </p>
            </div>

            <div className="flex">
              <button
                onClick={() => handleEdit(item.id)}
                className="text-yellow-500 hover:text-yellow-700 mx-2"
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <MdDelete size={22} />
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
